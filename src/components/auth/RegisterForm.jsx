"use client";
import Link from "next/link";
import { useState } from "react";
import { postUser } from "@/actions/server/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

export const RegisterForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!form.email.endsWith("gmail.com")) {
      Swal.fire("We only Accept Gmail", "Please use a Gmail account", "error");
      setLoading(false);
      return;
    }

    const uppercase = /[A-Z]/;
    const lowercase = /[a-z]/;

    if (form.password.length < 6) {
      Swal.fire("Password Error", "Password must be at least 6 characters long.", "error");
      setLoading(false);
      return;
    }
    if (!uppercase.test(form.password)) {
      Swal.fire("Password Error", "Password must contain at least one uppercase letter.", "error");
      setLoading(false);
      return;
    }
    if (!lowercase.test(form.password)) {
      Swal.fire("Password Error", "Password must contain at least one lowercase letter.", "error");
      setLoading(false);
      return;
    }

    const result = await postUser(form);

    if (result.acknowledged) {
      const signInResult = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
        callbackUrl: callbackUrl,
      });
      if (signInResult.ok) {
        Swal.fire("Success", "Registered successfully", "success");
        router.push(callbackUrl);
      }
      setLoading(false);
    } else {
      Swal.fire("Error", "This email already has an account. Please login.", "error");
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    await signIn("google", {
      callbackUrl: callbackUrl,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-2">
      {loading && (
        <div className="fixed inset-0 z-20 bg-white/80 flex justify-center items-center gap-4">
          <AiOutlineLoading
            size={50}
            className="animate-spin text-red-600 font-bold"
          />
          <h2 className="text-xl font-bold animate-pulse">
            Processing Registration
          </h2>
        </div>
      )}
      <div className="w-full max-w-sm">
        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 px-4 py-3 text-center">
            <h1 className="text-xl font-bold text-white mb-1">Create Account</h1>
            <p className="text-red-100 text-xs">Join Orvella today!</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            {/* Full Name Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-sm"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-sm"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all text-sm"
                  placeholder="Create a strong password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600"
                >
                  {showPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Must be 6+ characters with uppercase & lowercase letters
              </p>
            </div>

            {/* Register Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 text-sm disabled:opacity-50"
            >
              Create Account
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Google Register */}
            <button
              type="button"
              onClick={handleGoogleRegister}
              className="w-full flex items-center justify-center gap-2 bg-white border-2 border-gray-300 hover:border-red-600 text-gray-700 font-semibold py-2 rounded-lg transition-all duration-300 hover:shadow-md group text-sm"
            >
              <FcGoogle className="text-lg group-hover:scale-110 transition-transform" />
              Continue with Google
            </button>

            {/* Login Link */}
            <div className="text-center pt-1 border-t border-gray-200">
              <p className="text-xs text-gray-600">
                Already have an account?{' '}
                <Link
                  href="/login"
                  className="text-red-600 font-semibold hover:text-red-700 hover:underline transition-all"
                >
                  Login Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};