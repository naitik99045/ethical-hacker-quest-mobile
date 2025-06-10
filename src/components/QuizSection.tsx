
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
}

interface QuizSectionProps {
  onXPGain: (xp: number) => void;
}

const QuizSection: React.FC<QuizSectionProps> = ({ onXPGain }) => {
  const [currentQuiz, setCurrentQuiz] = useState('networking');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<number[]>([]);

  const quizzes = {
    networking: {
      title: "Network Reconnaissance",
      description: "Test your knowledge of network scanning and enumeration",
      difficulty: "Intermediate",
      xpReward: 100,
      questions: [
        {
          id: 1,
          question: "What does the -sn flag do in Nmap?",
          options: [
            "Performs a TCP SYN scan",
            "Disables port scanning and only does host discovery",
            "Scans for services and versions",
            "Performs a UDP scan"
          ],
          correct: 1,
          explanation: "The -sn flag (also known as -sP) disables port scanning and only performs host discovery using ping."
        },
        {
          id: 2,
          question: "Which port is commonly used for SSH?",
          options: ["21", "22", "23", "25"],
          correct: 1,
          explanation: "Port 22 is the default port for SSH (Secure Shell) protocol."
        },
        {
          id: 3,
          question: "What is the purpose of service enumeration?",
          options: [
            "To crash the target system",
            "To identify running services and their versions",
            "To change network configurations",
            "To delete files from the target"
          ],
          correct: 1,
          explanation: "Service enumeration helps identify what services are running and their versions, which is crucial for finding potential vulnerabilities."
        },
        {
          id: 4,
          question: "Which Nmap flag is used for OS detection?",
          options: ["-sV", "-O", "-A", "-sC"],
          correct: 1,
          explanation: "The -O flag enables OS detection in Nmap."
        },
        {
          id: 5,
          question: "What does a closed port mean in Nmap results?",
          options: [
            "The port is open and accepting connections",
            "The port is blocked by a firewall",
            "The port is not listening but is reachable",
            "The port doesn't exist"
          ],
          correct: 2,
          explanation: "A closed port means the port is reachable but there's no application listening on it."
        }
      ]
    },
    webapp: {
      title: "Web Application Security",
      description: "Test your understanding of web application vulnerabilities",
      difficulty: "Advanced",
      xpReward: 150,
      questions: [
        {
          id: 1,
          question: "What is SQL injection?",
          options: [
            "A method to optimize database queries",
            "Inserting malicious SQL code into application queries",
            "A way to backup databases",
            "A database encryption technique"
          ],
          correct: 1,
          explanation: "SQL injection involves inserting malicious SQL code into application input to manipulate database queries."
        },
        {
          id: 2,
          question: "Which header helps prevent XSS attacks?",
          options: [
            "Content-Security-Policy",
            "X-Forwarded-For",
            "User-Agent",
            "Accept-Language"
          ],
          correct: 0,
          explanation: "Content-Security-Policy (CSP) header helps prevent XSS attacks by controlling which resources can be loaded."
        },
        {
          id: 3,
          question: "What does CSRF stand for?",
          options: [
            "Cross-Site Request Forgery",
            "Computer Security Response Framework",
            "Centralized Security Risk Factor",
            "Client-Side Request Filtering"
          ],
          correct: 0,
          explanation: "CSRF stands for Cross-Site Request Forgery, an attack that forces users to execute unwanted actions."
        }
      ]
    }
  };

  const currentQuizData = quizzes[currentQuiz as keyof typeof quizzes];
  const question = currentQuizData.questions[currentQuestion];
  const isLastQuestion = currentQuestion === currentQuizData.questions.length - 1;

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
    setShowResult(true);
    
    if (answerIndex === question.correct) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    setAnsweredQuestions(prev => [...prev, question.id]);
    
    if (isLastQuestion) {
      // Quiz completed
      const finalScore = score + (selectedAnswer === question.correct ? 1 : 0);
      const percentage = (finalScore / currentQuizData.questions.length) * 100;
      const xpEarned = Math.floor((percentage / 100) * currentQuizData.xpReward);
      onXPGain(xpEarned);
    } else {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions([]);
  };

  const switchQuiz = (quizType: string) => {
    setCurrentQuiz(quizType);
    resetQuiz();
  };

  const progress = ((currentQuestion + (showResult ? 1 : 0)) / currentQuizData.questions.length) * 100;
  const isQuizCompleted = answeredQuestions.length === currentQuizData.questions.length && showResult;

  return (
    <div className="space-y-6 pb-20">
      {/* Quiz Selection */}
      <div className="grid grid-cols-1 gap-4">
        {Object.entries(quizzes).map(([key, quiz]) => (
          <Card 
            key={key}
            className={`border-green-500/30 cursor-pointer transition-all duration-200 ${
              currentQuiz === key 
                ? 'border-green-400 glow-green bg-green-400/5' 
                : 'hover:border-green-400'
            }`}
            onClick={() => switchQuiz(key)}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-400 terminal-font">{quiz.title}</CardTitle>
                <Badge className="bg-green-600 text-black">{quiz.xpReward} XP</Badge>
              </div>
              <CardDescription className="text-green-300">
                {quiz.description}
              </CardDescription>
              <Badge variant="outline" className="text-green-400 border-green-500 w-fit">
                {quiz.difficulty}
              </Badge>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Quiz Progress */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 terminal-font">
            {currentQuizData.title} - Question {currentQuestion + 1}/{currentQuizData.questions.length}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      {/* Quiz Completed */}
      {isQuizCompleted && (
        <Card className="border-green-500/30 glow-green">
          <CardHeader>
            <CardTitle className="text-green-400 terminal-font flex items-center">
              <Trophy className="mr-2 h-6 w-6" />
              Quiz Completed!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 terminal-font mb-2">
                {score}/{currentQuizData.questions.length}
              </div>
              <p className="text-green-300">
                Score: {((score / currentQuizData.questions.length) * 100).toFixed(0)}%
              </p>
            </div>
            <Button 
              onClick={resetQuiz}
              className="w-full bg-green-600 hover:bg-green-700 text-black font-bold"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Current Question */}
      {!isQuizCompleted && (
        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 terminal-font">
              {question.question}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && handleAnswerSelect(index)}
                  disabled={showResult}
                  className={`w-full p-4 text-left rounded border transition-all duration-200 ${
                    showResult
                      ? index === question.correct
                        ? 'border-green-500 bg-green-400/20 text-green-400'
                        : index === selectedAnswer && index !== question.correct
                        ? 'border-red-500 bg-red-400/20 text-red-400'
                        : 'border-green-500/30 text-green-300'
                      : selectedAnswer === index
                      ? 'border-green-400 bg-green-400/10 text-green-400'
                      : 'border-green-500/30 text-green-300 hover:border-green-400 hover:bg-green-400/5'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{option}</span>
                    {showResult && index === question.correct && (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    )}
                    {showResult && index === selectedAnswer && index !== question.correct && (
                      <XCircle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {showResult && (
              <div className="space-y-3">
                <div className="bg-secondary/50 p-4 rounded border border-green-500/30">
                  <p className="text-green-400 terminal-font font-medium mb-2">Explanation:</p>
                  <p className="text-green-300">{question.explanation}</p>
                </div>
                
                <Button 
                  onClick={nextQuestion}
                  className="w-full bg-green-600 hover:bg-green-700 text-black font-bold"
                >
                  {isLastQuestion ? 'Complete Quiz' : 'Next Question →'}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default QuizSection;
