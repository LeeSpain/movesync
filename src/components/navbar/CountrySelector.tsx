
import React from 'react';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CountrySelectorProps {
  selectedCountry: string | null;
  countryFlags: Record<string, string>;
}

export const CountrySelector = ({ selectedCountry, countryFlags }: CountrySelectorProps) => {
  return (
    <Link 
      to="/" 
      className="flex items-center gap-1 text-movesync-gray-dark hover:text-movesync-blue transition-colors duration-200"
    >
      <Globe size={18} />
      <span>
        {selectedCountry ? `${countryFlags[selectedCountry] || ''}` : 'Select Country'}
      </span>
    </Link>
  );
};

export default CountrySelector;
