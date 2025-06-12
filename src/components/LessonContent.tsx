import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Play, Book, Terminal, Code, AlertTriangle, Shield, Wifi } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

interface LessonContentProps {
  lesson: {
    id: number;
    title: string;
    type: 'video' | 'reading' | 'practical';
    duration: string;
    content: string;
    commands?: string[];
    tips?: string[];
    objectives?: string[];
    videoId?: string; // YouTube video ID
  };
}

const LessonContent: React.FC<LessonContentProps> = ({ lesson }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video': return <Play className="h-6 w-6" />;
      case 'reading': return <Book className="h-6 w-6" />;
      case 'practical': return <Code className="h-6 w-6" />;
      default: return <Book className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-4">
      {/* Video Content */}
      {lesson.type === 'video' && (
        <Card className="border-green-500/30">
          <CardContent className="p-6">
            {lesson.videoId ? (
              <VideoPlayer 
                videoId={lesson.videoId}
                title={lesson.title}
                description={lesson.content}
              />
            ) : (
              <div className="bg-black rounded-lg p-8 text-center border border-green-500/30 mb-4">
                <Play className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <p className="text-green-300 terminal-font text-lg mb-2">Video Tutorial</p>
                <p className="text-sm text-green-400">Duration: {lesson.duration}</p>
              </div>
            )}
            
            {lesson.objectives && (
              <div className="mb-4 mt-4">
                <h4 className="text-green-400 terminal-font font-bold mb-2">Learning Objectives:</h4>
                <ul className="space-y-1">
                  {lesson.objectives.map((objective, index) => (
                    <li key={index} className="text-green-300 text-sm flex items-start">
                      <span className="text-green-400 mr-2">•</span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {!lesson.videoId && (
              <div className="bg-secondary/50 p-4 rounded border border-green-500/30">
                <p className="text-green-300 leading-relaxed">{lesson.content}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Reading Content */}
      {lesson.type === 'reading' && (
        <Card className="border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Book className="h-8 w-8 text-green-400 mr-3" />
              <div>
                <h3 className="text-green-400 terminal-font font-bold">Study Material</h3>
                <p className="text-sm text-green-300">Estimated reading time: {lesson.duration}</p>
              </div>
            </div>
            
            {lesson.objectives && (
              <div className="mb-4 p-4 bg-green-400/10 rounded border border-green-500/30">
                <h4 className="text-green-400 terminal-font font-bold mb-2 flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  What You'll Learn:
                </h4>
                <ul className="space-y-1">
                  {lesson.objectives.map((objective, index) => (
                    <li key={index} className="text-green-300 text-sm flex items-start">
                      <span className="text-green-400 mr-2">→</span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="prose prose-green max-w-none">
              <div className="text-green-300 leading-relaxed whitespace-pre-line">
                {lesson.content}
              </div>
            </div>
            
            {lesson.tips && (
              <div className="mt-4 p-4 bg-yellow-400/10 rounded border border-yellow-500/30">
                <h4 className="text-yellow-400 terminal-font font-bold mb-2 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-2" />
                  Pro Tips:
                </h4>
                <ul className="space-y-1">
                  {lesson.tips.map((tip, index) => (
                    <li key={index} className="text-yellow-300 text-sm flex items-start">
                      <span className="text-yellow-400 mr-2">💡</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Practical Exercise */}
      {lesson.type === 'practical' && (
        <Card className="border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              <Terminal className="h-8 w-8 text-green-400 mr-3" />
              <div>
                <h3 className="text-green-400 terminal-font font-bold">Hands-on Exercise</h3>
                <p className="text-sm text-green-300">Practice time: {lesson.duration}</p>
              </div>
            </div>
            
            {lesson.objectives && (
              <div className="mb-4 p-4 bg-blue-400/10 rounded border border-blue-500/30">
                <h4 className="text-blue-400 terminal-font font-bold mb-2">Exercise Goals:</h4>
                <ul className="space-y-1">
                  {lesson.objectives.map((objective, index) => (
                    <li key={index} className="text-blue-300 text-sm flex items-start">
                      <span className="text-blue-400 mr-2">⚡</span>
                      {objective}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="mb-4">
              <p className="text-green-300 mb-4">{lesson.content}</p>
            </div>
            
            {lesson.commands && (
              <div className="space-y-3">
                <h4 className="text-green-400 terminal-font font-bold">Commands to Practice:</h4>
                {lesson.commands.map((command, index) => (
                  <div key={index} className="bg-black p-3 rounded border border-green-500/50">
                    <p className="text-green-400 terminal-font text-sm font-mono">
                      $ {command}
                    </p>
                  </div>
                ))}
                <div className="mt-3 p-3 bg-green-400/10 rounded border border-green-500/30">
                  <p className="text-green-300 text-sm terminal-font">
                    💻 Practice these commands in the Terminal section of the app!
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LessonContent;
