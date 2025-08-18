import React, { createContext, useContext, ReactNode } from 'react';
import api from '@/api';
import { useAuth } from './AuthContext';

interface AdminContextType {
  isLoggedIn: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuth();

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/user/login', { email, password });
      if (response.data && response.data.token) {
        const { user, token } = response.data;
        auth.login(user, token);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    auth.logout();
  };

  return (
    <AdminContext.Provider value={{
      isLoggedIn: auth.isAuthenticated,
      login,
      logout
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
