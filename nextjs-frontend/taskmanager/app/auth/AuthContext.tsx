"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";
import { User } from "@/lib/types/user";
import {
  AuthResponse,
  LoginRequest,
  // LoginResult,
  RegisterRequest,
  // RegisterResult,
} from "@/lib/types/auth";
import { login, register } from "@/lib/api/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (request: LoginRequest) => Promise<User | null>;
  register: (request: RegisterRequest) => Promise<User | null>;
  logout: () => void;
}

// Context that stores authentication functions and user/token info
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Provides auth context, and AuthContextType functions */
export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // States for context type
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  /** On valid registration, assign new token and user in local storage, returning RegisterResult */
  const authRegister = async (
    request: RegisterRequest
  ): Promise<User | null> => {
    try {
      // Fetch user with login request
      const data: AuthResponse = await register(request);
      const user: User = {
        id: data.userId,
        username: data.username,
        userRole: data.role,
        email: data.email,
      };

      // assign token for user validation in cookies
      cookieStore.set({
        name: "token",
        value: data.token,
      });
      cookieStore.set({
        name: "user",
        value: JSON.stringify(user),
      });

      setToken(data.token);
      setUser(user);

      return user;
    } catch (error) {
      return null;
    }
  };

  /** On valid login, assigns token and user in local storage, returning LoginResult */
  const authLogin = async (request: LoginRequest): Promise<User | null> => {
    try {
      // Fetch user with login request
      const data: AuthResponse = await login(request);
      const user: User = {
        id: data.userId,
        username: data.username,
        userRole: data.role,
        email: data.email,
      };

      // assign token for user validation in cookies
      cookieStore.set({
        name: "token",
        value: data.token,
      });
      cookieStore.set({
        name: "user",
        value: JSON.stringify(user),
      });

      return user;
    } catch (error) {
      return null;
    }
  };

  /** Removes token and user from local storage */
  const authLogout = () => {
    // Remove all user & token information
    setToken(null);
    setUser(null);
    cookieStore.delete("token");
    cookieStore.delete("user");
  };

  const authContextProps = {
    user: user,
    token: token,
    login: authLogin,
    register: authRegister,
    logout: authLogout,
  };

  return (
    <AuthContext.Provider value={authContextProps}>
      {children}
    </AuthContext.Provider>
  );
};
