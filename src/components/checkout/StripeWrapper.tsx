
import { ReactNode } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// In a real app, this would be an environment variable
// For this demo, we're using Stripe's test publishable key
const stripePromise = loadStripe('pk_test_51OraVeIyjNSNqKMsQtAdKXXsAUuiN9QTjlQgFFx6YbZXDXcMcHPKQrRfXrZNVnMiakP5vhwUuhXKv0dn15cYPWJ300iIXwNF2v');

interface StripeWrapperProps {
  children: ReactNode;
}

const StripeWrapper = ({ children }: StripeWrapperProps) => {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
};

export default StripeWrapper;
