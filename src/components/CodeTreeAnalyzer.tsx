import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileTree, FolderTree, Code2, Bot, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TreeNode {
  name: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
  description?: string;
  dependencies?: string[];
  imports?: string[];
}

interface CodeTreeAnalyzerProps {
  repoData: {
    name: string;
    language: string;
    framework: string;
  };
}

const CodeTreeAnalyzer = ({ repoData }: CodeTreeAnalyzerProps) => {
  const [treeData, setTreeData] = useState<TreeNode | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  // Simulated LLM agent analysis
  const analyzeCodeStructure = async () => {
    setIsAnalyzing(true);
    try {
      // Simulate API call to LLM agent
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Mock response from LLM agent
      const mockTreeData: TreeNode = {
        name: 'root',
        type: 'folder',
        children: [
          {
            name: 'src',
            type: 'folder',
            description: 'Main source code directory',
            children: [
              {
                name: 'components',
                type: 'folder',
                description: 'React components with UI logic',
                children: [
                  {
                    name: 'ui',
                    type: 'folder',
                    description: 'Reusable UI components',
                    dependencies: ['shadcn/ui', 'tailwindcss']
                  },
                  {
                    name: 'CodeTreeAnalyzer.tsx',
                    type: 'file',
                    description: 'Component for analyzing code structure',
                    imports: ['react', '@/components/ui/*']
                  }
                ]
              },
              {
                name: 'pages',
                type: 'folder',
                description: 'Application pages and routes',
                children: [
                  {
                    name: 'Index.tsx',
                    type: 'file',
                    description: 'Main landing page',
                    imports: ['react', '@/components/*']
                  }
                ]
              }
            ]
          },
          {
            name: 'public',
            type: 'folder',
            description: 'Static assets and resources'
          }
        ]
      };

      setTreeData(mockTreeData);
      toast({
        title: "Analysis Complete",
        description: "Code structure has been analyzed successfully!",
      });
    } catch (error) {
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze code structure",
        variant: "destructive",
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const renderTreeNode = (node: TreeNode, level: number = 0) => {
    const paddingLeft = `${level * 20}px`;
    const isFolder = node.type === 'folder';

    return (
      <div key={node.name} className="py-2">
        <div 
          className="flex items-center space-x-2 hover:bg-gray-800/50 rounded-lg p-2 transition-colors"
          style={{ marginLeft: paddingLeft }}
        >
          {isFolder ? (
            <FolderTree className="h-5 w-5 text-yellow-500" />
          ) : (
            <FileTree className="h-5 w-5 text-blue-500" />
          )}
          <span className="text-gray-200 font-medium">{node.name}</span>
          {node.description && (
            <Badge variant="secondary" className="bg-gray-700/50 text-gray-300">
              {node.description}
            </Badge>
          )}
        </div>

        {node.dependencies && (
          <div 
            className="mt-1 text-sm text-gray-400"
            style={{ marginLeft: `${paddingLeft + 28}px` }}
          >
            Dependencies: {node.dependencies.join(', ')}
          </div>
        )}

        {node.imports && (
          <div 
            className="mt-1 text-sm text-gray-400"
            style={{ marginLeft: `${paddingLeft + 28}px` }}
          >
            Imports: {node.imports.join(', ')}
          </div>
        )}

        {node.children?.map(child => renderTreeNode(child, level + 1))}
      </div>
    );
  };

  return (
    <Card className="bg-gray-900/80 backdrop-blur-xl border-2 border-gray-700/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-gray-800 to-black rounded-lg border border-gray-700">
              <Code2 className="h-6 w-6 text-gray-300" />
            </div>
            <div>
              <CardTitle className="text-gray-100">Code Structure Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                AI-powered analysis of your codebase structure
              </CardDescription>
            </div>
          </div>
          <Button
            onClick={analyzeCodeStructure}
            disabled={isAnalyzing}
            className="relative bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Bot className="h-4 w-4 mr-2" />
                Analyze Structure
              </>
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {treeData ? (
          <div className="mt-4 bg-gray-800/50 rounded-lg p-4 border border-gray-700/50">
            {renderTreeNode(treeData)}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-400">
            Click "Analyze Structure" to generate a code tree
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CodeTreeAnalyzer;