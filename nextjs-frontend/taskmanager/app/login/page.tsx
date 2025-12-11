"use client";

import { Button, TextField, PasswordField } from "@/lib/components";
import { LoginRequest, LoginResult } from "@/lib/types/auth";
import { FormEvent, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthContext";

export default function UserLogin() {
  const [result, setResult] = useState<string>(""); // result of login
  const auth = useAuth();
  const router = useRouter();

  // Handler for submitting form. Generates reigstration request for new user and calls api
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);
    const request: LoginRequest = {
      username: formData.get("username")?.toString() as string, // field required
      password: formData.get("password")?.toString() as string, // field required
    };

    if (auth == undefined) {
      setResult("Login Failed");
      return;
    }

    // Handle page redirection
    const loginResult: LoginResult = await auth.login(request);
    if (loginResult == LoginResult.FAILED) {
      setResult("Invalid login information");
      return;
    }
    if (loginResult == LoginResult.SUCCESS) {
      router.push("/dashboard"); // utilize dynamic routing
      return;
    }
  };

  return (
    <div className="flex flex-col items-center p-10 my-30 bg-foreground">
      <h1>User Login</h1>
      <form className="flex flex-col w-sm items-center" onSubmit={handleSubmit}>
        <TextField placeHolder="Username" required={true} name="username" />
        <PasswordField placeHolder="Password" required={true} name="password" />
        <Button innerText="Login" type="submit" />
        <h3 className="text-red-800">{result}</h3>
      </form>
    </div>
  );
}
