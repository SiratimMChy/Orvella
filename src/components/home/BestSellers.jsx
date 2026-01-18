import React from 'react';
import { getBestSellers } from '@/actions/server/Product';
import ProductCard from '@/components/Cards/ProductCard';
import { FaStar, FaArrowRight, FaHeart } from 'react-icons/fa';
import Link from 'next/link';

const BestSellers = async () => {
  const bestSellers = await getBestSellers(4);

  return (
    <div className="w-full px-2 lg:px-0 py-12">
      {/* Professional Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-sm">
          <FaStar className="text-sm" />
          Customer Favorites
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          <span className="text-red-600">Best Selling</span> Products
        </h2>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Handpicked by our customers, these are the products that define excellence in fashion
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {bestSellers.map((product, index) => (
          <div key={product._id} className="group relative">
            {/* Professional Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-10 blur transition-all duration-500"></div>
            
            {/* Product Container */}
            <div className="relative bg-white rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 border border-gray-100">
              <ProductCard product={product} />
            </div>

            {/* Floating Stats */}
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-red-100">
                <div className="flex items-center gap-2 text-xs">
                  <FaHeart className="text-red-500" />
                  <span className="font-semibold text-gray-700">{product.sold}+ sold</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Professional CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-red-600 to-red-700 rounded-2xl shadow-2xl">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-20 translate-y-20"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-white rounded-full transform -translate-y-1/2"></div>
        </div>

        <div className="relative p-8 lg:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Discover Your Perfect Style
            </h3>
            <p className="text-xl text-red-100 mb-8 leading-relaxed">
              Join thousands of satisfied customers who have found their signature look with Orvella
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 bg-white text-red-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Explore All Products
                <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <div className="flex items-center gap-3 text-red-100">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="w-10 h-10 bg-red-400 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="w-10 h-10 bg-red-300 rounded-full border-2 border-white shadow-lg"></div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-white">10,000+</div>
                  <div className="text-sm">Happy Customers</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestSellers;