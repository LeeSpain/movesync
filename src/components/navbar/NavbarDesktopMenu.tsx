
import React from 'react';
import { Link } from 'react-router-dom';
import CountrySelector from './CountrySelector';
import QuickAccessMenu from './QuickAccessMenu';

interface NavbarDesktopMenuProps {
  selectedCountry: string | null;
  countryFlags: Record<string, string>;
  isAdmin: boolean;
}

export const NavbarDesktopMenu = ({ 
  selectedCountry, 
  countryFlags, 
  isAdmin 
}: NavbarDesktopMenuProps) => {
  return (
    <nav className="hidden md:flex items-center space-x-8">
      <a href="#features" className="text-movesync-gray-dark hover:text-movesync-blue transition-colors duration-200">
        Features
      </a>
      <a href="#pricing" className="text-movesync-gray-dark hover:text-movesync-blue transition-colors duration-200">
        Pricing
      </a>
      <a href="#about" className="text-movesync-gray-dark hover:text-movesync-blue transition-colors duration-200">
        About
      </a>
      
      <CountrySelector 
        selectedCountry={selectedCountry} 
        countryFlags={countryFlags} 
      />
      
      <QuickAccessMenu isAdmin={isAdmin} />
      
      <Link 
        to="/dashboard" 
        className="btn-primary"
      >
        Get Started
      </Link>
    </nav>
  );
};

export default NavbarDesktopMenu;
