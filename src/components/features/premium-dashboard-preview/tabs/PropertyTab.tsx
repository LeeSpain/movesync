
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const propertyImages = [
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=75",
  "https://images.unsplash.com/photo-1622015663084-307d19eabbbf?w=800&auto=format&fit=crop&q=75",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=75"
];

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

export const PropertyTab = () => {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-6"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      {["Sydney Waterfront Apartment", "Melbourne City Loft", "Brisbane Family Home"].map((title, index) => (
        <Card key={index} className="overflow-hidden transform hover:scale-105 transition-transform duration-200 border border-gray-100">
          <div className="h-48 bg-cover bg-center bg-gray-100 relative">
            <img 
              src={propertyImages[index]}
              alt={title}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute top-2 right-2">
              <Badge className="bg-movesync-outback-red text-white">
                {90 - index * 5}% Match
              </Badge>
            </div>
          </div>
          <CardContent className="p-4">
            <h4 className="font-semibold text-lg mb-2">{title}</h4>
            <div className="flex justify-between items-center">
              <span className="text-movesync-gray-dark">{["Bondi", "Southbank", "New Farm"][index]}</span>
              <span className="font-medium text-movesync-blue">${(500 + index * 50).toLocaleString()}/week</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </motion.div>
  );
};
