"use client";
import Link from "next/link";

export default function ProviderMismatchPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-sm text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Provider Mismatch</h1>
        <p className="text-gray-600 mb-6">
          You registered using Email/Password. Please login with the same method.
        </p>
        <Link
          href="/login"
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg inline-block transition-all"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
}