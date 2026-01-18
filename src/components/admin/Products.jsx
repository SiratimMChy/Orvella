"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  HiOutlinePlus,
  HiOutlineEye,
  HiOutlinePencilSquare,
  HiOutlineTrash,
  HiOutlinePhoto,
  HiOutlineMagnifyingGlass,
  HiOutlineAdjustmentsHorizontal
} from 'react-icons/hi2';
import { FiPackage, FiDollarSign, FiTag, FiImage } from 'react-icons/fi';
import Swal from 'sweetalert2';

const AdminProducts = ({ products = [] }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(false);

  // Form state for adding/editing products
  const [productForm, setProductForm] = useState({
    title: '',
    price: '',
    discount: '',
    category: '',
    description: '',
    image: '',
    stock: '',
    featured: false
  });

  const handleViewProduct = (product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const closeProductModal = () => {
    setShowProductModal(false);
    setSelectedProduct(null);
  };

  const handleAddProduct = () => {
    setProductForm({
      title: '',
      price: '',
      discount: '',
      category: '',
      description: '',
      image: '',
      stock: '',
      featured: false
    });
    setShowAddProduct(true);
  };

  const handleEditProduct = (product) => {
    setProductForm({
      title: product.title || '',
      price: product.price || '',
      discount: product.discount || '',
      category: product.category || '',
      description: product.description || '',
      image: product.image || '',
      stock: product.stock || '',
      featured: product.featured || false
    });
    setSelectedProduct(product);
    setShowAddProduct(true);
  };

  const closeAddProduct = () => {
    setShowAddProduct(false);
    setSelectedProduct(null);
    setProductForm({
      title: '',
      price: '',
      discount: '',
      category: '',
      description: '',
      image: '',
      stock: '',
      featured: false
    });
  };

  const handleDeleteProduct = async (productId, productTitle) => {
    const result = await Swal.fire({
      title: 'Delete Product?',
      text: `Are you sure you want to delete "${productTitle}"? This action cannot be undone.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#6b7280',
      confirmButtonText: 'Yes, Delete',
      cancelButtonText: 'Cancel'
    });

    if (result.isConfirmed) {
      setIsLoading(true);
      try {
        // Here you would call your API to delete the product
        // const response = await deleteProduct(productId);
        
        Swal.fire({
          title: 'Product Deleted!',
          text: 'The product has been successfully deleted.',
          icon: 'success',
          confirmButtonColor: '#3b82f6'
        }).then(() => {
          window.location.reload();
        });
      } catch (error) {
        Swal.fire({
          title: 'Error',
          text: 'Failed to delete the product.',
          icon: 'error',
          confirmButtonColor: '#ef4444'
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Here you would call your API to add/update the product
      // const response = selectedProduct 
      //   ? await updateProduct(selectedProduct._id, productForm)
      //   : await addProduct(productForm);
      
      Swal.fire({
        title: selectedProduct ? 'Product Updated!' : 'Product Added!',
        text: `The product has been successfully ${selectedProduct ? 'updated' : 'added'}.`,
        icon: 'success',
        confirmButtonColor: '#3b82f6'
      }).then(() => {
        closeAddProduct();
        window.location.reload();
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: `Failed to ${selectedProduct ? 'update' : 'add'} the product.`,
        icon: 'error',
        confirmButtonColor: '#ef4444'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProductForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Filter products based on search term and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === '' || 
      product.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories
  const categories = [...new Set(products.map(p => p.category).filter(Boolean))];

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
          <p className="text-gray-600">Manage your product catalog</p>
        </div>
        <button
          onClick={handleAddProduct}
          className="mt-4 sm:mt-0 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <HiOutlinePlus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <HiOutlineMagnifyingGlass className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <FiPackage className="w-8 h-8 text-blue-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-blue-600">Total Products</p>
              <p className="text-2xl font-bold text-blue-900">{products.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <FiDollarSign className="w-8 h-8 text-green-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-green-600">Avg. Price</p>
              <p className="text-2xl font-bold text-green-900">
                ৳{products.length > 0 ? Math.round(products.reduce((sum, p) => sum + (p.price || 0), 0) / products.length) : 0}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-center">
            <FiTag className="w-8 h-8 text-purple-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-purple-600">Categories</p>
              <p className="text-2xl font-bold text-purple-900">{categories.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-center">
            <FiImage className="w-8 h-8 text-orange-600" />
            <div className="ml-3">
              <p className="text-sm font-medium text-orange-600">Featured</p>
              <p className="text-2xl font-bold text-orange-900">
                {products.filter(p => p.featured).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <FiPackage className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-500">No products match your current filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <HiOutlinePhoto className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                {product.featured && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
                    Featured
                  </div>
                )}
                {product.discount > 0 && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-medium">
                    -{product.discount}%
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.category}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {product.discount > 0 ? (
                      <>
                        <span className="text-lg font-bold text-green-600">
                          ৳{calculateDiscountedPrice(product.price, product.discount).toFixed(0)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">
                          ৳{product.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-lg font-bold text-gray-900">৳{product.price}</span>
                    )}
                  </div>
                  <span className="text-sm text-gray-500">Stock: {product.stock || 0}</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleViewProduct(product)}
                    className="flex-1 flex items-center justify-center gap-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded text-sm font-medium transition-colors"
                  >
                    <HiOutlineEye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleEditProduct(product)}
                    className="flex-1 flex items-center justify-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded text-sm font-medium transition-colors"
                  >
                    <HiOutlinePencilSquare className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product._id, product.title)}
                    className="flex items-center justify-center bg-red-100 hover:bg-red-200 text-red-700 px-3 py-2 rounded text-sm font-medium transition-colors"
                  >
                    <HiOutlineTrash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  {selectedProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={closeAddProduct}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmitProduct} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={productForm.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter product title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={productForm.category}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Category</option>
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="kids">Kids</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (৳) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={productForm.price}
                    onChange={handleInputChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0.00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    name="discount"
                    value={productForm.discount}
                    onChange={handleInputChange}
                    min="0"
                    max="100"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    name="stock"
                    value={productForm.stock}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={productForm.image}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter product description"
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={productForm.featured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label className="ml-2 text-sm font-medium text-gray-700">
                  Featured Product
                </label>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  {isLoading ? 'Saving...' : (selectedProduct ? 'Update Product' : 'Add Product')}
                </button>
                <button
                  type="button"
                  onClick={closeAddProduct}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Details Modal */}
      {showProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">Product Details</h2>
                <button
                  onClick={closeProductModal}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors"
                >
                  <HiOutlineTrash className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  {selectedProduct.image ? (
                    <div className="relative h-64 rounded-lg overflow-hidden">
                      <Image
                        src={selectedProduct.image}
                        alt={selectedProduct.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                      <HiOutlinePhoto className="w-16 h-16 text-gray-400" />
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedProduct.title}</h3>
                    <p className="text-gray-600">{selectedProduct.category}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    {selectedProduct.discount > 0 ? (
                      <>
                        <span className="text-2xl font-bold text-green-600">
                          ৳{calculateDiscountedPrice(selectedProduct.price, selectedProduct.discount).toFixed(0)}
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          ৳{selectedProduct.price}
                        </span>
                        <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                          -{selectedProduct.discount}% OFF
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-gray-900">৳{selectedProduct.price}</span>
                    )}
                  </div>

                  <div className="space-y-2">
                    <p><strong>Stock:</strong> {selectedProduct.stock || 0} units</p>
                    <p><strong>Featured:</strong> {selectedProduct.featured ? 'Yes' : 'No'}</p>
                    <p><strong>Product ID:</strong> {selectedProduct._id}</p>
                  </div>

                  {selectedProduct.description && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Description</h4>
                      <p className="text-gray-600">{selectedProduct.description}</p>
                    </div>
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

export default AdminProducts;