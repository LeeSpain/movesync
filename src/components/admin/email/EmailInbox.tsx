
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Star, 
  MoreHorizontal, 
  Trash2, 
  Reply, 
  ArrowRightLeft, 
  Mail, 
  MailOpen, 
  Bookmark 
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

interface Email {
  id: string;
  from: string;
  subject: string;
  excerpt: string;
  date: string;
  read: boolean;
  important: boolean;
  category: 'inbox' | 'sent' | 'draft' | 'trash' | 'spam';
  fullContent: string;
}

export const EmailInbox = () => {
  const [emails, setEmails] = useState<Email[]>(getMockEmails());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  
  // Filter emails based on search query
  const filteredEmails = emails.filter(email => 
    email.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
    email.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    email.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const markAsRead = (emailId: string) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, read: true } : email
    ));
  };

  const toggleImportant = (emailId: string) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, important: !email.important } : email
    ));
  };

  const deleteEmail = (emailId: string) => {
    setEmails(emails.map(email => 
      email.id === emailId ? { ...email, category: 'trash' } : email
    ));
    
    toast({
      title: "Email Moved to Trash",
      description: "The email has been moved to trash folder",
    });
    
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null);
      setViewMode('list');
    }
  };
  
  const viewEmail = (email: Email) => {
    setSelectedEmail(email);
    setViewMode('detail');
    if (!email.read) {
      markAsRead(email.id);
    }
  };
  
  const goBackToList = () => {
    setViewMode('list');
    setSelectedEmail(null);
  };
  
  const replyToEmail = (email: Email) => {
    toast({
      title: "Reply Email",
      description: `Replying to: ${email.from}`,
    });
  };
  
  const forwardEmail = (email: Email) => {
    toast({
      title: "Forward Email",
      description: "Forward email dialog would open here",
    });
  };

  // Render email detail view
  if (viewMode === 'detail' && selectedEmail) {
    return (
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={goBackToList} className="px-2">
              <ArrowRightLeft className="mr-2 h-4 w-4" />
              Back to Inbox
            </Button>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => toggleImportant(selectedEmail.id)}
                className={selectedEmail.important ? "text-yellow-500" : ""}
              >
                <Star className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => replyToEmail(selectedEmail)}>
                <Reply className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => forwardEmail(selectedEmail)}>
                <ArrowRightLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={() => deleteEmail(selectedEmail.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <CardTitle className="mt-2">{selectedEmail.subject}</CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription>
              From: <span className="font-medium">{selectedEmail.from}</span>
            </CardDescription>
            <CardDescription>{selectedEmail.date}</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <div dangerouslySetInnerHTML={{ __html: selectedEmail.fullContent }} />
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render inbox list view
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Email Inbox</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search emails..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <CardDescription>
          View and manage incoming emails from users and system notifications.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]"></TableHead>
              <TableHead className="w-[250px]">From</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead className="w-[150px]">Date</TableHead>
              <TableHead className="w-[100px] text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEmails
              .filter(email => email.category === 'inbox')
              .map((email) => (
                <TableRow 
                  key={email.id} 
                  className={!email.read ? "font-medium bg-blue-50/50" : ""}
                  onClick={() => viewEmail(email)}
                  style={{ cursor: 'pointer' }}
                >
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleImportant(email.id);
                        }}
                        className={email.important ? "text-yellow-500" : ""}
                      >
                        <Star className="h-4 w-4" />
                      </Button>
                      {!email.read ? (
                        <MailOpen className="h-4 w-4 text-blue-500" />
                      ) : (
                        <Mail className="h-4 w-4 text-gray-400" />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{email.from}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{email.subject}</div>
                      <div className="text-sm text-muted-foreground truncate w-[300px]">
                        {email.excerpt}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{email.date}</TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Actions</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          viewEmail(email);
                        }}>
                          <MailOpen className="mr-2 h-4 w-4" />
                          <span>Read</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          replyToEmail(email);
                        }}>
                          <Reply className="mr-2 h-4 w-4" />
                          <span>Reply</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(email.id);
                        }}>
                          <Bookmark className="mr-2 h-4 w-4" />
                          <span>Mark as Read</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={(e) => {
                          e.stopPropagation();
                          deleteEmail(email.id);
                        }}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>Delete</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            {filteredEmails.filter(email => email.category === 'inbox').length === 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No emails found in inbox.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

// Helper function to get mock emails
function getMockEmails(): Email[] {
  return [
    {
      id: '1',
      from: 'support@movesync.com',
      subject: 'Welcome to MoveSync Admin Dashboard',
      excerpt: 'Thank you for setting up the admin dashboard. Here are some tips to get started...',
      date: '2023-06-22 09:15 AM',
      read: true,
      important: true,
      category: 'inbox',
      fullContent: `
        <h3>Welcome to MoveSync Admin!</h3>
        <p>Thank you for setting up the admin dashboard. We're excited to help you manage your MoveSync platform effectively.</p>
        <p>Here are some quick tips to get started:</p>
        <ul>
          <li>Customize your dashboard widgets in the settings panel</li>
          <li>Review user analytics to understand platform usage</li>
          <li>Check the documentation for more detailed guidance</li>
        </ul>
        <p>If you have any questions, please don't hesitate to reach out to our team.</p>
        <p>Best regards,<br>The MoveSync Team</p>
      `
    },
    {
      id: '2',
      from: 'alex@example.com',
      subject: 'Question about premium subscription',
      excerpt: 'I recently upgraded to premium but I don\'t see some of the features mentioned...',
      date: '2023-06-21 02:45 PM',
      read: false,
      important: false,
      category: 'inbox',
      fullContent: `
        <p>Hello Admin,</p>
        <p>I recently upgraded to the premium subscription plan but I don't see some of the features that were mentioned in the package description. Specifically, I can't find the "Advanced Property Analytics" and "Visa Fast-Track" options.</p>
        <p>Can you please help me locate these features or let me know if they're still being rolled out?</p>
        <p>Also, is there a user guide available for premium members?</p>
        <p>Thanks in advance for your help!</p>
        <p>Best regards,<br>Alex</p>
      `
    },
    {
      id: '3',
      from: 'emily@example.com',
      subject: 'Feedback on the new dashboard layout',
      excerpt: 'I wanted to share some thoughts on the new dashboard design. Overall it looks great but...',
      date: '2023-06-20 11:30 AM',
      read: false,
      important: true,
      category: 'inbox',
      fullContent: `
        <p>Hi there,</p>
        <p>I wanted to share some feedback on the new dashboard layout that was released last week.</p>
        <p>Overall, it looks great and feels much more modern. I particularly like the new cost of living calculator and the improved property search filters.</p>
        <p>However, I've noticed a few issues:</p>
        <ol>
          <li>The job listings page sometimes takes a long time to load</li>
          <li>On mobile devices, some of the tabs are difficult to tap accurately</li>
          <li>It would be helpful to have a "save search" feature for property searches</li>
        </ol>
        <p>I hope this feedback is helpful. I'm happy to provide more details if needed.</p>
        <p>Thanks,<br>Emily</p>
      `
    },
    {
      id: '4',
      from: 'system@movesync.com',
      subject: 'System Alert: Database Backup Completed',
      excerpt: 'Automated system notification: The scheduled database backup completed successfully at...',
      date: '2023-06-19 03:00 AM',
      read: true,
      important: false,
      category: 'inbox',
      fullContent: `
        <h3>System Notification: Database Backup</h3>
        <p>This is an automated system notification.</p>
        <p>The scheduled database backup was completed successfully at 03:00 AM on June 19, 2023.</p>
        <p><strong>Backup Details:</strong></p>
        <ul>
          <li>Backup Size: 245.8 MB</li>
          <li>Backup Location: Cloud Storage (Primary)</li>
          <li>Backup Retention: 30 days</li>
          <li>Tables Included: All</li>
        </ul>
        <p>No action is required. This message is for informational purposes only.</p>
        <p>MoveSync System Notifications</p>
      `
    },
    {
      id: '5',
      from: 'michael@example.com',
      subject: 'Request for account deletion',
      excerpt: 'I would like to request that my account be deleted from your system as I no longer...',
      date: '2023-06-18 05:20 PM',
      read: false,
      important: false,
      category: 'inbox',
      fullContent: `
        <p>Hello,</p>
        <p>I would like to request that my account be deleted from your system as I no longer require the services of MoveSync.</p>
        <p>My account details are:</p>
        <ul>
          <li>Username: michael_chen</li>
          <li>Email: michael@example.com</li>
          <li>Account created: March 2023</li>
        </ul>
        <p>Please confirm once this has been completed. I understand that this action cannot be undone and all my data will be permanently removed.</p>
        <p>Thank you for your assistance.</p>
        <p>Regards,<br>Michael Chen</p>
      `
    }
  ];
}
