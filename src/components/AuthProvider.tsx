import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  role: 'admin' | 'user' | 'tester';
  plan: 'free' | 'single' | 'premium' | 'unlimited';
  status: 'active' | 'testing' | 'suspended';
}

interface AuthContextType {
  user: User | null;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAccess: (feature: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};

// Mock users database
const mockUsers: Record<string, User & { password: string }> = {
  'admin@lawdefense.com': {
    id: '1',
    email: 'admin@lawdefense.com',
    password: 'admin123',
    role: 'admin',
    plan: 'unlimited',
    status: 'active'
  },
  'tester@example.com': {
    id: '2',
    email: 'tester@example.com',
    password: 'test123',
    role: 'tester',
    plan: 'premium',
    status: 'testing'
  },
  'user@example.com': {
    id: '3',
    email: 'user@example.com',
    password: 'user123',
    role: 'user',
    plan: 'single',
    status: 'active'
  }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for saved session
    const savedUser = localStorage.getItem('lawdefense_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const mockUser = mockUsers[email];
    
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      localStorage.setItem('lawdefense_user', JSON.stringify(userWithoutPassword));
      toast({ title: 'Login successful', description: `Welcome back, ${email}` });
      return true;
    }
    
    toast({ title: 'Login failed', description: 'Invalid email or password', variant: 'destructive' });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lawdefense_user');
    toast({ title: 'Logged out', description: 'You have been logged out successfully' });
  };

  const checkAccess = (feature: string): boolean => {
    if (!user) return false;
    
    // Admin has access to everything
    if (user.role === 'admin') return true;
    
    // Testers have premium access
    if (user.role === 'tester' && user.status === 'testing') {
      return ['upload', 'analysis', 'generation', 'download'].includes(feature);
    }
    
    // Regular users based on plan
    switch (user.plan) {
      case 'unlimited':
        return true;
      case 'premium':
        return ['upload', 'analysis', 'generation', 'download', 'addons'].includes(feature);
      case 'single':
        return ['upload', 'analysis', 'generation', 'download'].includes(feature);
      default:
        return false;
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{
      user,
      isAdmin,
      login,
      logout,
      checkAccess
    }}>
      {children}
    </AuthContext.Provider>
  );
};