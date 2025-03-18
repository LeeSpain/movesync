
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';

const About = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-12">About Move-Sync</h1>
        
        <div className="grid gap-10 mb-16">
          <Card className="shadow-md border border-gray-200">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                  <p className="text-gray-700 mb-4">
                    At Move-Sync, our mission is to simplify the global relocation process through 
                    technology and personalized support. We believe that moving to a new country 
                    should be an exciting opportunity, not a stressful challenge.
                  </p>
                  <p className="text-gray-700">
                    We're dedicated to helping individuals and families navigate the complexities 
                    of international moves with confidence and ease.
                  </p>
                </div>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Team meeting" 
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border border-gray-200">
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="order-2 md:order-1 rounded-lg overflow-hidden shadow-lg">
                  <img 
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="Team collaboration" 
                    className="w-full h-64 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
                  <p className="text-gray-700 mb-4">
                    Founded in 2023, Move-Sync was born from the personal experiences of our founders 
                    who faced the challenges of international relocation firsthand. What began as a 
                    solution to their own problems quickly evolved into a comprehensive platform 
                    helping thousands of people worldwide.
                  </p>
                  <p className="text-gray-700">
                    Today, we're a diverse team of experts from technology, immigration, real estate, 
                    and customer service backgrounds, all united by our passion for making global 
                    mobility accessible to everyone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="shadow-md border border-gray-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6 text-center">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3 text-movesync-blue">Innovation</h3>
                  <p className="text-gray-700">
                    We leverage cutting-edge technology to constantly improve and simplify the relocation process.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3 text-movesync-blue">Empathy</h3>
                  <p className="text-gray-700">
                    We understand the emotional challenges of moving and provide compassionate support at every step.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <h3 className="text-xl font-medium mb-3 text-movesync-blue">Integrity</h3>
                  <p className="text-gray-700">
                    We're committed to transparency, honesty, and always acting in our users' best interests.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
