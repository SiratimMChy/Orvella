"use client";

import { createOrder } from "@/actions/server/order";
import { getCart } from "@/actions/server/cart";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    phone: "",
    shippingAddress: "",
  });

  useEffect(() => {
    const fetchCart = async () => {
      const items = await getCart();
      
      // Convert all ObjectIds to strings
      const formattedItems = items.map((item) => ({
        _id: item._id?.toString() || item._id,
        productId: item.productId?.toString() || item.productId,
        email: item.email,
        title: item.title,
        quantity: item.quantity,
        image: item.image,
        price: item.price,
        username: item.username,
      }));
      
      setCartItems(formattedItems);
      setLoading(false);
    };
    fetchCart();
  }, []);

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const result = await createOrder({
        items: cartItems,
        totalPrice,
        phone: form.phone,
        shippingAddress: form.shippingAddress,
      });

      if (result.success) {
        Swal.fire({
          title: "Order Confirmed!",
          text: `Your order ${result.orderId} has been placed successfully.`,
          icon: "success",
        }).then(() => {
          router.push("/orders");
        });
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error.message || "Failed to create order",
        "error"
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="01234567890"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Shipping Address *
              </label>
              <textarea
                required
                value={form.shippingAddress}
                onChange={(e) =>
                  setForm({ ...form, shippingAddress: e.target.value })
                }
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                rows={4}
                placeholder="Enter your delivery address"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-3 rounded-lg font-medium"
            >
              {submitting ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Cart Items */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="space-y-4 mb-6">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between pb-4 border-b">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium">৳{(item.price * item.quantity).toFixed(0)}</p>
              </div>
            ))}
          </div>
          <div className="border-t pt-4">
            <div className="flex justify-between text-lg font-bold">
              <span>Total:</span>
              <span>৳{totalPrice.toFixed(0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}