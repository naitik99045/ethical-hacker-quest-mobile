
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Book, CheckCircle, Code, Terminal } from 'lucide-react';

interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'reading' | 'practical';
  duration: string;
  completed: boolean;
  content: string;
}

interface TutorialSectionProps {
  moduleId: number;
}

const TutorialSection: React.FC<TutorialSectionProps> = ({ moduleId }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2]);

  const moduleLessons: Record<number, Lesson[]> = {
    3: [
      {
        id: 1,
        title: "Introduction to Network Reconnaissance",
        type: "video",
        duration: "15 min",
        completed: true,
        content: "Network reconnaissance is the process of gathering information about a target network..."
      },
      {
        id: 2,
        title: "Understanding Network Protocols",
        type: "reading",
        duration: "10 min",
        completed: true,
        content: "Network protocols define the rules and standards for communication between devices..."
      },
      {
        id: 3,
        title: "Installing and Using Nmap",
        type: "practical",
        duration: "20 min",
        completed: false,
        content: "Nmap (Network Mapper) is a powerful tool for network discovery and security auditing..."
      },
      {
        id: 4,
        title: "Basic Nmap Scanning Techniques",
        type: "video",
        duration: "25 min",
        completed: false,
        content: "Learn the fundamental Nmap scanning techniques including ping scans, TCP scans, and UDP scans..."
      },
      {
        id: 5,
        title: "Advanced Nmap Features",
        type: "practical",
        duration: "30 min",
        completed: false,
        content: "Explore advanced Nmap features like script scanning, OS detection, and service enumeration..."
      }
    ],
    4: [
      {
        id: 1,
        title: "Web Application Architecture",
        type: "video",
        duration: "20 min",
        completed: false,
        content: "Understanding how web applications work is crucial for identifying security vulnerabilities..."
      },
      {
        id: 2,
        title: "OWASP Top 10 Overview",
        type: "reading",
        duration: "15 min",
        completed: false,
        content: "The OWASP Top 10 represents the most critical web application security risks..."
      },
      {
        id: 3,
        title: "SQL Injection Fundamentals",
        type: "practical",
        duration: "35 min",
        completed: false,
        content: "SQL injection is one of the most common and dangerous web application vulnerabilities..."
      }
    ]
  };

  const lessons = moduleLessons[moduleId] || [];
  const lesson = lessons[currentLesson];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-4 w-4" />;
      case 'reading': return <Book className="h-4 w-4" />;
      case 'practical': return <Code className="h-4 w-4" />;
      default: return <Book className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'video': return 'bg-blue-600 text-white';
      case 'reading': return 'bg-purple-600 text-white';
      case 'practical': return 'bg-orange-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const completeLesson = () => {
    if (lesson && !completedLessons.includes(lesson.id)) {
      setCompletedLessons(prev => [...prev, lesson.id]);
    }
  };

  const nextLesson = () => {
    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
    }
  };

  const progress = (completedLessons.length / lessons.length) * 100;

  return (
    <div className="space-y-6">
      {/* Module Progress */}
      <Card className="border-green-500/30 glow-green">
        <CardHeader>
          <CardTitle className="text-green-400 terminal-font">Module Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-green-300">Lessons completed</span>
              <span className="text-green-400">{completedLessons.length}/{lessons.length}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Current Lesson */}
      {lesson && (
        <Card className="border-green-500/30">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <CardTitle className="text-green-400 terminal-font flex items-center">
                  {getTypeIcon(lesson.type)}
                  <span className="ml-2">{lesson.title}</span>
                  {completedLessons.includes(lesson.id) && 
                    <CheckCircle className="ml-2 h-5 w-5 text-green-400" />
                  }
                </CardTitle>
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(lesson.type)}>
                    {lesson.type}
                  </Badge>
                  <Badge variant="outline" className="text-green-400 border-green-500">
                    {lesson.duration}
                  </Badge>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Video Player Simulation */}
            {lesson.type === 'video' && (
              <div className="bg-black rounded-lg p-8 text-center border border-green-500/30">
                <Play className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <p className="text-green-300 terminal-font">Video Tutorial</p>
                <p className="text-sm text-green-400">Click play to start the lesson</p>
              </div>
            )}

            {/* Reading Content */}
            {lesson.type === 'reading' && (
              <div className="bg-secondary/50 p-4 rounded border border-green-500/30">
                <Book className="h-8 w-8 text-green-400 mb-3" />
                <p className="text-green-300 leading-relaxed">{lesson.content}</p>
              </div>
            )}

            {/* Practical Exercise */}
            {lesson.type === 'practical' && (
              <div className="bg-black/50 p-4 rounded border border-green-500/30">
                <div className="flex items-center mb-3">
                  <Terminal className="h-6 w-6 text-green-400 mr-2" />
                  <span className="text-green-400 terminal-font">Hands-on Exercise</span>
                </div>
                <p className="text-green-300 mb-4">{lesson.content}</p>
                <div className="bg-black p-3 rounded border border-green-500/50">
                  <p className="text-green-400 terminal-font text-sm">
                    $ nmap -sT 192.168.1.1
                  </p>
                  <p className="text-green-300 text-sm mt-1">
                    Try this command in the Terminal section!
                  </p>
                </div>
              </div>
            )}

            {/* Lesson Actions */}
            <div className="flex space-x-3">
              {!completedLessons.includes(lesson.id) && (
                <Button 
                  onClick={completeLesson}
                  className="bg-green-600 hover:bg-green-700 text-black font-bold"
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Mark Complete
                </Button>
              )}
              
              {currentLesson < lessons.length - 1 && (
                <Button 
                  onClick={nextLesson}
                  variant="outline"
                  className="border-green-500 text-green-400 hover:bg-green-400/10"
                >
                  Next Lesson →
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lesson List */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 terminal-font">All Lessons</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {lessons.map((l, index) => (
              <div
                key={l.id}
                onClick={() => setCurrentLesson(index)}
                className={`flex items-center justify-between p-3 rounded border cursor-pointer transition-colors ${
                  index === currentLesson 
                    ? 'border-green-500 bg-green-400/10' 
                    : 'border-green-500/30 hover:border-green-400'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {getTypeIcon(l.type)}
                  <div>
                    <p className="text-green-400 terminal-font font-medium">{l.title}</p>
                    <p className="text-sm text-green-300">{l.duration}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getTypeColor(l.type)} variant="secondary">
                    {l.type}
                  </Badge>
                  {completedLessons.includes(l.id) && (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TutorialSection;
