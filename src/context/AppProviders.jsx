import React from 'react';
import { AuthProvider } from '../features/auth/AuthContext';
import { FavoritesProvider } from '../features/favorites/FavoritesContext';

export function AppProviders({ children }) {
  return (
    <AuthProvider>
      <FavoritesProvider>
        {children}
      </FavoritesProvider>
    </AuthProvider>
  );
}
