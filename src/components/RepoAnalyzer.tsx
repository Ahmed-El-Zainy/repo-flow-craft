
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, AlertCircle, Code, Package, TestTube } from "lucide-react";

interface RepoData {
  url: string;
  name: string;
  owner: string;
  language: string;
  framework: string;
  packageManager: string;
  hasTests: boolean;
  hasCI: boolean;
  dependencies: string[];
}

interface RepoAnalyzerProps {
  repoData: RepoData;
}

const RepoAnalyzer = ({ repoData }: RepoAnalyzerProps) => {
  const analysisScore = 75; // Mock score based on analysis

  const getStatusIcon = (hasFeature: boolean) => {
    return hasFeature ? (
      <CheckCircle className="h-4 w-4 text-green-600" />
    ) : (
      <XCircle className="h-4 w-4 text-red-600" />
    );
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Repository Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Code className="h-5 w-5" />
            <span>Repository Overview</span>
          </CardTitle>
          <CardDescription>
            Analysis of {repoData.name} by {repoData.owner}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600">Language</label>
              <p className="text-lg font-semibold">{repoData.language}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Framework</label>
              <p className="text-lg font-semibold">{repoData.framework}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Package Manager</label>
              <p className="text-lg font-semibold">{repoData.packageManager}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-600">Health Score</label>
              <div className="flex items-center space-x-2">
                <Progress value={analysisScore} className="w-16" />
                <span className="text-lg font-semibold">{analysisScore}%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Health */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>Project Health</span>
          </CardTitle>
          <CardDescription>
            Analysis of development practices and configuration
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Tests Available</span>
            <div className="flex items-center space-x-2">
              {getStatusIcon(repoData.hasTests)}
              <span className="text-sm">{repoData.hasTests ? 'Yes' : 'No'}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">CI/CD Pipeline</span>
            <div className="flex items-center space-x-2">
              {getStatusIcon(repoData.hasCI)}
              <span className="text-sm">{repoData.hasCI ? 'Configured' : 'Missing'}</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Documentation</span>
            <div className="flex items-center space-x-2">
              {getStatusIcon(true)}
              <span className="text-sm">README.md found</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dependencies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Dependencies</span>
          </CardTitle>
          <CardDescription>
            Key dependencies detected in your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {repoData.dependencies.map((dep, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {dep}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TestTube className="h-5 w-5" />
            <span>Recommendations</span>
          </CardTitle>
          <CardDescription>
            Suggested improvements for your repository
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {!repoData.hasCI && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                <strong>Add CI/CD Pipeline:</strong> Implement automated testing and deployment
              </p>
            </div>
          )}
          <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Security Scan:</strong> Add dependency vulnerability scanning
            </p>
          </div>
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800">
              <strong>Code Quality:</strong> Consider adding ESLint and Prettier configuration
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RepoAnalyzer;
