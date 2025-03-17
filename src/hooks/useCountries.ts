
import { useState, useEffect } from 'react';

export interface Country {
  id: string;
  name: string;
  flag: string;
  description: string;
  active: boolean;
  highlights: string[];
}

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([
    { 
      id: 'australia', 
      name: 'Australia', 
      flag: '🇦🇺', 
      description: 'A diverse landscape with vibrant cities, stunning beaches, and unique wildlife.',
      active: true,
      highlights: ['Strong economy', 'High quality of life', 'Excellent healthcare']
    },
    { 
      id: 'usa', 
      name: 'United States', 
      flag: '🇺🇸', 
      description: 'From coast to coast, discover endless opportunities in this diverse melting pot.',
      active: false,
      highlights: ['Career opportunities', 'Educational excellence', 'Cultural diversity']
    },
    { 
      id: 'uk', 
      name: 'United Kingdom', 
      flag: '🇬🇧', 
      description: 'Experience rich history, cultural landmarks, and innovative opportunities.',
      active: false,
      highlights: ['Historical charm', 'World-class education', 'Multicultural cities']
    },
    { 
      id: 'spain', 
      name: 'Spain', 
      flag: '🇪🇸', 
      description: 'Enjoy Mediterranean lifestyle with incredible food, art and architecture.',
      active: false,
      highlights: ['Relaxed lifestyle', 'Rich culture', 'Beautiful climate']
    },
  ]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return { countries };
};
