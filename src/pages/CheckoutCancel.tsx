
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/checkout">Try Again</Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link to="/">Return to Home Page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCancel;
