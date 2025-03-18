
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';

const VerifyEmail = () => {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error'>('loading');

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        // Simulate API call to verify the token
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // For demo purposes, we'll just simulate success
        // In a real app, you would validate the token with your backend
        setVerificationStatus('success');
      } catch (error) {
        console.error('Verification error:', error);
        setVerificationStatus('error');
      }
    };

    verifyEmail();
  }, [userId, token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Card>
          <CardHeader className="text-center">
            {verificationStatus === 'loading' && (
              <div className="mx-auto w-12 h-12 flex items-center justify-center mb-4">
                <Loader2 className="h-8 w-8 animate-spin text-movesync-blue" />
              </div>
            )}
            {verificationStatus === 'success' && (
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            )}
            {verificationStatus === 'error' && (
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            )}

            <CardTitle className="text-2xl font-bold">
              {verificationStatus === 'loading' && 'Verifying Email...'}
              {verificationStatus === 'success' && 'Email Verified!'}
              {verificationStatus === 'error' && 'Verification Failed'}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            {verificationStatus === 'success' && (
              <>
                <p className="text-gray-600 mb-6">
                  Your email has been verified successfully. You can now log in to access your premium features.
                </p>
                <Button 
                  onClick={() => navigate('/login')} 
                  className="w-full"
                >
                  Log In
                </Button>
              </>
            )}
            {verificationStatus === 'error' && (
              <>
                <p className="text-gray-600 mb-6">
                  We couldn't verify your email. The link might be expired or invalid.
                </p>
                <Button 
                  onClick={() => navigate('/verify-pending')} 
                  className="w-full"
                >
                  Request New Verification Link
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyEmail;
