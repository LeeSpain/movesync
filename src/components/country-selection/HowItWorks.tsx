
import { Globe } from "lucide-react";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="bg-accent/50 py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-2">How MoveSync Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our streamlined process makes relocation simple and stress-free
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm border border-border">
              <Globe className="w-6 h-6 text-movesync-blue" />
            </div>
            <h3 className="font-medium mb-2">Select Location</h3>
            <p className="text-sm text-muted-foreground">Choose your ideal destination from our supported locations.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm border border-border">
              <svg className="w-6 h-6 text-movesync-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20M12 4L8 8M12 4L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-medium mb-2">AI Planning</h3>
            <p className="text-sm text-muted-foreground">Get a personalized relocation plan created for your specific needs.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm border border-border">
              <svg className="w-6 h-6 text-movesync-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6L20 6M9 12H20M9 18H20M5 6V6.01M5 12V12.01M5 18V18.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-medium mb-2">Guided Process</h3>
            <p className="text-sm text-muted-foreground">Navigate applications, housing, and job searches with expert guidance.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center mb-4 shadow-sm border border-border">
              <svg className="w-6 h-6 text-movesync-blue" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-medium mb-2">Seamless Move</h3>
            <p className="text-sm text-muted-foreground">Arrive with confidence, knowing everything has been organized.</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;
