import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

const { dbConnect, collections } = require("@/lib/dbConnect");

const UpdateAdminPage = async () => {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/login");
  }

  // Update the current user to admin role
  try {
    const result = await dbConnect(collections.USERS).updateOne(
      { email: session.user.email },
      { $set: { role: "admin" } }
    );
    
    console.log("User role update result:", result);
  } catch (error) {
    console.error("Error updating user role:", error);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Admin Role Updated</h1>
        <p className="text-gray-600 mb-6">
          Your role has been updated to admin. Please sign out and sign back in to see the admin links.
        </p>
        <div className="space-y-4">
          <button
            onClick={() => window.location.href = '/api/auth/signout'}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg font-medium"
          >
            Sign Out
          </button>
          <button
            onClick={() => window.location.href = '/'}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium"
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateAdminPage;