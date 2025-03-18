
import { toast } from '@/components/ui/use-toast';
import TokenService from '../tokenService';

/**
 * Builds auth headers for API requests
 */
export const buildAuthHeaders = (requiresAuth: boolean, customHeaders: Record<string, string> = {}): Record<string, string> => {
  // Set up headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };
  
  // Add auth header if required
  if (requiresAuth) {
    const token = TokenService.getAccessToken();
    if (!token) {
      throw new Error('Authentication required');
    }
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  return headers;
};

/**
 * Handles token refresh attempts
 */
export const refreshToken = async (): Promise<boolean> => {
  try {
    const refreshToken = TokenService.getRefreshToken();
    if (!refreshToken) {
      return false;
    }
    
    // In a real app, this would make a call to your auth server to get a new token
    console.log('Attempting to refresh token');
    
    // Simulate API call for demo purposes
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response - in production, this would be the actual response from your auth server
    const mockNewToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
    TokenService.setAccessToken(mockNewToken, 3600);
    
    console.log('Token refreshed successfully');
    return true;
  } catch (error) {
    console.error('Failed to refresh token:', error);
    return false;
  }
};

/**
 * Handles unauthorized responses by attempting to refresh tokens
 */
export const handleUnauthorized = (): void => {
  TokenService.clearTokens();
  console.error('Session expired. Please log in again.');
  
  // Show toast notification
  toast({
    variant: "destructive",
    title: "Session Expired",
    description: "Your session has expired. Please log in again.",
  });
  
  // Redirect to login page
  window.location.href = '/login';
};
