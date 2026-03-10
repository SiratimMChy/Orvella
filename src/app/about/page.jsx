import Image from 'next/image';
import React from 'react';
import { FaUsers, FaHeart, FaShoppingBag, FaAward } from 'react-icons/fa';

export const metadata = {
  title: 'About Us',
  description: 'Learn about Orvella - your style companion. Discover our mission, vision, and values in providing quality fashion for everyone.',
};

const AboutPage = () => {
  return (
    <div className="w-full px-2 lg:px-0 py-8">

      <h1 className="text-center text-3xl font-bold mb-8">
        About Orvella
      </h1>

      {/* Hero Section */}
      <div className="bg-white rounded-2xl shadow-sm p-6 lg:p-8 mb-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Made for Your Everyday Look
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Orvella is more than just a clothing brand - we&apos;re your style companion.
              Founded with the vision to make fashion accessible, comfortable, and stylish
              for everyone, we curate collections that speak to your personality.
            </p>
            <p className="text-gray-600 leading-relaxed">
              From men&apos;s essentials to ladies&apos; fashion and kids&apos; wear, every piece
              is carefully selected to ensure quality, comfort, and style that fits
              your lifestyle perfectly.
            </p>
          </div>

          <div className="relative h-80 rounded-xl overflow-hidden bg-gray-100">
            <Image
              src="/assets/orvella1.jpg"
              alt="About Orvella"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <FaUsers className="text-3xl text-red-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">10K+</h3>
          <p className="text-gray-600">Happy Customers</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <FaShoppingBag className="text-3xl text-red-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">500+</h3>
          <p className="text-gray-600">Products</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <FaHeart className="text-3xl text-red-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">5 Years</h3>
          <p className="text-gray-600">Experience</p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 text-center">
          <FaAward className="text-3xl text-red-600 mx-auto mb-3" />
          <h3 className="text-2xl font-bold text-gray-900">100%</h3>
          <p className="text-gray-600">Quality</p>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To provide high-quality, stylish, and affordable clothing that empowers
            individuals to express their unique style with confidence. We believe
            fashion should be accessible to everyone, regardless of age, size, or budget.
          </p>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            To become the leading fashion destination that celebrates diversity,
            promotes sustainable practices, and creates a community where everyone
            feels confident and beautiful in their own skin.
          </p>
        </div>
      </div>

      {/* Values */}
      <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Values</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaHeart className="text-2xl text-red-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Quality First</h4>
            <p className="text-gray-600 text-sm">
              Every product goes through rigorous quality checks to ensure durability and comfort.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUsers className="text-2xl text-red-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Customer Centric</h4>
            <p className="text-gray-600 text-sm">
              Your satisfaction is our priority. We listen, adapt, and improve based on your feedback.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaAward className="text-2xl text-red-600" />
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Innovation</h4>
            <p className="text-gray-600 text-sm">
              We constantly evolve our designs and processes to bring you the latest trends.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;