
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Book, CheckCircle, Code, Terminal } from 'lucide-react';
import LessonContent from './LessonContent';

interface Lesson {
  id: number;
  title: string;
  type: 'video' | 'reading' | 'practical';
  duration: string;
  completed: boolean;
  content: string;
  commands?: string[];
  tips?: string[];
  objectives?: string[];
}

interface TutorialSectionProps {
  moduleId: number;
}

const TutorialSection: React.FC<TutorialSectionProps> = ({ moduleId }) => {
  const [currentLesson, setCurrentLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([1, 2]);

  const moduleLessons: Record<number, Lesson[]> = {
    1: [
      {
        id: 1,
        title: "What is Ethical Hacking?",
        type: "video",
        duration: "15 min",
        completed: true,
        content: "Ethical hacking, also known as penetration testing or white-hat hacking, is the practice of intentionally probing systems for vulnerabilities in order to improve security.\n\nUnlike malicious hackers (black-hats), ethical hackers work with permission from system owners to identify and fix security weaknesses before they can be exploited by cybercriminals.\n\nEthical hackers follow a strict code of conduct and work within legal boundaries to help organizations protect their digital assets.",
        objectives: [
          "Understand the difference between ethical and malicious hacking",
          "Learn about the legal framework surrounding penetration testing",
          "Explore career opportunities in cybersecurity",
          "Understand the importance of authorization and permission"
        ],
        tips: [
          "Always get written permission before testing any system",
          "Document everything you do during testing",
          "Never access data you don't need for the test",
          "Report vulnerabilities responsibly"
        ]
      },
      {
        id: 2,
        title: "Types of Hackers",
        type: "reading",
        duration: "10 min",
        completed: true,
        content: "The hacking community is diverse, with different motivations and methods:\n\n**White Hat Hackers (Ethical Hackers)**\n- Work legally to improve security\n- Often employed by companies or work as consultants\n- Focus on defensive security measures\n\n**Black Hat Hackers (Malicious Hackers)**\n- Break into systems illegally for personal gain\n- Cause damage, steal data, or disrupt services\n- Face legal consequences for their actions\n\n**Gray Hat Hackers**\n- Operate in a legal gray area\n- May find vulnerabilities without permission but report them\n- Not necessarily malicious but not fully ethical either\n\n**Script Kiddies**\n- Use existing tools and scripts without understanding them\n- Often motivated by curiosity or showing off\n- Generally lack advanced technical skills\n\n**Hacktivists**\n- Use hacking skills to promote political or social causes\n- May target organizations they disagree with\n- Operate in legal gray areas",
        objectives: [
          "Distinguish between different types of hackers",
          "Understand motivations behind different hacking activities",
          "Learn about the legal implications of different approaches"
        ]
      },
      {
        id: 3,
        title: "Legal Framework and Ethics",
        type: "reading",
        duration: "20 min",
        completed: false,
        content: "Understanding the legal landscape is crucial for ethical hackers:\n\n**Key Legislation:**\n\n**Computer Fraud and Abuse Act (CFAA) - USA**\n- Federal law that criminalizes unauthorized computer access\n- Applies to government computers, financial institutions, and interstate commerce\n- Penalties can include fines and imprisonment\n\n**General Data Protection Regulation (GDPR) - EU**\n- Protects personal data of EU citizens\n- Requires organizations to report data breaches\n- Imposes heavy fines for non-compliance\n\n**Ethical Guidelines:**\n\n1. **Authorization**: Always get explicit written permission\n2. **Scope**: Stay within the agreed-upon testing boundaries\n3. **Confidentiality**: Protect sensitive information discovered\n4. **Disclosure**: Report vulnerabilities responsibly\n5. **No Harm**: Avoid disrupting business operations\n\n**Professional Certifications:**\n- CEH (Certified Ethical Hacker)\n- CISSP (Certified Information Systems Security Professional)\n- OSCP (Offensive Security Certified Professional)\n- GPEN (GIAC Penetration Tester)",
        objectives: [
          "Understand key cybersecurity laws and regulations",
          "Learn about professional ethical guidelines",
          "Explore certification pathways in ethical hacking"
        ]
      }
    ],
    2: [
      {
        id: 1,
        title: "Introduction to Linux",
        type: "video",
        duration: "20 min",
        completed: false,
        content: "Linux is the foundation of Kali Linux and most cybersecurity tools. Understanding Linux basics is essential for ethical hackers.\n\nLinux is an open-source operating system kernel that forms the basis of many distributions. It's preferred in cybersecurity because:\n\n• Open source - You can examine and modify the code\n• Stability - Runs reliably for long periods\n• Security - Built with security in mind from the ground up\n• Flexibility - Highly customizable for specific needs\n• Community - Large community of developers and users",
        objectives: [
          "Understand what Linux is and why it's used in cybersecurity",
          "Learn about different Linux distributions",
          "Understand the relationship between Linux and Kali Linux"
        ]
      },
      {
        id: 2,
        title: "Essential Linux Commands",
        type: "practical",
        duration: "30 min",
        completed: false,
        content: "Master these fundamental Linux commands that you'll use daily in cybersecurity work:",
        commands: [
          "ls -la",
          "cd /home/user",
          "pwd",
          "mkdir test_directory",
          "touch newfile.txt",
          "cp file1.txt file2.txt",
          "mv oldname.txt newname.txt",
          "rm unwanted_file.txt",
          "chmod 755 script.sh",
          "sudo apt update"
        ],
        objectives: [
          "Navigate the Linux file system efficiently",
          "Create, copy, move, and delete files and directories",
          "Understand file permissions and how to modify them",
          "Use sudo for administrative tasks"
        ]
      }
    ],
    3: [
      {
        id: 1,
        title: "Introduction to Network Reconnaissance",
        type: "video",
        duration: "15 min",
        completed: true,
        content: "Network reconnaissance is the first phase of ethical hacking where we gather information about target systems and networks.\n\nThis phase involves:\n• Passive reconnaissance - Gathering information without directly interacting with the target\n• Active reconnaissance - Directly probing the target system\n• Information gathering about network topology, services, and potential vulnerabilities\n\nReconnaissance is crucial because it helps us understand the attack surface and plan our testing approach.",
        objectives: [
          "Understand the importance of reconnaissance in ethical hacking",
          "Differentiate between passive and active reconnaissance",
          "Learn about information gathering techniques"
        ]
      },
      {
        id: 2,
        title: "Understanding Network Protocols",
        type: "reading",
        duration: "10 min",
        completed: true,
        content: "Network protocols are the rules that govern communication between devices on a network.\n\n**TCP/IP Stack:**\n\n**Application Layer (Layer 7)**\n- HTTP, HTTPS, FTP, SSH, DNS, SMTP\n- Where applications interact with the network\n\n**Transport Layer (Layer 4)**\n- TCP (reliable, connection-oriented)\n- UDP (unreliable, connectionless)\n- Handles data transmission between hosts\n\n**Network Layer (Layer 3)**\n- IP (Internet Protocol)\n- Handles routing between networks\n\n**Data Link Layer (Layer 2)**\n- Ethernet, Wi-Fi\n- Handles communication within a network segment\n\n**Physical Layer (Layer 1)**\n- Cables, radio waves, fiber optic\n- The actual physical transmission medium",
        objectives: [
          "Understand the TCP/IP protocol stack",
          "Learn about common network protocols",
          "Understand how data flows through network layers"
        ]
      },
      {
        id: 3,
        title: "Installing and Using Nmap",
        type: "practical",
        duration: "20 min",
        completed: false,
        content: "Nmap (Network Mapper) is the most popular network discovery and security auditing tool. It's essential for reconnaissance.",
        commands: [
          "nmap --version",
          "nmap 192.168.1.1",
          "nmap -sn 192.168.1.0/24",
          "nmap -p 80,443 192.168.1.1",
          "nmap -sS 192.168.1.1",
          "nmap -sV 192.168.1.1",
          "nmap -O 192.168.1.1",
          "nmap -A 192.168.1.1"
        ],
        objectives: [
          "Install and verify Nmap installation",
          "Perform basic host discovery scans",
          "Scan specific ports and services",
          "Use different scan types for various purposes"
        ]
      }
    ],
    4: [
      {
        id: 1,
        title: "Web Application Architecture",
        type: "video",
        duration: "20 min",
        completed: false,
        content: "Understanding web application architecture is crucial for identifying security vulnerabilities.\n\n**Client-Server Model:**\n- Client (browser) sends requests\n- Server processes requests and sends responses\n- Database stores and retrieves data\n\n**Common Components:**\n- Frontend (HTML, CSS, JavaScript)\n- Backend (server-side code)\n- Database (stores application data)\n- Web server (Apache, Nginx)\n- Application server (handles business logic)\n\n**Common Vulnerabilities arise from:**\n- Insufficient input validation\n- Poor authentication mechanisms\n- Inadequate authorization controls\n- Improper error handling\n- Insecure data storage",
        objectives: [
          "Understand how web applications work",
          "Learn about different application components",
          "Identify common areas where vulnerabilities occur"
        ]
      },
      {
        id: 2,
        title: "OWASP Top 10 Overview",
        type: "reading",
        duration: "15 min",
        completed: false,
        content: "The OWASP Top 10 represents the most critical web application security risks:\n\n**1. Broken Access Control**\n- Users can access unauthorized functionality or data\n- Example: Viewing someone else's account by changing URL parameters\n\n**2. Cryptographic Failures**\n- Sensitive data transmitted or stored without proper encryption\n- Example: Passwords stored in plain text\n\n**3. Injection**\n- Untrusted data sent to interpreters as part of commands\n- Example: SQL injection, command injection\n\n**4. Insecure Design**\n- Flaws in the application's design and architecture\n- Example: Missing security controls in the design phase\n\n**5. Security Misconfiguration**\n- Incomplete or ad-hoc configurations\n- Example: Default passwords, unnecessary features enabled\n\n**6. Vulnerable and Outdated Components**\n- Using components with known vulnerabilities\n- Example: Outdated libraries or frameworks\n\n**7. Identification and Authentication Failures**\n- Broken authentication and session management\n- Example: Weak passwords, session hijacking\n\n**8. Software and Data Integrity Failures**\n- Code and infrastructure that don't protect against integrity violations\n- Example: Using untrusted sources for updates\n\n**9. Security Logging and Monitoring Failures**\n- Insufficient logging and monitoring\n- Example: Not detecting ongoing attacks\n\n**10. Server-Side Request Forgery (SSRF)**\n- Application fetches remote resources without validating URLs\n- Example: Accessing internal services through the application",
        objectives: [
          "Understand the most common web application vulnerabilities",
          "Learn how each vulnerability can be exploited",
          "Understand the impact of these vulnerabilities"
        ]
      },
      {
        id: 3,
        title: "SQL Injection Fundamentals",
        type: "practical",
        duration: "35 min",
        completed: false,
        content: "SQL injection occurs when user input is incorrectly filtered for string literal escape characters or user input is not strongly typed.",
        commands: [
          "sqlmap --version",
          "sqlmap -u 'http://testsite.com/page.php?id=1' --dbs",
          "sqlmap -u 'http://testsite.com/page.php?id=1' -D database_name --tables",
          "sqlmap -u 'http://testsite.com/page.php?id=1' -D database_name -T table_name --columns",
          "sqlmap -u 'http://testsite.com/page.php?id=1' -D database_name -T table_name --dump"
        ],
        objectives: [
          "Understand how SQL injection vulnerabilities occur",
          "Learn to identify potential injection points",
          "Practice using SQLMap for automated testing",
          "Understand the impact of successful SQL injection"
        ],
        tips: [
          "Always test on systems you own or have permission to test",
          "Start with manual testing before using automated tools",
          "Understand the underlying SQL queries being executed",
          "Learn both time-based and error-based injection techniques"
        ]
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
    <div className="space-y-6 pb-20">
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
            {/* Lesson Content */}
            <LessonContent lesson={lesson} />

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
