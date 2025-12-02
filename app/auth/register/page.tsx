"use client";

import { RegisterDialog } from "../../components/auth/RegisterDialog";

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-8">
      <RegisterDialog open={true} />
    </div>
  );
}


