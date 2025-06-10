
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
  const [purchasedModules, setPurchasedModules] = useState<Set<number>>(new Set([1, 2, 3, 4, 5, 6])); // First 6 modules are free

  const modules: Module[] = [
    // FREE MODULES (1-6)
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
    {
      id: 3,
      title: "Cybersecurity Fundamentals",
      description: "Understanding core cybersecurity concepts and terminology",
      difficulty: "Beginner",
      duration: "2.5 hours",
      lessons: 10,
      completed: false,
      locked: false,
      topics: ["CIA Triad", "Risk Assessment", "Threats & Vulnerabilities", "Security Controls"],
      icon: Shield,
      category: 'fundamentals'
    },
    {
      id: 4,
      title: "Information Gathering Basics",
      description: "Learn passive reconnaissance and OSINT techniques",
      difficulty: "Beginner",
      duration: "3 hours",
      lessons: 12,
      completed: false,
      locked: false,
      topics: ["Google Dorking", "WHOIS", "DNS Enumeration", "Social Media OSINT"],
      icon: Search,
      category: 'fundamentals'
    },
    {
      id: 5,
      title: "Network Fundamentals",
      description: "Understanding network protocols and basic networking concepts",
      difficulty: "Beginner",
      duration: "3.5 hours",
      lessons: 14,
      completed: false,
      locked: false,
      topics: ["TCP/IP", "OSI Model", "Network Devices", "Subnetting"],
      icon: Globe,
      category: 'fundamentals'
    },
    {
      id: 6,
      title: "Basic Vulnerability Assessment",
      description: "Introduction to identifying common security vulnerabilities",
      difficulty: "Beginner",
      duration: "3 hours",
      lessons: 11,
      completed: false,
      locked: false,
      topics: ["Vulnerability Types", "CVE Database", "Basic Scanning", "Risk Scoring"],
      icon: Bug,
      category: 'fundamentals'
    },
    
    // PREMIUM MODULES (7-12)
    // 2 Techniques modules
    {
      id: 7,
      title: "Advanced Network Reconnaissance",
      description: "Master advanced information gathering and network scanning techniques",
      difficulty: "Intermediate",
      duration: "4 hours",
      lessons: 15,
      completed: false,
      locked: false,
      topics: ["Nmap Advanced", "Netdiscover", "Masscan", "Service Enumeration"],
      icon: Search,
      category: 'techniques',
      isPremium: true,
      price: 15
    },
    {
      id: 8,
      title: "Web Application Security Testing",
      description: "Discover and exploit vulnerabilities in web applications",
      difficulty: "Intermediate",
      duration: "5 hours",
      lessons: 18,
      completed: false,
      locked: false,
      topics: ["SQL Injection", "XSS", "CSRF", "Directory Traversal", "OWASP Top 10"],
      icon: Globe,
      category: 'techniques',
      isPremium: true,
      price: 50
    },
    
    // 1 Tools module
    {
      id: 9,
      title: "Metasploit Framework Mastery",
      description: "Master the world's most popular penetration testing framework",
      difficulty: "Advanced",
      duration: "6 hours",
      lessons: 20,
      completed: false,
      locked: false,
      topics: ["Msfconsole", "Payloads", "Encoders", "Post-Exploitation", "Custom Modules"],
      icon: Code,
      category: 'tools',
      isPremium: true,
      price: 100
    },
    
    // 3 Specialization modules
    {
      id: 10,
      title: "Wireless Network Security",
      description: "Advanced wireless network security and attack methodologies",
      difficulty: "Advanced",
      duration: "4 hours",
      lessons: 14,
      completed: false,
      locked: false,
      topics: ["WEP/WPA Cracking", "Aircrack-ng Suite", "Evil Twin Attacks", "Bluetooth Hacking"],
      icon: Wifi,
      category: 'specialization',
      isPremium: true,
      price: 120
    },
    {
      id: 11,
      title: "Digital Forensics & Incident Response",
      description: "Learn to investigate and analyze digital evidence professionally",
      difficulty: "Expert",
      duration: "6 hours",
      lessons: 22,
      completed: false,
      locked: false,
      topics: ["File Recovery", "Memory Analysis", "Network Forensics", "Chain of Custody"],
      icon: Search,
      category: 'specialization',
      isPremium: true,
      price: 150
    },
    {
      id: 12,
      title: "Advanced Persistent Threats & Malware",
      description: "Study sophisticated attack campaigns and advanced malware analysis",
      difficulty: "Expert",
      duration: "7 hours",
      lessons: 25,
      completed: false,
      locked: false,
      topics: ["APT Tactics", "Malware Reverse Engineering", "Threat Hunting", "Attribution"],
      icon: Bug,
      category: 'specialization',
      isPremium: true,
      price: 200
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
          Master ethical hacking through structured lessons - Start with 6 free fundamentals!
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

      {/* Learning Path Information */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400 terminal-font">Learning Path</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="bg-green-400/10 border border-green-500/30 p-3 rounded">
              <div className="flex items-center text-green-300 mb-2">
                <span className="w-6 h-6 bg-green-600 text-black rounded-full flex items-center justify-center mr-3 text-xs font-bold">FREE</span>
                <span className="font-semibold">Fundamentals (Modules 1-6)</span>
              </div>
              <p className="text-sm text-green-300 ml-9">Build your foundation with essential ethical hacking concepts - completely free!</p>
            </div>
            <div className="bg-yellow-400/10 border border-yellow-500/30 p-3 rounded">
              <div className="flex items-center text-yellow-300 mb-2">
                <Crown className="w-5 h-5 mr-2" />
                <span className="font-semibold">Premium Modules (₹15 - ₹200)</span>
              </div>
              <p className="text-sm text-yellow-300">Advanced techniques, professional tools, and specialized skills for serious practitioners</p>
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
                      {module.isPremium ? (
                        <Badge className="bg-yellow-600 text-black">
                          {isPurchased ? 'PURCHASED' : `₹${module.price}`}
                        </Badge>
                      ) : (
                        <Badge className="bg-green-600 text-black">
                          FREE
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
