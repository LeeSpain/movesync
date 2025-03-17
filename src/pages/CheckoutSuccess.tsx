
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

const CheckoutSuccess = () => {
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
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Payment Successful!</h1>
        
        <p className="text-muted-foreground mb-8">
          Congratulations! Your payment has been processed successfully and your account has been upgraded to Premium. You now have access to all premium features.
        </p>
        
        <div className="space-y-4">
          <Button asChild className="w-full">
            <Link to="/dashboard/premium">Go to Your Premium Dashboard</Link>
          </Button>
          
          <Button variant="outline" asChild className="w-full">
            <Link to="/">Return to Home Page</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
