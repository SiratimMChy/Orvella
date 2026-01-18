"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { clearCart } from "./cart";
import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";
import { ObjectId } from "mongodb";
import { adminOrderNotificationTemplate } from "@/lib/AdminInvoice";

const { dbConnect, collections } = require("@/lib/dbConnect");

export const createOrder = async (payload) => {
  try {
    console.log("🚀 Starting order creation process...");
    console.log("📝 Payload received:", JSON.stringify(payload, null, 2));
    
    const { user } = (await getServerSession(authOptions)) || {};
    
    if (!user) {
      console.log("❌ User not authenticated");
      return { success: false, message: "User not authenticated" };
    }

    console.log("✅ User authenticated:", user.email);

    // Get cart items
    let cart;
    try {
      const { getCart } = await import("./cart");
      cart = await getCart();
      console.log("🛒 Cart retrieved:", cart.length, "items");
    } catch (cartError) {
      console.error("❌ Error getting cart:", cartError);
      return { success: false, message: "Failed to retrieve cart items" };
    }
    
    if (cart.length === 0) {
      console.log("❌ Cart is empty");
      return { success: false, message: "Cart is empty" };
    }

    console.log("✅ Cart items found:", cart.length);

    // Calculate total price from cart
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    console.log("💰 Total price calculated:", totalPrice);
    
    // Create new order object
    const newOrder = {
      createdAt: new Date().toISOString(),
      items: cart,
      ...payload,
      totalPrice,
      userId: user.id || user.email,
      userEmail: user.email,
      userName: user.name,
      status: "confirmed", // Changed from "pending" to "confirmed"
    };

    console.log("📦 Order object created:", JSON.stringify(newOrder, null, 2));
    console.log("💾 Inserting order into database...");

    // Insert order into database
    let result;
    try {
      result = await dbConnect(collections.ORDER).insertOne(newOrder);
      console.log("✅ Database insert result:", result);
    } catch (insertError) {
      console.error("❌ Database insert failed:", insertError);
      return { success: false, message: "Failed to save order to database" };
    }
    
    if (Boolean(result.insertedId)) {
      console.log("✅ Order inserted successfully:", result.insertedId);
      
      // Clear cart after successful order
      try {
        await clearCart();
        console.log("🛒 Cart cleared successfully");
      } catch (clearCartError) {
        console.error("⚠️ Failed to clear cart (non-critical):", clearCartError);
      }
      
      // Send emails
      console.log("📧 Starting email sending process...");
      
      try {
        // Send customer email
        console.log("📧 Sending customer email to:", user.email);
        const customerEmailResult = await sendEmail({
          to: user.email,
          subject: "🎉 Order Confirmed - Your Orvella Purchase",
          html: orderInvoiceTemplate({
            orderId: result.insertedId.toString(),
            items: cart,
            totalPrice,
            customerName: user.name,
            customerEmail: user.email,
            shippingAddress: `${payload.address}, ${payload.city}, ${payload.postalCode}`.replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ','),
            phone: payload.phone,
          }),
        });
        
        if (customerEmailResult.success) {
          console.log("✅ Customer email sent successfully:", customerEmailResult.messageId);
        } else {
          console.error("❌ Customer email failed:", customerEmailResult.error);
        }
      } catch (customerEmailError) {
        console.error("💥 Customer email exception:", customerEmailError);
      }

      try {
        // Send admin email
        console.log("📧 Sending admin email to:", process.env.ADMIN_EMAIL);
        const adminEmailResult = await sendEmail({
          to: process.env.ADMIN_EMAIL,
          subject: "🔥 New Order Confirmed - Orvella",
          html: adminOrderNotificationTemplate({
            orderId: result.insertedId.toString(),
            items: cart,
            totalPrice,
            address: `${payload.address}, ${payload.city}, ${payload.postalCode}`.replace(/^,\s*|,\s*$/g, '').replace(/,\s*,/g, ','),
            contact: payload.phone,
            name: user.name,
            email: user.email,
            instruction: payload?.specialInstructions || "",
          }),
        });
        
        if (adminEmailResult.success) {
          console.log("✅ Admin email sent successfully:", adminEmailResult.messageId);
        } else {
          console.error("❌ Admin email failed:", adminEmailResult.error);
        }
      } catch (adminEmailError) {
        console.error("💥 Admin email exception:", adminEmailError);
      }

      console.log("📧 Email sending process completed");

      console.log("🎉 Order confirmed and created successfully");
      return {
        success: true,
        orderId: result.insertedId.toString(),
        message: "Order confirmed successfully",
      };
    }
    
    console.log("❌ Failed to insert order into database - no insertedId");
    return { success: false, message: "Failed to create order" };
    
  } catch (error) {
    console.error("💥 Critical error creating order:", error);
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return { 
      success: false, 
      message: `An error occurred while processing your order: ${error.message}` 
    };
  }
};

