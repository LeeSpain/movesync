
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
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
  const navigate = useNavigate();
  const { user } = useAuth();
  
  console.log("NavbarDesktopMenu rendering, isAdmin:", isAdmin);
  
  const handleGetStarted = () => {
    // Direct users to the plan selection page
    navigate('/choose-plan');
  };
  
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
      
      <button 
        onClick={handleGetStarted}
        className="btn-primary"
      >
        Get Started
      </button>
    </nav>
  );
};

export default NavbarDesktopMenu;
