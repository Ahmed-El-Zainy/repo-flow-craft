
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
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-800 to-black">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Code Symbols */}
        <div className="absolute top-20 left-10 text-6xl text-gray-700/20 animate-pulse font-mono">{'<>'}</div>
        <div className="absolute top-40 right-20 text-4xl text-gray-600/30 animate-bounce font-mono">{'{}'}</div>
        <div className="absolute bottom-32 left-20 text-5xl text-gray-700/20 animate-pulse font-mono">{'[]'}</div>
        <div className="absolute bottom-20 right-10 text-3xl text-gray-600/25 animate-bounce font-mono">{'()'}</div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <header className="border-b border-gray-700/50 bg-gray-900/90 backdrop-blur-xl sticky top-0 z-50 shadow-2xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <div className="p-3 bg-gradient-to-br from-gray-800 to-black rounded-xl shadow-2xl border border-gray-700">
                  <Bot className="h-7 w-7 text-gray-300" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-900 animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-200 to-gray-400 bg-clip-text text-transparent">
                  WorkflowAI
                </h1>
                <p className="text-sm text-gray-400 font-medium">GitHub Repository Automation</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Badge variant="secondary" className="bg-gradient-to-r from-green-900/50 to-emerald-900/50 text-green-300 border-green-700/50">
                <Sparkles className="h-3 w-3 mr-1" />
                AI-Powered
              </Badge>
              <Badge variant="secondary" className="bg-gradient-to-r from-purple-900/50 to-violet-900/50 text-purple-300 border-purple-700/50">
                Beta
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-800/10 to-gray-600/10 rounded-3xl blur-3xl"></div>
          <div className="relative">
            <div className="inline-flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-600/50 mb-6">
              <Code2 className="h-4 w-4 text-gray-300" />
              <span className="text-sm font-medium text-gray-300">Powered by Advanced AI</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-100 mb-6 leading-tight">
              Automate Your{' '}
              <span className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 bg-clip-text text-transparent">
                GitHub Workflows
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-4xl mx-auto mb-8 leading-relaxed">
              Transform your development process with intelligent automation. Analyze repositories, 
              generate CI/CD pipelines, and visualize code architecture with cutting-edge AI technology.
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap justify-center gap-3 mb-8">
              {[
                { icon: Workflow, text: "Smart Workflows", color: "from-blue-600 to-blue-800" },
                { icon: GitBranch, text: "Code Diagrams", color: "from-green-600 to-green-800" },
                { icon: Zap, text: "Instant Analysis", color: "from-purple-600 to-purple-800" }
              ].map((feature, index) => (
                <div key={index} className={`flex items-center space-x-2 bg-gradient-to-r ${feature.color} bg-opacity-20 border border-gray-600/30 px-3 py-2 rounded-full`}>
                  <feature.icon className="h-4 w-4 text-gray-300" />
                  <span className="text-sm font-medium text-gray-300">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Repository Input */}
        <Card className="max-w-3xl mx-auto mb-12 shadow-2xl border border-gray-700/50 bg-gray-900/80 backdrop-blur-xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="flex items-center justify-center space-x-3 text-2xl text-gray-100">
              <div className="p-2 bg-gradient-to-br from-gray-800 to-black rounded-lg border border-gray-700">
                <Github className="h-6 w-6 text-gray-300" />
              </div>
              <span>Repository Analysis</span>
            </CardTitle>
            <CardDescription className="text-base text-gray-400">
              Enter your GitHub repository URL to unlock intelligent automation insights
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex space-x-3">
              <Input
                placeholder="https://github.com/username/repository"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                className="flex-1 h-12 text-base border-2 border-gray-600/50 bg-gray-800/50 text-gray-200 placeholder-gray-500 focus:border-gray-400 focus:ring-gray-400"
              />
              <Button 
                onClick={handleAnalyze} 
                disabled={isAnalyzing}
                className="relative h-12 px-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 text-white font-semibold shadow-2xl border border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-gray-500/25 active:scale-95 group overflow-hidden"
              >
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Moving Light Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
                
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2 relative z-10">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <div className="flex items-center space-x-2 relative z-10">
                    <Bot className="h-4 w-4 group-hover:animate-pulse" />
                    <span>Analyze</span>
                  </div>
                )}
              </Button>
            </div>
            {repoUrl && (
              <div className="p-3 bg-gray-800/50 border border-gray-600/50 rounded-lg backdrop-blur-sm">
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <Github className="h-4 w-4" />
                  <span className="font-medium">Repository:</span>
                  <span className="font-mono bg-gray-700/50 px-2 py-1 rounded border border-gray-600/30 text-gray-200">{repoUrl}</span>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Section */}
        {repoData && (
          <div className="max-w-7xl mx-auto">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4 mb-8 h-14 bg-gray-900/80 backdrop-blur-xl border-2 border-gray-700/50">
                <TabsTrigger value="overview" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-blue-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-300">
                  <FileCode className="h-4 w-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="workflows" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-green-600 data-[state=active]:to-green-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-300">
                  <Workflow className="h-4 w-4" />
                  <span>Workflows</span>
                </TabsTrigger>
                <TabsTrigger value="diagram" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-purple-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-300">
                  <GitBranch className="h-4 w-4" />
                  <span>Diagrams</span>
                </TabsTrigger>
                <TabsTrigger value="settings" className="flex items-center space-x-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-gray-600 data-[state=active]:to-gray-700 data-[state=active]:text-white text-gray-300 hover:text-white transition-all duration-300">
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
                <Card className="bg-gray-900/80 backdrop-blur-xl border-2 border-gray-700/50">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-gray-100">
                      <Settings className="h-5 w-5 text-gray-400" />
                      <span>Configuration</span>
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      Customize your workflow generation settings and preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 border border-gray-600/50 rounded-lg">
                        <h3 className="font-semibold text-gray-300 mb-2">Coming Soon</h3>
                        <p className="text-gray-400">Advanced configuration options will be available in the next update.</p>
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
                color: "from-blue-600 to-blue-800",
                image: "photo-1461749280684-dccba630e2f6"
              },
              {
                icon: GitBranch,
                title: "Code Diagrams",
                description: "Visualize your codebase structure, dependencies, and architecture patterns",
                color: "from-green-600 to-green-800",
                image: "photo-1498050108023-c5249f4df085"
              },
              {
                icon: Zap,
                title: "AI-Powered Analysis",
                description: "Intelligent code analysis with automated suggestions and best practices",
                color: "from-purple-600 to-purple-800",
                image: "photo-1486312338219-ce68d2c6f44d"
              }
            ].map((feature, index) => (
              <Card key={index} className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 hover:scale-105 bg-gray-900/80 backdrop-blur-xl border-2 border-gray-700/50 overflow-hidden">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/${feature.image}?auto=format&fit=crop&w=400&h=200`}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 filter brightness-75"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${feature.color} opacity-60`}></div>
                  <div className={`absolute bottom-4 left-4 p-3 bg-gradient-to-r ${feature.color} rounded-xl shadow-lg border border-gray-600/30`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-gray-100">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* CTA Section */}
        {!repoData && (
          <div className="text-center mt-20 py-16 bg-gradient-to-r from-gray-800/30 to-gray-700/30 rounded-3xl border border-gray-700/50 backdrop-blur-xl">
            <h3 className="text-3xl font-bold text-gray-100 mb-4">Ready to Transform Your Workflow?</h3>
            <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who are already using AI to streamline their development process.
            </p>
            <Button className="relative h-12 px-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 hover:from-gray-600 hover:via-gray-500 hover:to-gray-600 text-white font-semibold shadow-2xl border border-gray-600/50 transition-all duration-300 hover:scale-105 hover:shadow-gray-500/25 active:scale-95 group overflow-hidden">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Moving Light Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"></div>
              
              <div className="flex items-center space-x-2 relative z-10">
                <Github className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                <span>Get Started Now</span>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
