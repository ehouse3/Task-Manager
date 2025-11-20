"use client";

import { Button, TextField, PasswordField } from "@/lib/components";
import { register } from "@/lib/api/auth";
import { AuthResponse, RegisterRequest } from "@/lib/types/auth";
import { FormEvent, FormEventHandler, useState } from "react";

export default function UserRegister() {
  const [result, setResult] = useState<string>(""); // result of registration

  function isValidUsername(username: string): boolean {
    if (username.length < 1) {
      return false;
    }
    return true;
  }
  function isValidEmail(email: string): boolean {
    if (email.length < 1) {
      return false;
    }
    if (!email.includes("@")) {
      return false;
    }
    return true;
  }
  function isValidPassword(password: string): boolean {
    if (password.length < 1) {
      return false;
    }
    return true;
  }

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

    try {
      if (!isValidUsername(request.username)) { throw new Error("invalid username"); }
      if (!isValidEmail(request.email)) { throw new Error("invalid email"); }
      if (!isValidPassword(request.password)) { throw new Error("invalid password"); }

      const response: Promise<AuthResponse> = register(request);
      console.log(response);
    } catch (error) {
      setResult("Invalid arguments");
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col">
      <form className="flex flex-col w-sm items-center  " onSubmit={handleSubmit}>
        <h1>User Registration</h1>
        <TextField placeHolder="Username" required={true} name="username" />
        <TextField placeHolder="Email" required={true} name="email" />
        <PasswordField placeHolder="Password" required={true} name="password" />
        <Button innerText="Create" type="submit" />
        <h3 className="text-red-800">{result}</h3>
      </form>
    </div>
  );
}
