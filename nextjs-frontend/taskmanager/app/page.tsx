"use client";

import { Navigate } from "@/lib/components";

export default function Home() {
  return (
    <div className="flex flex-col items-center p-10 my-30 bg-foreground">
      <div className="text-center font-bold text-[6rem] text-title">
        Task Manager
      </div>
      <h2>The Project and Task Managment Application </h2>
      <div className="flex flex-col w-sm my-6">
        <Navigate variant="small" href="/register">Register New User</Navigate>
        <Navigate variant="small" href="/login">Login</Navigate>
      </div>
    </div>
  );
}
