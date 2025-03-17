
import { ArrowRight, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type Property = { 
  id: number; 
  title: string;
  location: string;
  price: string;
  match: number;
  image: string;
};

type PropertySearchTabProps = {
  properties: Property[];
};

const PropertySearchTab = ({ properties }: PropertySearchTabProps) => {
  return (
    <div className="mt-0 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Your Top Property Matches</h3>
          <p className="text-muted-foreground text-sm">Updated daily via our AI web scraping system</p>
        </div>
        <Button>
          <Search className="h-4 w-4 mr-2" /> New Search
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map(property => (
          <Card key={property.id} className="overflow-hidden">
            <div 
              className="h-48 bg-cover bg-center"
              style={{ backgroundImage: `url(${property.image})` }}
            >
              <div className="p-2">
                <Badge className="bg-movesync-blue">
                  {property.match}% Match
                </Badge>
              </div>
            </div>
            <CardContent className="p-4">
              <h4 className="font-semibold text-lg">{property.title}</h4>
              <div className="flex justify-between items-center mt-1 mb-3">
                <span className="text-movesync-gray-dark">{property.location}</span>
                <span className="font-medium">{property.price}</span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="flex-1">Details</Button>
                <Button size="sm" className="flex-1">Book Tour</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="flex justify-center">
        <Button variant="outline">
          View All Property Matches <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PropertySearchTab;
