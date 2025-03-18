
import { useState, useRef, useEffect } from 'react';
import { ArrowRight, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const footerRef = useRef<HTMLElement>(null);
  
  // Handle intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (footerRef.current) {
      observer.observe(footerRef.current);
    }
    
    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);
  
  // Handle newsletter submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '') return;
    
    // Simulate submission
    setIsSubmitted(true);
    setEmail('');
    
    // Reset after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <footer 
      ref={footerRef}
      className="bg-movesync-black text-white pt-16 pb-8"
    >
      <div className="container-content">
        {/* Newsletter section */}
        <div 
          className={`max-w-3xl mx-auto mb-16 transition-all duration-700 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="bg-gradient-to-br from-movesync-blue to-blue-600 rounded-2xl p-8 lg:p-12 text-white">
            <div className="text-center mb-8">
              <h3 className="text-2xl lg:text-3xl font-bold mb-4">Stay Updated</h3>
              <p className="text-white/80">
                Subscribe to our newsletter for the latest Move-Sync features and relocation tips.
              </p>
            </div>
            
            <form 
              onSubmit={handleSubmit}
              className="max-w-md mx-auto"
            >
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-movesync-blue">
                  <Mail size={20} />
                </div>
                <input 
                  type="email"
                  className="w-full pl-10 pr-36 py-3 rounded-lg bg-white text-movesync-black placeholder-movesync-gray focus:outline-none focus:ring-2 focus:ring-white/30"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button 
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-movesync-blue hover:bg-movesync-blue-dark text-white px-4 py-1.5 rounded-md font-medium transition-colors flex items-center gap-1 group"
                >
                  Subscribe <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              {isSubmitted && (
                <p className="text-white text-center mt-2 animate-fade-in">Thanks for subscribing!</p>
              )}
            </form>
          </div>
        </div>
        
        {/* Footer links - SIMPLIFIED VERSION */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 transition-all duration-700 delay-300 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div>
            <h4 className="text-lg font-semibold mb-4">Move-Sync</h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-white/70 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/investment" className="text-white/70 hover:text-white transition-colors">Investment</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><Link to="/relocation-guide" className="text-white/70 hover:text-white transition-colors">Relocation Guide</Link></li>
              <li><Link to="/cost-calculator" className="text-white/70 hover:text-white transition-colors">Cost Calculator</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Copyright and social */}
        <div 
          className={`flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 transition-all duration-700 delay-500 ${
            isIntersecting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="mb-4 md:mb-0">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold">
                Move-<span className="text-movesync-blue">Sync</span>
              </span>
            </Link>
          </div>
          
          <div className="flex space-x-6">
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-twitter">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
              </svg>
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
              </svg>
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </a>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-linkedin">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect width="4" height="12" x="2" y="9"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>
          
          <div className="mt-4 md:mt-0 text-white/50 text-sm">
            © {new Date().getFullYear()} Move-Sync. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
