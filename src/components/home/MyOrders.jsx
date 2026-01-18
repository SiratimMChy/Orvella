"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  HiOutlineShoppingBag, 
  HiOutlineCalendarDays,
  HiOutlineCurrencyDollar,
  HiOutlineEye,
  HiOutlinePhone,
  HiOutlineMapPin,
  HiOutlineClipboardDocumentList,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineXCircle,
  HiOutlineTruck,
  HiOutlineTrash
} from 'react-icons/hi2';
import { FiPackage, FiClock, FiCheck, FiX } from 'react-icons/fi';
import { cancelOrder, deleteOrder } from '@/actions/server/order';
import Swal from 'sweetalert2';

const MyOrders = ({ orders: initialOrders }) => {
  const [orders, setOrders] = useState(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelOrder = async (orderId, orderNumber) => {
    const result = await Swal.fire({
      title: 'Cancel Order?',
      text: `Are you sure you want to cancel order #${orderNumber}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Cancel Order',
      cancelButtonText: 'Keep Order'
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const response = await cancelOrder(orderId);
        
        if (response.success) {
          // Update the order status in local state instead of reloading
          setOrders(prevOrders => 
            prevOrders.map(order => 
              order._id === orderId 
                ? { ...order, status: 'cancelled' }
                : order
            )
          );

          // Update selected order if it's the one being cancelled
          if (selectedOrder && selectedOrder._id === orderId) {
            setSelectedOrder(prev => ({ ...prev, status: 'cancelled' }));
          }

          Swal.fire({
            title: 'Order Cancelled!',
            text: 'Your order has been successfully cancelled.',
            icon: 'success',
            confirmButtonColor: '#ef4444'
          });
        } else {
          Swal.fire({
            title: 'Cannot Cancel',
            text: response.message || 'Unable to cancel this order.',
            icon: 'error',
            confirmButtonColor: '#ef4444'
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while cancelling the order.',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleDeleteOrder = async (orderId, orderNumber) => {
    const result = await Swal.fire({
      title: 'Delete Order?',
      text: `Are you sure you want to permanently delete order #${orderNumber}? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc2626',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete Order',
      cancelButtonText: 'Keep Order'
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const response = await deleteOrder(orderId);
        
        if (response.success) {
          // Remove the order from local state instead of reloading
          setOrders(prevOrders => 
            prevOrders.filter(order => order._id !== orderId)
          );

          // Close modal if the deleted order was being viewed
          if (selectedOrder && selectedOrder._id === orderId) {
            setShowOrderDetails(false);
            setSelectedOrder(null);
          }

          Swal.fire({
            title: 'Order Deleted!',
            text: 'Your order has been permanently deleted.',
            icon: 'success',
            confirmButtonColor: '#dc2626'
          });
        } else {
          Swal.fire({
            title: 'Cannot Delete',
            text: response.message || 'Unable to delete this order.',
            icon: 'error',
            confirmButtonColor: '#dc2626'
          });
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'An error occurred while deleting the order.',
          icon: 'error',
          confirmButtonColor: '#dc2626'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'processing':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'shipped':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'delivered':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-200'; // Default to confirmed style
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return <HiOutlineClock className="w-4 h-4" />;
      case 'confirmed':
        return <HiOutlineCheckCircle className="w-4 h-4" />;
      case 'processing':
        return <FiPackage className="w-4 h-4" />;
      case 'shipped':
        return <HiOutlineTruck className="w-4 h-4" />;
      case 'delivered':
        return <FiCheck className="w-4 h-4" />;
      case 'cancelled':
        return <HiOutlineXCircle className="w-4 h-4" />;
      default:
        return <FiClock className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const closeOrderDetails = () => {
    setShowOrderDetails(false);
    setSelectedOrder(null);
  };

  if (orders.length === 0) {
    return (
      <div className="p-12 text-center">
        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-6">
          <HiOutlineShoppingBag className="w-12 h-12 text-gray-400" />
        </div>
        
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          No Orders Yet
        </h2>
        <p className="text-gray-600 max-w-md mx-auto mb-6">
          You haven't placed any orders yet. Start shopping to see your order history here!
        </p>
        
        <a
          href="/products"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium transition-colors"
        >
          <HiOutlineShoppingBag className="w-5 h-5" />
          Start Shopping
        </a>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Orders List */}
      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
          >
            {/* Order Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div className="flex items-center gap-3 mb-3 sm:mb-0">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <HiOutlineShoppingBag className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Order #{order._id.slice(-8).toUpperCase()}
                  </h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <HiOutlineCalendarDays className="w-4 h-4" />
                    {formatDate(order.createdAt)}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  {order.status || 'Confirmed'}
                </span>
                <button
                  onClick={() => handleViewOrder(order)}
                  className="flex items-center gap-1 text-primary hover:text-primary/80 font-medium text-sm"
                >
                  <HiOutlineEye className="w-4 h-4" />
                  View Details
                </button>
                {(order.status === 'confirmed' || order.status === 'pending') && (
                  <>
                    <button
                      onClick={() => handleCancelOrder(order._id, order._id.slice(-8).toUpperCase())}
                      disabled={isLoading}
                      className="flex items-center gap-1 text-red-600 hover:text-red-800 font-medium text-sm disabled:opacity-50"
                    >
                      <HiOutlineXCircle className="w-4 h-4" />
                      Cancel
                    </button>
                    <button
                      onClick={() => handleDeleteOrder(order._id, order._id.slice(-8).toUpperCase())}
                      disabled={isLoading}
                      className="flex items-center gap-1 text-red-700 hover:text-red-900 font-medium text-sm disabled:opacity-50"
                    >
                      <HiOutlineTrash className="w-4 h-4" />
                      Delete
                    </button>
                  </>
                )}
                {order.status === 'cancelled' && (
                  <button
                    onClick={() => handleDeleteOrder(order._id, order._id.slice(-8).toUpperCase())}
                    disabled={isLoading}
                    className="flex items-center gap-1 text-red-700 hover:text-red-900 font-medium text-sm disabled:opacity-50"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                    Delete
                  </button>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="flex items-center gap-2">
                <FiPackage className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">
                  {order.items.length} {order.items.length === 1 ? 'item' : 'items'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineCurrencyDollar className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-semibold text-gray-900">
                  ৳{order.totalPrice}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <HiOutlineMapPin className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600 truncate">
                  {order.address || 'Address not provided'}
                </span>
              </div>
            </div>

            {/* Order Items Preview */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {order.items.slice(0, 3).map((item, index) => (
                <div key={index} className="flex-shrink-0 flex items-center gap-2 bg-gray-50 rounded-lg p-2">
                  {item.image && (
                    <div className="w-8 h-8 relative rounded overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-gray-900 truncate max-w-24">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      Qty: {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
              {order.items.length > 3 && (
                <div className="flex-shrink-0 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                  +{order.items.length - 3} more
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Order Details Modal */}
      {showOrderDetails && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Order Details
                  </h2>
                  <p className="text-gray-600">
                    Order #{selectedOrder._id.slice(-8).toUpperCase()}
                  </p>
                </div>
                <button
                  onClick={closeOrderDetails}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <FiX className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Order Status & Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Order Status</h3>
                    <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium border ${getStatusColor(selectedOrder.status)}`}>
                      {getStatusIcon(selectedOrder.status)}
                      {selectedOrder.status || 'Pending'}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Order Date</h3>
                    <p className="text-gray-600 flex items-center gap-2">
                      <HiOutlineCalendarDays className="w-4 h-4" />
                      {formatDate(selectedOrder.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      {selectedOrder.phone && (
                        <p className="text-gray-600 flex items-center gap-2">
                          <HiOutlinePhone className="w-4 h-4" />
                          {selectedOrder.phone}
                        </p>
                      )}
                      <p className="text-gray-600 flex items-center gap-2">
                        <HiOutlineMapPin className="w-4 h-4" />
                        {selectedOrder.address || 'Address not provided'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Instructions */}
              {selectedOrder.specialInstructions && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <HiOutlineClipboardDocumentList className="w-5 h-5" />
                    Special Instructions
                  </h3>
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-yellow-800 italic">
                      "{selectedOrder.specialInstructions}"
                    </p>
                  </div>
                </div>
              )}

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <FiPackage className="w-5 h-5" />
                  Order Items ({selectedOrder.items.length})
                </h3>
                
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">Product</th>
                        <th className="px-4 py-3 text-center text-sm font-medium text-gray-900">Quantity</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Price</th>
                        <th className="px-4 py-3 text-right text-sm font-medium text-gray-900">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <div className="w-12 h-12 relative rounded-lg overflow-hidden flex-shrink-0">
                                  <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div className="min-w-0">
                                <p className="font-medium text-gray-900 truncate">
                                  {item.title}
                                </p>
                                <p className="text-sm text-gray-500">
                                  SKU: {item._id.slice(-8).toUpperCase()}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium">
                              {item.quantity}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right font-medium text-gray-900">
                            ৳{item.price}
                          </td>
                          <td className="px-4 py-4 text-right font-semibold text-gray-900">
                            ৳{(item.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-4">Order Summary</h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-gray-700">
                    <span>Subtotal</span>
                    <span>৳{selectedOrder.totalPrice}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Shipping</span>
                    <span className="text-green-600 font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>Payment Method</span>
                    <span>Cash on Delivery</span>
                  </div>
                  <div className="border-t border-green-200 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold text-green-900">
                      <span>Total Amount</span>
                      <span>৳{selectedOrder.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="flex justify-center gap-4">
                  {(selectedOrder.status === 'confirmed' || selectedOrder.status === 'pending') && (
                    <>
                      <button
                        onClick={() => {
                          closeOrderDetails();
                          handleCancelOrder(selectedOrder._id, selectedOrder._id.slice(-8).toUpperCase());
                        }}
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:bg-red-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        <HiOutlineXCircle className="w-5 h-5" />
                        {isLoading ? 'Cancelling...' : 'Cancel This Order'}
                      </button>
                      <button
                        onClick={() => {
                          closeOrderDetails();
                          handleDeleteOrder(selectedOrder._id, selectedOrder._id.slice(-8).toUpperCase());
                        }}
                        disabled={isLoading}
                        className="flex items-center gap-2 bg-red-700 hover:bg-red-800 disabled:bg-red-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                      >
                        <HiOutlineTrash className="w-5 h-5" />
                        {isLoading ? 'Deleting...' : 'Delete This Order'}
                      </button>
                    </>
                  )}
                  
                  {selectedOrder.status === 'cancelled' && (
                    <button
                      onClick={() => {
                        closeOrderDetails();
                        handleDeleteOrder(selectedOrder._id, selectedOrder._id.slice(-8).toUpperCase());
                      }}
                      disabled={isLoading}
                      className="flex items-center gap-2 bg-red-700 hover:bg-red-800 disabled:bg-red-300 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                    >
                      <HiOutlineTrash className="w-5 h-5" />
                      {isLoading ? 'Deleting...' : 'Delete This Order'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;