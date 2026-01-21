"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useState,
  useEffect,
} from "react";
import { User } from "@/lib/api/types/user";
import {
  AuthResponse,
  LoginRequest,
  RegisterRequest,
} from "@/lib/api/types/auth";
import { login, register } from "@/lib/api/auth";
import { getUserById } from "@/lib/api/users";

// Context for authenticated pages (no null)
interface AuthenticatedContextType {
  user: User;
  token: string;
  isLoading: boolean; // already loaded?
  logout: () => void;
  refreshUser: () => Promise<User | null>;
}

// Context for unauthenticated pages (/login or /register)
interface UnauthenticatedContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (request: LoginRequest) => Promise<User | null>;
  register: (request: RegisterRequest) => Promise<User | null>;
  logout: () => void;
  refreshUser: () => Promise<User | null>;
}

// Context that stores authentication functions and user/token info
const AuthContext = createContext<UnauthenticatedContextType | undefined>(
  undefined,
);

/**
 * Hook for unprotected pages that can have null values (like user or token)
 * Returns Unauthenticated context functions (like login() or register())
 */
export function useUnauth(): UnauthenticatedContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

/**
 * Hook for protected pages that require authentication
 * Returns AuthenticatedContext functions
 */
export function useAuth(): AuthenticatedContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  if (!context.user || !context.token) {
    throw new Error("User must be authenticated to use useAuth hook");
  }

  // Migrate variable from AuthContextType to AuthenticatedContextType
  const authenticatedContext: AuthenticatedContextType = {
    user: context.user,
    token: context.token,
    isLoading: context.isLoading,
    logout: context.logout,
    refreshUser: context.refreshUser,
  };

  return authenticatedContext;
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
        const tokenCookie: CookieListItem | null =
          await cookieStore.get("token");
        const userCookie: CookieListItem | null = await cookieStore.get("user");

        // Assign state if user or tokens in cookies
        if (tokenCookie && userCookie) {
          if (userCookie.value && tokenCookie.value) {
            const user: User = JSON.parse(userCookie.value);
            const token: string = tokenCookie.value;
            setToken(token);
            setUser(user);
          }
        }
      } catch (error) {
        console.error("Failed to initialize auth from cookies:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /** Set JWT and user in both state and cookies */
  const setAuthData = async (token: string, userId: number): Promise<User> => {
    // Assign token in cookies and state
    console.debug("Assigning token:", token);
    cookieStore.set({
      name: "token",
      value: token,
    });
    setToken(token);

    // Fetch user from API and assign to cookies and state
    console.debug("Fetching user data for id", userId);
    const user: User = await getUserById(userId);

    // Assign user in cookies and state
    console.debug("Assigning user in cookies", user);
    cookieStore.set({
      name: "user",
      value: JSON.stringify(user), // Utilize safer function to parse json
    });
    setUser(user);

    return user;
  };

  /** On valid registration, assign new token and user in cookies, returning RegisterResult */
  const authRegister = async (
    request: RegisterRequest,
  ): Promise<User | null> => {
    try {
      // Fetch Token and Id with login request
      console.debug("Registering new user", request);
      const data: AuthResponse = await register(request);

      const user = await setAuthData(data.token, data.userId);

      console.debug("Registration Successful!");
      return user;
    } catch (error) {
      console.warn("Registration Failed:", request);
      return null;
    }
  };

  /** On valid login, assigns token and user in cookies, returning LoginResult */
  const authLogin = async (request: LoginRequest): Promise<User | null> => {
    try {
      // Perform login request and retrieve token + userId
      console.debug("Logging in user", request);
      const data: AuthResponse = await login(request);

      const user = await setAuthData(data.token, data.userId);

      console.debug("Login Successful!");
      return user;
    } catch (error) {
      console.warn("Login Failed:", request);
      return null;
    }
  };

  /** Removes token and user from cookies */
  const authLogout = () => {
    // Remove all user & token information
    setToken(null);
    setUser(null);
    cookieStore.delete("token");
    cookieStore.delete("user");
  };

  /** Refreshes the AuthContexts user state */
  const refreshUser = async (): Promise<User | null> => {
    try {
      // Check cookies for user
      const userCookie: CookieListItem | null = await cookieStore.get("user");

      if (!userCookie || !userCookie.value) {
        console.warn("No user found in cookies");
        return null;
      }

      // Parse user from cookie to get ID
      const cachedUser: User = JSON.parse(userCookie.value);

      // Fetch fresh user data and update state/cookies
      const freshUser = await setAuthData(token!, cachedUser.id);

      console.debug("User refresh successful!");
      return freshUser;
    } catch (error) {
      console.warn("User refresh failed:", error);
      return null;
    }
  };

  const authContextProps = {
    user: user,
    token: token,
    login: authLogin,
    isLoading: isLoading,
    register: authRegister,
    logout: authLogout,
    refreshUser: refreshUser,
  };
  return (
    <AuthContext.Provider value={authContextProps}>
      {children}
    </AuthContext.Provider>
  );
};
