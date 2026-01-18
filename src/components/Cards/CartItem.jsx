"use client";

import {
  decreaseItemDb,
  deleteItemsFromCart,
  increaseItemDb,
} from "@/actions/server/cart";
import Image from "next/image";
import { useState } from "react";
import { HiPlus, HiMinus, HiTrash } from "react-icons/hi2";
import Swal from "sweetalert2";

const CartItem = ({ item, removeItem, updateQuantity }) => {
  const { title, image, quantity, price, _id } = item;

  const [loading, setLoading] = useState(false);

  const handleDeleteCart = async () => {
    setLoading(true);
    Swal.fire({
      title: "Remove item?",
      text: "This item will be removed from your cart",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it",
      cancelButtonText: "Cancel"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const result = await deleteItemsFromCart(_id);

        if (result.success) {
          removeItem(_id);

          Swal.fire({
            title: "Removed!",
            text: "Item has been removed from your cart",
            icon: "success",
            timer: 2000,
            showConfirmButton: false
          });
        } else {
          Swal.fire({
            title: "Error!",
            text: "Something went wrong. Please try again.",
            icon: "error",
          });
        }
      }
      setLoading(false);
    });
  };

  const onIncrease = async () => {
    setLoading(true);
    const result = await increaseItemDb(_id, quantity);

    if (result.success) {
      updateQuantity(_id, quantity + 1);
    } else {
      Swal.fire({
        title: "Error!",
        text: "Could not update quantity",
        icon: "error",
      });
    }
    setLoading(false);
  };

  const onDecrease = async () => {
    setLoading(true);
    const result = await decreaseItemDb(_id, quantity);
    if (result.success) {
      updateQuantity(_id, quantity - 1);
    } else {
      Swal.fire({
        title: "Error!",
        text: "Could not update quantity",
        icon: "error",
      });
    }
    setLoading(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg sm:rounded-xl p-3 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3 sm:gap-4">
        {/* Product Image */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 relative shrink-0">
          <Image
            src={image}
            alt={title}
            fill
            sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
            className="object-cover rounded-md sm:rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base md:text-lg mb-1 sm:mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 mb-2 sm:mb-4 text-xs sm:text-sm">
            <span className="font-medium">৳{price}</span> each
          </p>

          {/* Quantity Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
            <span className="text-xs sm:text-sm font-medium text-gray-700">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md sm:rounded-lg w-fit">
              <button
                className="p-1.5 sm:p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                onClick={onDecrease}
                disabled={quantity === 1 || loading}
              >
                <HiMinus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>

              <span className="px-2 sm:px-4 py-1.5 sm:py-2 font-medium min-w-8 sm:min-w-12 text-center text-sm">
                {quantity}
              </span>

              <button
                className="p-1.5 sm:p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                disabled={quantity === 10 || loading}
                onClick={onIncrease}
              >
                <HiPlus className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Price and Remove - Mobile Layout */}
        <div className="flex flex-col items-end gap-2 sm:hidden shrink-0">
          <div className="text-right">
            <p className="text-xs text-gray-600">Total</p>
            <p className="text-sm font-bold text-gray-900">
              ৳{(price * quantity).toFixed(2)}
            </p>
          </div>

          <button
            onClick={handleDeleteCart}
            disabled={loading}
            className="flex items-center gap-1 text-red-600 hover:text-red-700 hover:bg-red-50 px-2 py-1 rounded-md transition-colors disabled:opacity-50 text-xs"
          >
            <HiTrash className="w-3 h-3" />
            <span className="font-medium">Remove</span>
          </button>
        </div>

        {/* Price and Remove - Desktop Layout */}
        <div className="hidden sm:flex flex-col items-end gap-3 sm:gap-4 shrink-0">
          <div className="text-right">
            <p className="text-xs sm:text-sm text-gray-600">Total</p>
            <p className="text-lg sm:text-xl font-bold text-gray-900">
              ৳{(price * quantity).toFixed(2)}
            </p>
          </div>

          <button
            onClick={handleDeleteCart}
            disabled={loading}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-2 sm:px-3 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-colors disabled:opacity-50 text-xs sm:text-sm"
          >
            <HiTrash className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="font-medium">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;