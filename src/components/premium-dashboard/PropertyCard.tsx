
import { MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export interface Property {
  id: number;
  title: string;
  location: string;
  price: string;
  match: number;
  image: string;
  type: string;
  area: string;
  bedrooms: number;
  bathrooms: number;
}

interface PropertyCardProps {
  property: Property;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const { toast } = useToast();
  
  const handleSave = () => {
    toast({
      title: "Property saved",
      description: `${property.title} has been saved to your favorites.`
    });
  };
  
  const handleContact = () => {
    toast({
      title: "Request sent",
      description: "Your viewing request has been sent to the property manager."
    });
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48">
        <img 
          src={property.image} 
          alt={property.title} 
          className="w-full h-full object-cover"
        />
        <Badge 
          className="absolute top-2 right-2 bg-movesync-blue" 
          variant="secondary"
        >
          {property.match}% Match
        </Badge>
      </div>
      <CardContent className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold">{property.title}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {property.location}
            </div>
          </div>
          <div className="text-right font-medium">{property.price}</div>
        </div>
        
        <div className="flex justify-between text-sm">
          <span>{property.bedrooms} Bedrooms</span>
          <span>{property.bathrooms} Bathrooms</span>
          <span>{property.type === "apartment" ? "Apartment" : "House"}</span>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={handleSave}>
            Save
          </Button>
          <Button size="sm" className="flex-1" onClick={handleContact}>
            Contact
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PropertyCard;
