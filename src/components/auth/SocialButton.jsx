"use client";
import { signIn } from "next-auth/react";
import { useParams, useSearchParams } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";

export const SocialButtons = () => {
  const params = useSearchParams();

  const handleSignIn = async () => {
    try {
      const result = await signIn("google", {
        callbackUrl: params.get("callbackUrl") || "/",
        redirect: false,
      });

      if (!result.ok) {
        Swal.fire(
          "Login Error",
          "You registered using Email. Please login with the same method.",
          "error"
        );
      } else if (result.status === 200) {
        Swal.fire("Success", "Logged in successfully", "success");
      }
    } catch (error) {
      Swal.fire("Error", "Google login failed", "error");
    }
  };

  return (
    <div className="mt-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">OR</span>
        </div>
      </div>
      <button
        onClick={handleSignIn}
        className="w-full mt-4 flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-red-600 text-gray-700 font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-md group"
      >
        <FaGoogle className="text-xl text-red-600 group-hover:scale-110 transition-transform" />
        Continue with Google
      </button>
    </div>
  );
};