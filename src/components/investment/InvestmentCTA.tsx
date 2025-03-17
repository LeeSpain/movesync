
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Mail, Phone, Calendar } from 'lucide-react';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  phone: z.string().optional(),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
  preferredContact: z.enum(["email", "phone"]),
  bestTime: z.string().optional(),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const InvestmentCTA = () => {
  const { toast } = useToast();
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "I'm interested in investing in MoveSync and would like to schedule a call to discuss options.",
      preferredContact: "email",
      bestTime: "",
    },
  });

  function onSubmit(data: ContactFormValues) {
    console.log(data);
    toast({
      title: "Request submitted",
      description: "We'll be in touch with you shortly!",
    });
    form.reset();
  }

  return (
    <Card className="bg-[#FEF7CD] border border-amber-200 shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-center text-2xl">Ready to Invest in Our Global Platform?</CardTitle>
      </CardHeader>
      <CardContent className="text-center py-6">
        <p className="mb-8 max-w-2xl mx-auto">
          Contact our investment team to discuss your options and learn more about our global growth plans and expansion strategy.
        </p>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="px-8 py-3 bg-movesync-blue text-white rounded-lg font-medium transition-all duration-300 hover:bg-movesync-blue-dark hover:shadow-lg inline-flex items-center"
            >
              <Phone className="mr-2 h-4 w-4" />
              Schedule a Call
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Contact Our Investment Team</DialogTitle>
              <DialogDescription>
                Fill out the form below and we'll get back to you shortly to discuss investment opportunities.
              </DialogDescription>
            </DialogHeader>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="your.email@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone Number (optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="+1 (555) 123-4567" {...field} />
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
                          placeholder="Tell us more about your investment interests"
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="preferredContact"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Preferred Contact Method</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex space-x-4"
                        >
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="email" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center">
                              <Mail className="mr-1 h-4 w-4" />
                              Email
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="phone" />
                            </FormControl>
                            <FormLabel className="font-normal flex items-center">
                              <Phone className="mr-1 h-4 w-4" />
                              Phone Call
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {form.watch("preferredContact") === "phone" && (
                  <FormField
                    control={form.control}
                    name="bestTime"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Best Time to Call</FormLabel>
                        <FormControl>
                          <div className="flex items-center">
                            <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                            <Input placeholder="e.g., Weekdays after 3 PM EST" {...field} />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <div className="pt-4">
                  <Button 
                    type="submit" 
                    className="w-full bg-movesync-blue"
                  >
                    Submit Request
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default InvestmentCTA;
