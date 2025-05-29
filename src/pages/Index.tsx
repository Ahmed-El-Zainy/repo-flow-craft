
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Github, Workflow, Zap, FileCode, GitBranch, Settings, Code2, Bot, Sparkles } from "lucide-react";
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
        dependencies: ['react', 'typescript', 'tailwindcss', 'vite', 'eslint', 'prettier']
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="border-b bg-white/90 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl shadow-lg">
                  <Bot className="h-7 w-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
                  WorkflowAI
                </h1>
                <p className="text-sm text-gray-600 font-medium">GitHub Repository Automation</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border-green-200">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-100 to-violet-100 text-purple-800 border-purple-200">
                Beta
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-blue-200 mb-6">
              <Code2 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Powered by Advanced AI</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Automate Your{' '}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                GitHub Workflows
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto mb-8 leading-relaxed">
              Transform your development process with intelligent automation. Analyze repositories, 
              generate CI/CD pipelines, and visualize code architecture with cutting-edge AI technology.
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { icon: Workflow, text: "Smart Workflows", color: "blue" },
                { icon: GitBranch, text: "Code Diagrams", color: "green" },
                { icon: Zap, text: "Instant Analysis", color: "purple" }
              ].map((feature, index) => (
                <div key={index} className={`flex items-center space-x-2 bg-${feature.color}-50 border border-${feature.color}-200 px-3 py-2 rounded-full`}>
                  <feature.icon className={`h-4 w-4 text-${feature.color}-600`} />
                  <span className={`text-sm font-medium text-${feature.color}-800`}>{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Repository Input */}
        <Card className="max-w-3xl mx-auto mb-12 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center space-x-3 text-2xl">
              <div className="p-2 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg">
                <Github className="h-6 w-6 text-white" />
              </div>
              <span>Repository Analysis</span>
            </CardTitle>
            <CardDescription className="text-base">
              Enter your GitHub repository URL to unlock intelligent automation insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-3">
              <Input
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="flex-1 h-12 text-base border-2 focus:border-blue-400 focus:ring-blue-400"
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing}
                className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg"
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Bot className="h-4 w-4" />
                    <span>Analyze</span>
                  </div>
                )}
              </Button>
            </div>
            {repoUrl && (
              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-2 text-sm text-blue-800">
                  <Github className="h-4 w-4" />
                  <span className="font-medium">Repository:</span>
                  <span className="font-mono bg-white px-2 py-1 rounded border">{repoUrl}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {repoData && (
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 h-14 bg-white/80 backdrop-blur-sm border-2 border-gray-200">
                <TabsTrigger value="overview" className="flex items-center space-x-2 data-[state=active]:bg-blue-600 data-[state=active]:text-white">
                  <FileCode className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="workflows" className="flex items-center space-x-2 data-[state=active]:bg-green-600 data-[state=active]:text-white">
                  <Workflow className="h-4 w-4" />
                  <span>Workflows</span>
                </TabsTrigger>
                <TabsTrigger value="diagram" className="flex items-center space-x-2 data-[state=active]:bg-purple-600 data-[state=active]:text-white">
                  <GitBranch className="h-4 w-4" />
                  <span>Diagrams</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center space-x-2 data-[state=active]:bg-gray-600 data-[state=active]:text-white">
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
                <Card className="bg-white/80 backdrop-blur-sm border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="h-5 w-5 text-gray-600" />
                      <span>Configuration</span>
                    </CardTitle>
                    <CardDescription>
                      Customize your workflow generation settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
                        <h3 className="font-semibold text-blue-800 mb-2">Coming Soon</h3>
                        <p className="text-blue-700">Advanced configuration options will be available in the next update.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {/* Features Section */}
        {!repoData && (
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-20">
            {[
              {
                icon: Workflow,
                title: "Smart Workflows",
                description: "Generate CI/CD pipelines tailored to your tech stack with intelligent automation",
                color: "blue",
                image: "photo-1461749280684-dccba630e2f6"
              },
              {
                icon: GitBranch,
                title: "Code Diagrams",
                description: "Visualize your codebase structure, dependencies, and architecture patterns",
                color: "green",
                image: "photo-1498050108023-c5249f4df085"
              },
              {
                icon: Zap,
                title: "AI-Powered Analysis",
                description: "Intelligent code analysis with automated suggestions and best practices",
                color: "purple",
                image: "photo-1486312338219-ce68d2c6f44d"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white/80 backdrop-blur-sm border-2 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${feature.image}?auto=format&fit=crop&w=400&h=200`}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-${feature.color}-900/80 to-transparent`}></div>
                  <div className={`absolute bottom-4 left-4 p-3 bg-${feature.color}-600 rounded-xl shadow-lg`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {!repoData && (
          <div className="text-center mt-20 py-16 bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-3xl border border-blue-200">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Ready to Transform Your Workflow?</h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using AI to streamline their development process.
            </p>
            <Button className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold shadow-lg">
              <Github className="h-4 w-4 mr-2" />
              Get Started Now
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
