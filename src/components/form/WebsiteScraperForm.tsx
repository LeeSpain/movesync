
import { useState } from 'react';
import { Bot, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/components/ui/use-toast';
import { Progress } from '@/components/ui/progress';

const WebsiteScraperForm = () => {
  const { toast } = useToast();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [advanced, setAdvanced] = useState(false);
  const [scrapingOptions, setScrapingOptions] = useState({
    depth: 2,
    includeImages: true,
    followExternalLinks: false,
    parseMetadata: true,
    maxPages: 100
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url) {
      toast({
        title: "Error",
        description: "Please enter a valid URL",
        variant: "destructive"
      });
      return;
    }
    
    setIsLoading(true);
    setProgress(0);
    
    // Simulate scraping progress
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          
          toast({
            title: "Scraping complete",
            description: `Successfully scraped ${url}`,
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 600);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Website Scraper</CardTitle>
        <CardDescription>
          Scrape content from websites to train the AI assistant
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="scrape-url">Website URL</Label>
            <div className="flex gap-2">
              <Input
                id="scrape-url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Scraping...
                  </>
                ) : (
                  <>
                    <Bot className="mr-2 h-4 w-4" />
                    Scrape
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {isLoading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
          
          <div className="flex items-center space-x-2">
            <Switch
              id="advanced-options"
              checked={advanced}
              onCheckedChange={setAdvanced}
            />
            <Label htmlFor="advanced-options">Show advanced options</Label>
          </div>
          
          {advanced && (
            <div className="space-y-4 border rounded-md p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="scrape-depth">Crawl Depth</Label>
                  <Input
                    id="scrape-depth"
                    type="number"
                    min="1"
                    max="5"
                    value={scrapingOptions.depth}
                    onChange={(e) => setScrapingOptions({...scrapingOptions, depth: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="max-pages">Max Pages</Label>
                  <Input
                    id="max-pages"
                    type="number"
                    min="1"
                    max="500"
                    value={scrapingOptions.maxPages}
                    onChange={(e) => setScrapingOptions({...scrapingOptions, maxPages: parseInt(e.target.value)})}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="include-images"
                    checked={scrapingOptions.includeImages}
                    onCheckedChange={(checked) => setScrapingOptions({...scrapingOptions, includeImages: checked})}
                  />
                  <Label htmlFor="include-images">Include Images</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="follow-external"
                    checked={scrapingOptions.followExternalLinks}
                    onCheckedChange={(checked) => setScrapingOptions({...scrapingOptions, followExternalLinks: checked})}
                  />
                  <Label htmlFor="follow-external">Follow External Links</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch
                    id="parse-metadata"
                    checked={scrapingOptions.parseMetadata}
                    onCheckedChange={(checked) => setScrapingOptions({...scrapingOptions, parseMetadata: checked})}
                  />
                  <Label htmlFor="parse-metadata">Parse Metadata</Label>
                </div>
              </div>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default WebsiteScraperForm;
