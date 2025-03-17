
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export interface Country {
  id: string;
  name: string;
  flag: string;
  description: string;
  active: boolean;
  highlights: string[];
  image: string;
}

interface CountryCardProps {
  country: Country;
  onSelect: (countryId: string) => void;
  index: number;
}

const CountryCard = ({ country, onSelect, index }: CountryCardProps) => {
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1
      }
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={itemVariants}
      className="h-full"
    >
      <Card 
        onClick={() => onSelect(country.id)}
        className={`relative overflow-hidden h-full cursor-pointer transition-all duration-300 
          hover:shadow-lg group border-0 rounded-xl
          ${country.active ? '' : 'opacity-90 hover:opacity-100'}
        `}
      >
        {/* Country image background */}
        <div className="absolute inset-0 w-full h-full">
          <img 
            src={country.image} 
            alt={country.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30"></div>
        </div>
        
        <div className="relative z-10 text-white h-full flex flex-col">
          <CardHeader className="pb-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-3xl filter drop-shadow-sm">{country.flag}</span>
                <h3 className="text-2xl font-bold">{country.name}</h3>
              </div>
              
              {country.active ? (
                <span className="inline-flex items-center px-2.5 py-0.5 bg-green-500/20 text-green-100 text-xs rounded-full backdrop-blur-sm">
                  <Check className="w-3 h-3 mr-0.5" /> Available
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 bg-gray-800/50 text-gray-200 text-xs rounded-full backdrop-blur-sm">
                  Coming Soon
                </span>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="py-4 flex-grow">
            <p className="text-gray-200 mb-4 text-sm md:text-base drop-shadow-sm">{country.description}</p>
            
            <div className="space-y-2">
              {country.highlights.slice(0, 3).map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <div className="h-4 w-4 rounded-full bg-movesync-blue/30 flex items-center justify-center flex-shrink-0 mt-0.5 backdrop-blur-sm">
                    <Check className="h-2.5 w-2.5 text-white" />
                  </div>
                  <span className="text-sm text-gray-100">{highlight}</span>
                </div>
              ))}
            </div>
          </CardContent>
          
          <CardFooter className="pt-0">
            <Button 
              variant={country.active ? "default" : "outline"} 
              size="sm"
              className={`w-full backdrop-blur-sm ${
                country.active 
                  ? 'bg-movesync-blue hover:bg-movesync-blue/90' 
                  : 'bg-gray-800/50 text-gray-200 hover:bg-gray-700/50 border-gray-600'
              }`}
            >
              {country.active ? (
                <>
                  Explore {country.name}
                  <ArrowRight className="ml-1.5 h-3 w-3" />
                </>
              ) : (
                <>
                  <MapPin className="mr-1.5 h-3 w-3" />
                  Coming Soon
                </>
              )}
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
};

export default CountryCard;
