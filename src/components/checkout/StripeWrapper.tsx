
import { ReactNode, useEffect, useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';

// In a real app, this would be an environment variable
// For this demo, we're using Stripe's test publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_test_51OraVeIyjNSNqKMsQtAdKXXsAUuiN9QTjlQgFFx6YbZXDXcMcHPKQrRfXrZNVnMiakP5vhwUuhXKv0dn15cYPWJ300iIXwNF2v';

// Initialize the Stripe promise
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY);

interface StripeWrapperProps {
  children: ReactNode;
}

const StripeWrapper = ({ children }: StripeWrapperProps) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading stripe
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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

  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;
