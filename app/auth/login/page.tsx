"use client";

import { LoginDialog } from "../../components/auth/LoginDialog";

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-6rem)] items-center justify-center px-4 py-8">
      <LoginDialog open={true} />
    </div>
  );
}


