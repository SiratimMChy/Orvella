"use client";
import React, { useEffect, useState } from 'react';
import ProductCard from "@/components/Cards/ProductCard";
import { getProducts } from "@/actions/server/Product";

const LadiesPage = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Ladies Wear - Orvella';
  }, []);

  useEffect(() => {
    let isMounted = true;
    
    const fetchProducts = async () => {
      if (!isMounted) return;
      
      setLoading(true);
      try {
        const data = await getProducts();
        const ladiesProducts = data.filter(product => product.category === 'Ladies Wear');
        if (isMounted) {
          setProducts(ladiesProducts || []);
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
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        Ladies Wear Collection
      </h1>

      <div className='flex justify-center gap-4 mt-2 mb-8'>
        <input
          type="text"
          placeholder="Search ladies&apos; products..."
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered flex-1 max-w-md px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
        />
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
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No ladies&apos; products found</h3>
          <p className="text-gray-500">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default LadiesPage;