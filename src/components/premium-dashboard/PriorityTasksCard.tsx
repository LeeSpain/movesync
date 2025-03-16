
import { CheckCircle, PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type Task = {
  id: number;
  title: string;
  dueDate: string;
  priority: string;
  completed: boolean;
};

type PriorityTasksCardProps = {
  tasks: Task[];
  onTaskComplete: (taskId: number) => void;
};

const PriorityTasksCard = ({ tasks, onTaskComplete }: PriorityTasksCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center justify-between">
          <span>Priority Tasks</span>
          <Badge>{tasks.length}</Badge>
        </CardTitle>
        <CardDescription>Your upcoming relocation tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-52 overflow-y-auto">
          {tasks.slice(0, 4).map(task => (
            <div key={task.id} className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg">
              <Button 
                variant="ghost" 
                size="icon" 
                className="mt-0.5 h-5 w-5 text-movesync-gray hover:text-movesync-blue"
                onClick={() => onTaskComplete(task.id)}
              >
                <CheckCircle className="h-5 w-5" />
              </Button>
              <div className="flex-1">
                <p className="font-medium">{task.title}</p>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant="outline" 
                    className={
                      task.priority === 'high' 
                        ? 'bg-red-50 text-red-700 border-red-200' 
                        : task.priority === 'medium' 
                          ? 'bg-amber-50 text-amber-700 border-amber-200'
                          : 'bg-green-50 text-green-700 border-green-200'
                    }
                  >
                    {task.priority}
                  </Badge>
                  <span className="text-xs text-movesync-gray">{task.dueDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-0 flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          See All
        </Button>
        <Button size="sm" className="flex-1">
          <PlusCircle className="h-4 w-4 mr-1" /> Add Task
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PriorityTasksCard;
