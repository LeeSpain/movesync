
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SingleEmailForm } from "./email/SingleEmailForm";
import { BulkEmailForm } from "./email/BulkEmailForm";
import { TemplateEmailForm } from "./email/TemplateEmailForm";
import { EmailInbox } from "./email/EmailInbox";
import { Mail, Send, Users, MailQuestion } from "lucide-react";

const EmailManager = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Email Management</CardTitle>
        <CardDescription>Manage incoming and outgoing emails for MoveSync</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="inbox" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="inbox" className="flex items-center">
              <Mail className="mr-2 h-4 w-4" />
              Inbox
            </TabsTrigger>
            <TabsTrigger value="single" className="flex items-center">
              <Send className="mr-2 h-4 w-4" />
              Single Email
            </TabsTrigger>
            <TabsTrigger value="bulk" className="flex items-center">
              <Users className="mr-2 h-4 w-4" />
              Bulk Email
            </TabsTrigger>
            <TabsTrigger value="template" className="flex items-center">
              <MailQuestion className="mr-2 h-4 w-4" />
              Template Email
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="inbox">
            <EmailInbox />
          </TabsContent>
          
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
