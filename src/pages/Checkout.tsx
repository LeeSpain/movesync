
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, upgradeToPremium } = useAuth();
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  
  // This would typically come from your backend in a real implementation
  const PRICE = 99;
  
  useEffect(() => {
    // In a real application, you would make an API call to your backend
    // to create a payment intent and get the client secret
    // For demo purposes, we're simulating this process
    
    const simulatePaymentIntent = () => {
      // Simulate API delay
      setTimeout(() => {
        // This is a fake client secret - in a real app this would come from your backend
        setClientSecret('demo_secret_' + new Date().getTime());
      }, 1000);
    };
    
    simulatePaymentIntent();
  }, []);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real application, you would use the clientSecret with stripe.confirmCardPayment
      // Since we're mocking the payment, we'll simulate a successful payment
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate a successful payment
      toast({
        title: "Payment successful!",
        description: "Your account has been upgraded to Premium.",
      });
      
      // Update user account to premium
      upgradeToPremium();
      
      // Redirect to success page
      navigate('/checkout/success');
      
    } catch (err) {
      console.error('Payment error:', err);
      setError('An error occurred while processing your payment. Please try again.');
      
      toast({
        title: "Payment failed",
        description: "There was an issue processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Upgrade to MoveSync Premium</h1>
          <p className="text-muted-foreground">Complete your payment to access all premium features</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div className="md:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
                <CardDescription>
                  Enter your payment details to complete your subscription
                </CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input 
                      type="text" 
                      className="w-full p-2 border rounded"
                      placeholder={user?.name || "Enter your name"}
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full p-2 border rounded"
                      placeholder={user?.email || "Enter your email"}
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Card Details</label>
                    <div className="p-3 border rounded bg-slate-50">
                      <CardElement 
                        options={{
                          style: {
                            base: {
                              fontSize: '16px',
                              color: '#424770',
                              '::placeholder': {
                                color: '#aab7c4',
                              },
                            },
                            invalid: {
                              color: '#9e2146',
                            },
                          },
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      For testing, use card number: 4242 4242 4242 4242, any future date, any CVC
                    </p>
                  </div>
                  
                  {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={!stripe || loading}
                  >
                    {loading ? 'Processing...' : `Pay $${PRICE} and Upgrade`}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>
          
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>MoveSync Premium (Monthly)</span>
                  <span>${PRICE}</span>
                </div>
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${PRICE}</span>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg mt-6 space-y-2">
                  <h3 className="font-semibold">Premium includes:</h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Unlimited AI search & chat</li>
                    <li>• Full AI concierge with 24/7 support</li>
                    <li>• Personalized relocation plans & timelines</li>
                    <li>• Advanced property search & lease negotiation</li>
                    <li>• AI job matching & career coaching</li>
                    <li>• Comprehensive visa & immigration assistance</li>
                    <li>• AI email & document management</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
