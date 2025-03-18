
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import ScrollToTop from "./components/ScrollToTop";
import { useEffect } from "react";
import TokenService from "./utils/tokenService";

// Create a new QueryClient instance with better error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      // Updated to use meta.onError instead of onError directly
      meta: {
        onError: (error: Error) => {
          console.error('Query error:', error);
        }
      }
    },
    mutations: {
      retry: 1,
      // Updated to use meta.onError instead of onError directly
      meta: {
        onError: (error: Error) => {
          console.error('Mutation error:', error);
        }
      }
    }
  }
});

const App = () => {
  // Check authentication tokens on app start
  useEffect(() => {
    const checkAuthentication = () => {
      // Check if token is valid and prepare for refresh if needed
      if (TokenService.getAccessToken() && !TokenService.isTokenValid()) {
        console.log('Access token expired, attempting refresh...');
        // This logic could be expanded in a real application
      }
    };
    
    checkAuthentication();
    
    // Set up periodic token validation (every minute)
    const tokenCheckInterval = setInterval(checkAuthentication, 60 * 1000);
    
    return () => clearInterval(tokenCheckInterval);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <BrowserRouter>
          <ScrollToTop />
          <AppRoutes />
          <Toaster />
          <Sonner />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
