
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
        className={`h-full cursor-pointer transition-all duration-300 hover:shadow-lg 
          ${country.active ? 'border-movesync-blue/30' : 'opacity-90 hover:opacity-100'}
          backdrop-filter backdrop-blur-sm bg-white/80 hover:bg-white/95
          shadow-[0_10px_25px_-15px_rgba(0,0,0,0.1)]
        `}
      >
        <CardHeader className="pb-3 relative">
          <div 
            className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-movesync-blue/5 to-transparent opacity-60 rounded-t-lg"
            style={{ pointerEvents: 'none' }}
          ></div>
          <div className="flex items-center justify-between relative">
            <div className="flex items-center gap-2">
              <span className="text-2xl filter drop-shadow-sm">{country.flag}</span>
              <h3 className="text-xl font-medium">{country.name}</h3>
            </div>
            {country.active ? (
              <span className="inline-flex items-center px-2.5 py-0.5 bg-green-100 text-green-800 text-xs rounded-full shadow-sm">
                <Check className="w-3 h-3 mr-0.5" /> Available
              </span>
            ) : (
              <span className="inline-flex items-center px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full shadow-sm">
                Coming Soon
              </span>
            )}
          </div>
        </CardHeader>
        <CardContent className="pb-3 relative">
          <p className="text-muted-foreground text-sm mb-4">{country.description}</p>
          <div className="space-y-2.5">
            {country.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5">
                <div className="h-4 w-4 rounded-full bg-movesync-blue/10 flex items-center justify-center flex-shrink-0 mt-0.5 shadow-inner">
                  <Check className="h-2.5 w-2.5 text-movesync-blue" />
                </div>
                <span className="text-sm">{highlight}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            variant={country.active ? "default" : "outline"} 
            size="sm"
            className={`w-full ${country.active ? 'shadow-md shadow-movesync-blue/10' : ''}`}
          >
            {country.active ? (
              <>
                Select Country
                <ArrowRight className="ml-1 h-3 w-3" />
              </>
            ) : (
              <>
                <MapPin className="mr-1 h-3 w-3" />
                Coming Soon
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default CountryCard;
