
import { Bot, Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type SearchItem = {
  id: number;
  query: string;
  date: string;
};

type RecentSearchesProps = {
  searches: SearchItem[];
};

const RecentSearches = ({ searches }: RecentSearchesProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Searches</CardTitle>
        <CardDescription>Your last 3 AI searches</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {searches.map(search => (
            <div key={search.id} className="flex items-start gap-3">
              <div className="bg-movesync-gray-light p-2 rounded-full">
                <Bot className="h-4 w-4 text-movesync-blue" />
              </div>
              <div>
                <p className="font-medium">{search.query}</p>
                <p className="text-sm text-movesync-gray">{search.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="w-full justify-between">
          View search history <Lock className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RecentSearches;
