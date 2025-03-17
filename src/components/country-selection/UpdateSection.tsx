
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const UpdateSection = () => {
  return (
    <motion.div 
      className="max-w-2xl mx-auto mt-16 text-center bg-white/70 backdrop-blur-sm p-8 rounded-lg shadow-sm border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
    >
      <h3 className="text-xl font-medium mb-3">Expanding to More Locations</h3>
      <p className="text-muted-foreground mb-6">
        Our AI is learning about more destinations every day. Sign up to be notified when we add support for your desired location.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
        <input 
          type="email" 
          placeholder="Your email address" 
          className="px-3 py-2 rounded-md border border-input bg-background text-foreground flex-grow focus:outline-none focus:ring-2 focus:ring-ring text-sm shadow-inner"
        />
        <Button 
          type="submit"
          size="default"
          className="shadow-md shadow-movesync-blue/10"
        >
          Get Updates
        </Button>
      </div>
      
      <div className="mt-8 pt-6 text-xs text-muted-foreground border-t border-border">
        Powered by MoveSync AI — making relocation simpler through intelligent assistance.
      </div>
    </motion.div>
  );
};

export default UpdateSection;
