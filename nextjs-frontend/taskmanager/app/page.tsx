"use client";

import { Navigate } from "@/lib/components";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <Navigate innerText="Register new user" href="/register" />
      <Navigate innerText="Login" href="/login" />
    </div>
  );
}
