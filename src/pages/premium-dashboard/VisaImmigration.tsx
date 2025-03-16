
import { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CheckCircle, Clock, FileText, HelpCircle, Upload, AlertCircle, ExternalLink, Download } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

// Sample visa application data
const visaSteps = [
  { id: 1, title: "Application submission", completed: true, date: "June 10, 2023" },
  { id: 2, title: "Document verification", completed: true, date: "June 15, 2023" },
  { id: 3, title: "Background check", completed: true, date: "June 25, 2023" },
  { id: 4, title: "Application review", completed: false, inProgress: true, date: "Est. July 10, 2023" },
  { id: 5, title: "Final decision", completed: false, date: "Est. July 25, 2023" }
];

const requiredDocuments = [
  { id: 1, name: "Passport", status: "Approved", submittedDate: "June 5, 2023" },
  { id: 2, name: "Birth Certificate", status: "Approved", submittedDate: "June 5, 2023" },
  { id: 3, name: "Police Clearance", status: "Pending Review", submittedDate: "June 8, 2023" },
  { id: 4, name: "Employment Records", status: "Approved", submittedDate: "June 7, 2023" },
  { id: 5, name: "Financial Statements", status: "Action Required", submittedDate: "June 8, 2023" },
  { id: 6, name: "Health Examination", status: "Not Submitted", submittedDate: "" }
];

const visaOptions = [
  { 
    id: 1, 
    name: "Skilled Independent Visa (Subclass 189)", 
    description: "For skilled workers who are not sponsored by an employer, family member, or state/territory government.",
    eligibility: "High",
    processingTime: "12-18 months",
    fee: "AUD 4,240"
  },
  { 
    id: 2, 
    name: "Skilled Nominated Visa (Subclass 190)", 
    description: "For skilled workers who are nominated by an Australian state or territory government.",
    eligibility: "Very High",
    processingTime: "9-12 months",
    fee: "AUD 4,240"
  },
  { 
    id: 3, 
    name: "Temporary Skill Shortage Visa (Subclass 482)", 
    description: "For employers to address labor shortages by sponsoring skilled overseas workers.",
    eligibility: "Medium",
    processingTime: "4-8 months",
    fee: "AUD 2,645"
  },
  { 
    id: 4, 
    name: "Work and Holiday Visa (Subclass 462)", 
    description: "For young adults who want to holiday and work in Australia temporarily.",
    eligibility: "Low",
    processingTime: "2-4 weeks",
    fee: "AUD 510"
  }
];

