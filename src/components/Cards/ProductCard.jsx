import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt, FaRegStar, FaEye, FaHeart } from "react-icons/fa";
import CartButton from "../Links/CartButton";

const ProductCard = ({ product }) => {
  const {
    _id,
    title,
    image,
    ratings,
    reviews,
    price,
    finalPrice,
    discount,
    sold,
    brand,
  } = product;

  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
    
      <div className="relative h-40 lg:h-72 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
       
        {discount > 0 && (
          <div className="absolute top-2 left-2 lg:top-4 lg:left-4 z-10">
            <div className="relative">
              <div className="bg-red-600 text-white px-2 py-1 lg:px-4 lg:py-2 rounded-xl font-bold text-[10px] lg:text-sm shadow-xl">
                <div className="text-[8px] lg:text-xs uppercase tracking-wide">Save</div>
                <div className="text-sm lg:text-lg leading-none">{discount}%</div>
              </div>
            </div>
          </div>
        )}
        
        
        <div className="absolute top-2 right-2 lg:top-4 lg:right-4 z-10 flex flex-col gap-1 lg:gap-2">
          <button className="w-7 h-7 lg:w-11 lg:h-11 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-12 group-hover:translate-x-0 transition-all duration-300 hover:bg-red-500 hover:text-white hover:scale-110">
            <FaHeart className="text-xs lg:text-base" />
          </button>
          <Link href={`/products/${_id}`}>
            <button className="w-7 h-7 lg:w-11 lg:h-11 bg-white rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transform translate-x-12 group-hover:translate-x-0 transition-all duration-500 delay-75 hover:bg-red-500 hover:text-white hover:scale-110">
              <FaEye className="text-xs lg:text-base" />
            </button>
          </Link>
        </div>
        
     
        {brand && (
          <div className="absolute bottom-2 left-2 lg:bottom-4 lg:left-4 bg-white/95 backdrop-blur-sm px-2 py-1 lg:px-3 lg:py-1.5 rounded-full text-[9px] lg:text-xs font-semibold text-gray-700 shadow-md">
            {brand}
          </div>
        )}
      </div>

     
      <div className="p-2.5 lg:p-5">
       
        <Link href={`/products/${_id}`}>
          <h3 className="text-xs lg:text-base font-bold text-gray-900 line-clamp-2 mb-2 lg:mb-3 min-h-[32px] lg:min-h-[48px] leading-tight group-hover:text-red-600 transition-colors duration-300 cursor-pointer">
            {title}
          </h3>
        </Link>

      
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
            {discount > 0 && (
              <span className="text-[9px] lg:text-xs font-semibold text-green-600">
                Save ৳{(price - finalPrice).toLocaleString()}
              </span>
            )}
          </div>

         
          <div className="flex flex-col items-end">
            <div className="flex items-center gap-0.5 mb-0.5 lg:mb-1">
              {[...Array(5)].map((_, i) => {
                const starValue = i + 1;
                if (ratings >= starValue) {
                  return <FaStar key={i} className="text-[10px] lg:text-sm text-amber-400" />;
                } else if (ratings >= starValue - 0.5) {
                  return <FaStarHalfAlt key={i} className="text-[10px] lg:text-sm text-amber-400" />;
                } else {
                  return <FaRegStar key={i} className="text-[10px] lg:text-sm text-gray-300" />;
                }
              })}
            </div>
            <span className="text-[9px] lg:text-xs text-gray-500">
              ({reviews})
            </span>
          </div>
        </div>

       
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
            <button className="w-full bg-white border-2 border-red-600 text-red-600 py-1.5 lg:py-3 rounded-xl font-bold text-[10px] lg:text-sm flex items-center justify-center gap-1 lg:gap-2 hover:bg-red-50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">
              <FaEye className="text-base hidden lg:inline" />
              <span className="lg:hidden">View</span>
              <span className="hidden lg:inline">View Details</span>
            </button>
          </Link>
          <CartButton product={product} className="flex-1 w-full" />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
