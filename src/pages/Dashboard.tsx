import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading, isAdmin, isInvestor } = useAuth();
  const { toast } = useToast();
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only proceed if the auth state is loaded
    if (loading) {
      console.log('Auth still loading, waiting...');
      return;
    }
    
    setRedirecting(true);
    console.log('Dashboard: Auth loaded, redirecting status:', { 
      isAuthenticated, 
      userPlan: user?.plan,
      isAdmin,
      isInvestor,
      userIsAdmin: user?.isAdmin,
      userIsInvestor: user?.isInvestor
    });
    
    // If not authenticated, go to login
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      navigate('/login');
      return;
    }
    
    // Try to redirect based on user info
    try {
      if (isInvestor) {
        console.log('User is investor, redirecting to investor dashboard');
        toast({
          title: "Welcome Investor!",
          description: "Redirecting to investor dashboard",
        });
        navigate('/investor');
        return;
      }
      
      if (isAdmin) {
        console.log('User is admin, redirecting to admin dashboard');
        toast({
          title: "Welcome Admin!",
          description: "Redirecting to admin dashboard",
        });
        navigate('/admin');
        return;
      }
      
      if (user?.plan === 'premium') {
        console.log('User has premium plan, redirecting to premium dashboard');
        toast({
          title: "Welcome back!",
          description: "Redirecting to your premium dashboard",
        });
        navigate('/dashboard/premium');
      } else {
        console.log('User has free plan, redirecting to free dashboard');
        toast({
          title: "Welcome back!",
          description: "Redirecting to your dashboard",
        });
        navigate('/dashboard/free');
      }
    } catch (err) {
      console.error('Error during redirection:', err);
      setError('Error redirecting to dashboard. Please try again.');
      setRedirecting(false);
    }
  }, [isAuthenticated, user, loading, navigate, toast, isAdmin, isInvestor]);

  const handleManualRedirect = () => {
    if (isAuthenticated) {
      if (isInvestor) {
        navigate('/investor');
      } else if (isAdmin) {
        navigate('/admin');
      } else if (user?.plan === 'premium') {
        navigate('/dashboard/premium');
      } else {
        navigate('/dashboard/free');
      }
    } else {
      navigate('/login');
    }
  };

  // Show loading state or error
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white p-4">
      {error ? (
        <Alert variant="destructive" className="max-w-md mb-4">
          <AlertTitle>Navigation Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : null}
      
      <div className={`text-lg mb-4 ${redirecting ? "animate-pulse" : ""}`}>
        {redirecting ? "Redirecting to your dashboard..." : "Loading..."}
      </div>
      
      {!redirecting && (
        <Button onClick={handleManualRedirect} className="mt-4">
          Continue to Dashboard
        </Button>
      )}
    </div>
  );
};

export default Dashboard;
