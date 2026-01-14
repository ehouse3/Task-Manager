import { apiClient } from "./client";
import { LoginRequest, RegisterRequest, AuthResponse } from "./types/auth";

// Login user
export const login = async (
  loginRequest: LoginRequest
): Promise<AuthResponse> => {
  const response = await apiClient.post("/auth/login", loginRequest);
  return response.data;
};

// Register new user
export const register = async (
  registerRequest: RegisterRequest
): Promise<AuthResponse> => {
  const response = await apiClient.post("/auth/register", registerRequest);
  return response.data;
};
