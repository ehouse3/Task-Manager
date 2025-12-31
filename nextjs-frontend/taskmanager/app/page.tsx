"use client";

import { Navigate } from "@/lib/components";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-10 my-30 bg-foreground">
      <div className="text-center font-bold text-7xl text-title mb-5">
        Task Manager
      </div>
      <div className="flex flex-col w-sm">
        <Navigate href="/register">Register New User</Navigate>
        <Navigate href="/login">Login</Navigate>
      </div>
    </div>
  );
}
