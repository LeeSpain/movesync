
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { EmailService } from "@/utils/emailService";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const singleEmailSchema = z.object({
  recipient: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export type SingleEmailFormData = z.infer<typeof singleEmailSchema>;

export function SingleEmailForm() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);
  
  const form = useForm<SingleEmailFormData>({
    resolver: zodResolver(singleEmailSchema),
    defaultValues: {
      recipient: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: SingleEmailFormData) => {
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
        form.reset();
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
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
          control={form.control}
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
          control={form.control}
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
  );
}
