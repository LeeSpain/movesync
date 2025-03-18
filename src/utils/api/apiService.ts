
import { toast } from '@/components/ui/use-toast';
import TokenService from '../tokenService';
import { fetchWithTimeout, getFullUrl, parseResponse, extractErrorMessage, type FetchOptions } from './httpClient';
import { buildAuthHeaders, refreshToken, handleUnauthorized } from './authUtils';
import { type ApiResponse } from './types';

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
      const url = getFullUrl(endpoint);
      
      // Set up headers
      const headers = buildAuthHeaders(requiresAuth, customHeaders);
      
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
        if (requiresAuth && await refreshToken()) {
          // Retry the request with new token
          return this.request<T>(endpoint, method, data, requiresAuth, customHeaders, options);
        } else {
          // Couldn't refresh token, user needs to log in again
          handleUnauthorized();
          throw new Error('Session expired');
        }
      }
      
      // Parse the response
      const responseData = await parseResponse(response);
      
      // Return standardized response
      if (response.ok) {
        return {
          success: true,
          data: responseData,
          statusCode: response.status,
        };
      } else {
        const errorMessage = extractErrorMessage(responseData);
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
};

export default ApiService;
