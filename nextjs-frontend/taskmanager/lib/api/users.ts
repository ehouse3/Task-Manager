import { apiClient } from "./client";
import { User, CreateUserDto, UpdateUserDto } from "../types/user";


// Get all users
export const getAllUsers = async (): Promise<User[]> => {
  const response = await apiClient.get("/users");
  return response.data;
};

// Get user by ID
export const getUserById = async (id: number): Promise<User> => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

// Create new user
export const createUser = async (user: CreateUserDto): Promise<User> => {
  const response = await apiClient.post("/users", user);
  return response.data;
};

// Update user
export const updateUser = async (
  id: number,
  user: UpdateUserDto
): Promise<User> => {
  const response = await apiClient.put(`/users/${id}`, user);
  return response.data;
};

// Delete user
export const deleteUser = async (id: number): Promise<void> => {
  await apiClient.delete(`/users/${id}`);
};

// Get user by username
export const getUserByUsername = async (username: string): Promise<User> => {
  const response = await apiClient.get(`/users/username/${username}`);
  return response.data;
};

// Get user by email
export const getUserByEmail = async (email: string): Promise<User> => {
  const response = await apiClient.get(`/users/email/${email}`);
  return response.data;
};
