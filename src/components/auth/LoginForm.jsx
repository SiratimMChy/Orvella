"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AiOutlineLoading } from "react-icons/ai";

const LoginForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callback = params.get("callbackUrl") || "/";
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    console.log(form.email, form.password, callback);

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl: callback,
    });

    if (!result.ok) {
      Swal.fire(
        "Error",
        "Email password not matched. Try Google Login or Register",
        "error"
      );
    } else {
      Swal.fire("Success", "Welcome to Orvella", "success");
      router.push(callback);
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    await signIn("google", {
      callbackUrl: callback,
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
            Processing Login
          </h2>
        </div>
      )}
      <div className="w-full max-w-sm">
        {/* Card Container */}
        <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Header */}
          <div className="bg-red-600 px-4 py-3 text-center">
            <h1 className="text-xl font-bold text-white mb-1">Welcome Back!</h1>
            <p className="text-red-100 text-xs">Login to your Orvella account</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-3">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={form.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-600"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <Link
                href="/forgot-password"
                className="text-sm text-red-600 hover:text-red-700 font-medium hover:underline transition-all"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              disabled={loading}
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
              Login
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">OR</span>
              </div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 hover:border-red-600 text-gray-700 font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-md group"
            >
              <FcGoogle className="text-2xl group-hover:scale-110 transition-transform" />
              Continue with Google
            </button>

            {/* Sign Up Link */}
            <div className="text-center pt-3 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <Link
                  href="/register"
                  className="text-red-600 font-semibold hover:text-red-700 hover:underline transition-all"
                >
                  Register Now
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;