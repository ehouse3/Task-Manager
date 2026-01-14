"use client";

import { Button, TextField, PasswordField } from "@/lib/components";
import { LoginRequest } from "@/lib/api/types/auth";
import { FormEvent, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthContext";
import { User } from "@/lib/api/types/user";

export default function UserLogin() {
  const [result, setResult] = useState<string>(""); // result of login
  const auth = useAuth();
  const router = useRouter();

  // Verify field constraints
  function isValidUsername(username: string): boolean {
    if (username.length < 1) {
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

  // Handler for submitting form. Generates login request for user and calls api
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);
    const request: LoginRequest = {
      username: formData.get("username")?.toString() as string, // field required
      password: formData.get("password")?.toString() as string, // field required
    };

    try {
      // Local field validation
      if (!isValidUsername(request.username)) {
        setResult("Invalid Username");
        throw new Error("invalid username");
      }
      if (!isValidPassword(request.password)) {
        setResult("Invalid Password");
        throw new Error("invalid password");
      }

      if (auth == undefined) {
        setResult("Login Failed");
        return;
      }

      // Awaiting server response
      setResult("");
      // set loading

      // Login user
      const user: User | null = await auth.login(request);

      // Handle page redirection
      if (user == null) {
        setResult("Invalid login information");
        return;
      }
      setResult("Login Successful");
      router.push(`/${user.username}`);
    } catch {}
  };

  return (
    <div className="flex flex-col items-center p-10 my-30 bg-foreground">
      <h1 className="title mb-3">User Login</h1>
      <form className="flex flex-col w-sm items-center" onSubmit={handleSubmit}>
        <TextField placeHolder="Username" required={true} name="username" />
        <PasswordField placeHolder="Password" required={true} name="password" />
        <Button variant="small" type="submit">
          Login
        </Button>
        <div className="mt-3 text-center">  
          <h3 className="text-red-800">{result}</h3>
        </div>
      </form>
    </div>
  );
}
