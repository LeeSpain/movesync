
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoaderCircle, CreditCard, CheckCircle, Lock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user, upgradeToPremium } = useAuth();
  const { toast } = useToast();
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  const [paymentOption, setPaymentOption] = useState('credit');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    cardComplete: false
  });
  
  // Prices for different billing cycles
  const PRICES = {
    monthly: 99,
    annually: 990 // 10% discount for annual subscription
  };
  
  useEffect(() => {
    // Validate form
    setFormValid(
      formData.name.trim() !== '' && 
      formData.email.trim() !== '' && 
      formData.cardComplete && 
      agreeToTerms
    );
    
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
  }, [formData, agreeToTerms, user?.name, user?.email]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleCardChange = (event: any) => {
    setFormData(prev => ({
      ...prev,
      cardComplete: event.complete
    }));
    setError(event.error ? event.error.message : '');
  };
  
  const handleBillingCycleChange = (value: string) => {
    setBillingCycle(value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements || !formValid) {
      // Stripe.js has not loaded yet or form is invalid
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
                  {/* Billing Cycle Selection */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium mb-1">Billing Cycle</label>
                    <Tabs 
                      defaultValue="monthly" 
                      value={billingCycle} 
                      onValueChange={handleBillingCycleChange}
                      className="w-full"
                    >
                      <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="monthly">Monthly</TabsTrigger>
                        <TabsTrigger value="annually">
                          Annually <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">Save 10%</span>
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  {/* Personal Information */}
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input 
                      type="text"
                      name="name" 
                      className="w-full p-2 border rounded"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input 
                      type="email"
                      name="email"
                      className="w-full p-2 border rounded"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                    />
                  </div>
                  
                  {/* Payment Method Selection */}
                  <div className="space-y-3">
                    <label className="block text-sm font-medium mb-2">Payment Method</label>
                    <Tabs defaultValue="credit" value={paymentOption} onValueChange={setPaymentOption}>
                      <TabsList className="grid grid-cols-2">
                        <TabsTrigger value="credit">
                          <CreditCard className="mr-2 h-4 w-4" />
                          Credit Card
                        </TabsTrigger>
                        <TabsTrigger value="paypal">
                          <svg className="h-4 w-4 mr-2 inline" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.5 5.5H4.5C3.4 5.5 2.5 6.4 2.5 7.5V16.5C2.5 17.6 3.4 18.5 4.5 18.5H19.5C20.6 18.5 21.5 17.6 21.5 16.5V7.5C21.5 6.4 20.6 5.5 19.5 5.5Z" stroke="#1D293F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 11.5C7 9.5 7.5 8.5 9.5 8.5H12C14 8.5 14.5 9.5 14.5 11.5C14.5 13.5 14 14.5 12 14.5H9.5" stroke="#1D293F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M7 11.5H14.5" stroke="#1D293F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          PayPal
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="credit" className="space-y-4">
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
                              onChange={handleCardChange}
                            />
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            For testing, use card number: 4242 4242 4242 4242, any future date, any CVC
                          </p>
                        </div>
                      </TabsContent>
                      <TabsContent value="paypal">
                        <div className="p-6 text-center">
                          <p className="text-sm text-muted-foreground mb-4">You will be redirected to PayPal to complete your payment.</p>
                          <Button 
                            type="button" 
                            className="bg-[#0070ba] hover:bg-[#005ea6]" 
                            onClick={() => alert('PayPal integration would go here in a real app')}
                            disabled={loading}
                          >
                            Pay with PayPal
                          </Button>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>
                  
                  {/* Terms and Conditions */}
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={agreeToTerms}
                      onChange={() => setAgreeToTerms(!agreeToTerms)}
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-sm text-muted-foreground">
                      I agree to the <a href="#" className="text-movesync-blue underline">Terms of Service</a> and <a href="#" className="text-movesync-blue underline">Privacy Policy</a>
                    </label>
                  </div>
                  
                  {error && (
                    <div className="text-red-500 text-sm">{error}</div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button 
                    type="submit" 
                    className="w-full" 
                    disabled={!stripe || loading || !formValid}
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      `Pay $${billingCycle === 'monthly' ? PRICES.monthly : PRICES.annually} and Upgrade`
                    )}
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
                  <span>MoveSync Premium ({billingCycle === 'monthly' ? 'Monthly' : 'Annual'})</span>
                  <span>${billingCycle === 'monthly' ? PRICES.monthly : PRICES.annually}</span>
                </div>
                
                {billingCycle === 'annually' && (
                  <div className="flex justify-between text-green-600">
                    <span>Savings</span>
                    <span>-$99</span>
                  </div>
                )}
                
                <div className="border-t pt-4 flex justify-between font-bold">
                  <span>Total</span>
                  <span>${billingCycle === 'monthly' ? PRICES.monthly : PRICES.annually}</span>
                </div>
                
                <div className="bg-slate-50 p-4 rounded-lg mt-6 space-y-2">
                  <h3 className="font-semibold">Premium includes:</h3>
                  <ul className="space-y-1 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Unlimited AI search & chat</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Full AI concierge with 24/7 support</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Personalized relocation plans & timelines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Advanced property search & lease negotiation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>AI job matching & career coaching</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>Comprehensive visa & immigration assistance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>AI email & document management</span>
                    </li>
                  </ul>
                </div>
                
                <div className="text-center text-sm text-muted-foreground flex items-center justify-center">
                  <Lock className="h-4 w-4 mr-1" />
                  <span>Secure payment powered by Stripe</span>
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
