import React, { createContext, ReactNode, useContext, useState } from "react";
import { User } from "@/lib/types/user";
import { AuthResponse, LoginRequest, LoginResult, RegisterRequest } from "@/lib/types/auth";
import { login, register } from "@/lib/api/auth";

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (request: LoginRequest) => Promise<void>;
  register: (request: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined); // Or with a default value

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // States for context type
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const authRegister = (request: RegisterRequest) => {
    const response: Promise<AuthResponse> = register(request)
  }

  // Set token
  const authLogin = async (request: LoginRequest): Promise<LoginResult> => {
    try {
      const data: AuthResponse = await login(request);
      const user: User = {
        id: data.userId,
        username: data.username,
        userRole: data.role,
        email: data.email,
      }
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(user));

      setToken(data.token);
      setUser(user);

      // Navigate to home or user page

      return LoginResult.SUCCESS
    } catch (error) {
      return LoginResult.FAILED;
    }
  };

  const authLogout = () => {

  };
  const authLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const authContextProps = {
    user: user,
    token: token,
    login: authLogin,
    register: authRegister,
    logout: authLogout
  }

  return (
    <AuthContext.Provider value={authContextProps}>
      {children}
    </AuthContext.Provider>
  );
};
