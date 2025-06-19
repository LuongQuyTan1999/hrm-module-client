import { apiClient } from "@/shared/api";
import type { AuthTokens, LoginCredentials, User } from "@/shared/types/auth";

export const authApi = {
  login: async (
    credentials: LoginCredentials
  ): Promise<{ user: User; token: string }> => {
    return await apiClient.post("/auth/signin", credentials);
  },

  logout: async (): Promise<void> => {
    await apiClient.post("/auth/logout");
  },

  me: async (): Promise<User> => {
    return await apiClient.get("/auth/me");
  },

  refreshToken: async (refreshToken: string): Promise<AuthTokens> => {
    return await apiClient.post("/auth/refresh", { refreshToken });
  },
};
