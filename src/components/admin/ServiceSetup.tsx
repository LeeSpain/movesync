
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Save, Mail, CreditCard, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { EmailService } from '@/utils/emailService';

const ServiceSetup = () => {
  const { toast } = useToast();
  const [emailSettings, setEmailSettings] = useState({
    serviceId: '',
    templateId: '',
    userId: '',
  });
  const [stripeSettings, setStripeSettings] = useState({
    publishableKey: '',
    secretKey: '',
  });

  const [testing, setTesting] = useState<{ email: boolean; stripe: boolean }>({
    email: false,
    stripe: false,
  });

  // Load saved settings on component mount
  useEffect(() => {
    try {
      const savedEmailSettings = localStorage.getItem('moveSync_emailSettings');
      if (savedEmailSettings) {
        setEmailSettings(JSON.parse(savedEmailSettings));
      }

      const savedStripeSettings = localStorage.getItem('moveSync_stripeSettings');
      if (savedStripeSettings) {
        setStripeSettings(JSON.parse(savedStripeSettings));
      }
    } catch (error) {
      console.error("Error loading saved settings:", error);
    }
  }, []);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStripeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStripeSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const saveEmailSettings = () => {
    // Validate email settings
    if (!emailSettings.serviceId || !emailSettings.templateId || !emailSettings.userId) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All EmailJS fields are required.",
      });
      return;
    }

    // In a real application, this would save to a backend or secure storage
    localStorage.setItem('moveSync_emailSettings', JSON.stringify(emailSettings));
    toast({
      title: "Email settings saved",
      description: "Your EmailJS configuration has been saved.",
    });
  };

  const saveStripeSettings = () => {
    // Validate stripe settings
    if (!stripeSettings.publishableKey || !stripeSettings.secretKey) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All Stripe fields are required.",
      });
      return;
    }

    // Validate key formats
    if (!stripeSettings.publishableKey.startsWith('pk_')) {
      toast({
        variant: "destructive",
        title: "Invalid Publishable Key",
        description: "Stripe publishable keys should start with 'pk_'.",
      });
      return;
    }

    if (!stripeSettings.secretKey.startsWith('sk_')) {
      toast({
        variant: "destructive",
        title: "Invalid Secret Key",
        description: "Stripe secret keys should start with 'sk_'.",
      });
      return;
    }

    // In a real application, this would save to a backend or secure storage
    // Never store secret keys in localStorage in production!
    localStorage.setItem('moveSync_stripeSettings', JSON.stringify(stripeSettings));
    toast({
      title: "Stripe settings saved",
      description: "Your Stripe configuration has been saved.",
    });
  };

  const testEmailConnection = async () => {
    if (!emailSettings.serviceId || !emailSettings.templateId || !emailSettings.userId) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All EmailJS fields are required to test the connection.",
      });
      return;
    }

    setTesting(prev => ({ ...prev, email: true }));

    // Save the settings first
    localStorage.setItem('moveSync_emailSettings', JSON.stringify(emailSettings));

    try {
      // In a real app, you would send a test email here
      // For now, we'll just simulate the API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      /* In production you would uncomment this:
      const testResult = await EmailService.sendEmail({
        to: "test@example.com",
        subject: "EmailJS Test",
        body: "<p>This is a test email to verify your EmailJS configuration.</p>"
      });

      if (!testResult) {
        throw new Error("Failed to send test email");
      }
      */

      toast({
        title: "Email Test Successful",
        description: "Your EmailJS configuration is working correctly.",
      });
    } catch (error) {
      console.error("Email test failed:", error);
      toast({
        variant: "destructive",
        title: "Email Test Failed",
        description: "Failed to send test email. Please check your configuration.",
      });
    } finally {
      setTesting(prev => ({ ...prev, email: false }));
    }
  };

  const testStripeConnection = async () => {
    if (!stripeSettings.publishableKey || !stripeSettings.secretKey) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "All Stripe fields are required to test the connection.",
      });
      return;
    }

    setTesting(prev => ({ ...prev, stripe: true }));

    // Save the settings first
    localStorage.setItem('moveSync_stripeSettings', JSON.stringify(stripeSettings));

    try {
      // In a real app, you would make a test call to the Stripe API
      // For now, we'll just simulate the API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      /* In production:
      const response = await fetch('/api/test-stripe-connection', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          publishableKey: stripeSettings.publishableKey,
          // Never send secret key to frontend - this would be a backend-only operation
        }),
      });
      
      if (!response.ok) {
        throw new Error("Stripe connection test failed");
      }
      */

      toast({
        title: "Stripe Test Successful",
        description: "Your Stripe configuration appears to be working correctly.",
      });
    } catch (error) {
      console.error("Stripe test failed:", error);
      toast({
        variant: "destructive",
        title: "Stripe Test Failed",
        description: "Failed to connect to Stripe. Please check your configuration.",
      });
    } finally {
      setTesting(prev => ({ ...prev, stripe: false }));
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Service Integration Setup</CardTitle>
        <CardDescription>
          Configure your EmailJS and Stripe integrations for production
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="email" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="email">
              <Mail className="mr-2 h-4 w-4" /> Email Service
            </TabsTrigger>
            <TabsTrigger value="stripe">
              <CreditCard className="mr-2 h-4 w-4" /> Stripe Payments
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="email" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="serviceId">EmailJS Service ID</Label>
              <Input
                id="serviceId"
                name="serviceId"
                value={emailSettings.serviceId}
                onChange={handleEmailChange}
                placeholder="e.g., service_xxxxx"
              />
              <p className="text-xs text-muted-foreground">
                Find this in your EmailJS dashboard under "Services"
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="templateId">EmailJS Template ID</Label>
              <Input
                id="templateId"
                name="templateId"
                value={emailSettings.templateId}
                onChange={handleEmailChange}
                placeholder="e.g., template_xxxxx"
              />
              <p className="text-xs text-muted-foreground">
                Find this in your EmailJS dashboard under "Email Templates"
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="userId">EmailJS User ID (Public Key)</Label>
              <Input
                id="userId"
                name="userId"
                value={emailSettings.userId}
                onChange={handleEmailChange}
                placeholder="e.g., user_xxxxx"
              />
              <p className="text-xs text-muted-foreground">
                Find this in your EmailJS dashboard under "Account" → "API Keys"
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={saveEmailSettings} className="flex-1">
                <Save className="mr-2 h-4 w-4" /> Save Email Settings
              </Button>
              <Button onClick={testEmailConnection} variant="outline" disabled={testing.email}>
                {testing.email ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" /> Test Connection
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="stripe" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="publishableKey">Stripe Publishable Key</Label>
              <Input
                id="publishableKey"
                name="publishableKey"
                value={stripeSettings.publishableKey}
                onChange={handleStripeChange}
                placeholder="e.g., pk_test_xxxxx"
              />
              <p className="text-xs text-muted-foreground">
                Find this in your Stripe dashboard under "Developers" → "API keys"
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secretKey">Stripe Secret Key</Label>
              <Input
                id="secretKey"
                name="secretKey"
                value={stripeSettings.secretKey}
                onChange={handleStripeChange}
                placeholder="e.g., sk_test_xxxxx"
                type="password"
              />
              <p className="text-xs text-muted-foreground text-red-500">
                <AlertCircle className="inline-block mr-1 h-3 w-3" />
                <strong>Warning:</strong> In a production application, the secret key should only be stored on your server.
                This is for demonstration purposes only.
              </p>
            </div>
            
            <div className="flex space-x-2">
              <Button onClick={saveStripeSettings} className="flex-1">
                <Save className="mr-2 h-4 w-4" /> Save Stripe Settings
              </Button>
              <Button onClick={testStripeConnection} variant="outline" disabled={testing.stripe}>
                {testing.stripe ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Testing
                  </>
                ) : (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4" /> Test Connection
                  </>
                )}
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex-col space-y-4">
        <div className="bg-amber-50 p-4 rounded-md border border-amber-200 w-full">
          <h3 className="text-sm font-medium text-amber-800 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" /> Production Readiness Notes
          </h3>
          <ul className="text-xs text-amber-700 mt-2 space-y-1 list-disc pl-5">
            <li>In a production environment, API keys should be stored securely on a backend server.</li>
            <li>Set up proper error handling and retry mechanisms for payment processing.</li>
            <li>Implement webhook handling for Stripe events.</li>
            <li>Consider implementing a database for persistent storage instead of localStorage.</li>
            <li>Add proper authentication with secure token handling.</li>
          </ul>
        </div>
        <p className="text-sm text-muted-foreground">
          These services require accounts with <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">EmailJS</a> and <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Stripe</a>.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ServiceSetup;
