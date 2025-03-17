
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Globe, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useAuth } from '@/contexts/AuthContext';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const { isAdmin } = useAuth();
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
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
          <a href="#" className="flex items-center">
            <span className="text-2xl font-bold text-movesync-black">
              Move<span className="text-movesync-blue">Sync</span>
            </span>
          </a>

          {/* Desktop Navigation */}
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
            
            {/* Country Selector Button */}
            <Link 
              to="/countries" 
              className="flex items-center gap-1 text-movesync-gray-dark hover:text-movesync-blue transition-colors duration-200"
            >
              <Globe size={18} />
              <span>
                {selectedCountry ? `${countryFlags[selectedCountry] || ''}` : 'Select Country'}
              </span>
            </Link>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-movesync-gray-dark hover:text-movesync-blue transition-colors duration-200 flex items-center gap-1">
                  Quick Access <ChevronDown size={16} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="bg-white">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center gap-2">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/admin" className="flex items-center gap-2">
                        <LayoutDashboard className="h-4 w-4 mr-2" />
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link 
              to="/dashboard" 
              className="btn-primary"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-movesync-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
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
    </header>
  );
};

export default Navbar;
