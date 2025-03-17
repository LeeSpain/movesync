
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { EmailService } from "@/utils/emailService";

// Form schema for single email
const singleEmailSchema = z.object({
  recipient: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

// Form schema for bulk email
const bulkEmailSchema = z.object({
  emailType: z.enum(["all-users", "premium-users", "free-users", "inactive-users"], {
    required_error: "Please select an email type",
  }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

// Form schema for template email
const templateEmailSchema = z.object({
  emailTemplate: z.enum(["welcome", "upgrade", "renewal", "survey"], {
    required_error: "Please select a template",
  }),
  recipient: z.string().email({ message: "Please enter a valid email address" }),
});

const EmailManager = () => {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  
  // Form for single email
  const singleEmailForm = useForm<z.infer<typeof singleEmailSchema>>({
    resolver: zodResolver(singleEmailSchema),
    defaultValues: {
      recipient: "",
      subject: "",
      message: "",
    },
  });
  
  // Form for bulk email
  const bulkEmailForm = useForm<z.infer<typeof bulkEmailSchema>>({
    resolver: zodResolver(bulkEmailSchema),
    defaultValues: {
      emailType: "all-users",
      subject: "",
      message: "",
    },
  });
  
  // Form for template email
  const templateEmailForm = useForm<z.infer<typeof templateEmailSchema>>({
    resolver: zodResolver(templateEmailSchema),
    defaultValues: {
      emailTemplate: "welcome",
      recipient: "",
    },
  });
  
  // Handle single email submission
  const onSingleEmailSubmit = async (data: z.infer<typeof singleEmailSchema>) => {
    setIsSending(true);
    
    try {
      const result = await EmailService.sendEmail({
        to: data.recipient,
        subject: data.subject,
        body: data.message,
        from: "movesyncai@gmail.com",
      });
      
      if (result) {
        toast({
          title: "Email Sent",
          description: `Email has been sent to ${data.recipient}`,
        });
        singleEmailForm.reset();
      } else {
        toast({
          title: "Error",
          description: "Failed to send email. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  // Handle bulk email submission
  const onBulkEmailSubmit = async (data: z.infer<typeof bulkEmailSchema>) => {
    setIsSending(true);
    
    try {
      // In a real application, this would retrieve the list of user emails based on the selected type
      // and send emails to all of them
      
      // For demo purposes, we'll just simulate success
      toast({
        title: "Bulk Email Queued",
        description: `Emails will be sent to ${data.emailType.replace('-', ' ')}`,
      });
      
      bulkEmailForm.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to queue bulk emails. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  // Handle template email submission
  const onTemplateEmailSubmit = async (data: z.infer<typeof templateEmailSchema>) => {
    setIsSending(true);
    
    try {
      let result = false;
      
      // Select the appropriate template
      switch (data.emailTemplate) {
        case "welcome":
          result = await EmailService.sendWelcomeEmail(data.recipient, "User");
          break;
        case "upgrade":
          result = await EmailService.sendNotificationEmail(
            data.recipient,
            "Upgrade Your MoveSync Account",
            "Upgrade to our Premium plan for additional features and services."
          );
          break;
        case "renewal":
          result = await EmailService.sendNotificationEmail(
            data.recipient,
            "Your Subscription Renewal",
            "Your MoveSync subscription is due for renewal. Click here to renew."
          );
          break;
        case "survey":
          result = await EmailService.sendNotificationEmail(
            data.recipient,
            "We Value Your Feedback",
            "Please take a moment to complete our customer satisfaction survey."
          );
          break;
      }
      
      if (result) {
        toast({
          title: "Template Email Sent",
          description: `${data.emailTemplate.charAt(0).toUpperCase() + data.emailTemplate.slice(1)} email sent to ${data.recipient}`,
        });
        templateEmailForm.reset();
      } else {
        toast({
          title: "Error",
          description: "Failed to send template email. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Email Management</CardTitle>
        <CardDescription>Send emails to users from movesyncai@gmail.com</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="single">Single Email</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Email</TabsTrigger>
            <TabsTrigger value="template">Template Email</TabsTrigger>
          </TabsList>
          
          {/* Single Email Tab */}
          <TabsContent value="single">
            <Form {...singleEmailForm}>
              <form onSubmit={singleEmailForm.handleSubmit(onSingleEmailSubmit)} className="space-y-4">
                <FormField
                  control={singleEmailForm.control}
                  name="recipient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Email</FormLabel>
                      <FormControl>
                        <Input placeholder="user@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={singleEmailForm.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Email subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={singleEmailForm.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your message here" 
                          className="min-h-[200px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        You can use HTML formatting in your message.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" disabled={isSending}>
                  {isSending ? "Sending..." : "Send Email"}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          {/* Bulk Email Tab */}
          <TabsContent value="bulk">
            <Form {...bulkEmailForm}>
              <form onSubmit={bulkEmailForm.handleSubmit(onBulkEmailSubmit)} className="space-y-4">
                <FormField
                  control={bulkEmailForm.control}
                  name="emailType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Group</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a recipient group" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="all-users">All Users</SelectItem>
                          <SelectItem value="premium-users">Premium Users</SelectItem>
                          <SelectItem value="free-users">Free Users</SelectItem>
                          <SelectItem value="inactive-users">Inactive Users</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={bulkEmailForm.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subject</FormLabel>
                      <FormControl>
                        <Input placeholder="Email subject" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={bulkEmailForm.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Message</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter your message here" 
                          className="min-h-[200px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        You can use HTML formatting in your message.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" disabled={isSending}>
                  {isSending ? "Sending..." : "Send Bulk Email"}
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          {/* Template Email Tab */}
          <TabsContent value="template">
            <Form {...templateEmailForm}>
              <form onSubmit={templateEmailForm.handleSubmit(onTemplateEmailSubmit)} className="space-y-4">
                <FormField
                  control={templateEmailForm.control}
                  name="emailTemplate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Template</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a template" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="welcome">Welcome Email</SelectItem>
                          <SelectItem value="upgrade">Upgrade Offer</SelectItem>
                          <SelectItem value="renewal">Subscription Renewal</SelectItem>
                          <SelectItem value="survey">Feedback Survey</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={templateEmailForm.control}
                  name="recipient"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient Email</FormLabel>
                      <FormControl>
                        <Input placeholder="user@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" disabled={isSending}>
                  {isSending ? "Sending..." : "Send Template Email"}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Emails will be sent from movesyncai@gmail.com
        </p>
      </CardFooter>
    </Card>
  );
};

export default EmailManager;
