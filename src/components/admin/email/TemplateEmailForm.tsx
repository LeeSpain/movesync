
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { EmailService } from "@/utils/emailService";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const templateEmailSchema = z.object({
  emailTemplate: z.enum(["welcome", "upgrade", "renewal", "survey"], {
    required_error: "Please select a template",
  }),
  recipient: z.string().email({ message: "Please enter a valid email address" }),
});

export type TemplateEmailFormData = z.infer<typeof templateEmailSchema>;

export function TemplateEmailForm() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const form = useForm<TemplateEmailFormData>({
    resolver: zodResolver(templateEmailSchema),
    defaultValues: {
      emailTemplate: "welcome",
      recipient: "",
    },
  });

  const onSubmit = async (data: TemplateEmailFormData) => {
    setIsSending(true);
    
    try {
      let result = false;
      
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
        form.reset();
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
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
        
        <Button type="submit" disabled={isSending}>
          {isSending ? "Sending..." : "Send Template Email"}
        </Button>
      </form>
    </Form>
  );
}
