import React, { createContext, useState, useEffect } from 'react';
import { authApi } from '../../api/authApi';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('cozycraft_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const accessToken = localStorage.getItem('cozycraft_access_token');
      const refreshToken = localStorage.getItem('cozycraft_refresh_token');

      if (!accessToken || !refreshToken) {
        setLoading(false);
        return;
      }

      try {
        // Try fetching user profile with current access token
        const userData = await authApi.getProfile(accessToken);
        const role = (userData.is_superuser || userData.is_staff) ? 'admin' : 'customer';
        const processedUser = {
          id: userData.id,
          name: userData.full_name || userData.username,
          email: userData.email,
          role: role,
          profile: userData.profile
        };
        setUser(processedUser);
        localStorage.setItem('cozycraft_user', JSON.stringify(processedUser));
      } catch (err) {
        // Access token might have expired, attempt silent token refresh
        try {
          const refreshRes = await authApi.refreshToken(refreshToken);
          const newAccessToken = refreshRes.access;
          localStorage.setItem('cozycraft_access_token', newAccessToken);

          // Retry fetching user profile with new access token
          const userData = await authApi.getProfile(newAccessToken);
          const role = (userData.is_superuser || userData.is_staff) ? 'admin' : 'customer';
          const processedUser = {
            id: userData.id,
            name: userData.full_name || userData.username,
            email: userData.email,
            role: role,
            profile: userData.profile
          };
          setUser(processedUser);
          localStorage.setItem('cozycraft_user', JSON.stringify(processedUser));
        } catch (refreshErr) {
          // Both tokens invalid/expired, log out
          console.warn("Session expired. Logging out user.");
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authApi.login(email, password);
      const { access, refresh, user: userData } = data;

      const role = (userData.is_superuser || userData.is_staff) ? 'admin' : 'customer';
      const processedUser = {
        id: userData.id,
        name: userData.full_name || userData.username,
        email: userData.email,
        role: role,
        profile: userData.profile
      };

      localStorage.setItem('cozycraft_access_token', access);
      localStorage.setItem('cozycraft_refresh_token', refresh);
      localStorage.setItem('cozycraft_user', JSON.stringify(processedUser));
      
      setUser(processedUser);
      return processedUser;
    } catch (err) {
      console.error("Login API call failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password) => {
    setLoading(true);
    try {
      const data = await authApi.register(name, email, password);
      const { user: userData, tokens } = data;
      const { access, refresh } = tokens;

      const role = (userData.is_superuser || userData.is_staff) ? 'admin' : 'customer';
      const processedUser = {
        id: userData.id,
        name: userData.full_name || userData.username,
        email: userData.email,
        role: role,
        profile: userData.profile
      };

      localStorage.setItem('cozycraft_access_token', access);
      localStorage.setItem('cozycraft_refresh_token', refresh);
      localStorage.setItem('cozycraft_user', JSON.stringify(processedUser));
      
      setUser(processedUser);
      return processedUser;
    } catch (err) {
      console.error("Registration API call failed:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('cozycraft_access_token');
    localStorage.removeItem('cozycraft_refresh_token');
    localStorage.removeItem('cozycraft_user');
    setUser(null);
  };

  const updateUser = (updatedData) => {
    setUser((prev) => {
      const next = { ...prev, ...updatedData };
      localStorage.setItem('cozycraft_user', JSON.stringify(next));
      return next;
    });
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
