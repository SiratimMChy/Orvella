"use client";

import React from 'react';
import { getNewArrivals } from '@/actions/server/Product';
import ProductCard from '@/components/Cards/ProductCard';
import CartButton from '@/components/Links/CartButton';
import { FaStar, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';
import Image from 'next/image';

const NewArrivals = ({ products }) => {

  return (
    <div className="w-full px-2 lg:px-0 py-12">
      {/* Professional Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-sm">
          <FaStar className="text-sm" />
          Fresh & New
        </div>
        
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          <span className="text-red-600">New Arrivals</span>
        </h2>
        
        <p className="text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover the latest additions to our collection, fresh from the runway to your wardrobe
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-8 mb-12">
        {products.map((product) => (
          <div key={product._id} className="group relative">
            {/* Professional Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-red-600 rounded-2xl opacity-0 group-hover:opacity-10 blur transition-all duration-500"></div>
            
            {/* Product Container */}
            <div className="relative bg-white rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-500 transform group-hover:-translate-y-2 border border-gray-100 overflow-hidden">
              {/* Product Image */}
              <div className="relative h-40 lg:h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder-product.svg';
                  }}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
                
                {/* Discount Badge */}
                {product.discount > 0 && (
                  <div className="absolute top-2 left-2 lg:top-4 lg:left-4 z-10">
                    <div className="bg-red-600 text-white px-2 py-1 lg:px-4 lg:py-2 rounded-xl font-bold text-[10px] lg:text-sm shadow-xl">
                      <div className="text-[8px] lg:text-xs uppercase tracking-wide">Save</div>
                      <div className="text-sm lg:text-lg leading-none">{product.discount}%</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <div className="p-2.5 lg:p-5">
                {/* Title with NEW badge */}
                <div className="flex items-start justify-between gap-1 lg:gap-2 mb-2 lg:mb-3">
                  <Link href={`/products/${product._id}`}>
                    <h3 className="text-xs lg:text-base font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors duration-300 cursor-pointer flex-1">
                      {product.title}
                    </h3>
                  </Link>
                  <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-1.5 py-0.5 lg:px-2 lg:py-1 rounded-full text-[9px] lg:text-xs font-bold shadow-sm flex-shrink-0">
                    NEW
                  </div>
                </div>

                {/* Price and Rating */}
                <div className="flex items-start justify-between mb-2 lg:mb-4">
                  <div>
                    <div className="flex items-baseline gap-1 lg:gap-2 mb-0.5 lg:mb-1">
                      <span className="text-base lg:text-2xl font-black text-gray-900">
                        ৳{product.finalPrice.toLocaleString()}
                      </span>
                      {product.discount > 0 && (
                        <span className="text-[10px] lg:text-sm line-through text-gray-400 font-medium">
                          ৳{product.price.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[9px] lg:text-xs text-gray-500">
                      ({product.reviews} reviews)
                    </div>
                  </div>
                </div>

                {/* Sold Count */}
                <div className="flex items-center justify-between mb-2 lg:mb-4 pb-2 lg:pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-1 lg:gap-2">
                    <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-[9px] lg:text-xs font-semibold text-gray-600">
                      {product.sold}+ sold
                    </span>
                  </div>
                  <span className="text-[9px] lg:text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 lg:px-2.5 lg:py-1 rounded-full">
                    In Stock
                  </span>
                </div>

                {/* Buttons */}
                <div className="grid grid-cols-2 gap-1.5 lg:gap-2">
                  <Link href={`/products/${product._id}`} className="flex-1">
                    <button className="w-full bg-white border-2 border-red-600 text-red-600 py-1.5 lg:py-3 rounded-xl font-bold text-[10px] lg:text-sm hover:bg-red-50 transition-all duration-300">
                      <span className="lg:hidden">View</span>
                      <span className="hidden lg:inline">View Details</span>
                    </button>
                  </Link>
                  <CartButton 
                    product={product}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            {/* Floating New Badge - Hidden on mobile */}
            <div className="hidden lg:block absolute -bottom-3 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <div className="bg-white rounded-full px-4 py-2 shadow-lg border border-green-100">
                <div className="flex items-center gap-2 text-xs">
                  <FaStar className="text-green-500" />
                  <span className="font-semibold text-gray-700">Just Added</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Professional CTA Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 shadow-sm">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-32 h-32 bg-red-500 rounded-full -translate-x-16 -translate-y-16"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-red-500 rounded-full translate-x-20 translate-y-20"></div>
          <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-red-500 rounded-full transform -translate-y-1/2"></div>
        </div>

        <div className="relative p-8 lg:p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Stay Ahead of Fashion
            </h3>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Be the first to discover our complete collection of new arrivals and trending styles
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/products"
                className="group inline-flex items-center gap-3 bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View All New Arrivals
                <FaArrowRight className="text-lg group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              
              <div className="flex items-center gap-3 text-gray-600">
                <div className="flex -space-x-2">
                  <div className="w-10 h-10 bg-green-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="w-10 h-10 bg-red-500 rounded-full border-2 border-white shadow-lg"></div>
                  <div className="w-10 h-10 bg-blue-500 rounded-full border-2 border-white shadow-lg"></div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-gray-900">Weekly</div>
                  <div className="text-sm">New Drops</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;