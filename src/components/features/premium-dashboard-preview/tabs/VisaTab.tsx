
import { CheckCircle } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const VisaTab = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <Card className="bg-gray-50 border border-gray-100">
        <CardContent className="p-4">
          <h4 className="font-medium mb-3">Skilled Worker Visa - Application Timeline</h4>
          <div className="space-y-4">
            {["Application Submitted", "Documents Verified", "Background Check", "Interview Scheduled", "Final Decision"].map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="mr-3 flex flex-col items-center">
                  <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                    index < 2 ? 'bg-green-500 text-white' : 
                    index === 2 ? 'bg-amber-500 text-white' : 
                    'bg-gray-200'
                  }`}>
                    {index < 2 ? (
                      <CheckCircle className="h-4 w-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < 4 && (
                    <div className={`w-0.5 h-8 ${
                      index < 2 ? 'bg-green-500' : 'bg-gray-200'
                    }`}></div>
                  )}
                </div>
                <div>
                  <p className={`font-medium ${
                    index < 2 ? 'text-green-600' : 
                    index === 2 ? 'text-amber-600' : 
                    'text-movesync-gray'
                  }`}>
                    {step}
                  </p>
                  <p className="text-sm text-movesync-gray">
                    {index < 2 ? 'Completed' : index === 2 ? 'In Progress' : 'Pending'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
