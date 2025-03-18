
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Send, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-16 pb-20 max-w-7xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3 text-gradient">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're here to help with any questions you may have about relocating to Australia.
            Our team is ready to assist you.
          </p>
        </div>
        
        <div className="grid md:grid-cols-5 gap-10 mb-16 max-w-6xl mx-auto">
          <Card className="shadow-lg border border-gray-100 md:col-span-3 overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-movesync-blue to-movesync-blue-light h-2 w-full"></div>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="h-11"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email address"
                    className="h-11"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject of your message"
                    className="h-11"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    rows={5}
                    className="resize-none"
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-movesync-blue hover:bg-movesync-blue-dark transition-all duration-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : (
                    <>
                      <Send className="mr-2 h-4 w-4" /> Send Message
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg border border-gray-100 md:col-span-2 overflow-hidden transition-all duration-300 hover:shadow-xl">
            <div className="bg-gradient-to-r from-movesync-blue to-movesync-blue-light h-2 w-full"></div>
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-movesync-blue p-3 rounded-full text-white shadow-md">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Email</h3>
                    <p className="text-gray-600 mt-1">support@movesync.com</p>
                    <p className="text-gray-600">info@movesync.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-movesync-blue p-3 rounded-full text-white shadow-md">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Phone</h3>
                    <p className="text-gray-600 mt-1">+61 (02) 8005 1234</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="bg-movesync-blue p-3 rounded-full text-white shadow-md">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Office</h3>
                    <p className="text-gray-600 mt-1">
                      123 Collins Street<br />
                      Melbourne, VIC 3000<br />
                      Australia
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-100">
                <h3 className="text-lg font-medium mb-3">Business Hours</h3>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-gray-600">Monday - Friday:</div>
                  <div>9:00 AM - 5:00 PM AEST</div>
                  <div className="text-gray-600">Weekend:</div>
                  <div>Closed</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="h-96 w-full rounded-lg overflow-hidden shadow-lg">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835253614817!2d144.96751!3d-37.813611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642b8c21cb29b%3A0x1c045678462e3510!2s123%20Collins%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1656052381230!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="MoveSync Office Location"
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
