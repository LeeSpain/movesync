
import { useEffect } from 'react';
import CountrySelector from '../components/CountrySelector';
import Navbar from '../components/Navbar';

const Countries = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 pt-24 pb-16">
        <CountrySelector />
      </div>
    </div>
  );
};

export default Countries;
