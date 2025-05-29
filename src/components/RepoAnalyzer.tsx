
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, AlertCircle, Code, Package, TestTube, Shield, Star, TrendingUp } from "lucide-react";

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
  const analysisScore = 85; // Enhanced mock score

  const getStatusIcon = (hasFeature: boolean) => {
    return hasFeature ? (
      <CheckCircle className="h-5 w-5 text-emerald-600" />
    ) : (
      <XCircle className="h-5 w-5 text-red-500" />
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "emerald";
    if (score >= 60) return "yellow";
    return "red";
  };

  const scoreColor = getScoreColor(analysisScore);

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Repository Overview */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg">
              <Code className="h-5 w-5 text-white" />
            </div>
            <span className="text-blue-900">Repository Overview</span>
          </CardTitle>
          <CardDescription className="text-blue-700">
            Comprehensive analysis of <strong>{repoData.name}</strong> by <strong>{repoData.owner}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-blue-200">
              <label className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Language</label>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <p className="text-xl font-bold text-blue-900">{repoData.language}</p>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-blue-200">
              <label className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Framework</label>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-3 h-3 bg-cyan-500 rounded-full"></div>
                <p className="text-xl font-bold text-blue-900">{repoData.framework}</p>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-blue-200">
              <label className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Package Manager</label>
              <div className="flex items-center space-x-2 mt-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <p className="text-xl font-bold text-blue-900">{repoData.packageManager}</p>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-blue-200">
              <label className="text-sm font-semibold text-blue-600 uppercase tracking-wide">Health Score</label>
              <div className="flex items-center space-x-3 mt-2">
                <Progress value={analysisScore} className="w-20 h-2" />
                <span className={`text-xl font-bold text-${scoreColor}-600`}>{analysisScore}%</span>
                <TrendingUp className={`h-4 w-4 text-${scoreColor}-600`} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Project Health */}
      <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-emerald-900">Project Health</span>
          </CardTitle>
          <CardDescription className="text-emerald-700">
            Development practices and configuration analysis
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {[
            { label: "Test Coverage", status: repoData.hasTests, detail: repoData.hasTests ? "Comprehensive" : "Missing" },
            { label: "CI/CD Pipeline", status: repoData.hasCI, detail: repoData.hasCI ? "Configured" : "Not Set Up" },
            { label: "Documentation", status: true, detail: "README.md found" },
            { label: "Code Quality", status: true, detail: "ESLint configured" }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-emerald-200">
              <div className="flex items-center space-x-3">
                {getStatusIcon(item.status)}
                <span className="font-medium text-emerald-900">{item.label}</span>
              </div>
              <Badge 
                variant={item.status ? "default" : "secondary"} 
                className={item.status ? "bg-emerald-600 text-white" : "bg-red-100 text-red-800"}
              >
                {item.detail}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Dependencies */}
      <Card className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-violet-600 rounded-lg">
              <Package className="h-5 w-5 text-white" />
            </div>
            <span className="text-purple-900">Dependencies</span>
          </CardTitle>
          <CardDescription className="text-purple-700">
            Key packages and libraries detected in your project
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {repoData.dependencies.map((dep, index) => (
              <Badge 
                key={index} 
                variant="secondary" 
                className="bg-white/80 border border-purple-200 text-purple-800 hover:bg-purple-100 transition-colors text-sm py-1 px-3"
              >
                {dep}
              </Badge>
            ))}
          </div>
          <div className="mt-4 p-3 bg-white/60 backdrop-blur-sm rounded-lg border border-purple-200">
            <div className="flex items-center space-x-2 text-sm text-purple-700">
              <Star className="h-4 w-4" />
              <span className="font-medium">Total Dependencies: {repoData.dependencies.length}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="bg-gradient-to-br from-orange-50 to-amber-50 border-2 border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-orange-600 to-amber-600 rounded-lg">
              <TestTube className="h-5 w-5 text-white" />
            </div>
            <span className="text-orange-900">AI Recommendations</span>
          </CardTitle>
          <CardDescription className="text-orange-700">
            Intelligent suggestions to improve your repository
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {!repoData.hasCI && (
            <div className="p-4 bg-gradient-to-r from-yellow-100 to-orange-100 border-l-4 border-yellow-500 rounded-lg">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-800">Add CI/CD Pipeline</p>
                  <p className="text-sm text-yellow-700 mt-1">Implement automated testing and deployment workflows</p>
                </div>
              </div>
            </div>
          )}
          <div className="p-4 bg-gradient-to-r from-blue-100 to-indigo-100 border-l-4 border-blue-500 rounded-lg">
            <div className="flex items-start space-x-3">
              <Shield className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="font-semibold text-blue-800">Security Enhancement</p>
                <p className="text-sm text-blue-700 mt-1">Add dependency vulnerability scanning and SAST tools</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-gradient-to-r from-green-100 to-emerald-100 border-l-4 border-green-500 rounded-lg">
            <div className="flex items-start space-x-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-semibold text-green-800">Code Quality Tools</p>
                <p className="text-sm text-green-700 mt-1">Enhance with advanced linting and formatting rules</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RepoAnalyzer;
