
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

const Countries = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Sample country data
  const countries = [
    { id: 'australia', name: 'Australia', flag: '🇦🇺', active: true },
    { id: 'canada', name: 'Canada', flag: '🇨🇦', active: true },
    { id: 'uk', name: 'United Kingdom', flag: '🇬🇧', active: true },
    { id: 'usa', name: 'United States', flag: '🇺🇸', active: true },
    { id: 'germany', name: 'Germany', flag: '🇩🇪', active: true },
    { id: 'newzealand', name: 'New Zealand', flag: '🇳🇿', active: true },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Select a Country</h1>
          <p className="text-gray-600 mt-2">Choose the country you're interested in moving to or learning about.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {countries.map(country => (
            <Card key={country.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{country.flag}</span>
                  <span>{country.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Click to explore relocation options for {country.name}.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Countries;
