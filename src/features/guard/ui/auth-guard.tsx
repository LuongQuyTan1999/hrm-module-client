"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/entities/auth";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  requireAuth?: boolean;
  redirectTo?: string;
  allowedRoles?: string[];
}

export function AuthGuard({
  children,
  fallback,
  requireAuth = true,
  redirectTo = "/login",
  allowedRoles,
}: AuthGuardProps) {
  const { user, isAuthenticated, isLoading, isInitialized } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isInitialized) return;

    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo);
      return;
    }

    if (isAuthenticated && allowedRoles && user) {
      if (!allowedRoles.includes(user.role)) {
        router.push("/unauthorized");
        return;
      }
    }
  }, [
    isInitialized,
    isAuthenticated,
    requireAuth,
    user,
    allowedRoles,
    router,
    redirectTo,
  ]);

  // Show loading while initializing
  if (!isInitialized || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Show fallback while redirecting
  if (requireAuth && !isAuthenticated) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Redirecting to login...</p>
          </div>
        </div>
      )
    );
  }

  // Check role access
  if (
    isAuthenticated &&
    allowedRoles &&
    user &&
    !allowedRoles.includes(user.role)
  ) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
