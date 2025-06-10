
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Book, Play, Lock, CheckCircle } from 'lucide-react';
import TutorialSection from './TutorialSection';

interface Module {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  lessons: number;
  completed: boolean;
  locked: boolean;
  topics: string[];
}

const LearningModules = () => {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);

  const modules: Module[] = [
    {
      id: 1,
      title: "Introduction to Ethical Hacking",
      description: "Learn the fundamentals of ethical hacking and cybersecurity principles",
      difficulty: "Beginner",
      duration: "2 hours",
      lessons: 8,
      completed: true,
      locked: false,
      topics: ["Ethics", "Legal Framework", "Types of Hackers", "Methodology"]
    },
    {
      id: 2,
      title: "Kali Linux Basics",
      description: "Master the essential tools and commands in Kali Linux",
      difficulty: "Beginner",
      duration: "3 hours",
      lessons: 12,
      completed: true,
      locked: false,
      topics: ["Linux Commands", "File System", "Package Management", "Tool Installation"]
    },
    {
      id: 3,
      title: "Network Reconnaissance",
      description: "Learn information gathering and network scanning techniques",
      difficulty: "Intermediate",
      duration: "4 hours",
      lessons: 15,
      completed: false,
      locked: false,
      topics: ["Nmap", "Netdiscover", "Port Scanning", "Service Enumeration"]
    },
    {
      id: 4,
      title: "Web Application Security",
      description: "Discover vulnerabilities in web applications",
      difficulty: "Intermediate",
      duration: "5 hours",
      lessons: 18,
      completed: false,
      locked: false,
      topics: ["SQL Injection", "XSS", "CSRF", "Directory Traversal"]
    },
    {
      id: 5,
      title: "Wireless Security",
      description: "Understand wireless network security and attack methods",
      difficulty: "Advanced",
      duration: "4 hours",
      lessons: 14,
      completed: false,
      locked: true,
      topics: ["WEP/WPA", "Aircrack-ng", "Evil Twin", "Deauth Attacks"]
    },
    {
      id: 6,
      title: "Metasploit Framework",
      description: "Master the world's most popular penetration testing framework",
      difficulty: "Advanced",
      duration: "6 hours",
      lessons: 20,
      completed: false,
      locked: true,
      topics: ["Msfconsole", "Payloads", "Encoders", "Post-Exploitation"]
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600 text-black';
      case 'Intermediate': return 'bg-yellow-600 text-black';
      case 'Advanced': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  if (selectedModule) {
    return (
      <div className="pb-20">
        <div className="mb-4">
          <Button 
            onClick={() => setSelectedModule(null)}
            variant="outline"
            className="border-green-500 text-green-400 hover:bg-green-400/10"
          >
            ← Back to Modules
          </Button>
        </div>
        <TutorialSection moduleId={selectedModule} />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-400 terminal-font mb-2">
          Learning Modules
        </h2>
        <p className="text-green-300">
          Master ethical hacking through structured lessons and hands-on practice
        </p>
      </div>

      {/* Progress Overview */}
      <Card className="border-green-500/30 glow-green">
        <CardHeader>
          <CardTitle className="text-green-400 terminal-font">Your Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-300">Overall Completion</span>
                <span className="text-green-400">33%</span>
              </div>
              <Progress value={33} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-green-400 terminal-font">2</div>
                <div className="text-sm text-green-300">Completed</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-400 terminal-font">2</div>
                <div className="text-sm text-green-300">In Progress</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-400 terminal-font">2</div>
                <div className="text-sm text-green-300">Locked</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="grid gap-4">
        {modules.map((module) => (
          <Card 
            key={module.id} 
            className={`border-green-500/30 transition-all duration-200 ${
              module.locked 
                ? 'opacity-50' 
                : 'hover:border-green-400 hover:glow-green cursor-pointer'
            }`}
            onClick={() => !module.locked && setSelectedModule(module.id)}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <CardTitle className="text-green-400 terminal-font text-lg">
                      {module.title}
                    </CardTitle>
                    {module.completed && <CheckCircle className="h-5 w-5 text-green-400" />}
                    {module.locked && <Lock className="h-5 w-5 text-gray-500" />}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getDifficultyColor(module.difficulty)}>
                      {module.difficulty}
                    </Badge>
                    <Badge variant="outline" className="text-green-400 border-green-500">
                      {module.duration}
                    </Badge>
                    <Badge variant="outline" className="text-green-400 border-green-500">
                      {module.lessons} lessons
                    </Badge>
                  </div>
                </div>
              </div>
              <CardDescription className="text-green-300">
                {module.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-green-400 mb-2 terminal-font">Topics covered:</p>
                  <div className="flex flex-wrap gap-1">
                    {module.topics.map((topic, index) => (
                      <span 
                        key={index}
                        className="text-xs bg-green-400/10 text-green-300 px-2 py-1 rounded border border-green-500/30"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                </div>
                
                {!module.locked && (
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700 text-black font-bold"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedModule(module.id);
                    }}
                  >
                    <Book className="mr-2 h-4 w-4" />
                    {module.completed ? 'Review Module' : 'Start Learning'}
                  </Button>
                )}
                
                {module.locked && (
                  <div className="text-center text-sm text-gray-500 terminal-font">
                    Complete previous modules to unlock
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LearningModules;
