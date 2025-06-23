import axios from "axios";
import { AuthStorage } from "../lib/auth-storage";
import { Storage } from "../lib/storage";

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor - add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = AuthStorage.getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor - handle errors globally
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    // Handle network errors
    if (!error.response) {
      console.error("Network error:", error.message);
      return Promise.reject({
        message: "Network error. Please check your connection.",
        error: "NetworkError",
        statusCode: 0,
      });
    }

    const { status, data } = error.response;

    switch (status) {
      case 401:
        // Unauthorized - clear storage and redirect to login
        Storage.clear();
        window.location.href = "/login";
        console.error("Unauthorized access");
        break;
      case 403:
        console.error("Forbidden access");
        break;
      case 404:
        console.error("Resource not found");
        break;
      case 500:
        console.error("Internal server error");
        break;
      default:
        console.error(`HTTP error ${status}:`, data?.message || error.message);
    }

    return Promise.reject({
      message: data?.message || error.message,
      error: data?.error || "UnknownError",
      statusCode: status,
    });
  }
);
