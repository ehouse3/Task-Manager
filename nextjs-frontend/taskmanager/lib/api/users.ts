import { apiClient } from "./client";
import { User } from "./types/user";
import { Project } from "./types/project";

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

export const getProjectsByUserId = async (id: number): Promise<Project[]> => {
  const response = await apiClient.get(`/users/projects/${id}`);
  return response.data;
}

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
