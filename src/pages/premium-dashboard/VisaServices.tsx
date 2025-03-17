
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Globe, FileText, Clock, CheckCircle, AlertCircle, HelpCircle, ExternalLink, Download } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';

// Sample visa types
const visaTypes = [
  {
    id: 1,
    name: 'Skilled Independent Visa (Subclass 189)',
    description: 'For skilled workers who are not sponsored by an employer, a state or territory, or a family member.',
    processingTime: '12-16 months',
    cost: 'AUD 4,045',
    eligibility: ['Points-based assessment', 'Occupation on skilled list', 'Positive skills assessment', 'English proficiency'],
    match: 92
  },
  {
    id: 2,
    name: 'Skilled Nominated Visa (Subclass 190)',
    description: 'For skilled workers who are nominated by an Australian state or territory government agency.',
    processingTime: '9-12 months',
    cost: 'AUD 4,045',
    eligibility: ['State/territory nomination', 'Points-based assessment', 'Occupation on skilled list', 'Positive skills assessment'],
    match: 85
  },
  {
    id: 3,
    name: 'Temporary Skill Shortage Visa (Subclass 482)',
    description: 'For skilled workers who are sponsored by an approved Australian business to fill a position they cannot find a suitable Australian worker for.',
    processingTime: '4-5 months',
    cost: 'AUD 1,265',
    eligibility: ['Employer nomination', 'Relevant skills and experience', 'English proficiency', 'Meet health and character requirements'],
    match: 78
  },
  {
    id: 4,
    name: 'Working Holiday Visa (Subclass 417)',
    description: 'For young adults who want to holiday and work in Australia for up to a year.',
    processingTime: '2-4 weeks',
    cost: 'AUD 495',
    eligibility: ['Age 18-30 (or 35 for some countries)', 'Hold eligible passport', 'Sufficient funds', 'No dependent children'],
    match: 65
  }
];

// Sample visa application progress
const applicationProgress = {
  status: 'in-progress',
  currentStep: 2,
  totalSteps: 5,
  percentage: 40,
  steps: [
    { id: 1, name: 'Initial Assessment', completed: true, date: '24 May 2023' },
    { id: 2, name: 'Document Collection', completed: false, current: true, date: 'In Progress' },
    { id: 3, name: 'Visa Application', completed: false, date: 'Pending' },
    { id: 4, name: 'Processing & Review', completed: false, date: 'Pending' },
    { id: 5, name: 'Decision', completed: false, date: 'Pending' }
  ]
};

// Sample required documents
const requiredDocuments = [
  { id: 1, name: 'Valid Passport', status: 'complete' },
  { id: 2, name: 'Proof of English Proficiency', status: 'complete' },
  { id: 3, name: 'Skills Assessment', status: 'pending' },
  { id: 4, name: 'Health Examination', status: 'pending' },
  { id: 5, name: 'Police Clearance Certificate', status: 'not-started' },
  { id: 6, name: 'Employment History Evidence', status: 'complete' }
];

const VisaTypeCard = ({ visa }: { visa: typeof visaTypes[0] }) => {
  const { toast } = useToast();
  
  const handleApply = () => {
    toast({
      title: "Application started",
      description: `Your application for the ${visa.name} has been initiated.`
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold">{visa.name}</CardTitle>
          <Badge variant="secondary" className="bg-movesync-blue">
            {visa.match}% Match
          </Badge>
        </div>
        <CardDescription>{visa.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-between text-sm">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{visa.processingTime}</span>
          </div>
          <div className="font-medium">{visa.cost}</div>
        </div>
        
        <div>
          <h4 className="text-sm font-medium mb-2">Eligibility Criteria:</h4>
          <ul className="text-sm space-y-1">
            {visa.eligibility.map((criterion, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                <span>{criterion}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-3 w-full">
          <Button variant="outline" size="sm" className="flex-1">
            <HelpCircle className="h-4 w-4 mr-2" />
            Details
          </Button>
          <Button size="sm" className="flex-1" onClick={handleApply}>
            Apply Now
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

const DocumentRow = ({ document }: { document: typeof requiredDocuments[0] }) => {
  const getStatusIcon = () => {
    switch (document.status) {
      case 'complete':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-amber-500" />;
      case 'not-started':
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <HelpCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  const getStatusText = () => {
    switch (document.status) {
      case 'complete':
        return 'Completed';
      case 'pending':
        return 'In Progress';
      case 'not-started':
        return 'Not Started';
      default:
        return 'Unknown';
    }
  };
  
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-3">
        <FileText className="h-5 w-5 text-muted-foreground" />
        <span>{document.name}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground mr-2">{getStatusText()}</span>
        {getStatusIcon()}
      </div>
    </div>
  );
};

const VisaServices = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('find');
  
  const handleConsultation = () => {
    toast({
      title: "Consultation booked",
      description: "Your consultation with a visa specialist has been scheduled."
    });
  };

  return (
    <DashboardLayout isPremium={true} userName={user?.name || "User"} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Visa Services</h1>
        <p className="text-muted-foreground">Navigate Australia's visa system with personalized guidance and expert support.</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="find">Find a Visa</TabsTrigger>
            <TabsTrigger value="application">My Application</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          
          {/* Find a Visa Tab */}
          <TabsContent value="find" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recommended Visa Options</CardTitle>
                <CardDescription>Based on your profile and preferences, these visa types are most suitable for your situation.</CardDescription>
              </CardHeader>
            </Card>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {visaTypes.map(visa => (
                <VisaTypeCard key={visa.id} visa={visa} />
              ))}
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Need Help Deciding?</CardTitle>
                <CardDescription>Book a consultation with our visa experts for personalized advice.</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={handleConsultation}>Book Consultation</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* My Application Tab */}
          <TabsContent value="application" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>
                  Skilled Independent Visa (Subclass 189) • Reference: VISA-2023-45678
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Current Progress:</span>
                    <span className="font-medium">{applicationProgress.percentage}%</span>
                  </div>
                  <Progress value={applicationProgress.percentage} className="h-2" />
                </div>
                
                <div className="space-y-6">
                  {applicationProgress.steps.map((step) => (
                    <div key={step.id} className="relative">
                      <div className={`flex items-start gap-4 ${step.current ? 'text-movesync-blue font-medium' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mt-0.5 ${
                          step.completed 
                            ? 'bg-green-100 text-green-600' 
                            : step.current 
                              ? 'bg-blue-100 text-movesync-blue' 
                              : 'bg-gray-100 text-gray-400'
                        }`}>
                          {step.completed 
                            ? <CheckCircle className="h-5 w-5" /> 
                            : step.current 
                              ? <Clock className="h-5 w-5" /> 
                              : step.id}
                        </div>
                        <div className="space-y-1">
                          <div>{step.name}</div>
                          <div className="text-sm text-muted-foreground">{step.date}</div>
                        </div>
                      </div>
                      {step.id !== applicationProgress.totalSteps && (
                        <div className="absolute left-4 top-10 bottom-0 w-0.5 bg-gray-200 h-12" />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download Summary
                </Button>
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Full Details
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>Track and manage your visa application documents</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {requiredDocuments.map((doc, index) => (
                    <>
                      <DocumentRow key={doc.id} document={doc} />
                      {index < requiredDocuments.length - 1 && <Separator />}
                    </>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <div className="flex gap-3">
                  <Button variant="outline">
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Document Guidelines
                  </Button>
                  <Button>
                    Upload Documents
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default VisaServices;
