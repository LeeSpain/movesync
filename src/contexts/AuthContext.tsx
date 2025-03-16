
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user types
type UserPlan = 'free' | 'premium';

interface User {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
  progressPercentage: number;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  upgradeToPremium: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demo purposes
const MOCK_USERS = [
  {
    id: '1',
    name: 'Alex Smith',
    email: 'alex@example.com',
    plan: 'free' as UserPlan,
    progressPercentage: 30
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    plan: 'premium' as UserPlan,
    progressPercentage: 65
  }
];

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for authenticated user on load
  useEffect(() => {
    const storedUser = localStorage.getItem('moveSync_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Simulate API call delay
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email (demo only - in production this would be a real auth system)
    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('moveSync_user', JSON.stringify(foundUser));
    } else {
      throw new Error('Invalid credentials');
    }
    
    setLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('moveSync_user');
  };

  // Upgrade to premium function
  const upgradeToPremium = () => {
    if (user) {
      const upgradedUser = { ...user, plan: 'premium' as UserPlan };
      setUser(upgradedUser);
      localStorage.setItem('moveSync_user', JSON.stringify(upgradedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, loading, login, logout, upgradeToPremium }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
