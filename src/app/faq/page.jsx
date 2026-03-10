"use client";
import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);
  
  useEffect(() => {
    document.title = 'FAQ - Orvella';
  }, []);

  const faqs = [
    {
      category: "Orders & Shipping",
      questions: [
        {
          question: "How long does shipping take?",
          answer: "We offer free shipping on orders above ৳1000. Standard delivery takes 3-5 business days within Dhaka and 5-7 business days outside Dhaka. Express delivery is available for faster shipping."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we only ship within Bangladesh. We are working on expanding our shipping to international locations soon."
        },
        {
          question: "Can I track my order?",
          answer: "Yes! Once your order is shipped, you&apos;ll receive a tracking number via SMS and email. You can track your order status on our website or through the courier&apos;s tracking system."
        },
        {
          question: "What if my order is damaged during shipping?",
          answer: "We take full responsibility for shipping damages. Contact our customer service within 24 hours of delivery with photos, and we&apos;ll arrange a replacement or full refund immediately."
        }
      ]
    },
    {
      category: "Returns & Exchanges",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day hassle-free return policy. Items must be unused, unwashed, and in original packaging with tags attached. Return shipping is free for defective items."
        },
        {
          question: "How do I return an item?",
          answer: "Contact our customer service to initiate a return. We&apos;ll provide you with a return label and pickup will be arranged from your address. Refunds are processed within 5-7 business days."
        },
        {
          question: "Can I exchange for a different size?",
          answer: "Yes! Size exchanges are free within 30 days. Contact us and we&apos;ll arrange pickup of the original item and delivery of the new size, subject to availability."
        }
      ]
    },
    {
      category: "Payment & Pricing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept cash on delivery, mobile banking (bKash, Nagad, Rocket), credit/debit cards, and online banking. All payments are processed through secure, encrypted gateways."
        },
        {
          question: "Is cash on delivery available?",
          answer: "Yes! Cash on delivery is available for all orders. A small COD fee may apply for orders under ৳500."
        },
        {
          question: "Do you offer discounts for bulk orders?",
          answer: "Yes, we offer special discounts for bulk orders above ৳10,000. Contact our sales team for custom pricing and wholesale rates."
        },
        {
          question: "Are there any hidden charges?",
          answer: "No hidden charges! The price you see is the price you pay. Shipping is free on orders above ৳1000. Any applicable taxes are clearly mentioned at checkout."
        }
      ]
    },
    {
      category: "Products & Sizing",
      questions: [
        {
          question: "How do I choose the right size?",
          answer: "Each product page has a detailed size chart. Measure yourself and compare with our size guide. If you&apos;re between sizes, we recommend going one size up. Our customer service can also help with sizing advice."
        },
        {
          question: "Are the colors accurate in photos?",
          answer: "We try our best to show accurate colors, but slight variations may occur due to screen settings and lighting. If you&apos;re not satisfied with the color, you can return it within 30 days."
        },
        {
          question: "Do you restock sold-out items?",
          answer: "Popular items are regularly restocked. You can sign up for restock notifications on product pages. Follow our social media for updates on new arrivals and restocks."
        },
        {
          question: "Are your products authentic?",
          answer: "Absolutely! We source directly from authorized suppliers and manufacturers. All branded items come with authenticity guarantees and original tags."
        }
      ]
    },
    {
      category: "Account & Support",
      questions: [
        {
          question: "Do I need to create an account to shop?",
          answer: "You can shop as a guest, but creating an account helps you track orders, save favorites, get exclusive offers, and makes future shopping faster."
        },
        {
          question: "How can I contact customer support?",
          answer: "Our customer support is available 24/7 via phone (+880 1234-567890), email (support@orvella.com), live chat on our website, and social media."
        },
        {
          question: "Can I cancel my order?",
          answer: "Orders can be cancelled within 2 hours of placement if not yet processed. After processing, you can return the items once delivered using our 30-day return policy."
        }
      ]
    }
  ];

  const toggleFAQ = (categoryIndex, questionIndex) => {
    const index = `${categoryIndex}-${questionIndex}`;
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='m-4 pb-25 p-2 lg:px-20'>
      <h1 className="text-center text-3xl font-bold mb-8">
        Frequently Asked Questions
      </h1>

      <div className="bg-white rounded-xl shadow-sm p-6 lg:p-8 mb-8 text-center">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          Need Help? We&apos;ve Got Answers!
        </h2>
        <p className="text-gray-600">
          Find answers to the most common questions about shopping with Orvella. 
          Can&apos;t find what you&apos;re looking for? Contact our support team.
        </p>
      </div>

      <div className="space-y-8">
        {faqs.map((category, categoryIndex) => (
          <div key={categoryIndex} className="bg-white rounded-xl shadow-sm p-6 lg:p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 border-b pb-3">
              {category.category}
            </h3>
            <div className="space-y-4">
              {category.questions.map((faq, questionIndex) => {
                const isOpen = openIndex === `${categoryIndex}-${questionIndex}`;
                return (
                  <div key={questionIndex} className="border border-gray-200 rounded-lg">
                    <button
                      onClick={() => toggleFAQ(categoryIndex, questionIndex)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-all"
                    >
                      <span className="font-semibold text-gray-900">
                        {faq.question}
                      </span>
                      {isOpen ? (
                        <FaChevronUp className="text-red-600" />
                      ) : (
                        <FaChevronDown className="text-gray-400" />
                      )}
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-4">
                        <p className="text-gray-600 leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Contact Support */}
      <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-xl shadow-sm p-6 lg:p-8 text-center text-white mt-8">
        <h3 className="text-xl font-bold mb-4">
          Still Have Questions?
        </h3>
        <p className="mb-6 opacity-90">
          Our friendly customer support team is here to help you 24/7.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-block bg-white text-red-600 px-6 py-3 rounded-lg font-bold hover:bg-gray-100 transition-all"
          >
            Contact Support
          </a>
          <a
            href="tel:+8801234567890"
            className="inline-block bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-bold hover:bg-white hover:text-red-600 transition-all"
          >
            Call Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;