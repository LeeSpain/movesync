
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user types
type UserPlan = 'free' | 'premium';

interface User {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
  progressPercentage: number;
  isAdmin: boolean; // Always include isAdmin flag
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  upgradeToPremium: () => void;
  isAdmin: boolean; // Added isAdmin accessor
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
    progressPercentage: 30,
    isAdmin: true // Admin user
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    plan: 'premium' as UserPlan,
    progressPercentage: 65,
    isAdmin: false
  }
];

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Simulate checking for authenticated user on load
  useEffect(() => {
    const checkStoredUser = () => {
      try {
        const storedUser = localStorage.getItem('moveSync_user');
        console.log("Raw stored user data:", storedUser);
        
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            console.log("Parsed user from localStorage:", parsedUser);
            
            // Ensure isAdmin is properly set
            if (typeof parsedUser.isAdmin !== 'boolean') {
              console.warn("isAdmin property is not a boolean, setting to false");
              parsedUser.isAdmin = false;
            }
            
            setUser(parsedUser);
          } catch (e) {
            console.error("Error parsing user from localStorage:", e);
            localStorage.removeItem('moveSync_user');
          }
        } else {
          console.log("No user found in localStorage");
        }
      } catch (e) {
        console.error("Error accessing localStorage:", e);
      } finally {
        setLoading(false);
      }
    };
    
    checkStoredUser();
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    // Simulate API call delay
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Find user by email (demo only - in production this would be a real auth system)
    const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (foundUser) {
      console.log("User logged in:", foundUser);
      console.log("User isAdmin value:", foundUser.isAdmin);
      setUser(foundUser);
      try {
        localStorage.setItem('moveSync_user', JSON.stringify(foundUser));
        console.log("User saved to localStorage:", foundUser);
      } catch (e) {
        console.error("Error saving user to localStorage:", e);
      }
    } else {
      throw new Error('Invalid credentials');
    }
    
    setLoading(false);
  };

  // Logout function
  const logout = () => {
    console.log("Logging out user");
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

  // Calculate isAdmin based on user?.isAdmin
  const isAdminValue = Boolean(user?.isAdmin);
  
  // Add more detailed logging
  useEffect(() => {
    console.log("Auth context state:", { 
      user,
      isAdmin: isAdminValue,
      userIsAdmin: user?.isAdmin,
      isAuthenticated: !!user 
    });
  }, [user, isAdminValue]);

  const contextValue = {
    isAuthenticated: !!user,
    user,
    loading,
    login,
    logout,
    upgradeToPremium,
    isAdmin: isAdminValue
  };

  return (
    <AuthContext.Provider value={contextValue}>
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
