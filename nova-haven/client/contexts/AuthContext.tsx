import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  storeName?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: RegisterData) => Promise<void>;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
  storeName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si hay un usuario guardado en localStorage
    const savedUser = localStorage.getItem('nova_haven_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        localStorage.removeItem('nova_haven_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    
    // Simular autenticación
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Determinar el rol basado en el email
    const role = email.includes('admin') ? 'admin' : 'user';
    
    const userData: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: role === 'admin' ? 'Administrador' : 'Usuario Demo',
      email,
      role,
      storeName: role === 'user' ? 'Mi Tienda Demo' : undefined
    };
    
    setUser(userData);
    localStorage.setItem('nova_haven_user', JSON.stringify(userData));
    setIsLoading(false);
  };

  const register = async (userData: RegisterData): Promise<void> => {
    setIsLoading(true);
    
    // Simular registro
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userData.name,
      email: userData.email,
      role: 'user',
      storeName: userData.storeName
    };
    
    setUser(newUser);
    localStorage.setItem('nova_haven_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('nova_haven_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    register
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};