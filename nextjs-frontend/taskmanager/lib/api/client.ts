"use client";

import axios from "axios";
import { redirect } from "next/navigation";

// Base URL for Spring Boot backend
const API_BASE_URL = "http://localhost:8080/api";

// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach token to all requests. Backend will verify token
apiClient.interceptors.request.use((config) => {
  const token: string | null = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors globally
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      redirect('/login');
    }
    return Promise.reject(error);
  }
);
