import React from 'react';
import Link from 'next/link';
import { FaShippingFast, FaShieldAlt, FaUndo, FaHeadset, FaStar, FaCreditCard, FaLeaf, FaUsers } from 'react-icons/fa';

const WhyChooseUsPage = () => {
  const features = [
    {
      icon: <FaShippingFast className="text-3xl text-red-600" />,
      title: "Free Shipping",
      description: "Free delivery on orders above ৳1000. Fast and reliable shipping across Bangladesh."
    },
    {
      icon: <FaShieldAlt className="text-3xl text-red-600" />,
      title: "Secure Payment",
      description: "100% secure payment gateway with SSL encryption. Your data is safe with us."
    },
    {
      icon: <FaUndo className="text-3xl text-red-600" />,
      title: "Easy Returns",
      description: "30-day hassle-free return policy. Not satisfied? Return it for free."
    },
    {
      icon: <FaHeadset className="text-3xl text-red-600" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support via phone, email, and live chat."
    },
    {
      icon: <FaStar className="text-3xl text-red-600" />,
      title: "Premium Quality",
      description: "Hand-picked products with quality assurance. Every item is tested for durability."
    },
    {
      icon: <FaCreditCard className="text-3xl text-red-600" />,
      title: "Flexible Payment",
      description: "Multiple payment options including cash on delivery, mobile banking, and cards."
    },
    {
      icon: <FaLeaf className="text-3xl text-red-600" />,
      title: "Eco-Friendly",
      description: "Sustainable packaging and eco-conscious practices for a better tomorrow."
    },
    {
      icon: <FaUsers className="text-3xl text-red-600" />,
      title: "Community",
      description: "Join thousands of satisfied customers who trust Orvella for their fashion needs."
    }
  ];

  return (
    <div className='m-4 pb-25 p-2 lg:px-20'>
      <title>Why Choose Us</title>
      
      <h1 className="text-center text-3xl font-bold mb-8">
        Why Choose Orvella?
      </h1>

      {/* Hero Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Your Style, Our Commitment
        </h2>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          At Orvella, we don&apos;t just sell clothes - we deliver experiences. 
          From the moment you browse our collection to the day your order arrives, 
          we ensure every step exceeds your expectations.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white rounded-xl shadow-sm p-6 text-center hover:shadow-lg transition-all">
            <div className="mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          What Our Customers Say
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-amber-400" />
              ))}
            </div>
            <p className="text-gray-600 mb-4 italic">
              &quot;Amazing quality and fast delivery! The clothes fit perfectly and the fabric is so comfortable.&quot;
            </p>
            <h4 className="font-semibold text-gray-900">Sarah Ahmed</h4>
            <p className="text-gray-500 text-sm">Verified Customer</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-amber-400" />
              ))}
            </div>
            <p className="text-gray-600 mb-4 italic">
              &quot;Best online shopping experience! Customer service is excellent and returns are super easy.&quot;
            </p>
            <h4 className="font-semibold text-gray-900">Rahul Khan</h4>
            <p className="text-gray-500 text-sm">Verified Customer</p>
          </div>
          <div className="text-center">
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-amber-400" />
              ))}
            </div>
            <p className="text-gray-600 mb-4 italic">
              &quot;Love the variety and style! My kids&apos; clothes from Orvella are their favorites.&quot;
            </p>
            <h4 className="font-semibold text-gray-900">Fatima Islam</h4>
            <p className="text-gray-500 text-sm">Verified Customer</p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-xl shadow-sm p-6 lg:p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">
          Ready to Experience the Difference?
        </h3>
        <p className="mb-6 opacity-90">
          Join thousands of satisfied customers and discover why Orvella is Bangladesh&apos;s trusted fashion destination.
        </p>
        <Link
          href="/products"
          className="inline-block bg-white text-red-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
};

export default WhyChooseUsPage;