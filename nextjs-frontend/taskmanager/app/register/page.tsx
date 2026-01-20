"use client";

import { Button, TextField, PasswordField } from "@/lib/components";
import { RegisterRequest } from "@/lib/api/types/auth";
import { FormEvent, FormEventHandler, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../auth/AuthContext";
import { User } from "@/lib/api/types/user";

interface RegisterForm {
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

export default function UserRegister() {
  const [result, setResult] = useState<string>(""); // result of registration
  const router = useRouter();
  const auth = useAuth(); // Assigning auth user

  // Verify registration field constraints
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
  function passwordsMatch(
    password: string,
    passwordConfirmation: string,
  ): boolean {
    return password === passwordConfirmation;
  }

  // Handler for submitting form. Generates reigstration request for new user and calls api
  const handleSubmit: FormEventHandler<HTMLFormElement> = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    const formData: FormData = new FormData(event.currentTarget);
    const registerForm: RegisterForm = {
      username: formData.get("username")?.toString() as string, // field required
      email: formData.get("email")?.toString() as string, // field required
      password: formData.get("password")?.toString() as string, // field required
      passwordConfirmation: formData
        .get("passwordConfirmation")
        ?.toString() as string, // field required
    };

    // Local field validation
    if (!isValidUsername(registerForm.username)) {
      setResult("Invalid Username");
      return;
    }
    if (!isValidEmail(registerForm.email)) {
      setResult("Invalid Email");
      return;
    }
    if (!isValidPassword(registerForm.password)) {
      setResult("Invalid Password");
      return;
    }
    if (
      !passwordsMatch(registerForm.password, registerForm.passwordConfirmation)
    ) {
      setResult("Passwords must match");
      return;
    }

    // Awaiting server response
    setResult("");
    // set loading

    // Convert to RegisterRequest type for api
    const request: RegisterRequest = {
      username: registerForm.username,
      email: registerForm.email,
      password: registerForm.password,
    };

    // Register user
    const user: User | null = await auth.register(request);

    // Handle Redirection
    if (user == null) {
      setResult("Invalid Registration");
      return;
    }
    setResult("Registration Successful");
    router.push(`/dashboard/${user.username}`);
  };

  return (
    <div className="flex flex-col items-center p-10 my-30 bg-foreground">
      <h1 className="title mb-3">User Registration</h1>
      <form className="flex flex-col w-sm items-center" onSubmit={handleSubmit}>
        <TextField placeHolder="Username" required={true} name="username" />
        <TextField placeHolder="Email" required={true} name="email" />
        <div id="break" className="my-2"></div>
        <PasswordField placeHolder="Password" required={true} name="password" />
        <PasswordField
          placeHolder="Confirm Password"
          required={true}
          name="passwordConfirmation"
        />
        <Button variant="medium" type="submit">
          Create
        </Button>
        <div className="mt-3 text-center">
          <h3 className="text-red-800">{result}</h3>
        </div>
      </form>
    </div>
  );
}
