"use client";

import { Button, TextField, PasswordField } from "@/lib/components";
import { login } from "@/lib/api/auth";
import { LoginRequest } from "@/lib/types/auth";
import { FormEvent, FormEventHandler, useState } from "react";

export default function UserLogin() {
  const [result, setResult] = useState<string>(""); // result of login

  // Handler for submitting form. Generates reigstration request for new user and calls api
  const handleSubmit: FormEventHandler<HTMLFormElement> = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);
    const request: LoginRequest = {
      username: formData.get("username")?.toString() as string, // field required
      password: formData.get("password")?.toString() as string, // field required
    };

    login(request).catch(() => { // Catch server conflict for username or email (Expand for different errors)
      setResult("Username or password is incorrect");
    });
  };

  return (
    <div className="flex flex-col">
      <form className="flex flex-col w-sm items-center" onSubmit={handleSubmit}>
        <h1>User Login</h1>
        <TextField placeHolder="Username" required={true} name="username" />
        <PasswordField placeHolder="Password" required={true} name="password" />
        <Button innerText="Login" type="submit" />
        <h3 className="text-red-800">{result}</h3>
      </form>
    </div>
  );
}
