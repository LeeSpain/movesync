
import React from 'react';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface CountrySelectorProps {
  selectedCountry: string | null;
  countryFlags: Record<string, string>;
}

export const CountrySelector = ({ selectedCountry, countryFlags }: CountrySelectorProps) => {
  return (
    <Link 
      to="/" 
      className={cn(
        "flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors duration-200",
        "text-movesync-gray-dark hover:text-movesync-blue",
        "bg-accent/50 hover:bg-accent"
      )}
    >
      <Globe className="h-4 w-4" />
      <span className="text-sm font-medium">
        {selectedCountry ? `${countryFlags[selectedCountry]} ${selectedCountry}` : 'Select Country'}
      </span>
    </Link>
  );
};

export default CountrySelector;
