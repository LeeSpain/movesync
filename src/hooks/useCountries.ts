
import { useState, useEffect } from 'react';

export interface Country {
  id: string;
  name: string;
  flag: string;
  description: string;
  active: boolean;
  highlights: string[];
  image: string;
}

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([
    { 
      id: 'australia', 
      name: 'Australia', 
      flag: '🇦🇺', 
      description: 'From vibrant cities to the vast outback, Australia offers pristine beaches, unique wildlife, and a laid-back lifestyle with excellent healthcare and education.',
      active: true,
      highlights: ['Strong economy & high wages', 'World-class healthcare system', 'Exceptional quality of life', 'Welcoming multicultural society'],
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&q=80'
    },
    { 
      id: 'usa', 
      name: 'United States', 
      flag: '🇺🇸', 
      description: 'Experience the American dream with endless opportunities across diverse landscapes, from bustling metropolises to stunning national parks.',
      active: false,
      highlights: ['Innovative job market', 'World-leading universities', 'Cultural diversity', 'Entrepreneurial ecosystem'],
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&q=80'
    },
    { 
      id: 'uk', 
      name: 'United Kingdom', 
      flag: '🇬🇧', 
      description: 'Rich in history and culture, the UK blends historical charm with modern innovation, featuring world-class education and universal healthcare.',
      active: false,
      highlights: ['Historical landmarks & culture', 'Excellent education system', 'Universal healthcare (NHS)', 'Diverse metropolitan cities'],
      image: 'https://images.unsplash.com/photo-1486299267070-83823f5448dd?auto=format&fit=crop&q=80'
    },
    { 
      id: 'spain', 
      name: 'Spain', 
      flag: '🇪🇸', 
      description: 'Embrace the Mediterranean lifestyle with Spain\'s incredible cuisine, rich cultural heritage, stunning beaches, and welcoming atmosphere.',
      active: false,
      highlights: ['Relaxed work-life balance', 'Mediterranean cuisine & culture', 'Excellent climate year-round', 'Affordable cost of living'],
      image: 'https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?auto=format&fit=crop&q=80'
    },
    { 
      id: 'canada', 
      name: 'Canada', 
      flag: '🇨🇦', 
      description: 'Known for its stunning landscapes, diverse cities, and friendly locals, Canada offers universal healthcare and excellent quality of life.',
      active: false,
      highlights: ['Universal healthcare', 'High safety index', 'Inclusive immigration policies', 'Natural beauty & outdoor lifestyle'],
      image: 'https://images.unsplash.com/photo-1503614472-8c93d56e92ce?auto=format&fit=crop&q=80'
    },
    { 
      id: 'newzealand', 
      name: 'New Zealand', 
      flag: '🇳🇿', 
      description: 'Experience breathtaking landscapes made famous by Lord of the Rings alongside progressive policies and a high quality of life.',
      active: false,
      highlights: ['Excellent work-life balance', 'Spectacular natural beauty', 'Strong environmental focus', 'Safe & politically stable'],
      image: 'https://images.unsplash.com/photo-1469521669194-babb45599def?auto=format&fit=crop&q=80'
    },
    { 
      id: 'netherlands', 
      name: 'Netherlands', 
      flag: '🇳🇱', 
      description: 'Discover the charming canals, cycling culture, and innovative cities of the Netherlands, known for its high quality of life and work-life balance.',
      active: false,
      highlights: ['Excellent healthcare system', 'Strong economy & innovation', 'Bicycle-friendly cities', 'Progressive social policies'],
      image: 'https://images.unsplash.com/photo-1512470876302-972faa2aa9a4?auto=format&fit=crop&q=80'
    },
  ]);

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return { countries };
};
