
import { Bot, CheckCircle, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type VisaStep = {
  id: number;
  title: string;
  completed: boolean;
  inProgress?: boolean;
  date: string;
};

type VisaStatusTabProps = {
  visaSteps: VisaStep[];
};

const VisaStatusTab = ({ visaSteps }: VisaStatusTabProps) => {
  return (
    <div className="mt-0 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold">Skilled Worker Visa Application</h3>
          <p className="text-movesync-gray">Application ID: AUSC-2023-78945612</p>
        </div>
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-200">In Progress</Badge>
      </div>
      
      <Card>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="font-medium">Estimated Processing Time</h4>
                <p className="text-sm text-movesync-gray">Based on current application volume</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold">45-60 days</p>
                <p className="text-sm text-movesync-gray">Started: June 10, 2023</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-3">Application Timeline</h4>
              <div className="space-y-4">
                {visaSteps.map((step, index) => (
                  <div key={step.id} className="flex items-start">
                    <div className="mr-3 flex flex-col items-center">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-500 text-white' : 
                        step.inProgress ? 'bg-amber-500 text-white' : 
                        'bg-gray-200'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="h-4 w-4" />
                        ) : step.inProgress ? (
                          <Clock className="h-4 w-4" />
                        ) : (
                          index + 1
                        )}
                      </div>
                      {index < visaSteps.length - 1 && (
                        <div className={`w-0.5 h-12 ${
                          step.completed ? 'bg-green-500' : 'bg-gray-200'
                        }`}></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className={`font-medium ${
                        step.completed ? 'text-green-600' : 
                        step.inProgress ? 'text-amber-600' : 
                        'text-movesync-gray'
                      }`}>
                        {step.title}
                      </p>
                      <p className="text-sm text-movesync-gray">{step.date}</p>
                      {step.inProgress && (
                        <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm">
                          <p className="text-amber-800 font-medium">Action Required</p>
                          <p className="text-amber-700">Please submit additional financial documents by July 5, 2023.</p>
                          <Button size="sm" className="mt-2 bg-amber-600 hover:bg-amber-700">
                            Upload Documents
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center gap-4">
        <Button variant="outline">
          <Bot className="h-4 w-4 mr-2" /> Ask AI About Your Visa
        </Button>
        <Button>
          View All Documents
        </Button>
      </div>
    </div>
  );
};

export default VisaStatusTab;
