"use client";
import { handleCart } from "@/actions/server/cart";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaShoppingCart, FaSpinner } from "react-icons/fa";
import Swal from "sweetalert2";

const CartButton = ({ product, disabled = false, className = "" }) => {
  const { data: session, status } = useSession();
  const path = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const islogin = status === "authenticated";

  const handleAdd2Cart = async () => {
    setIsLoading(true);
    
    if (islogin) {
      const result = await handleCart(product._id);
      
      if (result.success) {
        const swalResult = await Swal.fire({
          title: 'Added to Cart!',
          text: `${product.title} has been added to your cart.`,
          icon: 'success',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#6b7280',
          confirmButtonText: 'Go to Cart',
          cancelButtonText: 'Continue Shopping',
          allowOutsideClick: true,
          allowEscapeKey: true,
          reverseButtons: false
        });
        
        if (swalResult.isConfirmed) {
          router.push("/cart");
        }
        // If user clicks "Continue Shopping" or dismisses the dialog, do nothing (stay on current page)
      } else {
        Swal.fire({
          title: 'Error!',
          text: 'Something went wrong. Please try again.',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      }
      setIsLoading(false);
    } else {
      router.push(`/login?callbackUrl=${path}`);
      setIsLoading(false);
    }
  };

  const getButtonContent = () => {
    if (status === "loading" || isLoading) {
      return (
        <>
          <FaSpinner className="text-lg animate-spin" />
          <span className="hidden lg:inline">Adding...</span>
          <span className="lg:hidden">...</span>
        </>
      );
    }
    
    if (disabled) {
      return (
        <>
          <FaShoppingCart className="text-lg opacity-50" />
          <span className="hidden lg:inline">Out of Stock</span>
          <span className="lg:hidden">Out</span>
        </>
      );
    }
    
    return (
      <>
        <FaShoppingCart className="text-lg" />
        <span className="hidden lg:inline">Add to Cart</span>
        <span className="lg:hidden">Add</span>
      </>
    );
  };

  const getButtonStyles = () => {
    if (disabled) {
      return "bg-gray-400 cursor-not-allowed";
    }
    
    return "bg-red-600 hover:bg-red-700 transform hover:scale-[1.02] active:scale-[0.98]";
  };

  // Prevent hydration mismatch by showing loading state
  if (status === "loading") {
    return (
      <button
        disabled
        className={`${className} bg-gray-200 animate-pulse text-transparent py-1.5 lg:py-4 rounded-xl font-bold text-base flex items-center justify-center gap-3 transition-all duration-300 shadow-lg`}
      >
        <FaShoppingCart className="text-lg" />
        <span className="hidden lg:inline">Add to Cart</span>
        <span className="lg:hidden">Add</span>
      </button>
    );
  }

  return (
    <button
      disabled={status === "loading" || isLoading || disabled}
      onClick={handleAdd2Cart}
      className={`w-full bg-gradient-to-r from-red-600 to-red-500 text-white py-1.5 lg:py-3 rounded-xl font-bold text-[10px] lg:text-sm flex items-center justify-center gap-2 hover:from-red-700 hover:to-red-600 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-lg disabled:transform-none disabled:shadow-md disabled:opacity-50`}
    >
      {getButtonContent()}
    </button>
  );
};

export default CartButton;