const VisaImmigration = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("status");
  
  // Calculate visa application progress
  const completedSteps = visaSteps.filter(step => step.completed).length;
  const progressPercentage = (completedSteps / visaSteps.length) * 100;
  
  const handleUploadDocument = () => {
    toast({
      title: "Upload document",
      description: "Document upload functionality would open here."
    });
  };
  
  const handleScheduleConsultation = () => {
    toast({
      title: "Consultation scheduled",
      description: "Your consultation with an immigration expert has been scheduled."
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "Approved":
        return <Badge className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" /> {status}</Badge>;
      case "Pending Review":
        return <Badge variant="outline" className="text-yellow-600 border-yellow-600"><Clock className="h-3 w-3 mr-1" /> {status}</Badge>;
      case "Action Required":
        return <Badge variant="destructive"><AlertCircle className="h-3 w-3 mr-1" /> {status}</Badge>;
      case "Not Submitted":
        return <Badge variant="secondary"><Upload className="h-3 w-3 mr-1" /> {status}</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <DashboardLayout isPremium={true} userName={user?.name || "User"} progressPercentage={user?.progressPercentage || 65}>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Visa & Immigration</h1>
        <p className="text-muted-foreground">Track your visa application progress and access immigration resources.</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="status">Application Status</TabsTrigger>
            <TabsTrigger value="documents">Required Documents</TabsTrigger>
            <TabsTrigger value="options">Visa Options</TabsTrigger>
          </TabsList>
          
          {/* Application Status Tab */}
          <TabsContent value="status" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visa Application Progress</CardTitle>
                <CardDescription>Current visa: Skilled Nominated Visa (Subclass 190)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Application Progress</span>
                  <span className="text-sm font-medium">{Math.round(progressPercentage)}%</span>
                </div>
                <Progress value={progressPercentage} className="h-2" />
                
                <div className="mt-8 space-y-6">
                  {visaSteps.map((step) => (
                    <div key={step.id} className="flex">
                      <div className="mr-4 flex flex-col items-center">
                        <div className={`rounded-full p-1 ${
                          step.completed 
                            ? 'bg-green-500 text-white' 
                            : step.inProgress 
                              ? 'border-2 border-blue-500 text-blue-500' 
                              : 'border-2 border-gray-300 text-gray-300'
                        }`}>
                          {step.completed ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : step.inProgress ? (
                            <Clock className="h-5 w-5" />
                          ) : (
                            <HelpCircle className="h-5 w-5" />
                          )}
                        </div>
                        {step.id < visaSteps.length && (
                          <div className={`h-12 w-0.5 ${
                            step.completed ? 'bg-green-500' : 'bg-gray-200'
                          }`} />
                        )}
                      </div>
                      <div className="mt-0.5 pb-8">
                        <h3 className="text-base font-semibold">
                          {step.title}
                          {step.inProgress && (
                            <Badge variant="outline" className="ml-2 text-blue-500 border-blue-500">
                              In Progress
                            </Badge>
                          )}
                        </h3>
                        <p className="text-muted-foreground text-sm">{step.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleUploadDocument}>
                  <Upload className="h-4 w-4 mr-2" /> Upload Document
                </Button>
                <Button onClick={handleScheduleConsultation}>
                  Schedule Consultation
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Required Documents Tab */}
          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Required Documents</CardTitle>
                <CardDescription>
                  Documents needed for your visa application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Document</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Submitted Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requiredDocuments.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell className="font-medium">{doc.name}</TableCell>
                        <TableCell>{getStatusBadge(doc.status)}</TableCell>
                        <TableCell>{doc.submittedDate || "—"}</TableCell>
                        <TableCell>
                          {doc.status === "Not Submitted" ? (
                            <Button size="sm" variant="outline" onClick={handleUploadDocument}>
                              <Upload className="h-3.5 w-3.5 mr-1" /> Upload
                            </Button>
                          ) : doc.status === "Action Required" ? (
                            <Button size="sm" variant="outline" className="text-red-500 border-red-500">
                              <AlertCircle className="h-3.5 w-3.5 mr-1" /> Fix Issue
                            </Button>
                          ) : (
                            <Button size="sm" variant="ghost">
                              <FileText className="h-3.5 w-3.5 mr-1" /> View
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-between">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" /> Download Checklist
                </Button>
                <Button onClick={handleUploadDocument}>
                  <Upload className="h-4 w-4 mr-2" /> Upload Documents
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Visa Options Tab */}
          <TabsContent value="options" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Visa Options</CardTitle>
                <CardDescription>
                  Explore available visa pathways to Australia
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {visaOptions.map((visa) => (
                    <Card key={visa.id} className="p-0 overflow-hidden">
                      <div className="p-4 border-b bg-muted/20">
                        <div className="flex justify-between items-center">
                          <h3 className="font-semibold">{visa.name}</h3>
                          <Badge className={`
                            ${visa.eligibility === "High" ? "bg-green-500" : ""}
                            ${visa.eligibility === "Very High" ? "bg-green-600" : ""}
                            ${visa.eligibility === "Medium" ? "bg-yellow-500" : ""}
                            ${visa.eligibility === "Low" ? "bg-red-500" : ""}
                          `}>
                            {visa.eligibility} Eligibility
                          </Badge>
                        </div>
                      </div>
                      <CardContent className="pt-4">
                        <p className="text-muted-foreground text-sm mb-4">
                          {visa.description}
                        </p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium">Processing Time:</span> {visa.processingTime}
                          </div>
                          <div>
                            <span className="font-medium">Application Fee:</span> {visa.fee}
                          </div>
                        </div>
                      </CardContent>
                      <div className="px-6 py-3 bg-muted/20 flex justify-between">
                        <Button variant="outline" size="sm">
                          Check Eligibility
                        </Button>
                        <Button size="sm" variant="ghost" className="gap-1">
                          <ExternalLink className="h-4 w-4" /> Official Information
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default VisaImmigration;
