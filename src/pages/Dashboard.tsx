
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, loading } = useAuth();
  const { toast } = useToast();
  const [redirecting, setRedirecting] = useState(false);

  useEffect(() => {
    // Only proceed if the auth state is loaded
    if (loading) {
      console.log('Auth still loading, waiting...');
      return;
    }
    
    setRedirecting(true);
    console.log('Auth loaded, redirecting status:', { isAuthenticated, userPlan: user?.plan });
    
    // If not authenticated, go to login
    if (!isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      navigate('/login');
      return;
    }
    
    // Redirect based on user plan
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
  }, [isAuthenticated, user, loading, navigate, toast]);

  // Show loading state while determining where to redirect
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="animate-pulse text-movesync-gray-dark text-lg">
        {redirecting ? "Redirecting to your dashboard..." : "Loading..."}
      </div>
    </div>
  );
};

export default Dashboard;
