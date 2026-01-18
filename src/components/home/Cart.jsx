"use client";

import { useMemo, useState } from "react";
import CartItem from "../Cards/CartItem";
import Link from "next/link";
import { HiOutlineCreditCard, HiOutlineShieldCheck } from "react-icons/hi2";
import { FiTruck } from "react-icons/fi";

const Cart = ({ cartItem = [] }) => {
  const [items, setItems] = useState(cartItem);

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const removeItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item._id != id));
  };

  const updateQuantity = (id, q) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item._id == id ? { ...item, quantity: q } : item
      )
    );
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
      {/* LEFT : CART ITEMS */}
      <div className="xl:col-span-2 space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Cart Items</h2>
          <span className="text-xs sm:text-sm text-gray-600">{totalItems} items</span>
        </div>
        
        <div className="space-y-3 sm:space-y-4">
          {items.map((item) => (
            <CartItem
              key={item._id.toString()}
              item={{ ...item, _id: item._id.toString() }}
              removeItem={removeItem}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>
      </div>

      {/* RIGHT : SUMMARY CARD */}
      <div className="xl:col-span-1">
        <div className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 sticky top-4">
          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Order Summary</h2>

          {/* Order Details */}
          <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
            {items.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-start text-xs sm:text-sm"
              >
                <div className="flex-1 pr-3 sm:pr-4">
                  <p className="font-medium text-gray-900 line-clamp-2 text-xs sm:text-sm">{item.title}</p>
                  <p className="text-gray-500 mt-1 text-xs">
                    Qty: {item.quantity} × ৳{item.price}
                  </p>
                </div>
                <p className="font-semibold text-gray-900 text-xs sm:text-sm">৳{item.price * item.quantity}</p>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-3 sm:pt-4 mb-4 sm:mb-6">
            <div className="space-y-2 sm:space-y-3">
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="font-medium">৳{totalPrice}</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium text-xs sm:text-sm">Calculated at checkout</span>
              </div>
              <div className="border-t border-gray-200 pt-2 sm:pt-3">
                <div className="flex justify-between">
                  <span className="text-base sm:text-lg font-semibold text-gray-900">Total</span>
                  <span className="text-base sm:text-lg font-bold text-gray-900">৳{totalPrice}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <Link
            href="/checkout"
            className={`w-full flex items-center justify-center gap-2 py-2.5 sm:py-3 px-4 rounded-lg font-medium transition-colors text-sm sm:text-base ${
              items.length > 0
                ? 'bg-primary hover:bg-primary/90 text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
            onClick={(e) => items.length === 0 && e.preventDefault()}
          >
            <HiOutlineCreditCard className="w-4 h-4 sm:w-5 sm:h-5" />
            Proceed to Checkout
          </Link>

          {/* Trust Badges */}
          <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-gray-200">
            <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-gray-600">
              <div className="flex items-center gap-2 sm:gap-3">
                <HiOutlineShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 shrink-0" />
                <span>Secure checkout</span>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <FiTruck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 shrink-0" />
                <span>Free shipping on orders over ৳5000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;