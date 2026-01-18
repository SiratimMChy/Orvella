import { RegisterForm } from "@/components/auth/RegisterForm";
import React, { Suspense } from "react";

const RegisterPage = () => {
  return (
    <div>
      <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div></div>}>
        <RegisterForm></RegisterForm>
      </Suspense>
    </div>
  );
};

export default RegisterPage;