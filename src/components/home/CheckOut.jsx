"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { 
  HiOutlineCreditCard, 
  HiOutlineShieldCheck, 
  HiOutlineTruck,
  HiOutlineMapPin,
  HiOutlinePhone,
  HiOutlineEnvelope,
  HiOutlineUser,
  HiOutlineGift,
  HiOutlineStar,
  HiOutlineCheckCircle
} from 'react-icons/hi2';
import { FiEdit3, FiClock, FiAward } from 'react-icons/fi';
import { createOrder } from '@/actions/server/order';
import Swal from 'sweetalert2';

const CheckOut = ({ cartItems = [] }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'cod',
    specialInstructions: ''
  });

  const [isProcessing, setIsProcessing] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const [isLoadingStripe, setIsLoadingStripe] = useState(false);

  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  const subtotal = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cartItems]
  );

  const shippingCost = subtotal >= 5000 ? 0 : 100;
  const discount = subtotal >= 10000 ? Math.floor(subtotal * 0.05) : 0;
  const total = subtotal + shippingCost - discount;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      // Validate required fields
      const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city'];
      const missingFields = requiredFields.filter(field => !formData[field].trim());
      
      if (missingFields.length > 0) {
        Swal.fire({
          title: 'Missing Information',
          text: 'Please fill in all required fields.',
          icon: 'warning',
          confirmButtonColor: '#ef4444'
        });
        setIsProcessing(false);
        return;
      }

      // Handle Stripe payment - DO NOT create order yet
      if (formData.paymentMethod === 'stripe') {
        setIsLoadingStripe(true);
        
        try {
          const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              items: cartItems,
              customerEmail: formData.email.trim(),
              customerName: `${formData.firstName.trim()} ${formData.lastName.trim()}`,
              totalAmount: total,
              shippingDetails: {
                firstName: formData.firstName.trim(),
                lastName: formData.lastName.trim(),
                phone: formData.phone.trim(),
                address: formData.address.trim(),
                city: formData.city.trim(),
                postalCode: formData.postalCode.trim(),
                specialInstructions: formData.specialInstructions.trim(),
              }
            }),
          });

          const data = await response.json();

          if (data.url) {
            // Redirect to Stripe checkout - order will be created after successful payment
            window.location.href = data.url;
            return;
          } else {
            throw new Error('Failed to create checkout session');
          }
        } catch (error) {
          console.error('Stripe error:', error);
          Swal.fire({
            title: 'Payment Error',
            text: 'Failed to initialize payment. Please try again.',
            icon: 'error',
            confirmButtonColor: '#ef4444'
          });
          setIsLoadingStripe(false);
          setIsProcessing(false);
          return;
        }
      }

      // Handle COD payment - Create order immediately
      const orderPayload = {
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        postalCode: formData.postalCode.trim(),
        paymentMethod: 'cod',
        specialInstructions: formData.specialInstructions.trim(),
      };

      // Call server action to create order
      const result = await createOrder(orderPayload);

      if (result.success) {
        Swal.fire({
          title: '🎉 Order Confirmed!',
          html: `
            <div class="text-center space-y-4">
              <div class="text-6xl">✅</div>
              <p class="text-lg font-semibold">Your order has been confirmed!</p>
              <p class="text-gray-600">Order ID: #${result.orderId.slice(-8).toUpperCase()}</p>
              <p class="text-sm text-gray-500">We&apos;ll process and ship your order within 24 hours.</p>
              <p class="text-sm text-blue-600">A confirmation email has been sent to ${formData.email}</p>
            </div>
          `,
          icon: 'success',
          confirmButtonColor: '#ef4444',
          confirmButtonText: 'Continue Shopping',
          showCancelButton: true,
          cancelButtonText: 'View Orders',
          customClass: {
            popup: 'rounded-2xl',
            confirmButton: 'rounded-xl px-6 py-3',
            cancelButton: 'rounded-xl px-6 py-3'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/products';
          } else if (result.dismiss === Swal.DismissReason.cancel) {
            window.location.href = '/my-orders';
          }
        });
      } else {
        Swal.fire({
          title: 'Order Failed',
          text: result.message || 'Something went wrong while processing your order. Please try again.',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      }
    } catch (error) {
      console.error('Order submission error:', error);
      Swal.fire({
        title: 'Error',
        text: 'An unexpected error occurred. Please try again.',
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsProcessing(false);
      setIsLoadingStripe(false);
    }
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
      {/* Left Side - Checkout Form */}
      <div className="xl:col-span-2 space-y-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  activeStep >= step 
                    ? 'bg-primary text-white shadow-lg' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {activeStep > step ? '✓' : step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${
                    activeStep > step ? 'bg-primary' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-sm text-gray-600">
            Step {activeStep} of 3
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary/10 rounded-xl">
                <HiOutlineUser className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Contact Information</h2>
                <p className="text-gray-600 text-sm">We&apos;ll use this to contact you about your order</p>
              </div>
            </div>
            <button 
              onClick={() => setActiveStep(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <FiEdit3 className="w-4 h-4 text-gray-500" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                First Name *
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white"
                placeholder="Enter your first name"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Last Name *
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white"
                placeholder="Enter your last name"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Email Address *
              </label>
              <div className="relative">
                <HiOutlineEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Phone Number *
              </label>
              <div className="relative">
                <HiOutlinePhone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white"
                  placeholder="+880 1700-000000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <HiOutlineMapPin className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Delivery Address</h2>
                <p className="text-gray-600 text-sm">Where should we deliver your order?</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 px-3 py-1 rounded-full">
              <HiOutlineTruck className="w-4 h-4" />
              <span className="font-medium">Free Delivery</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Street Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white"
                placeholder="House/Flat no, Street name, Area"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white"
                  placeholder="Enter your city"
                />
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">
                  Postal Code
                </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white"
                  placeholder="Enter postal code"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">
                Special Instructions (Optional)
              </label>
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all duration-200 bg-white resize-none"
                placeholder="Any special delivery instructions..."
              />
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <HiOutlineCreditCard className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              <p className="text-gray-600 text-sm">Choose your preferred payment option</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center p-4 border-2 border-gray-200 hover:border-primary/50 rounded-xl cursor-pointer transition-all duration-200">
              <input
                type="radio"
                name="paymentMethod"
                value="cod"
                checked={formData.paymentMethod === 'cod'}
                onChange={handleInputChange}
                className="w-5 h-5 text-primary focus:ring-primary"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <HiOutlineGift className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Cash on Delivery</span>
                      <p className="text-sm text-gray-600 mt-1">
                        Pay with cash when your order arrives at your doorstep
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      Popular
                    </span>
                  </div>
                </div>
              </div>
            </label>
            
            <label className="flex items-center p-4 border-2 border-gray-200 hover:border-blue-500/50 rounded-xl cursor-pointer transition-all duration-200">
              <input
                type="radio"
                name="paymentMethod"
                value="stripe"
                checked={formData.paymentMethod === 'stripe'}
                onChange={handleInputChange}
                className="w-5 h-5 text-blue-500 focus:ring-blue-500"
              />
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/10 rounded-lg">
                      <HiOutlineCreditCard className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                      <span className="font-bold text-gray-900">Card Payment (Stripe)</span>
                      <p className="text-sm text-gray-600 mt-1">
                        Pay securely with Credit/Debit Card via Stripe
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-medium text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                      Secure
                    </span>
                  </div>
                </div>
              </div>
            </label>
          </div>
        </div>
      </div>

      {/* Right Side - Order Summary */}
      <div className="xl:col-span-1 space-y-6">
        {/* Order Items */}
        <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 sticky top-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
            <div className="flex items-center gap-2 text-sm text-primary bg-primary/10 px-3 py-1 rounded-full">
              <HiOutlineStar className="w-4 h-4" />
              <span className="font-medium">{totalItems} items</span>
            </div>
          </div>
          
          <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item._id} className="flex items-center gap-4 p-3 bg-white rounded-xl border border-gray-100 hover:shadow-md transition-all duration-200">
                <div className="w-16 h-16 relative shrink-0">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="64px"
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {item.quantity}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 line-clamp-2 text-sm mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600">
                    ৳{item.price} × {item.quantity}
                  </p>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-sm">
                    ৳{(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Totals */}
          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal ({totalItems} items)</span>
              <span className="font-semibold">৳{subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Shipping</span>
              <span className={`font-semibold ${shippingCost === 0 ? 'text-green-600' : ''}`}>
                {shippingCost === 0 ? 'Free' : `৳${shippingCost}`}
              </span>
            </div>

            {discount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Discount (5%)</span>
                <span className="font-semibold text-green-600">-৳{discount.toFixed(2)}</span>
              </div>
            )}
            
            {subtotal < 5000 && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-700 font-medium">
                  💡 Add ৳{(5000 - subtotal).toFixed(2)} more for free shipping!
                </p>
              </div>
            )}

            {subtotal >= 10000 && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                <p className="text-xs text-green-700 font-medium">
                  🎉 You saved ৳{discount.toFixed(2)} with our bulk discount!
                </p>
              </div>
            )}
            
            <div className="border-t border-gray-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary">৳{total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Place Order Button */}
          <form onSubmit={handleSubmit} className="mt-6">
            <button
              type="submit"
              disabled={isProcessing || isLoadingStripe}
              className="w-full bg-gradient-to-r from-primary to-red-600 hover:from-red-600 hover:to-primary text-white py-4 rounded-2xl font-bold text-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLoadingStripe ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Redirecting to Payment...
                </>
              ) : isProcessing ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Processing Order...
                </>
              ) : (
                <>
                  <HiOutlineCheckCircle className="w-6 h-6" />
                  {formData.paymentMethod === 'stripe' ? 'Proceed to Payment' : `Place Order - ৳${total.toFixed(2)}`}
                </>
              )}
            </button>
          </form>

          {/* Trust Badges */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-green-100 rounded-lg">
                  <HiOutlineShieldCheck className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Secure Checkout</span>
                  <p className="text-xs text-gray-600">SSL encrypted & protected</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiClock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Fast Delivery</span>
                  <p className="text-xs text-gray-600">2-5 business days nationwide</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <FiAward className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <span className="font-semibold text-gray-900">Quality Guarantee</span>
                  <p className="text-xs text-gray-600">7-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;