export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    if (!orderId || orderId.length !== 24) {
      return { success: false, message: "Invalid order ID" };
    }

    const result = await dbConnect(collections.ORDER).updateOne(
      { _id: new ObjectId(orderId) },
      {
        $set: {
          status: newStatus,
          updatedAt: new Date(),
        },
      }
    );

    return { success: Boolean(result.modifiedCount) };
  } catch (error) {
    console.error("Update Order Error:", error.message);
    return { success: false, error: error.message };
  }
};

export const getOrders = async () => {
  const { user } = (await getServerSession(authOptions)) || {};
  
  if (!user) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    const orders = await dbConnect(collections.ORDER)
      .find({ userEmail: user.email })
      .sort({ createdAt: -1 })
      .toArray();
    
    return { success: true, orders };
  } catch (error) {
    console.error("Error fetching orders:", error);
    return { success: false, message: "Failed to fetch orders" };
  }
};

export const cancelOrder = async (orderId) => {
  const { user } = (await getServerSession(authOptions)) || {};
  
  if (!user) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    // Check if order exists and belongs to user
    const order = await dbConnect(collections.ORDER).findOne({
      _id: new ObjectId(orderId),
      userEmail: user.email,
    });
    
    if (!order) {
      return { success: false, message: "Order not found" };
    }

    // Only allow cancellation if order is confirmed or pending
    if (order.status === "shipped" || order.status === "delivered") {
      return { success: false, message: "Cannot cancel shipped or delivered orders" };
    }

    if (order.status === "cancelled") {
      return { success: false, message: "Order is already cancelled" };
    }

    // Update order status to cancelled
    const result = await dbConnect(collections.ORDER).updateOne(
      { _id: new ObjectId(orderId), userEmail: user.email },
      { 
        $set: { 
          status: "cancelled",
          cancelledAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    );
    
    if (result.modifiedCount > 0) {
      console.log("✅ Order cancelled successfully:", orderId);
      
      // Send cancellation email to customer
      try {
        await sendEmail({
          to: user.email,
          subject: "Order Cancelled - Orvella",
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="UTF-8">
              <title>Order Cancelled</title>
            </head>
            <body style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f5f5;">
              <div style="max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px;">
                <h1 style="color: #ef4444; text-align: center;">Order Cancelled</h1>
                <p>Dear ${user.name || 'Customer'},</p>
                <p>Your order <strong>#${orderId.slice(-8).toUpperCase()}</strong> has been successfully cancelled.</p>
                <p>If you have any questions, please contact our support team.</p>
                <p>Thank you for choosing Orvella.</p>
                <hr style="margin: 20px 0;">
                <p style="text-align: center; color: #666; font-size: 12px;">
                  © ${new Date().getFullYear()} Orvella. All rights reserved.
                </p>
              </div>
            </body>
            </html>
          `
        });
      } catch (emailError) {
        console.error("⚠️ Cancellation email failed:", emailError);
      }

      return { success: true, message: "Order cancelled successfully" };
    }
    
    return { success: false, message: "Failed to cancel order" };
  } catch (error) {
    console.error("Error cancelling order:", error);
    return { success: false, message: "Failed to cancel order" };
  }
};

export const deleteOrder = async (orderId) => {
  const { user } = (await getServerSession(authOptions)) || {};
  
  if (!user) {
    return { success: false, message: "User not authenticated" };
  }

  try {
    // Check if order exists and belongs to user
    const order = await dbConnect(collections.ORDER).findOne({
      _id: new ObjectId(orderId),
      userEmail: user.email,
    });
    
    if (!order) {
      return { success: false, message: "Order not found" };
    }

    // Don't allow deletion of shipped or delivered orders
    if (order.status === "shipped" || order.status === "delivered") {
      return { success: false, message: "Cannot delete shipped or delivered orders" };
    }

    // Delete the order
    const result = await dbConnect(collections.ORDER).deleteOne({
      _id: new ObjectId(orderId),
      userEmail: user.email,
    });
    
    if (result.deletedCount > 0) {
      console.log("✅ Order deleted successfully:", orderId);
      return { success: true, message: "Order deleted successfully" };
    }
    
    return { success: false, message: "Failed to delete order" };
  } catch (error) {
    console.error("Error deleting order:", error);
    return { success: false, message: "Failed to delete order" };
  }
};