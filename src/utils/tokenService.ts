
/**
 * TokenService - Handles authentication tokens and security
 * 
 * This service provides functions for managing JWT tokens, session tokens, 
 * and other authentication-related functionalities.
 */

// Token storage keys
const ACCESS_TOKEN_KEY = 'moveSync_access_token';
const REFRESH_TOKEN_KEY = 'moveSync_refresh_token';
const TOKEN_EXPIRY_KEY = 'moveSync_token_expiry';

// In a production app, tokens should be stored in HttpOnly cookies when possible
// For this demo, we use localStorage with appropriate handling
export const TokenService = {
  // Set the access token with expiry time
  setAccessToken: (token: string, expiresInSeconds: number = 3600): void => {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
      
      // Calculate and store expiry timestamp
      const expiryTime = new Date();
      expiryTime.setSeconds(expiryTime.getSeconds() + expiresInSeconds);
      localStorage.setItem(TOKEN_EXPIRY_KEY, expiryTime.getTime().toString());
      
      console.log('Access token set successfully with expiry:', expiryTime);
    } catch (error) {
      console.error('Error setting access token:', error);
    }
  },
  
  // Get the stored access token
  getAccessToken: (): string | null => {
    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting access token:', error);
      return null;
    }
  },
  
  // Set refresh token
  setRefreshToken: (token: string): void => {
    try {
      localStorage.setItem(REFRESH_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error setting refresh token:', error);
    }
  },
  
  // Get refresh token
  getRefreshToken: (): string | null => {
    try {
      return localStorage.getItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting refresh token:', error);
      return null;
    }
  },
  
  // Clear all tokens (for logout)
  clearTokens: (): void => {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      localStorage.removeItem(REFRESH_TOKEN_KEY);
      localStorage.removeItem(TOKEN_EXPIRY_KEY);
    } catch (error) {
      console.error('Error clearing tokens:', error);
    }
  },
  
  // Check if the access token is valid (not expired)
  isTokenValid: (): boolean => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);
      if (!token) return false;
      
      const expiryTime = localStorage.getItem(TOKEN_EXPIRY_KEY);
      if (!expiryTime) return false;
      
      // Check if token has expired
      return parseInt(expiryTime) > new Date().getTime();
    } catch (error) {
      console.error('Error checking token validity:', error);
      return false;
    }
  },
  
  // Parse JWT token payload (without validation - for client-side info only)
  // In a real app, token validation should happen on the server
  parseToken: (token: string): any => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Error parsing token:', error);
      return null;
    }
  },
  
  // Get user information from token
  getUserFromToken: (): any => {
    const token = TokenService.getAccessToken();
    if (!token) return null;
    
    return TokenService.parseToken(token);
  },
  
  // Generate authorization header for API requests
  getAuthHeader: (): { Authorization: string } | {} => {
    const token = TokenService.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};

export default TokenService;
