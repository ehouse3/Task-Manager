"use client";

import { Button, TextField, PasswordField } from "@/lib/components";
import { login } from "@/lib/api/auth";
import { AuthResponse, LoginRequest } from "@/lib/types/auth";
import { FormEvent, FormEventHandler } from "react";

export default function UserLogin() {
  // Handler for submitting form. Generates reigstration request for new user and calls api
  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);
    const request: LoginRequest = {
      username: formData.get("username")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    };
    const response: Promise<AuthResponse> = login(request);
    console.log(response);
  };

  return (
    <div className="flex flex-col">
      <h1>User Login</h1>
      <form className="flex flex-col w-sm" onSubmit={handleSubmit}>
        <TextField placeHolder="Username" required={true} name="username" />
        <PasswordField placeHolder="Password" required={true} name="password" />
        <Button innerText="Login" type="submit" />
      </form>
    </div>
  );
}
