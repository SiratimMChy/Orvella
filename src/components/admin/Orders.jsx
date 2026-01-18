"use client";

import React, { useState, useEffect } from 'react';
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
  HiOutlineUser,
  HiOutlineEnvelope
} from 'react-icons/hi2';
import { FiPackage, FiClock, FiCheck, FiX, FiEdit3 } from 'react-icons/fi';
import Swal from 'sweetalert2';
import { updateOrderStatus, getOrders } from "@/actions/server/order";

const AdminOrders = ({ orders = [] }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
      month: 'short',
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

  const handleStatusUpdate = async (orderId, newStatus) => {
    const result = await Swal.fire({
      title: 'Update Order Status',
      text: `Change order status to "${newStatus}"?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3b82f6',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Update',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        const response = await updateOrderStatus(orderId, newStatus);
        
        if (response.success) {
          Swal.fire({
            title: 'Status Updated!',
            text: `Order status has been updated to ${newStatus}.`,
            icon: 'success',
            confirmButtonColor: '#3b82f6'
          }).then(() => {
            window.location.reload();
          });
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to update order status.',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = searchTerm === '' || 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.userEmail?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const statusOptions = ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Management</h1>
        <p className="text-gray-600">Manage and track all customer orders</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by Order ID, Customer Name, or Email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <HiOutlineCheckCircle className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Confirmed</p>
              <p className="text-2xl font-bold text-blue-900">
                {orders.filter(o => o.status === 'confirmed').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <FiPackage className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-600">Processing</p>
              <p className="text-2xl font-bold text-purple-900">
                {orders.filter(o => o.status === 'processing').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
          <div className="flex items-center">
            <HiOutlineTruck className="w-8 h-8 text-indigo-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-indigo-600">Shipped</p>
              <p className="text-2xl font-bold text-indigo-900">
                {orders.filter(o => o.status === 'shipped').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <FiCheck className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Delivered</p>
              <p className="text-2xl font-bold text-green-900">
                {orders.filter(o => o.status === 'delivered').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <HiOutlineXCircle className="w-8 h-8 text-red-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-red-600">Cancelled</p>
              <p className="text-2xl font-bold text-red-900">
                {orders.filter(o => o.status === 'cancelled').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-12">
          <HiOutlineShoppingBag className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-500">No orders match your current filters.</p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredOrders.map((order) => (
                <tr key={order._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">
                        #{order._id.slice(-8).toUpperCase()
                        }
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatDate(order.createdAt)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <HiOutlineUser className="w-5 h-5 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {order.userName || 'N/A'}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.userEmail}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {order.items?.length || 0} items
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ৳{order.totalPrice}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status || 'Confirmed'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        <HiOutlineEye className="w-4 h-4" />
                      </button>
                      <select
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                        defaultValue=""
                      >
                        <option value="" disabled>Update Status</option>
                        {statusOptions.map(status => (
                          <option key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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
              {/* Customer & Order Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p><strong>Name:</strong> {selectedOrder.userName || 'N/A'}</p>
                      <p><strong>Email:</strong> {selectedOrder.userEmail}</p>
                      <p><strong>Phone:</strong> {selectedOrder.phone || 'N/A'}</p>
                      <p><strong>Address:</strong> {selectedOrder.address || 'N/A'}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <p><strong>Order Date:</strong> {formatDate(selectedOrder.createdAt)}</p>
                      <p><strong>Status:</strong> 
                        <span className={`ml-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                          {getStatusIcon(selectedOrder.status)}
                          {selectedOrder.status || 'Confirmed'}
                        </span>
                      </p>
                      <p><strong>Payment:</strong> Cash on Delivery</p>
                      <p><strong>Total:</strong> ৳{selectedOrder.totalPrice}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Order Items ({selectedOrder.items?.length || 0})</h3>
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
                      {selectedOrder.items?.map((item, index) => (
                        <tr key={index}>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              {item.image && (
                                <div className="w-12 h-12 relative rounded-lg overflow-hidden">
                                  <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-gray-900">{item.title}</p>
                                <p className="text-sm text-gray-500">SKU: {item._id?.slice(-8).toUpperCase()}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-center">
                            <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-medium">
                              {item.quantity}
                            </span>
                          </td>
                          <td className="px-4 py-4 text-right font-medium">৳{item.price}</td>
                          <td className="px-4 py-4 text-right font-semibold">৳{(item.price * item.quantity).toFixed(2)}</td>
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
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>৳{selectedOrder.totalPrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="border-t border-green-200 pt-2 mt-2">
                    <div className="flex justify-between text-lg font-bold text-green-900">
                      <span>Total Amount</span>
                      <span>৳{selectedOrder.totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;