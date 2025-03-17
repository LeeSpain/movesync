
import React from 'react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { Globe, LayoutDashboard } from 'lucide-react';

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
        <Link 
          to="/dashboard" 
          className="text-xl text-movesync-black py-2 border-b border-gray-100"
          onClick={() => setIsMenuOpen(false)}
        >
          Dashboard
        </Link>
        {isAdmin && (
          <Link 
            to="/admin" 
            className="text-xl text-movesync-black py-2 border-b border-gray-100 flex items-center gap-2"
            onClick={() => setIsMenuOpen(false)}
          >
            <LayoutDashboard size={20} />
            Admin Dashboard
          </Link>
        )}
        <Link 
          to="/dashboard" 
          className="btn-primary text-center mt-4"
          onClick={() => setIsMenuOpen(false)}
        >
          Get Started
        </Link>
      </nav>
    </div>
  );
};

export default NavbarMobileMenu;
