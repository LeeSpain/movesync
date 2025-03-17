
import React from 'react';
import { cn } from '@/lib/utils';
import { Link, useNavigate } from 'react-router-dom';
import { Globe, LayoutDashboard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface NavbarMobileMenuProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  selectedCountry: string | null;
  countryFlags: Record<string, string>;
  isAdmin: boolean;
}

export const NavbarMobileMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  selectedCountry,
  countryFlags,
  isAdmin
}: NavbarMobileMenuProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  console.log("NavbarMobileMenu rendering, isAdmin:", isAdmin);
  
  const handleNavigate = (path: string) => {
    console.log("NavbarMobileMenu: Navigating to:", path);
    setIsMenuOpen(false);
    navigate(path);
  };
  
  const handleGetStarted = () => {
    // Direct users to the plan selection page
    navigate('/choose-plan');
    setIsMenuOpen(false);
  };
  
  return (
    <div 
      className={cn(
        "fixed inset-0 bg-white z-40 pt-20 px-6 transition-all duration-300 ease-in-out transform md:hidden",
        isMenuOpen 
          ? "translate-x-0 opacity-100" 
          : "translate-x-full opacity-0 pointer-events-none"
      )}
    >
      <nav className="flex flex-col space-y-6">
        <a 
          href="#features" 
          className="text-xl text-movesync-black py-2 border-b border-gray-100"
          onClick={() => setIsMenuOpen(false)}
        >
          Features
        </a>
        <a 
          href="#pricing" 
          className="text-xl text-movesync-black py-2 border-b border-gray-100"
          onClick={() => setIsMenuOpen(false)}
        >
          Pricing
        </a>
        <a 
          href="#about" 
          className="text-xl text-movesync-black py-2 border-b border-gray-100"
          onClick={() => setIsMenuOpen(false)}
        >
          About
        </a>
        <Link 
          to="/countries" 
          className="text-xl text-movesync-black py-2 border-b border-gray-100 flex items-center gap-2"
          onClick={() => setIsMenuOpen(false)}
        >
          <Globe size={20} />
          {selectedCountry ? `Countries ${countryFlags[selectedCountry] || ''}` : 'Select Country'}
        </Link>
        <div
          className="text-xl text-movesync-black py-2 border-b border-gray-100 cursor-pointer"
          onClick={() => handleNavigate('/dashboard')}
        >
          Dashboard
        </div>
        {isAdmin && (
          <div
            className="text-xl text-movesync-black py-2 border-b border-gray-100 flex items-center gap-2 cursor-pointer"
            onClick={() => handleNavigate('/admin')}
          >
            <LayoutDashboard size={20} />
            Admin Dashboard
          </div>
        )}
        <div
          className="btn-primary text-center mt-4 cursor-pointer"
          onClick={handleGetStarted}
        >
          Get Started
        </div>
      </nav>
    </div>
  );
};

export default NavbarMobileMenu;
