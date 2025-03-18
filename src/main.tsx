
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Add a passive event listener to improve scrolling performance
document.addEventListener('touchstart', () => {}, { passive: true });

// Get rid of 300ms delay on mobile devices
const meta = document.createElement('meta');
meta.name = 'viewport';
meta.content = 'width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no';
document.head.appendChild(meta);

// Create root with concurrent mode enabled
createRoot(document.getElementById("root")!).render(<App />);

// Add preconnect hints for external resources
const preconnectDomains = [
  'https://images.unsplash.com',
  'https://fonts.googleapis.com'
];

preconnectDomains.forEach(domain => {
  const link = document.createElement('link');
  link.rel = 'preconnect';
  link.href = domain;
  document.head.appendChild(link);
  
  // DNS prefetch as fallback
  const dnsLink = document.createElement('link');
  dnsLink.rel = 'dns-prefetch';
  dnsLink.href = domain;
  document.head.appendChild(dnsLink);
});
