
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const JobsTab = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <div className="space-y-3">
        {["Senior Software Engineer", "Marketing Manager", "Financial Analyst"].map((title, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold">{title}</h4>
                    <Badge className="bg-green-100 text-green-800">{95 - index * 5}% Match</Badge>
                  </div>
                  <p className="text-movesync-gray-dark text-sm">
                    {["TechSolutions Australia", "Global Marketing Co.", "Finance Partners"][index]} • 
                    {["Sydney CBD", "Melbourne", "Brisbane"][index]}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">$${120 - index * 10}k-${160 - index * 10}k</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </motion.div>
  );
};
