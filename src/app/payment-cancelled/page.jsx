"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { HiXCircle, HiArrowLeft } from 'react-icons/hi2';
import { FiShoppingCart, FiHelpCircle } from 'react-icons/fi';
import Link from 'next/link';

function PaymentCancelledContent() {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center p-4">
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }
        
        @keyframes shake {
          0%, 100% {
            transform: translateX(0);
          }
          10%, 30%, 50%, 70%, 90% {
            transform: translateX(-5px);
          }
          20%, 40%, 60%, 80% {
            transform: translateX(5px);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>

      <div className={`max-w-2xl w-full transition-all duration-500 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Cancelled Header */}
          <div className="bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 p-8 relative overflow-hidden">
            <div className="absolute inset-0 bg-white opacity-10"></div>
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="relative animate-scaleIn animate-shake">
                  <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 animate-pulse"></div>
                  <div className="relative bg-white rounded-full p-4">
                    <HiXCircle className="w-20 h-20 text-red-500" strokeWidth={2} />
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                Payment Cancelled
              </h1>
              <p className="text-red-50 text-lg">
                Your order was not completed
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="p-8 md:p-12">
            <div className="space-y-6">
              {/* Message */}
              <div className="text-center space-y-3">
                <p className="text-gray-600 text-lg leading-relaxed">
                  Your payment was cancelled. No charges have been made to your account.
                </p>
                <p className="text-gray-500 text-base">
                  You can try again anytime to complete your purchase.
                </p>
              </div>

              {/* Info Box */}
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                      <FiHelpCircle className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Why was my payment cancelled?</h3>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• You clicked the back button during checkout</li>
                      <li>• Payment window was closed before completion</li>
                      <li>• Session timed out</li>
                      <li>• You chose to cancel the transaction</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Your Cart is Safe */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                      <FiShoppingCart className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Your cart is safe!</h3>
                    <p className="text-gray-600 text-sm">
                      Don&apos;t worry, all items are still in your cart. You can review and try checking out again whenever you&apos;re ready.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/cart"
                  className="flex-1 bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600 text-white py-4 rounded-xl font-semibold text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                >
                  <HiArrowLeft className="w-5 h-5" />
                  Return to Cart
                </Link>
                <Link
                  href="/products"
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-900 py-4 rounded-xl font-semibold text-center transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Support Section */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-2">
                  Having trouble with payment?
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                  <a 
                    href="mailto:support@orvella.com" 
                    className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    <FiHelpCircle className="w-4 h-4" />
                    Contact Support
                  </a>
                  <span className="hidden sm:inline text-gray-300">|</span>
                  <Link 
                    href="/faq" 
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    View FAQs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCancelled() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    }>
      <PaymentCancelledContent />
    </Suspense>
  );
}
