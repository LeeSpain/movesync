
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

const bulkEmailSchema = z.object({
  emailType: z.enum(["all-users", "premium-users", "free-users", "inactive-users"], {
    required_error: "Please select an email type",
  }),
  subject: z.string().min(1, { message: "Subject is required" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

export type BulkEmailFormData = z.infer<typeof bulkEmailSchema>;

export function BulkEmailForm() {
  const { toast } = useToast();
  const [isSending, setIsSending] = useState(false);

  const form = useForm<BulkEmailFormData>({
    resolver: zodResolver(bulkEmailSchema),
    defaultValues: {
      emailType: "all-users",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: BulkEmailFormData) => {
    setIsSending(true);
    
    try {
      // In a real application, this would retrieve the list of user emails based on the selected type
      // and send emails to all of them
      
      // For demo purposes, we'll just simulate success
      toast({
        title: "Bulk Email Queued",
        description: `Emails will be sent to ${data.emailType.replace('-', ' ')}`,
      });
      
      form.reset();
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
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
          {isSending ? "Sending..." : "Send Bulk Email"}
        </Button>
      </form>
    </Form>
  );
}
