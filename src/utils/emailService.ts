
import { toast } from "@/components/ui/use-toast";
import emailjs from 'emailjs-com';

export interface EmailConfig {
  to: string;
  subject: string;
  body: string;
  from?: string;
}

export interface IncomingEmail {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: number;
  read: boolean;
  important: boolean;
  category: 'inbox' | 'archived' | 'spam' | 'trash';
}

export interface VerificationLink {
  userId: string;
  token: string;
}

export const EmailService = {
  // Initialize EmailJS with stored configuration
  initializeEmailJS: () => {
    try {
      const emailSettings = localStorage.getItem('moveSync_emailSettings');
      if (!emailSettings) {
        console.warn("EmailJS settings not found. Please configure EmailJS in admin panel.");
        return false;
      }
      
      const { serviceId, templateId, userId } = JSON.parse(emailSettings);
      if (!serviceId || !templateId || !userId) {
        console.warn("Incomplete EmailJS configuration. Please check admin settings.");
        return false;
      }
      
      // In production, you'd initialize EmailJS with your user ID
      // emailjs.init(userId);
      console.log("EmailJS initialized with:", { serviceId, templateId, userId });
      return true;
    } catch (error) {
      console.error("Error initializing EmailJS:", error);
      return false;
    }
  },
  
  // Send emails using EmailJS
  sendEmail: async (config: EmailConfig): Promise<boolean> => {
    try {
      const emailSettings = localStorage.getItem('moveSync_emailSettings');
      if (!emailSettings) {
        toast({
          variant: "destructive",
          title: "Email Configuration Missing",
          description: "Please set up your email service in the admin panel first.",
        });
        return false;
      }
      
      const { serviceId, templateId, userId } = JSON.parse(emailSettings);
      
      console.log("Sending email:", {
        from: config.from || "movesyncai@gmail.com",
        to: config.to,
        subject: config.subject,
        body: config.body
      });
      
      // Prepare template parameters for EmailJS
      const templateParams = {
        to_email: config.to,
        from_name: "Move-Sync AI",
        to_name: "",
        subject: config.subject,
        message: config.body,
      };
      
      // Send email using EmailJS
      // In a real application, this would actually call the EmailJS API
      console.log("Would call EmailJS with:", { serviceId, templateId, templateParams, userId });
      
      /* In production, you would uncomment this code:
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        userId
      );
      console.log("Email sent successfully:", response);
      */
      
      // Simulate successful email sending for demo
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store sent email in outbox
      EmailService.storeSentEmail(config);
      
      toast({
        title: "Email Sent",
        description: `Email to ${config.to} has been sent successfully.`,
      });
      
      return true;
    } catch (error) {
      console.error("Error sending email:", error);
      toast({
        variant: "destructive",
        title: "Email Error",
        description: "Failed to send email. Please check your configuration and try again."
      });
      return false;
    }
  },
  
  // Store sent email in local storage
  storeSentEmail: (config: EmailConfig): void => {
    try {
      const sentEmails = localStorage.getItem('moveSync_sentEmails');
      const emailsArray = sentEmails ? JSON.parse(sentEmails) : [];
      
      const newEmail = {
        id: Date.now().toString(),
        to: config.to,
        from: config.from || "movesyncai@gmail.com",
        subject: config.subject,
        body: config.body,
        timestamp: Date.now(),
      };
      
      emailsArray.unshift(newEmail);
      localStorage.setItem('moveSync_sentEmails', JSON.stringify(emailsArray));
    } catch (error) {
      console.error("Error storing sent email:", error);
    }
  },
  
  // Get all incoming emails
  getIncomingEmails: (): IncomingEmail[] => {
    try {
      const incomingEmails = localStorage.getItem('moveSync_incomingEmails');
      return incomingEmails ? JSON.parse(incomingEmails) : [];
    } catch (error) {
      console.error("Error getting incoming emails:", error);
      return [];
    }
  },
  
  // Store a new incoming email
  storeIncomingEmail: (email: Omit<IncomingEmail, 'id' | 'timestamp' | 'read' | 'important' | 'category'>): IncomingEmail => {
    try {
      const incomingEmails = EmailService.getIncomingEmails();
      
      const newEmail: IncomingEmail = {
        id: Date.now().toString(),
        ...email,
        timestamp: Date.now(),
        read: false,
        important: false,
        category: 'inbox',
      };
      
      incomingEmails.unshift(newEmail);
      localStorage.setItem('moveSync_incomingEmails', JSON.stringify(incomingEmails));
      
      // Show notification for new email
      toast({
        title: "New Email Received",
        description: `From: ${email.from}\nSubject: ${email.subject}`,
      });
      
      return newEmail;
    } catch (error) {
      console.error("Error storing incoming email:", error);
      throw error;
    }
  },
  
  // Update email status (read, important, category)
  updateEmailStatus: (emailId: string, updates: Partial<IncomingEmail>): IncomingEmail | null => {
    try {
      const incomingEmails = EmailService.getIncomingEmails();
      const emailIndex = incomingEmails.findIndex(email => email.id === emailId);
      
      if (emailIndex === -1) {
        console.error("Email not found:", emailId);
        return null;
      }
      
      const updatedEmail = {
        ...incomingEmails[emailIndex],
        ...updates,
      };
      
      incomingEmails[emailIndex] = updatedEmail;
      localStorage.setItem('moveSync_incomingEmails', JSON.stringify(incomingEmails));
      
      return updatedEmail;
    } catch (error) {
      console.error("Error updating email status:", error);
      return null;
    }
  },
  
  // Delete email (move to trash)
  deleteEmail: (emailId: string): boolean => {
    try {
      return !!EmailService.updateEmailStatus(emailId, { category: 'trash' });
    } catch (error) {
      console.error("Error deleting email:", error);
      return false;
    }
  },
  
  // Permanently delete email
  permanentlyDeleteEmail: (emailId: string): boolean => {
    try {
      const incomingEmails = EmailService.getIncomingEmails();
      const filteredEmails = incomingEmails.filter(email => email.id !== emailId);
      
      if (filteredEmails.length === incomingEmails.length) {
        // Email not found
        return false;
      }
      
      localStorage.setItem('moveSync_incomingEmails', JSON.stringify(filteredEmails));
      return true;
    } catch (error) {
      console.error("Error permanently deleting email:", error);
      return false;
    }
  },
  
  // Helper method to send welcome emails to new users
  sendWelcomeEmail: async (userEmail: string, userName: string): Promise<boolean> => {
    const config: EmailConfig = {
      to: userEmail,
      subject: "Welcome to Move-Sync!",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Welcome to Move-Sync!</h1>
          <p>Hello ${userName},</p>
          <p>Thank you for joining Move-Sync! We're excited to help you with your relocation journey.</p>
          <p>With Move-Sync, you can:</p>
          <ul>
            <li>Search for properties in your destination country</li>
            <li>Get visa and immigration assistance</li>
            <li>Calculate the cost of living</li>
            <li>Find job opportunities</li>
            <li>And much more!</li>
          </ul>
          <p>If you have any questions, feel free to contact our support team.</p>
          <p>Best regards,<br>The Move-Sync Team</p>
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
          <p>Best regards,<br>The Move-Sync Team</p>
        </div>
      `
    };
    
    return EmailService.sendEmail(config);
  },
  
  // Method to send verification emails
  sendVerificationEmail: async (userEmail: string, verificationLink: VerificationLink): Promise<boolean> => {
    const config: EmailConfig = {
      to: userEmail,
      subject: "Verify Your Move-Sync Premium Account",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Welcome to Move-Sync Premium!</h1>
          <p>Thank you for upgrading to Move-Sync Premium! To complete your account setup, please verify your email address.</p>
          <p>Click the button below to verify your email and access your premium features:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${window.location.origin}/verify/${verificationLink.userId}/${verificationLink.token}"
               style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p><strong>This link will expire in 24 hours.</strong></p>
          <p>If you did not create a Move-Sync Premium account, please ignore this email.</p>
          <p>Best regards,<br>The Move-Sync Team</p>
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

  // Method to send payment confirmation emails
  sendPaymentConfirmationEmail: async (userEmail: string, amount: number): Promise<boolean> => {
    const config: EmailConfig = {
      to: userEmail,
      subject: "Payment Confirmation - Move-Sync Premium",
      body: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #4F46E5;">Payment Confirmed!</h1>
          <p>Thank you for your payment of $${amount} for Move-Sync Premium!</p>
          <p>Your payment has been successfully processed, and your premium features will be activated once you verify your email address.</p>
          <p>If you haven't received our verification email, please check your spam folder or contact our support team.</p>
          <p>Best regards,<br>The Move-Sync Team</p>
        </div>
      `
    };
    
    return EmailService.sendEmail(config);
  }
};
