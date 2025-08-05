import React from 'react';
import { useAuth, UserRole } from '../contexts/AuthContext';
import { LoginForm } from './LoginForm';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-dashboard-bg flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <LoginForm />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen bg-dashboard-bg flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-medium text-dashboard-text mb-2">Acceso Denegado</h1>
          <p className="text-dashboard-text-muted">No tienes permisos para acceder a esta sección</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}