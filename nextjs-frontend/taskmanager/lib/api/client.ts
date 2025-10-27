import axios from 'axios';

// Base URL for Spring Boot backend
const API_BASE_URL = 'http://localhost:8080/api';



// Create axios instance with default config
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// // Handle errors globally
// apiClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response?.status === 401) {
//       // Redirect to login or refresh token
//     }
//     return Promise.reject(error);
//   }
// );