
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, MessageSquareQuestion } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const CheckoutCancel = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // If someone navigates directly to this page without checkout, redirect them
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-red-100 flex items-center justify-center">
            <XCircle className="h-12 w-12 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Payment Cancelled</h1>
        
        <p className="text-muted-foreground mb-8">
          Your payment has been cancelled. If you experienced any issues or have questions, please contact our support team.
        </p>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Not ready to upgrade?</CardTitle>
            <CardDescription>You can still use our free plan with limited features</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-left space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-movesync-blue">•</span>
                <span>Access to basic relocation tools</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-movesync-blue">•</span>
                <span>Limited AI assistant interactions (5 per month)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-movesync-blue">•</span>
                <span>Basic property search functionality</span>
              </li>
            </ul>
          </CardContent>
        </Card>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/checkout">
              Try Again
            </Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link to="/dashboard/free">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Return to Free Dashboard
            </Link>
          </Button>
          
          <div className="pt-4">
            <Button variant="link" asChild className="text-sm">
              <Link to="/choose-plan">
                <MessageSquareQuestion className="mr-2 h-4 w-4" />
                Compare Plans
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;
