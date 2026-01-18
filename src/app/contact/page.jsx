"use client";
import React, { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram } from 'react-icons/fa';
import Swal from 'sweetalert2';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    Swal.fire({
      title: 'Message Sent!',
      text: 'Thank you for contacting Orvella! We\'ll get back to you soon.',
      icon: 'success',
      confirmButtonColor: '#ef4444',
      confirmButtonText: 'Great!'
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="w-full px-2 lg:px-0 py-8">
      <title>Contact Us - Orvella</title>
      
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">Contact Orvella</h1>
        <p className="text-gray-600">We&apos;re here to help with your fashion needs</p>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Contact Form */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-8 flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="flex flex-col flex-1">
              <div className="space-y-6 flex-1">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                    placeholder="your@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none"
                  >
                    <option value="">Choose a topic</option>
                    <option value="order">Order Help</option>
                    <option value="product">Product Question</option>
                    <option value="return">Return/Exchange</option>
                    <option value="size">Size Help</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="flex-1 flex flex-col">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full flex-1 min-h-[120px] px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none resize-none"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
              </div>
              
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors mt-6"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Contact Details */}
            <div className="bg-white rounded-lg shadow-md p-8 flex-1">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Get in touch</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-xl text-red-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Visit our store</h4>
                    <p className="text-gray-600">212 Fashion Street<br />Dhaka 1212, Bangladesh</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <FaPhone className="text-xl text-red-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Call us</h4>
                    <p className="text-gray-600">+880 1700-123456<br />9 AM - 9 PM, 7 days a week</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <FaEnvelope className="text-xl text-red-600 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Email us</h4>
                    <p className="text-gray-600">hello@orvella.com<br />We reply within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-lg shadow-md p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Follow us</h3>
              <p className="text-gray-600 mb-6">Stay updated with our latest collections and offers</p>
              <div className="flex gap-4">
                <a 
                  href="#" 
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <FaFacebook />
                  Facebook
                </a>
                <a 
                  href="#" 
                  className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
                >
                  <FaInstagram />
                  Instagram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;