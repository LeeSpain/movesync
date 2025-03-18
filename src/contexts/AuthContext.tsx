
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import TokenService from '@/utils/tokenService';
import { toast } from '@/components/ui/use-toast';

// Define user types
type UserPlan = 'free' | 'premium';

// Export the User interface so it can be imported in other files
export interface User {
  id: string;
  name: string;
  email: string;
  plan: UserPlan;
  progressPercentage: number;
  isAdmin: boolean; // Always include isAdmin flag
  isInvestor?: boolean; // Added isInvestor flag
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  upgradeToPremium: () => void;
  isAdmin: boolean; // Added isAdmin accessor
  isInvestor: boolean;
  refreshUserData: () => Promise<void>;
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
    isAdmin: true,
    isInvestor: false
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    plan: 'premium' as UserPlan,
    progressPercentage: 65,
    isAdmin: false,
    isInvestor: false
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'investor@example.com',
    plan: 'premium' as UserPlan,
    progressPercentage: 100,
    isAdmin: false,
    isInvestor: true
  }
];

// Create a provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Function to refresh user data (would connect to API in production)
  const refreshUserData = async () => {
    try {
      // In a real app, this would fetch the latest user data from the API
      // For now, we'll just use what's stored locally
      const storedUser = localStorage.getItem('moveSync_user');
      
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      }
      
      return Promise.resolve();
    } catch (error) {
      console.error("Error refreshing user data:", error);
      return Promise.reject(error);
    }
  };

  // Simulate checking for authenticated user on load
  useEffect(() => {
    const checkStoredUser = () => {
      try {
        // First check if we have a valid token
        const isValidToken = TokenService.isTokenValid();
        console.log("Token valid:", isValidToken);
        
        if (!isValidToken) {
          // If token is invalid, clear any stored user data for security
          localStorage.removeItem('moveSync_user');
          TokenService.clearTokens();
          setUser(null);
          setLoading(false);
          return;
        }
        
        // If token is valid, check for stored user data
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
            TokenService.clearTokens();
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
    try {
      // Simulate API call delay
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email (demo only - in production this would be a real auth system)
      const foundUser = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser) {
        console.log("User logged in:", foundUser);
        console.log("User isAdmin value:", foundUser.isAdmin);
        
        // In a real app, the server would return tokens
        // For this demo, we'll create mock tokens with the user information
        const mockAccessToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIke2ZvdW5kVXNlci5pZH0iLCJuYW1lIjoiJHtmb3VuZFVzZXIubmFtZX0iLCJlbWFpbCI6IiR7Zm91bmRVc2VyLmVtYWlsfSIsImlzQWRtaW4iOiR7Zm91bmRVc2VyLmlzQWRtaW59LCJpYXQiOjE2MTYxNTMxMjJ9.fjbFXtKP-Uf6Vyhj0piRD6ZTiEI9z1Rg7wMhPIQOdEQ`;
        const mockRefreshToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIke2ZvdW5kVXNlci5pZH0iLCJpYXQiOjE2MTYxNTMxMjJ9.VD1wnkYl4-XAkVsMNMCHKQimf0UtbMOWbGJxPuUWrYQ`;
        
        // Store tokens
        TokenService.setAccessToken(mockAccessToken, 3600); // 1 hour expiry
        TokenService.setRefreshToken(mockRefreshToken);
        
        setUser(foundUser);
        try {
          localStorage.setItem('moveSync_user', JSON.stringify(foundUser));
          console.log("User saved to localStorage:", foundUser);
        } catch (e) {
          console.error("Error saving user to localStorage:", e);
          toast({
            variant: "destructive",
            title: "Storage Error",
            description: "Failed to save user data. Some features may not work correctly.",
          });
        }
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    console.log("Logging out user");
    setUser(null);
    localStorage.removeItem('moveSync_user');
    
    // Clear tokens
    TokenService.clearTokens();
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
    isAdmin: isAdminValue,
    isInvestor: Boolean(user?.isInvestor),
    refreshUserData
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
