import { AuthStorage } from "@/shared/lib/auth-storage";
import type { AuthTokens, User } from "@/shared/types/auth";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isInitialized: boolean;
}

interface AuthActions {
  setAuth: (user: User, tokens: AuthTokens) => void;
  clearAuth: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isInitialized: false,

      setAuth: (user, tokens) => {
        AuthStorage.setTokens(tokens);
        AuthStorage.setUserData(user);
        set({
          user,
          isAuthenticated: true,
          isInitialized: true,
        });
      },

      clearAuth: () => {
        AuthStorage.clearTokens();
        set({
          user: null,
          isAuthenticated: false,
          isInitialized: true,
        });
      },

      initialize: () => {
        const token = AuthStorage.getAccessToken();
        const userData = AuthStorage.getUserData();

        if (token && userData) {
          set({
            user: userData,
            isAuthenticated: true,
            isInitialized: true,
          });
        } else {
          set({ isInitialized: true });
        }
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
