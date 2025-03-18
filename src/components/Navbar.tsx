
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import NavbarLogo from './navbar/NavbarLogo';
import NavbarDesktopMenu from './navbar/NavbarDesktopMenu';
import NavbarMobileMenu from './navbar/NavbarMobileMenu';
import MobileMenuButton from './navbar/MobileMenuButton';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { user, isAdmin } = useAuth();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Get selected country from localStorage
  useEffect(() => {
    const country = localStorage.getItem('moveSync_country');
    setSelectedCountry(country);
  }, []);

  // Country flag mapping
  const countryFlags: Record<string, string> = {
    'australia': '🇦🇺',
    'usa': '🇺🇸',
    'uk': '🇬🇧',
    'spain': '🇪🇸',
  };
  
  // Extra debug for auth status
  useEffect(() => {
    console.log("Navbar auth status:", { 
      isAdmin, 
      userObject: user, 
      userIsAdmin: user?.isAdmin,
      userId: user?.id,
      authenticated: !!user
    });
  }, [isAdmin, user]);
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container-content">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavbarLogo />

          {/* Desktop Navigation */}
          <NavbarDesktopMenu 
            selectedCountry={selectedCountry}
            countryFlags={countryFlags}
            isAdmin={isAdmin}
          />

          {/* Mobile Menu Button */}
          <MobileMenuButton 
            isMenuOpen={isMenuOpen}
            setIsMenuOpen={setIsMenuOpen}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <NavbarMobileMenu 
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        selectedCountry={selectedCountry}
        countryFlags={countryFlags}
        isAdmin={isAdmin}
      />
    </header>
  );
};

export default Navbar;
