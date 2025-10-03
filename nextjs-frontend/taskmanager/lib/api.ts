import axios from 'axios';

// Base URL for your Spring Boot backend
const API_BASE_URL = 'http://localhost:8080/api/users';

// Define User type matching your backend User entity
export interface User {
  id?: number;
  username: string;
  email: string;
  password?: string;
  createdAt?: string;
}

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions
export const userAPI = {
  // Get all users
  getAllUsers: async (): Promise<User[]> => {
    const response = await apiClient.get('');
    return response.data;
  },

  // Get user by ID
  getUserById: async (id: number): Promise<User> => {
    const response = await apiClient.get(`/${id}`);
    return response.data;
  },

  // Create new user
  createUser: async (user: User): Promise<User> => {
    const response = await apiClient.post('', user);
    return response.data;
  },

  // Update user
  updateUser: async (id: number, user: User): Promise<User> => {
    const response = await apiClient.put(`/${id}`, user);
    return response.data;
  },

  // Delete user
  deleteUser: async (id: number): Promise<void> => {
    await apiClient.delete(`/${id}`);
  },

  // Get user by username
  getUserByUsername: async (username: string): Promise<User> => {
    const response = await apiClient.get(`/username/${username}`);
    return response.data;
  },

  // Get user by email
  getUserByEmail: async (email: string): Promise<User> => {
    const response = await apiClient.get(`/email/${email}`);
    return response.data;
  },
};