import { toast } from "@/components/ui/use-toast";

export interface EmailConfig {
  to: string;
  subject: string;
  body: string;
  from?: string;
}

export interface VerificationLink {
  userId: string;
  token: string;
}

export const EmailService = {
  // For now, we'll simulate sending emails since we can't directly send emails from the frontend
  // In a real application, this would call a backend service
  sendEmail: async (config: EmailConfig): Promise<boolean> => {
    try {
      console.log("Sending email:", {
        from: config.from || "movesyncai@gmail.com",
        to: config.to,
        subject: config.subject,
        body: config.body
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real application, you would make an API call to your backend
      // which would use a service like SendGrid, Nodemailer, or AWS SES
      
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      return false;
    }
  },
  
  // Helper method to send welcome emails to new users
  sendWelcomeEmail: async (userEmail: string, userName: string): Promise<boolean> => {
    const config: EmailConfig = {
      to: userEmail,
      subject: "Welcome to MoveSync!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Welcome to MoveSync!</h1>
          <p>Hello ${userName},</p>
          <p>Thank you for joining MoveSync! We're excited to help you with your relocation journey.</p>
          <p>With MoveSync, you can:</p>
          <ul>
            <li>Search for properties in your destination country</li>
            <li>Get visa and immigration assistance</li>
            <li>Calculate the cost of living</li>
            <li>Find job opportunities</li>
            <li>And much more!</li>
          </ul>
          <p>If you have any questions, feel free to contact our support team.</p>
          <p>Best regards,<br>The MoveSync Team</p>
        </div>
      `
    };
    
    return EmailService.sendEmail(config);
  },
  
  // Method to send notification emails
  sendNotificationEmail: async (userEmail: string, subject: string, message: string): Promise<boolean> => {
    const config: EmailConfig = {
      to: userEmail,
      subject,
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4F46E5;">${subject}</h2>
          <p>${message}</p>
          <p>Best regards,<br>The MoveSync Team</p>
        </div>
      `
    };
    
    return EmailService.sendEmail(config);
  },
  // New method to send verification emails
  sendVerificationEmail: async (userEmail: string, verificationLink: VerificationLink): Promise<boolean> => {
    const config: EmailConfig = {
      to: userEmail,
      subject: "Verify Your MoveSync Premium Account",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Welcome to MoveSync Premium!</h1>
          <p>Thank you for upgrading to MoveSync Premium! To complete your account setup, please verify your email address.</p>
          <p>Click the button below to verify your email and access your premium features:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${window.location.origin}/verify/${verificationLink.userId}/${verificationLink.token}"
               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p><strong>This link will expire in 24 hours.</strong></p>
          <p>If you did not create a MoveSync Premium account, please ignore this email.</p>
          <p>Best regards,<br>The MoveSync Team</p>
        </div>
      `
    };
    
    try {
      const result = await EmailService.sendEmail(config);
      if (result) {
        toast({
          title: "Verification Email Sent",
          description: "Please check your email to verify your account.",
        });
      }
      return result;
    } catch (error) {
      console.error("Error sending verification email:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to send verification email. Please try again.",
      });
      return false;
    }
  },

  // New method to send payment confirmation emails
  sendPaymentConfirmationEmail: async (userEmail: string, amount: number): Promise<boolean> => {
    const config: EmailConfig = {
      to: userEmail,
      subject: "Payment Confirmation - MoveSync Premium",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Payment Confirmed!</h1>
          <p>Thank you for your payment of $${amount} for MoveSync Premium!</p>
          <p>Your payment has been successfully processed, and your premium features will be activated once you verify your email address.</p>
          <p>If you haven't received our verification email, please check your spam folder or contact our support team.</p>
          <p>Best regards,<br>The MoveSync Team</p>
        </div>
      `
    };
    
    return EmailService.sendEmail(config);
  }
};
