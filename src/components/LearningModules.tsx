import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Book, Play, Lock, CheckCircle, Code, Shield, Wifi, Search, Bug, Key, Globe, Database, Crown } from 'lucide-react';
import TutorialSection from './TutorialSection';
import PaymentModal from './PaymentModal';

interface Module {
  id: number;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  lessons: number;
  completed: boolean;
  locked: boolean;
  topics: string[];
  icon: React.ElementType;
  category: 'fundamentals' | 'tools' | 'techniques' | 'specialization';
  isPremium?: boolean;
  price?: number;
}

const LearningModules = () => {
  const [selectedModule, setSelectedModule] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [paymentModal, setPaymentModal] = useState<{ isOpen: boolean; module: Module | null }>({
    isOpen: false,
    module: null
  });
  const [purchasedModules, setPurchasedModules] = useState<Set<number>>(new Set([1, 2])); // Free modules

  const modules: Module[] = [
    // Free Fundamentals
    {
      id: 1,
      title: "Introduction to Ethical Hacking",
      description: "Learn the fundamentals of ethical hacking and cybersecurity principles",
      difficulty: "Beginner",
      duration: "2 hours",
      lessons: 8,
      completed: true,
      locked: false,
      topics: ["Ethics", "Legal Framework", "Types of Hackers", "Methodology"],
      icon: Shield,
      category: 'fundamentals'
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
      topics: ["Linux Commands", "File System", "Package Management", "Tool Installation"],
      icon: Code,
      category: 'fundamentals'
    },
    
    // Premium Techniques
    {
      id: 3,
      title: "Network Reconnaissance",
      description: "Learn information gathering and network scanning techniques",
      difficulty: "Intermediate",
      duration: "4 hours",
      lessons: 15,
      completed: false,
      locked: false,
      topics: ["Nmap", "Netdiscover", "Port Scanning", "Service Enumeration"],
      icon: Search,
      category: 'techniques',
      isPremium: true,
      price: 299
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
      topics: ["SQL Injection", "XSS", "CSRF", "Directory Traversal"],
      icon: Globe,
      category: 'techniques',
      isPremium: true,
      price: 399
    },
    {
      id: 5,
      title: "Vulnerability Assessment",
      description: "Learn to identify and assess security vulnerabilities",
      difficulty: "Intermediate",
      duration: "4 hours",
      lessons: 16,
      completed: false,
      locked: false,
      topics: ["OpenVAS", "Nessus", "Vulnerability Databases", "Risk Assessment"],
      icon: Bug,
      category: 'techniques',
      isPremium: true,
      price: 349
    },
    
    // Premium Advanced Tools
    {
      id: 6,
      title: "Wireless Security",
      description: "Understand wireless network security and attack methods",
      difficulty: "Advanced",
      duration: "4 hours",
      lessons: 14,
      completed: false,
      locked: false,
      topics: ["WEP/WPA", "Aircrack-ng", "Evil Twin", "Deauth Attacks"],
      icon: Wifi,
      category: 'specialization',
      isPremium: true,
      price: 499
    },
    {
      id: 7,
      title: "Metasploit Framework",
      description: "Master the world's most popular penetration testing framework",
      difficulty: "Advanced",
      duration: "6 hours",
      lessons: 20,
      completed: false,
      locked: false,
      topics: ["Msfconsole", "Payloads", "Encoders", "Post-Exploitation"],
      icon: Code,
      category: 'tools',
      isPremium: true,
      price: 599
    },
    {
      id: 8,
      title: "Cryptography & Password Security",
      description: "Learn about encryption, hashing, and password cracking",
      difficulty: "Advanced",
      duration: "5 hours",
      lessons: 17,
      completed: false,
      locked: false,
      topics: ["Hash Cracking", "John the Ripper", "Hashcat", "Rainbow Tables"],
      icon: Key,
      category: 'specialization',
      isPremium: true,
      price: 449
    },
    
    // Premium Expert Level
    {
      id: 9,
      title: "Social Engineering",
      description: "Understand psychological manipulation techniques in cybersecurity",
      difficulty: "Expert",
      duration: "3 hours",
      lessons: 12,
      completed: false,
      locked: false,
      topics: ["Phishing", "Pretexting", "Physical Security", "OSINT"],
      icon: Shield,
      category: 'specialization',
      isPremium: true,
      price: 699
    },
    {
      id: 10,
      title: "Digital Forensics",
      description: "Learn to investigate and analyze digital evidence",
      difficulty: "Expert",
      duration: "6 hours",
      lessons: 22,
      completed: false,
      locked: false,
      topics: ["File Recovery", "Memory Analysis", "Network Forensics", "Mobile Forensics"],
      icon: Search,
      category: 'specialization',
      isPremium: true,
      price: 799
    },
    {
      id: 11,
      title: "Advanced Persistent Threats",
      description: "Study sophisticated attack campaigns and defense strategies",
      difficulty: "Expert",
      duration: "7 hours",
      lessons: 25,
      completed: false,
      locked: false,
      topics: ["APT Tactics", "Threat Hunting", "Incident Response", "Malware Analysis"],
      icon: Bug,
      category: 'specialization',
      isPremium: true,
      price: 899
    },
    {
      id: 12,
      title: "Database Security",
      description: "Master database penetration testing and security assessment",
      difficulty: "Advanced",
      duration: "4 hours",
      lessons: 16,
      completed: false,
      locked: false,
      topics: ["SQL Server", "MySQL", "Oracle", "NoSQL Security"],
      icon: Database,
      category: 'techniques',
      isPremium: true,
      price: 549
    }
  ];

  const categories = [
    { id: 'all', name: 'All Modules', count: modules.length },
    { id: 'fundamentals', name: 'Fundamentals', count: modules.filter(m => m.category === 'fundamentals').length },
    { id: 'tools', name: 'Tools', count: modules.filter(m => m.category === 'tools').length },
    { id: 'techniques', name: 'Techniques', count: modules.filter(m => m.category === 'techniques').length },
    { id: 'specialization', name: 'Specialization', count: modules.filter(m => m.category === 'specialization').length }
  ];

  const filteredModules = selectedCategory === 'all' 
    ? modules 
    : modules.filter(module => module.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-600 text-black';
      case 'Intermediate': return 'bg-yellow-600 text-black';
      case 'Advanced': return 'bg-orange-600 text-white';
      case 'Expert': return 'bg-red-600 text-white';
      default: return 'bg-gray-600 text-white';
    }
  };

  const completedModules = modules.filter(m => m.completed).length;
  const availableModules = modules.filter(m => !m.completed && (!m.isPremium || purchasedModules.has(m.id))).length;
  const premiumModules = modules.filter(m => m.isPremium && !purchasedModules.has(m.id)).length;
  const overallProgress = (completedModules / modules.length) * 100;

  const handleModuleAccess = (module: Module) => {
    if (module.isPremium && !purchasedModules.has(module.id)) {
      setPaymentModal({ isOpen: true, module });
    } else {
      setSelectedModule(module.id);
    }
  };

  const handlePaymentSuccess = () => {
    if (paymentModal.module) {
      setPurchasedModules(prev => new Set([...prev, paymentModal.module!.id]));
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
                <span className="text-green-400">{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-xl font-bold text-green-400 terminal-font">{completedModules}</div>
                <div className="text-sm text-green-300">Completed</div>
              </div>
              <div>
                <div className="text-xl font-bold text-green-400 terminal-font">{availableModules}</div>
                <div className="text-sm text-green-300">Available</div>
              </div>
              <div>
                <div className="text-xl font-bold text-yellow-400 terminal-font">{premiumModules}</div>
                <div className="text-sm text-yellow-300">Premium</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 terminal-font">Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id 
                  ? "bg-green-600 hover:bg-green-700 text-black" 
                  : "border-green-500 text-green-400 hover:bg-green-400/10"
                }
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Learning Path Recommendations */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 terminal-font">Recommended Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-green-300">
              <span className="w-6 h-6 bg-green-600 text-black rounded-full flex items-center justify-center mr-3 text-xs font-bold">1</span>
              Start with <span className="text-green-400 mx-1 font-semibold">Fundamentals</span> - Free modules to build your foundation
            </div>
            <div className="flex items-center text-green-300">
              <span className="w-6 h-6 bg-yellow-600 text-black rounded-full flex items-center justify-center mr-3 text-xs font-bold">2</span>
              Learn <span className="text-green-400 mx-1 font-semibold">Techniques</span> - Premium modules for advanced skills
            </div>
            <div className="flex items-center text-green-300">
              <span className="w-6 h-6 bg-orange-600 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">3</span>
              Master <span className="text-green-400 mx-1 font-semibold">Tools</span> - Professional-grade frameworks
            </div>
            <div className="flex items-center text-green-300">
              <span className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center mr-3 text-xs font-bold">4</span>
              Specialize in <span className="text-green-400 mx-1 font-semibold">Advanced Topics</span> - Expert-level content
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules Grid */}
      <div className="grid gap-4">
        {filteredModules.map((module) => {
          const IconComponent = module.icon;
          const isPurchased = !module.isPremium || purchasedModules.has(module.id);
          
          return (
            <Card 
              key={module.id} 
              className={`border-green-500/30 transition-all duration-200 ${
                !isPurchased 
                  ? 'border-yellow-500/50 hover:border-yellow-400 hover:glow-yellow cursor-pointer' 
                  : 'hover:border-green-400 hover:glow-green cursor-pointer'
              }`}
              onClick={() => handleModuleAccess(module)}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <IconComponent className="h-6 w-6 text-green-400" />
                      <CardTitle className="text-green-400 terminal-font text-lg">
                        {module.title}
                      </CardTitle>
                      {module.completed && <CheckCircle className="h-5 w-5 text-green-400" />}
                      {module.isPremium && !isPurchased && <Crown className="h-5 w-5 text-yellow-400" />}
                    </div>
                    <div className="flex items-center space-x-2 flex-wrap">
                      <Badge className={getDifficultyColor(module.difficulty)}>
                        {module.difficulty}
                      </Badge>
                      <Badge variant="outline" className="text-green-400 border-green-500">
                        {module.duration}
                      </Badge>
                      <Badge variant="outline" className="text-green-400 border-green-500">
                        {module.lessons} lessons
                      </Badge>
                      <Badge variant="outline" className="text-blue-400 border-blue-500 capitalize">
                        {module.category}
                      </Badge>
                      {module.isPremium && (
                        <Badge className="bg-yellow-600 text-black">
                          {isPurchased ? 'PURCHASED' : `₹${module.price}`}
                        </Badge>
                      )}
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
                  
                  <Button 
                    className={`w-full font-bold ${
                      isPurchased 
                        ? 'bg-green-600 hover:bg-green-700 text-black'
                        : 'bg-yellow-600 hover:bg-yellow-700 text-black'
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleModuleAccess(module);
                    }}
                  >
                    {isPurchased ? (
                      <>
                        <Book className="mr-2 h-4 w-4" />
                        {module.completed ? 'Review Module' : 'Start Learning'}
                      </>
                    ) : (
                      <>
                        <Crown className="mr-2 h-4 w-4" />
                        Unlock for ₹{module.price}
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal({ isOpen: false, module: null })}
        moduleTitle={paymentModal.module?.title || ''}
        price={paymentModal.module?.price || 0}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default LearningModules;
