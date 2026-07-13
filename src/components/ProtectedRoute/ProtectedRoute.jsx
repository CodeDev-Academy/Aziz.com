import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/auth/useAuth';

export function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <p>Verifying authentication...</p>
      </div>
    );
  }

  if (!user) {
    // Redirect to signin
    return <Navigate to="/signin" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If not authorized, redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
}
