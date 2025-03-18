
import { toast } from '@/components/ui/use-toast';

// Base API URL
const API_BASE_URL = 'https://api.example.com'; // Replace with your actual API URL

// Default request timeout in milliseconds
const DEFAULT_TIMEOUT = 30000;

export interface FetchOptions extends RequestInit {
  timeout?: number;
}

/**
 * Creates a fetch request with timeout functionality
 */
export const fetchWithTimeout = async (
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

/**
 * Gets the full URL by combining the base URL with the endpoint
 */
export const getFullUrl = (endpoint: string): string => {
  return `${API_BASE_URL}${endpoint}`;
};

/**
 * Handles response parsing based on content type
 */
export const parseResponse = async (response: Response): Promise<any> => {
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return await response.json();
  } else {
    return await response.text();
  }
};

/**
 * Extracts error message from response data
 */
export const extractErrorMessage = (responseData: any): string => {
  // Default error message
  let errorMessage = 'Unknown error occurred';
  
  // Check if responseData exists and is an object
  if (responseData && typeof responseData === 'object') {
    // Use optional chaining and nullish coalescing for safety
    errorMessage = responseData?.message ?? errorMessage;
  }
  
  return errorMessage;
};
