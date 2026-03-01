"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { HiCheckCircle, HiSparkles } from 'react-icons/hi2';
import { FiPackage, FiMail } from 'react-icons/fi';
import Link from 'next/link';

function PaymentSuccessContent() {
  const [isVisible, setIsVisible] = useState(false);
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentData, setPaymentData] = useState(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const verifyPayment = async () => {
      if (!sessionId) {
        router.push('/cart');
        return;
      }

      try {
        const response = await fetch(`/api/verify-payment?session_id=${sessionId}`, {
          method: 'POST',
        });

        const data = await response.json();
        
        if (data.success || data.message === 'Payment already processed') {
          setPaymentData(data);
        }
      } catch (error) {
        console.error('Payment verification error:', error);
      } finally {
        setIsProcessing(false);
      }
    };

    verifyPayment();
  }, [sessionId, router]);

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Verifying your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
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
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .shimmer {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0) 0%,
            rgba(255, 255, 255, 0.8) 50%,
            rgba(255, 255, 255, 0) 100%
          );
          background-size: 1000px 100%;
          animation: shimmer 2s infinite;
        }
      `}</style>

      <div className={`max-w-2xl w-full transition-all duration-500 ${isVisible ? 'animate-fadeInUp' : 'opacity-0'}`}>
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Success Header with Gradient */}
          <div className="bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 p-8 relative overflow-hidden">
            <div className="absolute inset-0 shimmer opacity-30"></div>
            <div className="relative z-10 text-center">
              <div className="flex justify-center mb-4">
                <div className="relative animate-scaleIn">
                  <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-40 animate-pulse"></div>
                  <div className="relative bg-white rounded-full p-4">
                    <HiCheckCircle className="w-20 h-20 text-green-500" strokeWidth={2} />
                  </div>
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 drop-shadow-lg">
                Payment Successful!
              </h1>
              <p className="text-green-50 text-lg">
                Your order has been confirmed
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div className="p-8 md:p-12">
            <div className="space-y-6">
              {/* Success Message */}
              <div className="text-center space-y-3">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full">
                  <HiSparkles className="w-5 h-5" />
                  <span className="font-semibold">Thank you for your purchase!</span>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed max-w-md mx-auto">
                  Your payment has been processed successfully. We&apos;re preparing your order for shipment.
                </p>
              </div>

              {/* Transaction Info */}
              {paymentData?.transactionId && (
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-gray-600">Transaction ID</span>
                    <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
                      Paid
                    </span>
                  </div>
                  <p className="text-gray-900 font-mono text-sm break-all bg-white px-4 py-3 rounded-lg border border-gray-200">
                    {paymentData.transactionId}
                  </p>
                </div>
              )}

              {/* What's Next Section */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <HiSparkles className="w-5 h-5 text-blue-500" />
                  What happens next?
                </h3>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                        <FiMail className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Order Confirmation Email</h4>
                      <p className="text-gray-600 text-sm">
                        You&apos;ll receive a confirmation email with your order details shortly.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                        <FiPackage className="w-5 h-5 text-white" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Order Processing</h4>
                      <p className="text-gray-600 text-sm">
                        We&apos;ll process and ship your order within 24-48 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Link
                  href="/my-orders"
                  className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-4 rounded-xl font-semibold text-center transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  View My Orders
                </Link>
                <Link
                  href="/products"
                  className="flex-1 bg-white hover:bg-gray-50 text-gray-900 py-4 rounded-xl font-semibold text-center transition-all duration-300 border-2 border-gray-200 hover:border-gray-300"
                >
                  Continue Shopping
                </Link>
              </div>

              {/* Support Note */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Need help? Contact us at{' '}
                  <a href="mailto:support@orvella.com" className="text-green-600 hover:text-green-700 font-medium">
                    support@orvella.com
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading...</p>
        </div>
      </div>
    }>
      <PaymentSuccessContent />
    </Suspense>
  );
}
