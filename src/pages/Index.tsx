
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Terminal, Book, Play, Code } from 'lucide-react';
import TerminalGame from '@/components/TerminalGame';
import TutorialSection from '@/components/TutorialSection';
import QuizSection from '@/components/QuizSection';
import LearningModules from '@/components/LearningModules';

const Index = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [userLevel, setUserLevel] = useState(1);
  const [userXP, setUserXP] = useState(250);
  const [matrixChars, setMatrixChars] = useState<Array<{id: number, char: string, left: number}>>([]);

  // Matrix rain effect
  useEffect(() => {
    const interval = setInterval(() => {
      const chars = '01ハカーセキュリティ';
      const newChar = {
        id: Date.now(),
        char: chars[Math.floor(Math.random() * chars.length)],
        left: Math.random() * 100
      };
      
      setMatrixChars(prev => [...prev.slice(-20), newChar]);
    }, 200);

    return () => clearInterval(interval);
  }, []);

  const sections = [
    { id: 'dashboard', label: 'Dashboard', icon: Terminal },
    { id: 'learn', label: 'Learn', icon: Book },
    { id: 'terminal', label: 'Terminal', icon: Code },
    { id: 'quiz', label: 'Quiz', icon: Play }
  ];

  const renderSection = () => {
    switch (activeSection) {
      case 'learn':
        return <LearningModules />;
      case 'terminal':
        return <TerminalGame onXPGain={(xp) => setUserXP(prev => prev + xp)} />;
      case 'quiz':
        return <QuizSection onXPGain={(xp) => setUserXP(prev => prev + xp)} />;
      default:
        return (
          <div className="space-y-6">
            {/* Matrix Background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
              {matrixChars.map((char) => (
                <div
                  key={char.id}
                  className="absolute text-green-500 text-sm matrix-char opacity-20"
                  style={{ left: `${char.left}%` }}
                >
                  {char.char}
                </div>
              ))}
            </div>

            {/* Welcome Header */}
            <Card className="matrix-effect border-green-500/30 glow-green">
              <CardHeader>
                <CardTitle className="text-2xl text-green-400 terminal-font">
                  Welcome to Kali Linux Academy
                </CardTitle>
                <CardDescription className="text-green-300">
                  Master ethical hacking through interactive learning
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-green-400 terminal-font">Level {userLevel} Hacker</p>
                    <p className="text-sm text-green-300">{userXP}/1000 XP</p>
                  </div>
                  <Badge variant="outline" className="text-green-400 border-green-500">
                    Ethical Hacker
                  </Badge>
                </div>
                <Progress value={(userXP % 1000) / 10} className="h-2" />
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="border-green-500/30">
                <CardContent className="p-4">
                  <div className="text-2xl text-green-400 font-bold terminal-font">12</div>
                  <p className="text-sm text-green-300">Modules Completed</p>
                </CardContent>
              </Card>
              <Card className="border-green-500/30">
                <CardContent className="p-4">
                  <div className="text-2xl text-green-400 font-bold terminal-font">85%</div>
                  <p className="text-sm text-green-300">Quiz Average</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 terminal-font">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Terminal className="h-4 w-4 text-green-400" />
                  <span className="text-green-300">Completed: Network Scanning Tutorial</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Play className="h-4 w-4 text-green-400" />
                  <span className="text-green-300">Quiz Score: 9/10 in SQL Injection</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Code className="h-4 w-4 text-green-400" />
                  <span className="text-green-300">Terminal Task: Nmap scan completed</span>
                </div>
              </CardContent>
            </Card>

            {/* Continue Learning */}
            <Card className="border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400 terminal-font">Continue Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setActiveSection('learn')} 
                  className="w-full bg-green-600 hover:bg-green-700 text-black font-bold"
                >
                  Start Next Module: Web Application Security
                </Button>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-green-500/30 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Terminal className="h-8 w-8 text-green-400" />
              <h1 className="text-xl font-bold text-green-400 terminal-font">
                Kali Academy
              </h1>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-400 border-green-500">
                Level {userLevel}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {renderSection()}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-sm border-t border-green-500/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-around py-3">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-green-400 bg-green-400/10' 
                      : 'text-green-300 hover:text-green-400'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs terminal-font">{section.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Index;
