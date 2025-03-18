
import { ReactNode, useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card } from '@/components/ui/card';
import { Loader2, AlertTriangle } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

// Initialize the Stripe promise with the stored publishable key
// or fallback to a default test key if not configured
const getStripePromise = () => {
  try {
    const stripeSettings = localStorage.getItem('moveSync_stripeSettings');
    if (stripeSettings) {
      const { publishableKey } = JSON.parse(stripeSettings);
      if (publishableKey) {
        console.log("Using stored Stripe publishable key");
        return loadStripe(publishableKey);
      }
    }

    // Fallback to default test key
    console.log("Using default Stripe test key");
    return loadStripe('pk_test_51OraVeIyjNSNqKMsQtAdKXXsAUuiN9QTjlQgFFx6YbZXDXcMcHPKQrRfXrZNVnMiakP5vhwUuhXKv0dn15cYPWJ300iIXwNF2v');
  } catch (error) {
    console.error("Error loading Stripe:", error);
    toast({
      variant: "destructive",
      title: "Stripe Configuration Error",
      description: "Failed to initialize Stripe. Please check your configuration.",
    });
    // Return the default test key as fallback
    return loadStripe('pk_test_51OraVeIyjNSNqKMsQtAdKXXsAUuiN9QTjlQgFFx6YbZXDXcMcHPKQrRfXrZNVnMiakP5vhwUuhXKv0dn15cYPWJ300iIXwNF2v');
  }
};

interface StripeWrapperProps {
  children: ReactNode;
}

const StripeWrapper = ({ children }: StripeWrapperProps) => {
  const [loading, setLoading] = useState(true);
  const [stripePromise, setStripePromise] = useState(() => getStripePromise());
  const [stripeError, setStripeError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    const initializeStripe = async () => {
      try {
        // Check if Stripe configuration exists
        const stripeSettings = localStorage.getItem('moveSync_stripeSettings');
        if (!stripeSettings && retryCount === 0) {
          console.warn("No Stripe configuration found. Using default test key.");
          toast({
            title: "Using Test Mode",
            description: "Stripe is running in test mode. Please configure in Admin settings for production use.",
          });
        }
        
        // Simulate loading Stripe (in a real app, this would be the actual loading time)
        await new Promise(resolve => setTimeout(resolve, 1000));
        setLoading(false);
      } catch (error) {
        console.error("Error initializing Stripe:", error);
        setStripeError("Failed to initialize payment system. Please try again later.");
        setLoading(false);
      }
    };

    initializeStripe();
  }, [retryCount]);

  const handleRetry = () => {
    setLoading(true);
    setStripeError(null);
    setRetryCount(prevCount => prevCount + 1);
    setStripePromise(getStripePromise());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 flex flex-col items-center">
          <Loader2 className="h-8 w-8 animate-spin text-movesync-blue mb-4" />
          <p className="text-muted-foreground">Loading payment system...</p>
        </Card>
      </div>
    );
  }

  if (stripeError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="p-8 flex flex-col items-center max-w-md">
          <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Payment System Error</h3>
          <p className="text-red-500 mb-4 text-center">{stripeError}</p>
          <button 
            className="bg-movesync-blue text-white px-4 py-2 rounded mb-2 w-full"
            onClick={handleRetry}
          >
            Try Again
          </button>
          <button
            className="text-movesync-blue hover:underline text-sm mt-2"
            onClick={() => window.location.href = '/'}
          >
            Return to Homepage
          </button>
        </Card>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;
