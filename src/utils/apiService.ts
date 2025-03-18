
import TokenService from './tokenService';
import { toast } from '@/components/ui/use-toast';

// Base API URL - in a real app, this would be your backend API URL
const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

// Default request timeout in milliseconds
const DEFAULT_TIMEOUT = 30000;

interface FetchOptions extends RequestInit {
  timeout?: number;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode?: number;
}

// Create a reusable fetch with timeout
const fetchWithTimeout = async (
  url: string, 
  options: FetchOptions = {},
): Promise<Response> => {
  const { timeout = DEFAULT_TIMEOUT, ...fetchOptions } = options;
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...fetchOptions,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
};

// API Service for handling all API requests
export const ApiService = {
  // Generic request method
  request: async <T>(
    endpoint: string,
    method: string = 'GET',
    data: any = null,
    requiresAuth: boolean = true,
    customHeaders: Record<string, string> = {},
    options: FetchOptions = {}
  ): Promise<ApiResponse<T>> => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      
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
      
      // Set up request options
      const requestOptions: FetchOptions = {
        method,
        headers,
        ...options,
      };
      
      // Add body for non-GET requests
      if (method !== 'GET' && data) {
        requestOptions.body = JSON.stringify(data);
      }
      
      // Make the request
      console.log(`Making ${method} request to ${url}`);
      const response = await fetchWithTimeout(url, requestOptions);
      
      // Check for 401 Unauthorized response
      if (response.status === 401) {
        console.warn('Received 401 Unauthorized response');
        
        // Try to refresh the token
        if (requiresAuth && await this.refreshToken()) {
          // Retry the request with new token
          return this.request<T>(endpoint, method, data, requiresAuth, customHeaders, options);
        } else {
          // Couldn't refresh token, user needs to log in again
          TokenService.clearTokens();
          console.error('Session expired. Please log in again.');
          
          toast({
            variant: "destructive",
            title: "Session Expired",
            description: "Your session has expired. Please log in again.",
          });
          
          // Redirect to login page
          window.location.href = '/login';
          throw new Error('Session expired');
        }
      }
      
      // Parse the response
      let responseData: any = null;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        responseData = await response.json();
      } else {
        responseData = await response.text();
      }
      
      // Return standardized response
      if (response.ok) {
        return {
          success: true,
          data: responseData,
          statusCode: response.status,
        };
      } else {
        let errorMessage = 'Unknown error occurred';
        
        // Fix for TS2532: Object is possibly 'undefined'
        if (responseData && 
            typeof responseData === 'object' && 
            responseData !== null) {
          // Safely access the message property with optional chaining
          const message = responseData.message;
          if (message !== undefined && message !== null) {
            // Ensure message is treated as a string
            errorMessage = String(message);
          }
        }
        
        console.error(`API error: ${response.status} ${response.statusText}`, responseData);
        return {
          success: false,
          error: errorMessage,
          statusCode: response.status,
        };
      }
    } catch (error: any) {
      console.error('API request failed:', error);
      
      // Handle abort error (timeout)
      if (error.name === 'AbortError') {
        return {
          success: false,
          error: 'Request timed out',
        };
      }
      
      return {
        success: false,
        error: error.message || 'Network error',
      };
    }
  },
  
  // Helper methods for common HTTP methods
  get: <T>(endpoint: string, requiresAuth: boolean = true, options: FetchOptions = {}) => {
    return ApiService.request<T>(endpoint, 'GET', null, requiresAuth, {}, options);
  },
  
  post: <T>(endpoint: string, data: any, requiresAuth: boolean = true, options: FetchOptions = {}) => {
    return ApiService.request<T>(endpoint, 'POST', data, requiresAuth, {}, options);
  },
  
  put: <T>(endpoint: string, data: any, requiresAuth: boolean = true, options: FetchOptions = {}) => {
    return ApiService.request<T>(endpoint, 'PUT', data, requiresAuth, {}, options);
  },
  
  patch: <T>(endpoint: string, data: any, requiresAuth: boolean = true, options: FetchOptions = {}) => {
    return ApiService.request<T>(endpoint, 'PATCH', data, requiresAuth, {}, options);
  },
  
  delete: <T>(endpoint: string, requiresAuth: boolean = true, options: FetchOptions = {}) => {
    return ApiService.request<T>(endpoint, 'DELETE', null, requiresAuth, {}, options);
  },
  
  // Token refresh method (would connect to your auth server in production)
  refreshToken: async (): Promise<boolean> => {
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
  }
};

export default ApiService;
