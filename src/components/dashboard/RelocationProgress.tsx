
import { Lock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

type Task = {
  id: number;
  title: string;
  dueDate: string;
  completed: boolean;
};

type RelocationProgressProps = {
  progressPercentage: number;
  tasks: Task[];
};

const RelocationProgress = ({ progressPercentage, tasks }: RelocationProgressProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Relocation Progress</CardTitle>
        <CardDescription>3 of 10 steps completed</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={progressPercentage} className="h-2 mb-4" />
        <div className="space-y-2">
          {tasks.map(task => (
            <div key={task.id} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="block h-2 w-2 rounded-full bg-movesync-blue"></span>
                <span>{task.title}</span>
              </div>
              <Badge variant="outline">{task.dueDate}</Badge>
            </div>
          ))}
          <div className="flex items-center justify-between opacity-50">
            <div className="flex items-center gap-2">
              <span className="block h-2 w-2 rounded-full bg-gray-400"></span>
              <span>Complete packing checklist</span>
              <Lock className="h-3 w-3" />
            </div>
            <Badge variant="outline">Premium Only</Badge>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" className="w-full justify-between">
          View all tasks <Lock className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default RelocationProgress;
