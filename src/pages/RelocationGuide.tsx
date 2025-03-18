
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const RelocationGuide = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <h1 className="text-4xl font-bold text-center mb-6">Relocation Guide</h1>
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Your comprehensive resource for navigating the complexities of international relocation.
          Use this guide to prepare for your move and ensure a smooth transition to your new home.
        </p>
        
        <Tabs defaultValue="planning" className="mb-16">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-5">
            <TabsTrigger value="planning">Planning</TabsTrigger>
            <TabsTrigger value="visas">Visas & Immigration</TabsTrigger>
            <TabsTrigger value="housing">Housing</TabsTrigger>
            <TabsTrigger value="employment">Employment</TabsTrigger>
            <TabsTrigger value="living">Daily Living</TabsTrigger>
          </TabsList>
          
          <TabsContent value="planning" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Planning Your Relocation</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Timeline & Checklist</h3>
                    <p className="text-gray-700 mb-4">
                      Proper planning is essential for a successful international move. 
                      Here's a recommended timeline to help you stay organized:
                    </p>
                    
                    <div className="space-y-4">
                      <div className="border-l-4 border-movesync-blue pl-4">
                        <h4 className="font-medium">6-12 Months Before</h4>
                        <ul className="list-disc list-inside text-gray-700 ml-4 mt-2">
                          <li>Research visa requirements and begin application process</li>
                          <li>Start exploring housing options</li>
                          <li>Research healthcare systems and insurance needs</li>
                          <li>Begin looking into international schooling options if applicable</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-4 border-movesync-blue pl-4">
                        <h4 className="font-medium">3-6 Months Before</h4>
                        <ul className="list-disc list-inside text-gray-700 ml-4 mt-2">
                          <li>Secure necessary visas and work permits</li>
                          <li>Book temporary accommodation if needed</li>
                          <li>Research banking and finance options</li>
                          <li>Begin decluttering and organizing possessions</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-4 border-movesync-blue pl-4">
                        <h4 className="font-medium">1-3 Months Before</h4>
                        <ul className="list-disc list-inside text-gray-700 ml-4 mt-2">
                          <li>Get quotes from international movers</li>
                          <li>Arrange for necessary vaccinations</li>
                          <li>Set up mail forwarding</li>
                          <li>Notify important institutions about your move</li>
                        </ul>
                      </div>
                      
                      <div className="border-l-4 border-movesync-blue pl-4">
                        <h4 className="font-medium">Final Month</h4>
                        <ul className="list-disc list-inside text-gray-700 ml-4 mt-2">
                          <li>Confirm housing arrangements</li>
                          <li>Close local accounts or transfer to international options</li>
                          <li>Prepare essential documents package</li>
                          <li>Make final travel arrangements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3">Essential Documents</h3>
                    <p className="text-gray-700 mb-4">
                      Ensure you have these important documents ready and accessible:
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <ul className="list-disc list-inside text-gray-700 ml-4">
                        <li>Passport (valid for at least 6 months beyond planned stay)</li>
                        <li>Visa documentation</li>
                        <li>Birth certificates</li>
                        <li>Marriage certificate (if applicable)</li>
                        <li>Academic records and diplomas</li>
                      </ul>
                      
                      <ul className="list-disc list-inside text-gray-700 ml-4">
                        <li>Medical records and vaccination certificates</li>
                        <li>Driver's license</li>
                        <li>Tax records</li>
                        <li>Employment contracts</li>
                        <li>Insurance policies</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="visas" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Visas & Immigration</h2>
                <p className="text-gray-700 mb-6">
                  Understanding the visa and immigration requirements for your destination country is 
                  crucial for a legal and smooth relocation process.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Common Visa Types</h3>
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Work Visas</h4>
                        <p className="text-gray-700 mt-1">
                          Required if you're relocating for employment. Usually sponsored by your employer.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Family Visas</h4>
                        <p className="text-gray-700 mt-1">
                          For spouses, children, and sometimes other family members of visa holders.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Student Visas</h4>
                        <p className="text-gray-700 mt-1">
                          For those pursuing education in the destination country.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Investment/Entrepreneur Visas</h4>
                        <p className="text-gray-700 mt-1">
                          For individuals investing in or starting a business in the destination country.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3">Application Process Tips</h3>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>Start the application process early - many visas take months to process</li>
                      <li>Ensure all documents are properly translated if required</li>
                      <li>Be thorough and honest with all information provided</li>
                      <li>Consider working with an immigration lawyer for complex cases</li>
                      <li>Keep digital and physical copies of all submitted documents</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-xl font-medium mb-3 text-movesync-blue">Need More Help?</h3>
                    <p className="text-gray-700 mb-4">
                      MoveSync offers premium visa support services with expert guidance throughout the 
                      entire application process.
                    </p>
                    <Link 
                      to="/choose-plan" 
                      className="inline-flex items-center text-movesync-blue hover:text-movesync-blue-dark font-medium"
                    >
                      Learn about our premium services <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="housing" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Finding Housing Abroad</h2>
                <p className="text-gray-700 mb-6">
                  Securing suitable accommodation is one of the most important aspects of relocating. 
                  Here's what you need to know about finding housing in your new country.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Housing Options</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Temporary Accommodation</h4>
                        <p className="text-gray-700 mt-1">
                          Short-term rentals, serviced apartments, and extended-stay hotels provide 
                          flexible solutions while you search for permanent housing.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Rental Properties</h4>
                        <p className="text-gray-700 mt-1">
                          Apartments and houses available for long-term lease, typically requiring a 
                          security deposit and reference checks.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Corporate Housing</h4>
                        <p className="text-gray-700 mt-1">
                          Fully-furnished housing arranged by employers, often for executive-level 
                          relocations or shorter assignments.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Property Purchase</h4>
                        <p className="text-gray-700 mt-1">
                          For long-term relocations, buying property might be an option, though 
                          regulations vary widely by country.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3">Important Considerations</h3>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>Housing costs and typical rental terms in your destination</li>
                      <li>Proximity to work, schools, and essential services</li>
                      <li>Local neighborhood safety and amenities</li>
                      <li>Accessibility to public transportation</li>
                      <li>Utility costs and connection procedures</li>
                      <li>Legal requirements for foreign residents</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-xl font-medium mb-3 text-movesync-blue">MoveSync Property Search</h3>
                    <p className="text-gray-700 mb-4">
                      Our premium plan includes access to our curated property listings and personalized 
                      housing recommendations based on your specific needs and preferences.
                    </p>
                    <Link 
                      to="/dashboard/premium/property-search" 
                      className="inline-flex items-center text-movesync-blue hover:text-movesync-blue-dark font-medium"
                    >
                      Explore property search features <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="employment" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Employment Abroad</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Finding Work Opportunities</h3>
                    <p className="text-gray-700 mb-4">
                      Whether you're relocating with a job offer in hand or searching for opportunities 
                      after arrival, understanding the employment landscape is crucial.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Local Job Markets</h4>
                        <p className="text-gray-700 mt-1">
                          Research in-demand industries and roles in your destination country. 
                          Labor markets vary significantly between countries and regions.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Job Search Resources</h4>
                        <p className="text-gray-700 mt-1">
                          Utilize international job boards, recruitment agencies specializing in 
                          expatriate placements, and networking through professional organizations.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Work Permits</h4>
                        <p className="text-gray-700 mt-1">
                          Many countries require specific work authorization beyond your visa. 
                          Ensure you understand the legal requirements for employment.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3">Understanding Local Work Culture</h3>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>Business etiquette and communication styles differ across cultures</li>
                      <li>Working hours and time-off expectations may vary significantly</li>
                      <li>Management styles and workplace hierarchies can differ from your home country</li>
                      <li>Dress codes and professional appearance standards vary by region</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-xl font-medium mb-3 text-movesync-blue">Career Services</h3>
                    <p className="text-gray-700 mb-4">
                      MoveSync premium members receive access to personalized job search assistance, 
                      resume optimization for international markets, and interview preparation services.
                    </p>
                    <Link 
                      to="/dashboard/premium/job-search" 
                      className="inline-flex items-center text-movesync-blue hover:text-movesync-blue-dark font-medium"
                    >
                      Explore job search features <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="living" className="mt-6">
            <Card>
              <CardContent className="p-8">
                <h2 className="text-2xl font-semibold mb-6">Daily Living Abroad</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-medium mb-3">Setting Up Your New Life</h3>
                    <p className="text-gray-700 mb-4">
                      Once you've arrived in your new country, you'll need to establish the basics 
                      for comfortable daily living.
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Banking & Finance</h4>
                        <p className="text-gray-700 mt-1">
                          Open a local bank account, understand tax obligations, and set up payment methods.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Healthcare</h4>
                        <p className="text-gray-700 mt-1">
                          Register with healthcare providers, understand insurance coverage, and locate 
                          essential medical services.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Transportation</h4>
                        <p className="text-gray-700 mt-1">
                          Learn about public transit options, driving requirements, and vehicle purchase 
                          or rental considerations.
                        </p>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-md">
                        <h4 className="font-medium">Communication</h4>
                        <p className="text-gray-700 mt-1">
                          Set up phone service, internet connectivity, and understand postal services.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium mb-3">Cultural Adaptation</h3>
                    <p className="text-gray-700 mb-4">
                      Adjusting to a new culture is often the most challenging aspect of relocation. 
                      Here are some strategies for a smoother transition:
                    </p>
                    <ul className="list-disc list-inside text-gray-700 ml-4">
                      <li>Learn the local language basics, even if English is widely spoken</li>
                      <li>Understand and respect local customs and etiquette</li>
                      <li>Connect with both locals and fellow expatriates</li>
                      <li>Maintain some familiar traditions while embracing new experiences</li>
                      <li>Be patient with yourself during the adjustment period</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h3 className="text-xl font-medium mb-3 text-movesync-blue">Cost of Living Calculator</h3>
                    <p className="text-gray-700 mb-4">
                      Use our detailed cost of living calculator to understand and plan for expenses 
                      in your new location.
                    </p>
                    <Link 
                      to="/cost-calculator" 
                      className="inline-flex items-center text-movesync-blue hover:text-movesync-blue-dark font-medium"
                    >
                      Try our cost calculator <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
};

export default RelocationGuide;
