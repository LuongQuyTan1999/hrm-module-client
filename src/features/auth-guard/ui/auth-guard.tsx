"use client";

import { useAuth } from "@/entities/auth";
import { LoginModal } from "@/widgets/login-modal";
import { useEffect, useState } from "react";

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const { isAuthenticated, isLoading, isInitialized } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setShowLogin(true);
    }
  }, [isAuthenticated, isLoading]);

  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <>
        {fallback || (
          <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-900 mb-2">
                Authentication Required
              </h1>
              <p className="text-gray-600 mb-4">
                Please sign in to access this page
              </p>
            </div>
          </div>
        )}
        <LoginModal open={showLogin} onOpenChange={setShowLogin} />
      </>
    );
  }

  return <>{children}</>;
}
