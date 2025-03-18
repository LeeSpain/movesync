
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingleEmailForm } from "./email/SingleEmailForm";
import { BulkEmailForm } from "./email/BulkEmailForm";
import { TemplateEmailForm } from "./email/TemplateEmailForm";

const EmailManager = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Email Management</CardTitle>
        <CardDescription>Send emails to users from movesyncai@gmail.com</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="single">Single Email</TabsTrigger>
            <TabsTrigger value="bulk">Bulk Email</TabsTrigger>
            <TabsTrigger value="template">Template Email</TabsTrigger>
          </TabsList>
          
          <TabsContent value="single">
            <SingleEmailForm />
          </TabsContent>
          
          <TabsContent value="bulk">
            <BulkEmailForm />
          </TabsContent>
          
          <TabsContent value="template">
            <TemplateEmailForm />
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Emails will be sent from movesyncai@gmail.com
        </p>
      </CardFooter>
    </Card>
  );
};

export default EmailManager;
