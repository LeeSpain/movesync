
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, ArrowLeft } from 'lucide-react';
import { EmailService } from '@/utils/emailService';

const VerifyPending = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  const handleResendVerification = async () => {
    if (email) {
      // Generate new verification token
      const verificationToken = Math.random().toString(36).substring(2);
      const tempUserId = Date.now().toString();

      await EmailService.sendVerificationEmail(email, {
        userId: tempUserId,
        token: verificationToken
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate('/')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Button>

        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-movesync-blue/10 rounded-full flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-movesync-blue" />
            </div>
            <CardTitle className="text-2xl font-bold">Check Your Email</CardTitle>
            <CardDescription>
              We've sent a verification link to {email}
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-sm text-gray-600 mb-6">
              Click the link in the email to verify your account and access your premium features.
              The verification link will expire in 24 hours.
            </p>
            <Button
              variant="outline"
              onClick={handleResendVerification}
              className="w-full"
            >
              Resend Verification Email
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VerifyPending;
