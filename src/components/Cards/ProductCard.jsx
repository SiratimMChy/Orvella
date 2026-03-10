"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import CartButton from "../Links/CartButton";

const ProductCard = ({ product }) => {
  const {
    _id,
    title,
    image,
    reviews,
    price,
    finalPrice,
    discount,
    sold,
  } = product;

  return (
    <div className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 overflow-hidden">
      {/* Product Image */}
      <div className="relative h-32 lg:h-56 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={image}
          alt={title}
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
        {discount > 0 && (
          <div className="absolute top-2 left-2 lg:top-4 lg:left-4 z-10">
            <div className="bg-red-600 text-white px-2 py-1 lg:px-4 lg:py-2 rounded-xl font-bold text-[10px] lg:text-sm shadow-xl">
              <div className="text-[8px] lg:text-xs uppercase tracking-wide">Save</div>
              <div className="text-sm lg:text-lg leading-none">{discount}%</div>
            </div>
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-2.5 lg:p-5">
        {/* Title */}
        <div className="flex items-start justify-between gap-1 lg:gap-2 mb-2 lg:mb-3">
          <Link href={`/products/${_id}`}>
            <h3 className="text-xs lg:text-base font-bold text-gray-900 line-clamp-2 leading-tight group-hover:text-red-600 transition-colors duration-300 cursor-pointer flex-1">
              {title}
            </h3>
          </Link>
        </div>

        {/* Price and Rating */}
        <div className="flex items-start justify-between mb-2 lg:mb-4">
          <div>
            <div className="flex items-baseline gap-1 lg:gap-2 mb-0.5 lg:mb-1">
              <span className="text-base lg:text-2xl font-black text-gray-900">
                ৳{finalPrice.toLocaleString()}
              </span>
              {discount > 0 && (
                <span className="text-[10px] lg:text-sm line-through text-gray-400 font-medium">
                  ৳{price.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[9px] lg:text-xs text-gray-500">
              ({reviews} reviews)
            </div>
          </div>
        </div>

        {/* Sold Count */}
        <div className="flex items-center justify-between mb-2 lg:mb-4 pb-2 lg:pb-4 border-b border-gray-100">
          <div className="flex items-center gap-1 lg:gap-2">
            <div className="w-1.5 h-1.5 lg:w-2 lg:h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[9px] lg:text-xs font-semibold text-gray-600">
              {sold}+ sold
            </span>
          </div>
          <span className="text-[9px] lg:text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 lg:px-2.5 lg:py-1 rounded-full">
            In Stock
          </span>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-1.5 lg:gap-2">
          <Link href={`/products/${_id}`} className="flex-1">
            <button className="w-full bg-white border-2 border-red-600 text-red-600 py-1.5 lg:py-3 rounded-xl font-bold text-[10px] lg:text-sm hover:bg-red-50 transition-all duration-300">
              <span className="lg:hidden">View</span>
              <span className="hidden lg:inline">View Details</span>
            </button>
          </Link>
          <CartButton product={product} className="flex-1" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
