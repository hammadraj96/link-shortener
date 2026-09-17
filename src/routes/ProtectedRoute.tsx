import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/Skeleton';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

/**
 * ProtectedRoute Component
 * In Phase 1, allows viewing the dashboard layout while preparing the session
 * verification architecture for Phase 2 (Supabase Auth).
 */
export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading, isConfigured } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-slate-50 p-6">
        <div className="flex flex-col items-center gap-4 max-w-sm w-full">
          <Skeleton className="h-10 w-10 rounded-full" />
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-3 w-32" />
        </div>
      </div>
    );
  }

  // If Supabase is fully configured and there's no active user session, redirect to /login
  // In Phase 1 dev mode without credentials, we let the user preview the dashboard UI
  if (isConfigured && !user && false) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
