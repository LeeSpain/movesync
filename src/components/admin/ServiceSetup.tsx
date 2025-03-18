
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Save, Mail, CreditCard } from 'lucide-react';

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
    // In a real application, this would save to a backend or secure storage
    localStorage.setItem('moveSync_emailSettings', JSON.stringify(emailSettings));
    toast({
      title: "Email settings saved",
      description: "Your EmailJS configuration has been saved.",
    });
  };

  const saveStripeSettings = () => {
    // In a real application, this would save to a backend or secure storage
    // Never store secret keys in localStorage in production!
    localStorage.setItem('moveSync_stripeSettings', JSON.stringify(stripeSettings));
    toast({
      title: "Stripe settings saved",
      description: "Your Stripe configuration has been saved.",
    });
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Service Integration Setup</CardTitle>
        <CardDescription>
          Configure your EmailJS and Stripe integrations
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
            
            <Button onClick={saveEmailSettings} className="w-full">
              <Save className="mr-2 h-4 w-4" /> Save Email Settings
            </Button>
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
              <p className="text-xs text-muted-foreground">
                <strong>Warning:</strong> In a production application, the secret key should only be stored on your server.
                This is for demonstration purposes only.
              </p>
            </div>
            
            <Button onClick={saveStripeSettings} className="w-full">
              <Save className="mr-2 h-4 w-4" /> Save Stripe Settings
            </Button>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          These services require accounts with <a href="https://www.emailjs.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">EmailJS</a> and <a href="https://stripe.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Stripe</a>.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ServiceSetup;
