
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="container mx-auto px-4 pt-16 pb-12">
      <motion.div 
        className="max-w-3xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >            
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
          Welcome to <span className="text-movesync-blue">MoveSync</span>
        </h1>
        
        <p className="text-lg text-muted-foreground mb-6">
          Select your destination to begin your personalized relocation experience. 
          Our AI-powered platform will guide you through every step of your journey.
        </p>
        
        <div className="bg-accent/50 p-6 rounded-xl mb-6">
          <h2 className="text-xl font-semibold mb-3">Why Choose MoveSync?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-movesync-blue/10 p-2 mt-1">
                <Globe className="w-4 h-4 text-movesync-blue" />
              </div>
              <div>
                <h3 className="font-medium text-sm">AI-Powered Planning</h3>
                <p className="text-sm text-muted-foreground">Customized relocation timelines and checklists</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-movesync-blue/10 p-2 mt-1">
                <svg className="w-4 h-4 text-movesync-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6L20 6M9 12H20M9 18H20M5 6V6.01M5 12V12.01M5 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Streamlined Documentation</h3>
                <p className="text-sm text-muted-foreground">Easy visa and permit management</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-movesync-blue/10 p-2 mt-1">
                <svg className="w-4 h-4 text-movesync-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h3 className="font-medium text-sm">Local Integration</h3>
                <p className="text-sm text-muted-foreground">Housing, jobs, and community connections</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap justify-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-accent rounded-full">
            <Globe className="w-4 h-4 text-movesync-blue" />
            <span className="text-sm font-medium">Choose Your Destination</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
