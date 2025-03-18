
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login, isAdmin, user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Removed auto-redirect for already authenticated users
  
  // Log auth state when component mounts
  useEffect(() => {
    console.log("Login component mounted with auth state:", { user, isAdmin, isAuthenticated });
    
    // Check if a user is already in localStorage
    const storedUser = localStorage.getItem('moveSync_user');
    if (storedUser) {
      console.log("Found user in localStorage:", JSON.parse(storedUser));
    }
  }, [user, isAdmin, isAuthenticated]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      console.log("Attempting login with email:", email);
      await login(email, password);
      
      // Determine redirect based on user type
      if (email.toLowerCase() === 'alex@example.com') {
        navigate('/admin');
      } else if (email.toLowerCase() === 'investor@example.com') {
        navigate('/investor');
      } else {
        navigate('/dashboard');
      }
      
      toast({
        title: "Login successful",
        description: "Welcome back to MoveSync!",
      });
    } catch (error) {
      console.error("Login error:", error);
      setError("Login failed. Please check your credentials and try again.");
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Please check your credentials and try again. For demo, use alex@example.com or sarah@example.com with any password.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Regular user credentials section update
  const regularUserCredentials = (
    <div className="p-4 bg-blue-50 rounded-lg text-sm">
      <p className="font-medium text-movesync-blue mb-1">Demo Credentials:</p>
      <p className="text-movesync-gray-dark">Admin User: alex@example.com</p>
      <p className="text-movesync-gray-dark">Premium User: sarah@example.com</p>
      <p className="text-movesync-gray-dark">Investor: investor@example.com</p>
      <p className="text-movesync-gray-dark mt-1">(Any password will work for the demo)</p>
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center text-movesync-gray-dark hover:text-movesync-blue mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
        </Link>
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign in to Move-Sync</CardTitle>
            <CardDescription>
              Enter your email below to access your relocation dashboard
            </CardDescription>
          </CardHeader>
          
          {error && (
            <div className="px-6">
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="#" className="text-sm text-movesync-blue">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {regularUserCredentials}
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign in"}
              </Button>
              <p className="mt-4 text-center text-sm text-movesync-gray-dark">
                Don't have an account?{" "}
                <Link to="/" className="text-movesync-blue hover:underline">
                  Sign up
                </Link>
              </p>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Login;
