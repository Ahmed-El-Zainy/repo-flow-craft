
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Workflow, Zap, FileCode, GitBranch, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import RepoAnalyzer from "@/components/RepoAnalyzer";
import WorkflowGenerator from "@/components/WorkflowGenerator";
import DiagramView from "@/components/DiagramView";

const Index = () => {
  const [repoUrl, setRepoUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [repoData, setRepoData] = useState(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!repoUrl) {
      toast({
        title: "Error",
        description: "Please enter a GitHub repository URL",
        variant: "destructive",
      });
      return;
    }

    // Validate GitHub URL
    const githubUrlPattern = /^https:\/\/github\.com\/[\w\-\.]+\/[\w\-\.]+\/?$/;
    if (!githubUrlPattern.test(repoUrl)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid GitHub repository URL",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    console.log("Analyzing repository:", repoUrl);

    // Simulate API call to analyze repository
    try {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay
      
      const mockRepoData = {
        url: repoUrl,
        name: repoUrl.split('/').slice(-1)[0],
        owner: repoUrl.split('/').slice(-2, -1)[0],
        language: 'JavaScript',
        framework: 'React',
        packageManager: 'npm',
        hasTests: true,
        hasCI: false,
        dependencies: ['react', 'typescript', 'tailwindcss']
      };

      setRepoData(mockRepoData);
      toast({
        title: "Analysis Complete",
        description: "Repository analysis completed successfully!",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze the repository. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Workflow className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">WorkflowAI</h1>
                <p className="text-sm text-gray-600">GitHub Repository Automation</p>
              </div>
            </div>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Zap className="h-3 w-3 mr-1" />
              Beta
            </Badge>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Automate Your GitHub Workflows
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Analyze your GitHub repositories and generate intelligent automation workflows, 
            CI/CD pipelines, and code diagrams with AI-powered insights.
          </p>
        </div>

        {/* Repository Input */}
        <Card className="max-w-2xl mx-auto mb-8 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center space-x-2">
              <Github className="h-5 w-5" />
              <span>Repository Analysis</span>
            </CardTitle>
            <CardDescription>
              Enter your GitHub repository URL to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isAnalyzing ? "Analyzing..." : "Analyze"}
              </Button>
            </div>
            {repoUrl && (
              <div className="mt-3 text-sm text-gray-600">
                Repository: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{repoUrl}</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {repoData && (
          <div className="max-w-6xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8">
                <TabsTrigger value="overview" className="flex items-center space-x-2">
                  <FileCode className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="workflows" className="flex items-center space-x-2">
                  <Workflow className="h-4 w-4" />
                  <span>Workflows</span>
                </TabsTrigger>
                <TabsTrigger value="diagram" className="flex items-center space-x-2">
                  <GitBranch className="h-4 w-4" />
                  <span>Diagram</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <RepoAnalyzer repoData={repoData} />
              </TabsContent>

              <TabsContent value="workflows">
                <WorkflowGenerator repoData={repoData} />
              </TabsContent>

              <TabsContent value="diagram">
                <DiagramView repoData={repoData} />
              </TabsContent>

              <TabsContent value="settings">
                <Card>
                  <CardHeader>
                    <CardTitle>Configuration</CardTitle>
                    <CardDescription>
                      Customize your workflow generation settings
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">Settings panel coming soon...</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Features Section */}
        {!repoData && (
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-16">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto mb-4">
                <Workflow className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Smart Workflows</h3>
              <p className="text-gray-600">Generate CI/CD pipelines tailored to your tech stack</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-4">
                <GitBranch className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Code Diagrams</h3>
              <p className="text-gray-600">Visualize your codebase structure and dependencies</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto mb-4">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">Intelligent analysis and automation suggestions</p>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
