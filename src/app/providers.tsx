"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
        staleTime: 60 * 1000,
        gcTime: 10 * 60 * 1000,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
