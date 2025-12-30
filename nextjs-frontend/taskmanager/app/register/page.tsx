"use client";

import { Button, TextField, PasswordField } from "@/lib/components";
import { RegisterRequest} from "@/lib/types/auth";
import { FormEvent, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthContext";
import { User } from "@/lib/types/user";

export default function UserRegister() {
  const [result, setResult] = useState<string>(""); // result of registration
  const router = useRouter();
  const auth = useAuth(); // Assigning auth user

  // Verify field constraints
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
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData: FormData = new FormData(event.currentTarget);
    const request: RegisterRequest = {
      username: formData.get("username")?.toString() as string, // field required
      email: formData.get("email")?.toString() as string, // field required
      password: formData.get("password")?.toString() as string, // field required
    };

    try {
      // Local field validation
      if (!isValidUsername(request.username)) {
        setResult("Invalid Username");
        throw new Error("invalid username");
      }
      if (!isValidEmail(request.email)) {
        setResult("Invalid Email");
        throw new Error("invalid email");
      }
      if (!isValidPassword(request.password)) {
        setResult("Invalid Password");
        throw new Error("invalid password");
      }

      if (auth == undefined) {
        setResult("Registration Failed");
        return;
      }

      // Awaiting server response
      setResult("");
      // set loading

      // Handle page redirections
      const user: User | null = await auth.register(request);
      if (user == null) {
        setResult("Invalid login information");
        return;
      }
      router.push(`/${user.username}`); 
    } catch {}
  };

  return (
    <div className="flex flex-col items-center p-10 my-30 bg-foreground">
      <h1>User Registration</h1>
      <form
        className="flex flex-col w-sm items-center"
        onSubmit={handleSubmit}
      >
        <TextField placeHolder="Username" required={true} name="username" />
        <TextField placeHolder="Email" required={true} name="email" />
        <PasswordField placeHolder="Password" required={true} name="password" />
        <Button innerText="Create" type="submit" />
        <h3 className="text-red-800">{result}</h3>
      </form>
    </div>
  );
}
