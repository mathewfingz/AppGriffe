import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'admin' | 'store';

interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Credenciales mock
const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@marketplace.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@marketplace.com',
      name: 'Administrador Principal',
      role: 'admin'
    }
  },
  'tienda@ejemplo.com': {
    password: 'tienda123',
    user: {
      id: '2',
      email: 'tienda@ejemplo.com',
      name: 'TechStore Pro',
      role: 'store'
    }
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay una sesión guardada
    const savedUser = localStorage.getItem('marketplace_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userCredentials = MOCK_USERS[email];
    
    if (userCredentials && userCredentials.password === password) {
      setUser(userCredentials.user);
      localStorage.setItem('marketplace_user', JSON.stringify(userCredentials.user));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('marketplace_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}