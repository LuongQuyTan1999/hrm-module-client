"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/entities/auth";

interface PublicGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
  redirectIfAuthenticated?: boolean;
}

export function PublicGuard({
  children,
  redirectTo = "/dashboard",
  redirectIfAuthenticated = true,
}: PublicGuardProps) {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    if (redirectIfAuthenticated && isAuthenticated) {
      router.push(redirectTo);
      return;
    }
  }, [
    isInitialized,
    isAuthenticated,
    redirectIfAuthenticated,
    router,
    redirectTo,
  ]);

  // ⏳ Loading state while checking auth
  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // 🔄 Show loading while redirecting authenticated users
  if (redirectIfAuthenticated && isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Already logged in, redirecting...</p>
        </div>
      </div>
    );
  }

  // ✅ Render page content for non-authenticated users
  return <>{children}</>;
}
