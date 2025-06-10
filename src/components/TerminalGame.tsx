
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Terminal, CheckCircle, XCircle } from 'lucide-react';

interface Task {
  id: number;
  title: string;
  description: string;
  command: string;
  hint: string;
  xp: number;
}

interface TerminalGameProps {
  onXPGain: (xp: number) => void;
}

const TerminalGame: React.FC<TerminalGameProps> = ({ onXPGain }) => {
  const [currentTask, setCurrentTask] = useState(0);
  const [terminalHistory, setTerminalHistory] = useState<Array<{input: string, output: string, isError?: boolean}>>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const terminalRef = useRef<HTMLDivElement>(null);

  const tasks: Task[] = [
    {
      id: 1,
      title: "Network Discovery",
      description: "Scan the local network to discover active hosts",
      command: "nmap -sn 192.168.1.0/24",
      hint: "Use nmap with the -sn flag for ping scan",
      xp: 50
    },
    {
      id: 2,
      title: "Port Scanning",
      description: "Perform a TCP port scan on a target host",
      command: "nmap -sT 192.168.1.1",
      hint: "Use nmap with -sT flag for TCP connect scan",
      xp: 75
    },
    {
      id: 3,
      title: "Service Detection",
      description: "Detect services and versions running on open ports",
      command: "nmap -sV 192.168.1.1",
      hint: "Use the -sV flag to detect service versions",
      xp: 100
    },
    {
      id: 4,
      title: "Directory Enumeration",
      description: "Use dirb to enumerate web directories",
      command: "dirb http://target.com",
      hint: "Use dirb followed by the target URL",
      xp: 125
    },
    {
      id: 5,
      title: "Password Cracking",
      description: "Use hydra for SSH brute force attack",
      command: "hydra -l admin -P /usr/share/wordlists/rockyou.txt ssh://192.168.1.1",
      hint: "Use hydra with -l for username and -P for password list",
      xp: 150
    }
  ];

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const simulateCommand = (command: string): string => {
    const cmd = command.toLowerCase().trim();
    
    // Simulate nmap commands
    if (cmd.includes('nmap')) {
      if (cmd.includes('-sn')) {
        return `Starting Nmap scan...
Host is up (0.001s latency).
192.168.1.1 - Router
192.168.1.10 - Desktop PC
192.168.1.15 - Mobile Device
Nmap done: 254 IP addresses scanned`;
      } else if (cmd.includes('-st')) {
        return `Starting Nmap TCP scan...
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https`;
      } else if (cmd.includes('-sv')) {
        return `Starting Nmap service detection...
PORT     STATE SERVICE VERSION
22/tcp   open  ssh     OpenSSH 7.4
80/tcp   open  http    Apache 2.4.6
443/tcp  open  https   Apache 2.4.6`;
      }
    }

    // Simulate dirb command
    if (cmd.includes('dirb')) {
      return `DIRB v2.22
---- Scanning URL: http://target.com/ ----
+ http://target.com/admin (CODE:200|SIZE:1234)
+ http://target.com/config (CODE:403|SIZE:287)
+ http://target.com/login (CODE:200|SIZE:2456)
---- Scan finished ----`;
    }

    // Simulate hydra command
    if (cmd.includes('hydra')) {
      return `Hydra v9.1 starting...
[22][ssh] host: 192.168.1.1   login: admin   password: password123
1 of 1 target successfully completed, 1 valid password found`;
    }

    // Default commands
    if (cmd === 'ls') {
      return 'Desktop Documents Downloads Pictures';
    } else if (cmd === 'pwd') {
      return '/home/kali';
    } else if (cmd === 'whoami') {
      return 'kali';
    } else if (cmd.startsWith('cd')) {
      return '';
    } else if (cmd === 'clear') {
      return 'CLEAR';
    }

    return `Command not found: ${command}`;
  };

  const handleCommand = () => {
    if (!currentInput.trim()) return;

    const output = simulateCommand(currentInput);
    
    if (output === 'CLEAR') {
      setTerminalHistory([]);
    } else {
      setTerminalHistory(prev => [...prev, { input: currentInput, output }]);
    }

    // Check if command matches current task
    const task = tasks[currentTask];
    if (task && currentInput.toLowerCase().trim() === task.command.toLowerCase()) {
      setCompletedTasks(prev => [...prev, task.id]);
      setTerminalHistory(prev => [...prev, { 
        input: '✅ TASK COMPLETED!', 
        output: `Great job! You earned ${task.xp} XP. Type 'next' to continue to the next task.` 
      }]);
      onXPGain(task.xp);
    }

    setCurrentInput('');
  };

  const nextTask = () => {
    if (currentTask < tasks.length - 1) {
      setCurrentTask(prev => prev + 1);
      setTerminalHistory(prev => [...prev, { 
        input: 'next', 
        output: `Starting new task: ${tasks[currentTask + 1].title}` 
      }]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      if (currentInput.toLowerCase().trim() === 'next' && completedTasks.includes(tasks[currentTask].id)) {
        nextTask();
        setCurrentInput('');
      } else {
        handleCommand();
      }
    }
  };

  const task = tasks[currentTask];

  return (
    <div className="space-y-6 pb-20">
      {/* Current Task */}
      <Card className="border-green-500/30 glow-green">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-green-400 terminal-font flex items-center">
              <Terminal className="mr-2 h-5 w-5" />
              {task.title}
            </CardTitle>
            <Badge variant="outline" className="text-green-400 border-green-500">
              {task.xp} XP
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-green-300 mb-3">{task.description}</p>
          <div className="bg-secondary/50 p-3 rounded border border-green-500/30">
            <p className="text-sm text-green-400 terminal-font">💡 Hint: {task.hint}</p>
          </div>
        </CardContent>
      </Card>

      {/* Terminal */}
      <Card className="border-green-500/30 bg-black/90">
        <CardHeader>
          <CardTitle className="text-green-400 terminal-font text-sm">
            kali@academy:~$ Terminal
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            ref={terminalRef}
            className="bg-black p-4 rounded border border-green-500/30 h-64 overflow-y-auto terminal-font text-sm"
          >
            {/* Welcome message */}
            <div className="text-green-400 mb-2">
              Welcome to Kali Linux Terminal Simulator
            </div>
            <div className="text-green-300 mb-4">
              Type commands to complete your tasks. Use 'clear' to clear the terminal.
            </div>

            {/* Terminal history */}
            {terminalHistory.map((entry, index) => (
              <div key={index} className="mb-2">
                <div className="text-green-400">
                  kali@academy:~$ {entry.input}
                </div>
                <div className={`${entry.isError ? 'text-red-400' : 'text-green-300'} whitespace-pre-line`}>
                  {entry.output}
                </div>
              </div>
            ))}

            {/* Current input line */}
            <div className="flex items-center text-green-400">
              <span>kali@academy:~$ </span>
              <Input
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                onKeyPress={handleKeyPress}
                className="bg-transparent border-none text-green-400 terminal-font focus:ring-0 p-0 h-auto"
                placeholder="Enter command..."
                autoFocus
              />
              <span className="terminal-cursor"></span>
            </div>
          </div>

          <div className="mt-4 flex space-x-2">
            <Button 
              onClick={handleCommand}
              className="bg-green-600 hover:bg-green-700 text-black"
            >
              Execute
            </Button>
            <Button 
              onClick={() => setTerminalHistory([])}
              variant="outline"
              className="border-green-500 text-green-400 hover:bg-green-400/10"
            >
              Clear
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Task Progress */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 terminal-font">Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-2">
            {tasks.map((t, index) => (
              <div key={t.id} className="flex items-center justify-between p-2 rounded border border-green-500/20">
                <span className={`${index <= currentTask ? 'text-green-400' : 'text-gray-500'} terminal-font`}>
                  {t.title}
                </span>
                {completedTasks.includes(t.id) ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : index === currentTask ? (
                  <Badge variant="outline" className="text-green-400 border-green-500">Current</Badge>
                ) : (
                  <XCircle className="h-5 w-5 text-gray-500" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TerminalGame;
