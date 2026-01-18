import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import AdminOrders from "@/components/admin/Orders";

const { dbConnect, collections } = require("@/lib/dbConnect");
const orderCollection = dbConnect(collections.ORDER);

const OrdersPage = async () => {
  const session = await getServerSession(authOptions);
  
  // Check if user is authenticated and is admin
  if (!session || session.user?.role !== "admin") {
    redirect("/");
  }

  // Fetch all orders for admin
  let orders = [];
  try {
    const ordersData = await orderCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    // Format orders for client component
    orders = ordersData.map((order) => ({
      _id: order._id.toString(),
      createdAt: order.createdAt,
      totalPrice: order.totalPrice,
      status: order.status || 'confirmed',
      firstName: order.firstName || '',
      lastName: order.lastName || '',
      email: order.email || order.userEmail || '',
      phone: order.phone || '',
      address: order.address || '',
      city: order.city || '',
      postalCode: order.postalCode || '',
      paymentMethod: order.paymentMethod || 'cod',
      specialInstructions: order.specialInstructions || '',
      userEmail: order.userEmail || '',
      userName: order.userName || '',
      items: order.items?.map((item) => ({
        _id: item._id ? item._id.toString() : '',
        productId: item.productId ? item.productId.toString() : '',
        title: item.title || '',
        quantity: item.quantity || 0,
        price: item.price || 0,
        image: item.image || '',
        username: item.username || '',
        email: item.email || ''
      })) || [],
    }));
  } catch (error) {
    console.error("Error fetching orders:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminOrders orders={orders} />
      </div>
    </div>
  );
};

export default OrdersPage;