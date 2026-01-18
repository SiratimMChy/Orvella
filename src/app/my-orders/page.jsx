import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import { getOrders } from "@/actions/server/order";
import MyOrders from "@/components/home/MyOrders";
import { HiOutlineShoppingBag, HiOutlineArrowLeft } from "react-icons/hi2";
import Link from "next/link";

const MyOrdersPage = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  const ordersResult = await getOrders();
  const orders = ordersResult.success ? ordersResult.orders : [];

  // Format orders for client component
  const formattedOrders = orders.map((order) => ({
    _id: order._id.toString(),
    createdAt: order.createdAt,
    totalPrice: order.totalPrice,
    status: order.status || 'pending',
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
    items: order.items.map((item) => ({
      _id: item._id.toString(),
      productId: item.productId ? item.productId.toString() : '',
      title: item.title || '',
      quantity: item.quantity || 0,
      price: item.price || 0,
      image: item.image || '',
      username: item.username || '',
      email: item.email || ''
    })),
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Link 
              href="/" 
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <HiOutlineArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            <HiOutlineShoppingBag className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
              <p className="text-gray-600 mt-1">Track and manage your order history</p>
            </div>
          </div>
        </div>

        {/* Orders Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200">
          <MyOrders orders={formattedOrders} />
        </div>
      </div>
    </div>
  );
};

export default MyOrdersPage;