import { useEffect } from "react";
import { useMe } from "./queries";
import { useAuthStore } from "./store";

export function useAuth() {
  const { user, isAuthenticated, isInitialized, initialize } = useAuthStore();
  const { data: freshUser, isLoading: isFetchingUser } = useMe();

  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  return {
    user: freshUser || user,
    isAuthenticated,
    isInitialized,
    isLoading: !isInitialized || (isAuthenticated && isFetchingUser),
  };
}
