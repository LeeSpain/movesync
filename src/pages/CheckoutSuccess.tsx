
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, Calendar, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const QuickStartCard = ({ icon, title, description, link, linkText }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  linkText: string;
}) => (
  <Card>
    <CardHeader className="pb-2">
      <div className="flex items-center gap-2">
        {icon}
        <CardTitle className="text-lg">{title}</CardTitle>
      </div>
    </CardHeader>
    <CardContent>
      <CardDescription className="mb-3">{description}</CardDescription>
      <Link 
        to={link} 
        className="text-movesync-blue hover:text-movesync-blue/80 flex items-center text-sm font-medium"
      >
        {linkText} <ChevronRight className="h-4 w-4 ml-1" />
      </Link>
    </CardContent>
  </Card>
);

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
    <div className="min-h-screen bg-background flex flex-col items-center py-12 px-4">
      <div className="max-w-2xl w-full text-center mb-12">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-12 w-12 text-green-600" />
          </div>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">Upgrade Successful!</h1>
        
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          Congratulations! Your account has been upgraded to Premium. You now have access to all premium features to help with your relocation journey.
        </p>
      </div>
      
      <div className="w-full max-w-4xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Get Started with Premium Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <QuickStartCard
            icon={<Calendar className="h-5 w-5 text-movesync-blue" />}
            title="Create Relocation Plan"
            description="Build a personalized timeline for your move with AI assistance."
            link="/dashboard/premium"
            linkText="Get started"
          />
          
          <QuickStartCard
            icon={<Users className="h-5 w-5 text-movesync-blue" />}
            title="Talk to AI Assistant"
            description="Get answers to all your relocation questions from our AI concierge."
            link="/dashboard/premium/ai-assistant"
            linkText="Chat now"
          />
          
          <QuickStartCard
            icon={<BookOpen className="h-5 w-5 text-movesync-blue" />}
            title="Browse Properties"
            description="Discover and save properties in your destination city."
            link="/dashboard/premium/property-search"
            linkText="Search properties"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg" className="px-8">
            <Link to="/dashboard/premium">Go to Your Premium Dashboard</Link>
          </Button>
          
          <Button variant="outline" asChild size="lg">
            <Link to="/">Return to Home Page</Link>
          </Button>
        </div>
      </div>
      
      <div className="mt-16 text-center text-sm text-muted-foreground">
        <p>Having trouble? <a href="#" className="text-movesync-blue underline">Contact our support team</a></p>
        <p className="mt-1">Your receipt has been sent to your email: {user?.email}</p>
      </div>
    </div>
  );
};

export default CheckoutSuccess;
