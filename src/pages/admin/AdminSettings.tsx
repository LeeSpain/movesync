
import { useState } from 'react';
import { Save, RotateCcw, Bot, Globe, Database, Shield } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';

const AdminSettings = () => {
  const { toast } = useToast();
  const [aiSettings, setAiSettings] = useState({
    maxFreeTier: 5,
    model: 'gpt-4',
    enableForAllUsers: true,
    customInstructions: 'You are MoveSync, an AI assistant to help people relocate to different countries. Provide helpful, accurate information about visa requirements, housing options, cost of living, and job opportunities.',
  });
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'MoveSync',
    supportEmail: 'support@movesync.example.com',
    allowSignups: true,
    defaultUserPlan: 'free',
    maintenanceMode: false,
  });

  const [securitySettings, setSecuritySettings] = useState({
    requireEmailVerification: true,
    sessionTimeout: 60,
    maxLoginAttempts: 5,
    enableTwoFactor: false,
  });

  const handleSaveSettings = (settingType: string) => {
    // In a real app, this would save to an API
    toast({
      title: "Settings saved",
      description: `${settingType} settings have been updated successfully.`,
    });
  };

  const handleResetSettings = (settingType: string) => {
    // In a real app, this would reset settings to defaults
    toast({
      title: "Settings reset",
      description: `${settingType} settings have been reset to defaults.`,
    });
  };

  return (
    <AdminLayout title="Admin Settings">
      <Tabs defaultValue="general">
        <TabsList className="mb-6">
          <TabsTrigger value="general">
            <Globe className="mr-2 h-4 w-4" />
            General
          </TabsTrigger>
          <TabsTrigger value="ai">
            <Bot className="mr-2 h-4 w-4" />
            AI Assistant
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="mr-2 h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="database">
            <Database className="mr-2 h-4 w-4" />
            Database
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>
                Configure general platform settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="site-name">Site Name</Label>
                  <Input 
                    id="site-name" 
                    value={generalSettings.siteName}
                    onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="support-email">Support Email</Label>
                  <Input 
                    id="support-email" 
                    type="email" 
                    value={generalSettings.supportEmail}
                    onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="allow-signups" 
                    checked={generalSettings.allowSignups}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, allowSignups: checked})}
                  />
                  <Label htmlFor="allow-signups">Allow new user registrations</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-plan">Default User Plan</Label>
                  <select 
                    id="default-plan" 
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={generalSettings.defaultUserPlan}
                    onChange={(e) => setGeneralSettings({...generalSettings, defaultUserPlan: e.target.value})}
                  >
                    <option value="free">Free</option>
                    <option value="premium">Premium</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="maintenance-mode" 
                    checked={generalSettings.maintenanceMode}
                    onCheckedChange={(checked) => setGeneralSettings({...generalSettings, maintenanceMode: checked})}
                  />
                  <Label htmlFor="maintenance-mode">Maintenance Mode</Label>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleResetSettings('General')}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
                <Button 
                  onClick={() => handleSaveSettings('General')}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="ai">
          <Card>
            <CardHeader>
              <CardTitle>AI Assistant Settings</CardTitle>
              <CardDescription>
                Configure the AI assistant behavior and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="max-free-tier">Max Free Tier Questions</Label>
                  <Input 
                    id="max-free-tier" 
                    type="number" 
                    value={aiSettings.maxFreeTier}
                    onChange={(e) => setAiSettings({...aiSettings, maxFreeTier: parseInt(e.target.value)})}
                  />
                  <p className="text-sm text-muted-foreground">
                    Maximum number of AI questions allowed for free tier users
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="ai-model">AI Model</Label>
                  <select 
                    id="ai-model" 
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={aiSettings.model}
                    onChange={(e) => setAiSettings({...aiSettings, model: e.target.value})}
                  >
                    <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                    <option value="gpt-4">GPT-4</option>
                    <option value="llama-3.1-sonar-small-128k-online">Llama 3.1 Sonar Small</option>
                    <option value="llama-3.1-sonar-large-128k-online">Llama 3.1 Sonar Large</option>
                  </select>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="enable-for-all" 
                    checked={aiSettings.enableForAllUsers}
                    onCheckedChange={(checked) => setAiSettings({...aiSettings, enableForAllUsers: checked})}
                  />
                  <Label htmlFor="enable-for-all">Enable AI for all users (including free tier)</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-instructions">Custom AI Instructions</Label>
                  <Textarea 
                    id="custom-instructions" 
                    rows={5}
                    value={aiSettings.customInstructions}
                    onChange={(e) => setAiSettings({...aiSettings, customInstructions: e.target.value})}
                  />
                  <p className="text-sm text-muted-foreground">
                    System instructions that define how the AI assistant behaves
                  </p>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleResetSettings('AI Assistant')}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
                <Button 
                  onClick={() => handleSaveSettings('AI Assistant')}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Configure security and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="email-verification" 
                    checked={securitySettings.requireEmailVerification}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireEmailVerification: checked})}
                  />
                  <Label htmlFor="email-verification">Require email verification</Label>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                  <Input 
                    id="session-timeout" 
                    type="number" 
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({...securitySettings, sessionTimeout: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="login-attempts">Max Login Attempts</Label>
                  <Input 
                    id="login-attempts" 
                    type="number" 
                    value={securitySettings.maxLoginAttempts}
                    onChange={(e) => setSecuritySettings({...securitySettings, maxLoginAttempts: parseInt(e.target.value)})}
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch 
                    id="two-factor" 
                    checked={securitySettings.enableTwoFactor}
                    onCheckedChange={(checked) => setSecuritySettings({...securitySettings, enableTwoFactor: checked})}
                  />
                  <Label htmlFor="two-factor">Enable two-factor authentication</Label>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleResetSettings('Security')}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
                <Button 
                  onClick={() => handleSaveSettings('Security')}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="database">
          <Card>
            <CardHeader>
              <CardTitle>Database Settings</CardTitle>
              <CardDescription>
                Configure database options and manage backups
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Database Status</Label>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span>Connected</span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label>Last Backup</Label>
                  <div>June 15, 2023 - 03:45 AM</div>
                  <p className="text-sm text-muted-foreground">
                    Automatic backups are scheduled daily
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Button variant="outline">Create Backup Now</Button>
                </div>
                
                <div className="space-y-2">
                  <Label>Database Maintenance</Label>
                  <div className="flex space-x-2">
                    <Button variant="outline">Run Optimization</Button>
                    <Button variant="outline">Rebuild Indexes</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end">
                <Button onClick={() => handleSaveSettings('Database')}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AdminLayout>
  );
};

export default AdminSettings;
