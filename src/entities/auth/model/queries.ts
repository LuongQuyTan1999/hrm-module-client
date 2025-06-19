import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { useAuthStore } from "./store";

const authKeys = {
  me: ["auth", "me"] as const,
};

export function useMe() {
  const { isAuthenticated } = useAuthStore();

  return useQuery({
    queryKey: authKeys.me,
    queryFn: authApi.me,
    enabled: isAuthenticated,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: ({ user, token }) => {
      setAuth(user, {
        accessToken: token,
        refreshToken: "",
      });
      queryClient.setQueryData(authKeys.me, user);
    },
  });
}

export function useLogout() {
  // const queryClient = useQueryClient();
  const clearAuth = useAuthStore((state) => state.clearAuth);
  clearAuth();

  // return useMutation({
  //   mutationFn: authApi.logout,
  //   onSuccess: () => {
  //     clearAuth();
  //     queryClient.clear();
  //     window.location.href = "/login";
  //   },
  // });
}
