
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const CostsTab = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">Monthly Expenses Comparison</h4>
            <div className="space-y-2">
              {["Housing", "Transportation", "Food & Groceries", "Utilities"].map((category, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-movesync-gray-dark">{category}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500 line-through">${(500 + index * 200).toLocaleString()}</span>
                    <span className="font-medium">${(400 + index * 150).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <h4 className="font-medium mb-2">City Cost Index</h4>
            <div className="space-y-2">
              {["Sydney", "Melbourne", "Brisbane", "Perth", "Adelaide"].map((city, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-24">{city}</span>
                  <div className="flex-1 bg-gray-100 h-4 rounded-full overflow-hidden">
                    <div 
                      className="bg-movesync-blue h-full rounded-full" 
                      style={{ width: `${100 - index * 8}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{100 - index * 8}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
};
