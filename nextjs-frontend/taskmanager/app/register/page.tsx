"use client";

import { Button, TextField, PasswordField } from "@/lib/components";
import { register } from "@/lib/api/auth";
import { RegisterRequest } from "@/lib/types/auth";
import { FormEvent, FormEventHandler } from "react";

export default function UserRegister() {
  // Handler for submitting form. Generates reigstration request for new user and calls api
  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);
    const request: RegisterRequest = {
      username: formData.get("username")?.toString() ?? "",
      email: formData.get("email")?.toString() ?? "",
      password: formData.get("password")?.toString() ?? "",
    };
    register(request);
  };

  return (
    <div className="flex flex-col">
      <h1>User Registration</h1>
      <form className="flex flex-col w-sm" onSubmit={handleSubmit}>
        <TextField placeHolder="Username" required={true} name="username" />
        <TextField placeHolder="Email" required={true} name="email" />
        <PasswordField placeHolder="Password" required={true} name="password" />
        <Button innerText="Create" type="submit" />
      </form>
    </div>
  );
}
