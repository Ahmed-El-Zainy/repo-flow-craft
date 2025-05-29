
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitBranch, Database, Server, Globe, Smartphone } from "lucide-react";

interface RepoData {
  name: string;
  language: string;
  framework: string;
  dependencies: string[];
}

interface DiagramViewProps {
  repoData: RepoData;
}

const DiagramView = ({ repoData }: DiagramViewProps) => {
  const [selectedDiagram, setSelectedDiagram] = useState('architecture');

  // Mock diagram data - in a real app, this would be generated from actual code analysis
  const architectureDiagram = {
    frontend: { name: 'Frontend', tech: repoData.framework, icon: Globe },
    backend: { name: 'API Server', tech: 'Node.js', icon: Server },
    database: { name: 'Database', tech: 'PostgreSQL', icon: Database },
    mobile: { name: 'Mobile App', tech: 'React Native', icon: Smartphone }
  };

  const workflowDiagram = [
    { step: 'Development', description: 'Code changes pushed to feature branch' },
    { step: 'Testing', description: 'Automated tests run on PR creation' },
    { step: 'Review', description: 'Code review and approval process' },
    { step: 'Integration', description: 'Merge to main branch triggers CI' },
    { step: 'Deployment', description: 'Automated deployment to production' }
  ];

  return (
    <div className="space-y-6">
      <Tabs value={selectedDiagram} onValueChange={setSelectedDiagram}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="architecture">System Architecture</TabsTrigger>
          <TabsTrigger value="workflow">Development Flow</TabsTrigger>
          <TabsTrigger value="dependencies">Dependencies</TabsTrigger>
        </TabsList>

        <TabsContent value="architecture" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>System Architecture Diagram</CardTitle>
              <CardDescription>
                Visual representation of your application architecture
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {Object.entries(architectureDiagram).map(([key, component]) => {
                    const IconComponent = component.icon;
                    return (
                      <div key={key} className="text-center">
                        <div className="bg-white p-4 rounded-xl shadow-md border-2 border-dashed border-blue-200 hover:border-blue-400 transition-colors">
                          <IconComponent className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                          <h3 className="font-semibold text-sm">{component.name}</h3>
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {component.tech}
                          </Badge>
                        </div>
                        {key !== 'mobile' && (
                          <div className="hidden md:block mt-4">
                            <div className="w-px h-8 bg-blue-300 mx-auto"></div>
                            <div className="text-xs text-blue-600">↓</div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workflow" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Development Workflow</CardTitle>
              <CardDescription>
                Your recommended development and deployment process
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflowDiagram.map((step, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </div>
                    </div>
                    <div className="flex-1 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                      <h3 className="font-semibold text-gray-900">{step.step}</h3>
                      <p className="text-gray-600 text-sm mt-1">{step.description}</p>
                    </div>
                    {index < workflowDiagram.length - 1 && (
                      <div className="flex-shrink-0">
                        <GitBranch className="h-5 w-5 text-gray-400 rotate-90" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dependencies" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Dependency Graph</CardTitle>
              <CardDescription>
                Visual representation of your project dependencies
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="text-center mb-6">
                  <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
                    {repoData.name}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {repoData.dependencies.map((dep, index) => (
                    <div key={index} className="bg-white p-3 rounded-lg border border-gray-200 text-center">
                      <div className="font-mono text-sm font-semibold text-gray-800">{dep}</div>
                      <div className="text-xs text-gray-500 mt-1">dependency</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <Button variant="outline" size="sm">
                    View Full Dependency Tree
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DiagramView;
