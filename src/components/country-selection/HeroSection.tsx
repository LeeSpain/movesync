
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
