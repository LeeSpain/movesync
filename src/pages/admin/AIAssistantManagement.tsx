
import { useState } from 'react';
import { Bot, Brain, Database, Settings, MessageSquare, BarChart4, Save, RotateCcw } from 'lucide-react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { AdminStats, getMockStats } from '@/utils/adminMetrics';
import AIMetricsCard from '@/components/admin/AIMetricsCard';

const AIAssistantManagement = () => {
  const { toast } = useToast();
  const stats = getMockStats();
  
  const [systemSettings, setSystemSettings] = useState({
    model: 'gpt-4o',
    contextLength: 16000,
    temperature: 0.7,
    frequencyPenalty: 0.5,
    presencePenalty: 0.5,
    maxDailyQueries: 100,
    apiCostLimit: 50,
  });
  
  const [trainingData, setTrainingData] = useState({
    visaRequirements: true,
    propertyData: true,
    jobMarketInfo: true,
    costOfLiving: true,
    culturalInfo: true,
    webhookUrl: 'https://api.example.com/training-updates',
    customDataUrl: '',
  });
  
  const [responseTemplates, setResponseTemplates] = useState({
    greeting: "Welcome! I'm your relocation assistant. How can I help with your move today?",
    propertySearch: "I can help you find properties that match your criteria. What's your budget and preferred location?",
    visaInquiry: "To help with visa information, could you tell me your citizenship country and the country you're moving to?",
    fallback: "I'm not sure I understand. Could you provide more details about your relocation needs?",
  });
  
  const [scrapingSettings, setScrapingSettings] = useState({
    enabled: true,
    frequency: 'daily',
    dataRetentionDays: 90,
    enabledSources: {
      propertyWebsites: true,
      governmentVisaPages: true,
      jobBoards: true,
      costOfLivingDatabases: true,
    },
    lastUpdated: "2023-08-15T14:30:00Z",
    nextScheduled: "2023-08-16T14:30:00Z",
  });

  const handleSaveSettings = (settingType: string) => {
    toast({
      title: "Settings saved",
      description: `${settingType} settings have been updated successfully.`,
    });
  };

  const handleResetSettings = (settingType: string) => {
    toast({
      title: "Settings reset",
      description: `${settingType} settings have been reset to defaults.`,
    });
  };

  const handleTrainModel = () => {
    toast({
      title: "Training initiated",
      description: "AI model training has been queued and will complete in approximately 45 minutes.",
    });
  };

  const handleRunScraper = () => {
    toast({
      title: "Scraping initiated",
      description: "Data scraping has been started and will update the knowledge base.",
    });
  };

  return (
    <AdminLayout title="AI Assistant Management">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <AIMetricsCard 
          title="Queries Handled"
          value={stats.aiMetrics.queriesHandled.toLocaleString()}
          trend="+12.4%"
          description="Total AI queries processed"
          icon={<MessageSquare className="h-4 w-4" />}
        />
        <AIMetricsCard 
          title="Satisfaction Rate"
          value={`${stats.aiMetrics.satisfactionRate}%`}
          trend="+1.8%"
          description="User reported satisfaction"
          icon={<BarChart4 className="h-4 w-4" />}
        />
        <AIMetricsCard 
          title="Avg. Response Time"
          value={`${stats.aiMetrics.avgResponseTime}s`}
          trend="-0.3s"
          description="Time to generate responses"
          icon={<Bot className="h-4 w-4" />}
        />
      </div>

      <Tabs defaultValue="system">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="system">
            <Settings className="mr-2 h-4 w-4" />
            System Settings
          </TabsTrigger>
          <TabsTrigger value="training">
            <Brain className="mr-2 h-4 w-4" />
            Training Data
          </TabsTrigger>
          <TabsTrigger value="responses">
            <MessageSquare className="mr-2 h-4 w-4" />
            Response Templates
          </TabsTrigger>
          <TabsTrigger value="scraping">
            <Database className="mr-2 h-4 w-4" />
            Data Scraping
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="system" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI System Configuration</CardTitle>
              <CardDescription>
                Configure model and runtime settings for the AI assistant
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="model">AI Model</Label>
                  <select 
                    id="model" 
                    className="w-full rounded-md border border-input bg-background px-3 py-2"
                    value={systemSettings.model}
                    onChange={(e) => setSystemSettings({...systemSettings, model: e.target.value})}
                  >
                    <option value="gpt-4o">GPT-4o</option>
                    <option value="gpt-4o-mini">GPT-4o Mini</option>
                    <option value="llama-3.1-sonar-small-128k-online">Llama 3.1 Sonar Small</option>
                    <option value="llama-3.1-sonar-large-128k-online">Llama 3.1 Sonar Large</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="context-length">Context Length (tokens)</Label>
                    <Input 
                      id="context-length" 
                      type="number" 
                      value={systemSettings.contextLength}
                      onChange={(e) => setSystemSettings({...systemSettings, contextLength: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="temperature">Temperature</Label>
                    <Input 
                      id="temperature" 
                      type="number" 
                      step="0.1"
                      min="0"
                      max="2"
                      value={systemSettings.temperature}
                      onChange={(e) => setSystemSettings({...systemSettings, temperature: parseFloat(e.target.value)})}
                    />
                    <p className="text-xs text-muted-foreground">
                      Higher values make output more random, lower values more deterministic
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="frequency-penalty">Frequency Penalty</Label>
                    <Input 
                      id="frequency-penalty" 
                      type="number" 
                      step="0.1"
                      min="0"
                      max="2"
                      value={systemSettings.frequencyPenalty}
                      onChange={(e) => setSystemSettings({...systemSettings, frequencyPenalty: parseFloat(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="presence-penalty">Presence Penalty</Label>
                    <Input 
                      id="presence-penalty" 
                      type="number" 
                      step="0.1"
                      min="0"
                      max="2"
                      value={systemSettings.presencePenalty}
                      onChange={(e) => setSystemSettings({...systemSettings, presencePenalty: parseFloat(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-queries">Max Daily Queries</Label>
                    <Input 
                      id="max-queries" 
                      type="number" 
                      value={systemSettings.maxDailyQueries}
                      onChange={(e) => setSystemSettings({...systemSettings, maxDailyQueries: parseInt(e.target.value)})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="cost-limit">API Cost Limit ($/day)</Label>
                    <Input 
                      id="cost-limit" 
                      type="number" 
                      value={systemSettings.apiCostLimit}
                      onChange={(e) => setSystemSettings({...systemSettings, apiCostLimit: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleResetSettings('System')}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
                <Button 
                  onClick={() => handleSaveSettings('System')}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training Data Management</CardTitle>
              <CardDescription>
                Configure training data sources and schedules
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Data Categories</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="visa-requirements" 
                        checked={trainingData.visaRequirements}
                        onCheckedChange={(checked) => setTrainingData({...trainingData, visaRequirements: checked})}
                      />
                      <Label htmlFor="visa-requirements">Visa Requirements</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="property-data" 
                        checked={trainingData.propertyData}
                        onCheckedChange={(checked) => setTrainingData({...trainingData, propertyData: checked})}
                      />
                      <Label htmlFor="property-data">Property Data</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="job-market" 
                        checked={trainingData.jobMarketInfo}
                        onCheckedChange={(checked) => setTrainingData({...trainingData, jobMarketInfo: checked})}
                      />
                      <Label htmlFor="job-market">Job Market Information</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="cost-of-living" 
                        checked={trainingData.costOfLiving}
                        onCheckedChange={(checked) => setTrainingData({...trainingData, costOfLiving: checked})}
                      />
                      <Label htmlFor="cost-of-living">Cost of Living</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="cultural-info" 
                        checked={trainingData.culturalInfo}
                        onCheckedChange={(checked) => setTrainingData({...trainingData, culturalInfo: checked})}
                      />
                      <Label htmlFor="cultural-info">Cultural Information</Label>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Training Data Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    value={trainingData.webhookUrl}
                    onChange={(e) => setTrainingData({...trainingData, webhookUrl: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Webhook to receive training data updates
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-data">Custom Training Data URL</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="custom-data" 
                      placeholder="https://example.com/data.json"
                      value={trainingData.customDataUrl}
                      onChange={(e) => setTrainingData({...trainingData, customDataUrl: e.target.value})}
                    />
                    <Button variant="outline">Add Source</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Training Schedule</h3>
                  <div className="grid grid-cols-3 gap-2">
                    <Button variant="outline" className="w-full">Hourly</Button>
                    <Button variant="outline" className="w-full bg-blue-50">Daily</Button>
                    <Button variant="outline" className="w-full">Weekly</Button>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => handleResetSettings('Training Data')}>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset
                </Button>
                <div className="space-x-2">
                  <Button variant="outline" onClick={handleTrainModel}>
                    <Brain className="mr-2 h-4 w-4" />
                    Train Model Now
                  </Button>
                  <Button onClick={() => handleSaveSettings('Training Data')}>
                    <Save className="mr-2 h-4 w-4" />
                    Save Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="responses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Templates</CardTitle>
              <CardDescription>
                Customize AI assistant responses for common scenarios
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="greeting-template">Greeting Template</Label>
                  <Textarea 
                    id="greeting-template" 
                    rows={2}
                    value={responseTemplates.greeting}
                    onChange={(e) => setResponseTemplates({...responseTemplates, greeting: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="property-template">Property Search Template</Label>
                  <Textarea 
                    id="property-template" 
                    rows={2}
                    value={responseTemplates.propertySearch}
                    onChange={(e) => setResponseTemplates({...responseTemplates, propertySearch: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="visa-template">Visa Inquiry Template</Label>
                  <Textarea 
                    id="visa-template" 
                    rows={2}
                    value={responseTemplates.visaInquiry}
                    onChange={(e) => setResponseTemplates({...responseTemplates, visaInquiry: e.target.value})}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="fallback-template">Fallback Template</Label>
                  <Textarea 
                    id="fallback-template" 
                    rows={2}
                    value={responseTemplates.fallback}
                    onChange={(e) => setResponseTemplates({...responseTemplates, fallback: e.target.value})}
                  />
                  <p className="text-xs text-muted-foreground">
                    Used when the AI cannot answer a question
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Variables Available in Templates</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    <div className="text-xs bg-slate-100 px-2 py-1 rounded">{"{{user_name}}"}</div>
                    <div className="text-xs bg-slate-100 px-2 py-1 rounded">{"{{selected_country}}"}</div>
                    <div className="text-xs bg-slate-100 px-2 py-1 rounded">{"{{subscription_tier}}"}</div>
                    <div className="text-xs bg-slate-100 px-2 py-1 rounded">{"{{time_of_day}}"}</div>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleResetSettings('Response Templates')}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
                <Button 
                  onClick={() => handleSaveSettings('Response Templates')}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Templates
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="scraping" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Data Scraping Configuration</CardTitle>
              <CardDescription>
                Configure automated data collection from external sources
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Switch 
                      id="scraping-enabled" 
                      checked={scrapingSettings.enabled}
                      onCheckedChange={(checked) => setScrapingSettings({...scrapingSettings, enabled: checked})}
                    />
                    <Label htmlFor="scraping-enabled">Enable Data Scraping</Label>
                  </div>
                  
                  <Button variant="outline" onClick={handleRunScraper}>
                    Run Scraper Now
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="scraping-frequency">Scraping Frequency</Label>
                    <select 
                      id="scraping-frequency" 
                      className="w-full rounded-md border border-input bg-background px-3 py-2"
                      value={scrapingSettings.frequency}
                      onChange={(e) => setScrapingSettings({...scrapingSettings, frequency: e.target.value})}
                    >
                      <option value="hourly">Hourly</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Data Retention (days)</Label>
                    <Input 
                      id="data-retention" 
                      type="number" 
                      value={scrapingSettings.dataRetentionDays}
                      onChange={(e) => setScrapingSettings({...scrapingSettings, dataRetentionDays: parseInt(e.target.value)})}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Data Sources</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="property-websites" 
                        checked={scrapingSettings.enabledSources.propertyWebsites}
                        onCheckedChange={(checked) => setScrapingSettings({
                          ...scrapingSettings, 
                          enabledSources: {...scrapingSettings.enabledSources, propertyWebsites: checked}
                        })}
                      />
                      <Label htmlFor="property-websites">Property Websites</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="government-visa" 
                        checked={scrapingSettings.enabledSources.governmentVisaPages}
                        onCheckedChange={(checked) => setScrapingSettings({
                          ...scrapingSettings, 
                          enabledSources: {...scrapingSettings.enabledSources, governmentVisaPages: checked}
                        })}
                      />
                      <Label htmlFor="government-visa">Government Visa Pages</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="job-boards" 
                        checked={scrapingSettings.enabledSources.jobBoards}
                        onCheckedChange={(checked) => setScrapingSettings({
                          ...scrapingSettings, 
                          enabledSources: {...scrapingSettings.enabledSources, jobBoards: checked}
                        })}
                      />
                      <Label htmlFor="job-boards">Job Boards</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch 
                        id="cost-databases" 
                        checked={scrapingSettings.enabledSources.costOfLivingDatabases}
                        onCheckedChange={(checked) => setScrapingSettings({
                          ...scrapingSettings, 
                          enabledSources: {...scrapingSettings.enabledSources, costOfLivingDatabases: checked}
                        })}
                      />
                      <Label htmlFor="cost-databases">Cost of Living Databases</Label>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-md">
                  <div>
                    <h3 className="text-sm font-medium">Last Updated</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(scrapingSettings.lastUpdated).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Next Scheduled Run</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(scrapingSettings.nextScheduled).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
              
              <Separator />
              
              <div className="flex justify-end space-x-2">
                <Button 
                  variant="outline" 
                  onClick={() => handleResetSettings('Scraping')}
                >
                  <RotateCcw className="mr-2 h-4 w-4" />
                  Reset to Defaults
                </Button>
                <Button 
                  onClick={() => handleSaveSettings('Scraping')}
                >
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

export default AIAssistantManagement;
