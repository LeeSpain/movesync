
import { toast } from "@/components/ui/use-toast";

export interface EmailConfig {
  to: string;
  subject: string;
  body: string;
  from?: string;
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
  }
};
