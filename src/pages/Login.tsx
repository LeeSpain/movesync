
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

  // Check if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      console.log("User already authenticated, redirecting to dashboard");
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

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
      
      // Get the user from localStorage after login to verify the data
      const userFromStorage = localStorage.getItem('moveSync_user');
      console.log("User from localStorage after login:", userFromStorage);
      
      if (userFromStorage) {
        const parsedUser = JSON.parse(userFromStorage);
        console.log("Parsed user from storage:", parsedUser);
        console.log("Is admin user:", parsedUser.isAdmin);
      }
      
      navigate('/dashboard');
      
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

  // Admin credentials section - highlighted for better visibility
  const adminCredentialsSection = (
    <div className="mb-4 p-4 bg-amber-50 border border-amber-200 rounded-lg text-sm">
      <p className="font-bold text-amber-800 text-base mb-1">🔐 Admin Access:</p>
      <div className="flex items-center space-x-2 mb-1">
        <p className="font-medium text-amber-800">Email:</p>
        <code className="bg-white px-2 py-1 rounded border border-amber-200 text-amber-900">alex@example.com</code>
        <Button 
          variant="outline" 
          size="sm" 
          className="h-7 px-2 text-xs border-amber-300 hover:bg-amber-100 text-amber-800"
          onClick={() => setEmail("alex@example.com")}
        >
          Use this
        </Button>
      </div>
      <p className="text-amber-700 mt-1 text-xs">(Any password will work for the demo)</p>
    </div>
  );

  // Regular user credentials
  const regularUserCredentials = (
    <div className="p-4 bg-blue-50 rounded-lg text-sm">
      <p className="font-medium text-movesync-blue mb-1">Demo Credentials:</p>
      <p className="text-movesync-gray-dark">Admin User: alex@example.com</p>
      <p className="text-movesync-gray-dark">Premium User: sarah@example.com</p>
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
            <CardTitle className="text-2xl font-bold">Sign in to MoveSync</CardTitle>
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
          
          {/* Admin credentials highlighted at the top */}
          <div className="px-6 pt-2">
            {adminCredentialsSection}
          </div>
          
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
