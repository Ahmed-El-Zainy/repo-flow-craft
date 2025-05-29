
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Download, Copy, Play, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface RepoData {
  language: string;
  framework: string;
  packageManager: string;
  hasTests: boolean;
}

interface WorkflowGeneratorProps {
  repoData: RepoData;
}

const WorkflowGenerator = ({ repoData }: WorkflowGeneratorProps) => {
  const [generatedWorkflows, setGeneratedWorkflows] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateWorkflow = async (type: string) => {
    setIsGenerating(true);
    console.log(`Generating ${type} workflow for ${repoData.framework} project`);

    // Simulate workflow generation
    await new Promise(resolve => setTimeout(resolve, 1500));

    const workflows = {
      'ci-cd': `name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: '${repoData.packageManager}'
    
    - name: Install dependencies
      run: ${repoData.packageManager} install
    
    ${repoData.hasTests ? `- name: Run tests
      run: ${repoData.packageManager} test` : '# Add tests here'}
    
    - name: Build project
      run: ${repoData.packageManager} run build
    
    - name: Deploy to staging
      if: github.ref == 'refs/heads/develop'
      run: echo "Deploy to staging"
    
    - name: Deploy to production
      if: github.ref == 'refs/heads/main'
      run: echo "Deploy to production"`,

      'security': `name: Security Scan

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]
  schedule:
    - cron: '0 2 * * 1'

jobs:
  security:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Run security audit
      run: ${repoData.packageManager} audit
    
    - name: Run CodeQL Analysis
      uses: github/codeql-action/init@v2
      with:
        languages: javascript
    
    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v2`,

      'release': `name: Release Management

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: '${repoData.packageManager}'
    
    - name: Install dependencies
      run: ${repoData.packageManager} install
    
    - name: Build project
      run: ${repoData.packageManager} run build
    
    - name: Create Release
      uses: actions/create-release@v1
      env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
      with:
        tag_name: \${{ github.ref }}
        release_name: Release \${{ github.ref }}
        draft: false
        prerelease: false`
    };

    setGeneratedWorkflows(prev => [...prev, workflows[type as keyof typeof workflows]]);
    setIsGenerating(false);
    
    toast({
      title: "Workflow Generated",
      description: `${type.toUpperCase()} workflow has been generated successfully!`,
    });
  };

  const copyToClipboard = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast({
        title: "Copied!",
        description: "Workflow copied to clipboard",
      });
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Failed to copy workflow to clipboard",
        variant: "destructive",
      });
    }
  };

  const downloadWorkflow = (content: string, filename: string) => {
    const blob = new Blob([content], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.yml`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Downloaded!",
      description: `${filename}.yml has been downloaded`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Workflow Templates */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => generateWorkflow('ci-cd')}>
          <CardHeader className="text-center">
            <CardTitle className="text-lg">CI/CD Pipeline</CardTitle>
            <CardDescription>
              Automated testing, building, and deployment
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button disabled={isGenerating} className="w-full">
              {isGenerating ? "Generating..." : "Generate Workflow"}
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => generateWorkflow('security')}>
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Security Scan</CardTitle>
            <CardDescription>
              Vulnerability scanning and code analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button disabled={isGenerating} className="w-full" variant="outline">
              {isGenerating ? "Generating..." : "Generate Workflow"}
            </Button>
          </CardContent>
        </Card>

        <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => generateWorkflow('release')}>
          <CardHeader className="text-center">
            <CardTitle className="text-lg">Release Management</CardTitle>
            <CardDescription>
              Automated release creation and tagging
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button disabled={isGenerating} className="w-full" variant="outline">
              {isGenerating ? "Generating..." : "Generate Workflow"}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Generated Workflows */}
      {generatedWorkflows.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <span>Generated Workflows</span>
            </CardTitle>
            <CardDescription>
              Your custom GitHub Actions workflows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="0" className="w-full">
              <TabsList className="mb-4">
                {generatedWorkflows.map((_, index) => (
                  <TabsTrigger key={index} value={index.toString()}>
                    Workflow {index + 1}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {generatedWorkflows.map((workflow, index) => (
                <TabsContent key={index} value={index.toString()}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge variant="secondary">
                        .github/workflows/workflow-{index + 1}.yml
                      </Badge>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(workflow)}
                        >
                          <Copy className="h-4 w-4 mr-1" />
                          Copy
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => downloadWorkflow(workflow, `workflow-${index + 1}`)}
                        >
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    </div>
                    <Textarea
                      value={workflow}
                      readOnly
                      className="font-mono text-sm min-h-[400px] bg-gray-50"
                    />
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WorkflowGenerator;
