import { getCart } from "@/actions/server/cart";
import Cart from "@/components/home/Cart";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { FiArrowLeft } from "react-icons/fi";
import React from "react";
import Link from "next/link";

const CartPage = async () => {
  const cartItems = await getCart();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
            <Link 
              href="/products" 
              className="flex items-center gap-1 sm:gap-2 text-gray-600 hover:text-gray-900 transition-colors text-sm sm:text-base"
            >
              <FiArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden sm:inline">Continue Shopping</span>
              <span className="sm:hidden">Back</span>
            </Link>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <HiOutlineShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
            </div>
            {cartItems.length > 0 && (
              <span className="bg-primary text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium self-start sm:self-auto">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </div>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-12">
            <div className="text-center space-y-4 sm:space-y-6">
              <div className="w-16 h-16 sm:w-24 sm:h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                <HiOutlineShoppingBag className="w-8 h-8 sm:w-12 sm:h-12 text-gray-400" />
              </div>
              
              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  Your cart is empty
                </h2>
                <p className="text-gray-600 max-w-md mx-auto text-sm sm:text-base">
                  Looks like you haven&apos;t added any items to your cart yet. 
                  Start shopping to fill it up!
                </p>
              </div>
              
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                <HiOutlineShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                Start Shopping
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-200 p-4 sm:p-6">
            <Cart cartItem={cartItems} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;