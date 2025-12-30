"use client";

import React, { createContext, ReactNode, useContext, useState, useEffect } from "react";
import { User } from "@/lib/types/user";
import { AuthResponse, LoginRequest, RegisterRequest } from "@/lib/types/auth";
import { login, register } from "@/lib/api/auth";
import { getUserById } from "@/lib/api/users";

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
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
  const [isLoading, setIsLoading] = useState<boolean>(true); // improve so useAuth() initializes the user and token state

  /** Initialize auth from cookies on mount */
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Retrieve tokens and users from cookies
        const tokenCookie: CookieListItem | null = await cookieStore.get("token");
        const userCookie: CookieListItem | null = await cookieStore.get("user");

        if (tokenCookie && userCookie && userCookie.value && tokenCookie.value) {
          const user: User = JSON.parse(userCookie.value);
          const token: string = tokenCookie.value;
          setToken(token);
          setUser(user);
        }
      } catch (error) {
        console.error("Failed to initialize auth from cookies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /** On valid registration, assign new token and user in cookies, returning RegisterResult */
  const authRegister = async (
    request: RegisterRequest
  ): Promise<User | null> => {
    try {
      // Fetch user with login request
      const data: AuthResponse = await register(request);

      const user: User = await getUserById(data.userId);

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
      
      const user: User = await getUserById(data.userId);

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
    isLoading: isLoading,
    register: authRegister,
    logout: authLogout,
  };

  return (
    <AuthContext.Provider value={authContextProps}>
      {children}
    </AuthContext.Provider>
  );
};
