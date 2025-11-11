"use client";

import { TextField, PasswordField } from "@/lib/components";

export default function UserRegister() {
  return (
    <div>
      <h1>User Registration</h1>
      <TextField placeHolder="Username"/>
      <PasswordField placeHolder="Password"/>
    </div>
  );
}
