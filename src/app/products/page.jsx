"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProductCard from "@/components/Cards/ProductCard";
import { getProducts } from "@/actions/server/Product";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const itemsPerPage = 9;

  useEffect(() => {
    document.title = 'All Products - Orvella';
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const fetchProducts = async () => {
      if (!isMounted) return;
      
      setLoading(true);
      try {
        const data = await getProducts(currentPage, itemsPerPage);
        if (isMounted) {
          setProducts(data.products || []);
          setTotalPages(data.totalPages || 1);
          setTotal(data.total || 0);
        }
      } catch (err) {
        console.log(err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchProducts();
    
    return () => {
      isMounted = false;
    };
  }, [currentPage]);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category === '' || product.category === category;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-5 container mx-auto px-4 py-8">
        {[...Array(9)].map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 h-72 rounded-2xl mb-4"></div>
            <div className="bg-gray-200 h-4 rounded mb-2"></div>
            <div className="bg-gray-200 h-4 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className='m-4 pb-25 p-2 lg:px-20'>
      <h1 className="text-center text-3xl font-bold mb-8">
        Our Products
      </h1>

      <div className='flex justify-between gap-4 mt-2 mb-8'>
        <input
          type="text"
          placeholder="Search by product name..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
        <select
          onChange={(e) => setCategory(e.target.value)}
          defaultValue="Choose Category"
          className="select px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        >
          <option disabled={true}>Choose Category</option>
          <option value="">All</option>
          <option value="Men Wear">Men Wear</option>
          <option value="Ladies Wear">Ladies Wear</option>
          <option value="Kids Wear">Kids Wear</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mt-4 mb-8">
        {filteredProducts.map(product => (
          <div
            key={product._id}
            className="w-full max-w-lg flex flex-col h-full"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      )}

      {!loading && filteredProducts.length > 0 && totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              if (
                page === 1 ||
                page === totalPages ||
                (page >= currentPage - 1 && page <= currentPage + 1)
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 border rounded-lg ${
                      currentPage === page
                        ? 'bg-red-500 text-white border-red-500'
                        : 'border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                );
              } else if (page === currentPage - 2 || page === currentPage + 2) {
                return <span key={page} className="px-2 py-2">...</span>;
              }
              return null;
            })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}

      {!loading && (
        <div className="text-center text-gray-600 mt-4">
          Showing {filteredProducts.length} of {total} products
        </div>
      )}
    </div>
  );
};

export default ProductsPage;