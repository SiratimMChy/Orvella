import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
import AdminProducts from "@/components/admin/Products";

const { dbConnect, collections } = require("@/lib/dbConnect");
const productCollection = dbConnect(collections.PRODUCTS);

const AddProductPage = async () => {
  const session = await getServerSession(authOptions);
  
  // Check if user is authenticated and is admin
  if (!session || session.user?.role !== "admin") {
    redirect("/");
  }

  // Fetch all products for admin
  let products = [];
  try {
    const productsData = await productCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();
    
    // Format products for client component
    products = productsData.map((product) => ({
      _id: product._id.toString(),
      title: product.title || '',
      price: product.price || 0,
      discount: product.discount || 0,
      category: product.category || '',
      description: product.description || '',
      image: product.image || '',
      stock: product.stock || 0,
      featured: product.featured || false,
      createdAt: product.createdAt || new Date().toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AdminProducts products={products} />
      </div>
    </div>
  );
};

export default AddProductPage;