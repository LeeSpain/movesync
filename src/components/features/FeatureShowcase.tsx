
import { useState } from 'react';
import { featureCategories } from '@/data/featureCategories';
import { FeatureCategory } from '@/types/features';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FeatureShowcaseProps {
  isPremium?: boolean;
}

const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ isPremium = false }) => {
  const [activeFeature, setActiveFeature] = useState<string>(featureCategories[0].id);

  // Find the currently active feature category
  const currentFeature = featureCategories.find(cat => cat.id === activeFeature) || featureCategories[0];

  return (
    <div className="space-y-8">
      {/* Desktop view: Side-by-side tabs and content */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {/* Feature category selection */}
        <div className="space-y-2">
          {featureCategories.map((category) => (
            <Button
              key={category.id}
              variant={activeFeature === category.id ? "default" : "outline"}
              className="w-full justify-start gap-3 h-auto py-3 px-4"
              onClick={() => setActiveFeature(category.id)}
            >
              <category.icon className="h-5 w-5 shrink-0" />
              <span className="text-left font-medium truncate">{category.title}</span>
            </Button>
          ))}
        </div>

        {/* Feature details */}
        <div className="col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <currentFeature.icon className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>{currentFeature.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p>{currentFeature.description}</p>
              
              {currentFeature.australianContext && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
                  <p className="text-sm text-blue-800">{currentFeature.australianContext}</p>
                </div>
              )}
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                {currentFeature.items.map((item, idx) => (
                  <div 
                    key={idx} 
                    className="flex items-start gap-3 p-3 rounded-lg bg-muted"
                  >
                    <ChevronRight className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-sm">{item}</p>
                  </div>
                ))}
              </div>
              
              {isPremium ? (
                <Button className="mt-4">
                  Access this feature <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button variant="outline" className="mt-4">
                  Upgrade to access <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Mobile view: Tabs with content below */}
      <div className="md:hidden space-y-6">
        <Tabs defaultValue={featureCategories[0].id} onValueChange={setActiveFeature}>
          <TabsList className="w-full overflow-x-auto flex-nowrap justify-start">
            {featureCategories.map(category => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex items-center gap-2"
              >
                <category.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.title.split(' ')[0]}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          {featureCategories.map(category => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <category.icon className="h-4 w-4 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm">{category.description}</p>
                  
                  {category.australianContext && (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                      <p className="text-xs text-blue-800">{category.australianContext}</p>
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    {category.items.map((item, idx) => (
                      <div 
                        key={idx} 
                        className="flex items-start gap-2 p-2 rounded-lg bg-muted"
                      >
                        <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <p className="text-xs">{item}</p>
                      </div>
                    ))}
                  </div>
                  
                  {isPremium ? (
                    <Button size="sm" className="w-full mt-4">
                      Access this feature <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full mt-4">
                      Upgrade to access <ArrowRight className="ml-2 h-3 w-3" />
                    </Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default FeatureShowcase;
