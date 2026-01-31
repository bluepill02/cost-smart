'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Mic, MicOff, Send, Sparkles, TrendingUp, Calculator, PiggyBank, Home, Bot, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendations?: Recommendation[];
  timestamp: Date;
}

interface Recommendation {
  title: string;
  description: string;
  link: string;
  icon: 'calculator' | 'savings' | 'home' | 'trending';
  category: string;
}

interface FinancialContext {
  income?: number;
  expenses?: number;
  goals?: string[];
  riskTolerance?: 'low' | 'medium' | 'high';
  recentCalculators?: string[];
}

export default function AIFinancialAdvisor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm your AI Financial Advisor. I can help you with budgeting, investments, loans, taxes, and financial planning. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [context, setContext] = useState<FinancialContext>({});
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize Speech Recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleVoiceInput = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const analyzeQuery = (query: string): { intent: string; entities: string[] } => {
    const lowerQuery = query.toLowerCase();
    
    // Intent detection
    let intent = 'general';
    if (lowerQuery.match(/\b(home loan|emi|mortgage|house|property|buy.*home)\b/)) intent = 'home_loan';
    else if (lowerQuery.match(/\b(salary|ctc|in-hand|take.*home|paycheck)\b/)) intent = 'salary';
    else if (lowerQuery.match(/\b(invest|investment|mutual.*fund|sip|stock|equity)\b/)) intent = 'investment';
    else if (lowerQuery.match(/\b(save|saving|fd|fixed.*deposit|ppf)\b/)) intent = 'savings';
    else if (lowerQuery.match(/\b(tax|income.*tax|deduction|80c)\b/)) intent = 'tax';
    else if (lowerQuery.match(/\b(solar|panel|electricity|power|renewable)\b/)) intent = 'solar';
    else if (lowerQuery.match(/\b(retire|retirement|pension|corpus)\b/)) intent = 'retirement';
    else if (lowerQuery.match(/\b(budget|expense|spend)\b/)) intent = 'budget';
    else if (lowerQuery.match(/\b(loan|borrow|debt)\b/)) intent = 'loan';

    // Entity extraction (amounts, percentages, etc.)
    const entities: string[] = [];
    const amountMatches = lowerQuery.match(/₹?(\d+)(k|l|lakhs?|crores?|cr)?/gi);
    if (amountMatches) entities.push(...amountMatches);

    return { intent, entities };
  };

  const generateResponse = (query: string, { intent, entities }: { intent: string; entities: string[] }): {
    content: string;
    recommendations: Recommendation[];
  } => {
    let content = '';
    const recommendations: Recommendation[] = [];

    switch (intent) {
      case 'home_loan':
        content = `For home loan planning, consider these key factors:\n\n• **Down Payment**: Aim for 20% to get better rates (reduces EMI & total interest)\n• **Interest Rate**: Current rates: 8.5-9.5% p.a. (varies by lender & credit score)\n• **Tenure**: 15-20 years balances EMI affordability with total interest\n• **Tax Benefits**: Save up to ₹3.5L/year (₹1.5L principal + ₹2L interest)\n\nTip: Pre-payment can save lakhs in interest!${entities.length > 0 ? `\n\nBased on your mention of ${entities[0]}, ` : ' '}`;
        recommendations.push(
          {
            title: 'Home Loan EMI Calculator',
            description: 'Calculate EMI, total interest, and affordability',
            link: '/home-loan-calculator',
            icon: 'home',
            category: 'Loans',
          },
          {
            title: 'City-Specific EMI',
            description: 'Get property prices for your city',
            link: '/in',
            icon: 'calculator',
            category: 'Location-Based',
          }
        );
        break;

      case 'salary':
        content = `Understanding CTC vs In-hand Salary:\n\n• **CTC (Cost to Company)**: Gross salary including all benefits\n• **In-hand**: What you actually receive (typically 70-80% of CTC)\n• **Deductions**: EPF (12%), Professional Tax (₹200/month), Income Tax\n• **Tax Planning**: Use Section 80C (₹1.5L), HRA, NPS (₹50K) to save taxes\n\nPro Tip: Old vs New tax regime - check which saves you more!`;
        recommendations.push(
          {
            title: 'Salary Calculator',
            description: 'Calculate in-hand from CTC with deductions',
            link: '/salary-calculator',
            icon: 'trending',
            category: 'Income',
          },
          {
            title: 'City Cost of Living',
            description: 'Compare salaries across Indian cities',
            link: '/in/salary-calculator/mumbai',
            icon: 'calculator',
            category: 'Location-Based',
          }
        );
        break;

      case 'investment':
        content = `Smart Investment Strategy:\n\n• **Emergency Fund First**: 6 months expenses in liquid funds\n• **SIP in Equity**: ₹5K-10K/month can build ₹50L+ in 15 years (12% returns)\n• **Asset Allocation**: 60% equity, 30% debt, 10% gold (adjust by age)\n• **Diversification**: Don't put all eggs in one basket\n• **Start Early**: ₹5K/month at 25 > ₹15K/month at 35\n\n${context.riskTolerance ? `Based on your ${context.riskTolerance} risk profile, I recommend ${context.riskTolerance === 'high' ? 'aggressive equity funds' : context.riskTolerance === 'medium' ? 'balanced hybrid funds' : 'conservative debt funds'}.` : 'What\'s your risk tolerance? (low/medium/high)'}`;
        recommendations.push(
          {
            title: 'SIP Calculator',
            description: 'See how regular investments grow over time',
            link: '/in/sip-calculator',
            icon: 'trending',
            category: 'Investments',
          },
          {
            title: 'FD vs Mutual Funds',
            description: 'Compare returns and pick wisely',
            link: '/compare/fd-vs-mutual-fund',
            icon: 'calculator',
            category: 'Comparison',
          }
        );
        break;

      case 'savings':
        content = `Best Savings Options in 2026:\n\n**Safe & Guaranteed:**\n• **PPF**: 7.1% p.a., 15 years, EEE taxation (best for long-term)\n• **FD**: 6.5-7% p.a., flexible tenure, fully taxable\n• **NSC**: 7.7% p.a., 5 years, 80C benefit\n\n**Tax-Saving:**\n• **ELSS**: 12-15% expected, 3-year lock-in, equity exposure\n• **NPS**: Market-linked, extra ₹50K deduction\n\nRule of Thumb: Save 20-30% of monthly income!`;
        recommendations.push(
          {
            title: 'FD Calculator',
            description: 'Calculate fixed deposit returns',
            link: '/fd-calculator',
            icon: 'savings',
            category: 'Savings',
          },
          {
            title: 'PPF Calculator',
            description: 'Long-term tax-free wealth building',
            link: '/in/ppf-calculator',
            icon: 'savings',
            category: 'Savings',
          },
          {
            title: 'PPF vs FD',
            description: 'Which saves you more tax?',
            link: '/compare/ppf-vs-fd',
            icon: 'calculator',
            category: 'Comparison',
          }
        );
        break;

      case 'solar':
        content = `Solar ROI for Indian Homes:\n\n• **Payback**: 3-5 years (with subsidy)\n• **Subsidy**: ₹18,000/kW (up to 3kW)\n• **Savings**: ₹20,000-50,000/year on electricity\n• **Lifespan**: 25 years (minimal maintenance)\n• **ROI**: 18-25% annually\n\nBest for: High electricity bills (>₹3,000/month)`;
        recommendations.push(
          {
            title: 'Solar ROI Calculator',
            description: 'Check your savings with solar panels',
            link: '/solar-roi',
            icon: 'trending',
            category: 'Green Energy',
          },
          {
            title: 'Solar vs Wind',
            description: 'Which renewable energy is better?',
            link: '/compare/solar-vs-wind',
            icon: 'calculator',
            category: 'Comparison',
          }
        );
        break;

      case 'retirement':
        content = `Retirement Planning Essentials:\n\n• **Start Young**: ₹10K/month from 25 = ₹3+ Cr at 60\n• **Target**: 25-30x annual expenses (₹2-3 Cr for comfortable retirement)\n• **Invest Wisely**: Mix of equity (till 50) + debt (post-50)\n• **NPS**: Government-backed, extra tax benefit\n• **PPF**: Safe long-term option\n\nRule: Replace 70-80% of pre-retirement income!`;
        recommendations.push(
          {
            title: 'Retirement Calculator',
            description: 'How much do you need to retire?',
            link: '/retirement-calculator',
            icon: 'trending',
            category: 'Retirement',
          },
          {
            title: 'SIP Calculator',
            description: 'Build retirement corpus with SIP',
            link: '/in/sip-calculator',
            icon: 'calculator',
            category: 'Investments',
          }
        );
        break;

      case 'budget':
        content = `Smart Budgeting (50/30/20 Rule):\n\n• **50% - Needs**: Rent, food, utilities, EMIs\n• **30% - Wants**: Dining, entertainment, shopping\n• **20% - Savings**: Investments, emergency fund\n\nTips:\n• Track expenses for 3 months to identify leaks\n• Automate savings (first expense, not last)\n• Cut subscriptions you don't use\n• Use cash/UPI for daily expenses (control spending)`;
        recommendations.push(
          {
            title: 'Budget Analyzer',
            description: 'Upload bank statement & get AI insights',
            link: '/tools/budget-analyzer',
            icon: 'calculator',
            category: 'Budgeting',
          },
          {
            title: 'Emergency Fund Calculator',
            description: 'Are you prepared for emergencies?',
            link: '/emergency-fund-calculator',
            icon: 'savings',
            category: 'Safety Net',
          }
        );
        break;

      case 'tax':
        content = `Tax Saving Guide (FY 2025-26):\n\n**Section 80C** (₹1.5L):\n• EPF, PPF, ELSS, Life Insurance, Home Loan Principal\n\n**Other Deductions:**\n• 80D: ₹25K (health insurance) + ₹50K (parents)\n• 80CCD(1B): ₹50K (NPS)\n• 24(b): ₹2L (home loan interest)\n\n**Total Max Savings**: ~₹4L+ deductions = ₹1.2L tax saved (30% bracket)\n\nNew vs Old Regime: Compare both based on your deductions!`;
        recommendations.push(
          {
            title: 'Income Tax Calculator',
            description: 'Calculate tax liability & savings',
            link: '/in/income-tax-calculator',
            icon: 'calculator',
            category: 'Tax',
          },
          {
            title: 'TDS Calculator',
            description: 'Check TDS on salary/investments',
            link: '/in/tds-calculator',
            icon: 'calculator',
            category: 'Tax',
          }
        );
        break;

      default:
        content = `I can help you with:\n\n• Home Loans & EMI planning\n• Salary calculations (CTC to in-hand)\n• Investment strategies (SIP, FD, PPF)\n• Tax saving tips\n• Solar panel ROI\n• Retirement planning\n• Budget management\n\nWhat would you like to explore?`;
        recommendations.push(
          {
            title: 'All Calculators',
            description: 'Browse 30+ financial tools',
            link: '/dashboard',
            icon: 'calculator',
            category: 'Tools',
          },
          {
            title: 'Compare Options',
            description: 'FD vs MF, PPF vs FD, Rent vs Buy',
            link: '/compare',
            icon: 'trending',
            category: 'Comparisons',
          }
        );
    }

    return { content, recommendations };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);

    // Analyze query
    const analysis = analyzeQuery(input);
    const { content, recommendations } = generateResponse(input, analysis);

    // Update context
    const newContext = { ...context };
    if (analysis.intent && !newContext.recentCalculators?.includes(analysis.intent)) {
      newContext.recentCalculators = [...(newContext.recentCalculators || []), analysis.intent].slice(-5);
      setContext(newContext);
    }

    // AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content,
        recommendations,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 500);

    setInput('');
  };

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'calculator': return Calculator;
      case 'savings': return PiggyBank;
      case 'home': return Home;
      case 'trending': return TrendingUp;
      default: return Calculator;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-100 text-indigo-700 mb-4">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">AI-Powered Assistance</span>
          </div>
          <h1 className="text-4xl font-bold mb-2">Financial Advisor AI</h1>
          <p className="text-gray-600">Get personalized financial advice powered by artificial intelligence</p>
        </div>

        {/* Chat Interface */}
        <Card className="shadow-xl">
          <CardHeader className="bg-gradient-to-r from-indigo-600 to-indigo-800 text-white">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6" />
              Chat with AI Advisor
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {/* Messages */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {message.role === 'assistant' && (
                    <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div className={`max-w-[75%] ${message.role === 'user' ? 'order-1' : ''}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.role === 'user'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <p className="whitespace-pre-line text-sm leading-relaxed">{message.content}</p>
                    </div>
                    {message.recommendations && message.recommendations.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-gray-500 font-medium px-2">Recommended Tools:</p>
                        {message.recommendations.map((rec, idx) => {
                          const IconComponent = getIconComponent(rec.icon);
                          return (
                            <Link
                              key={idx}
                              href={rec.link}
                              className="block bg-white border border-indigo-100 rounded-lg p-3 hover:border-indigo-300 hover:shadow-md transition-all"
                            >
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center flex-shrink-0">
                                  <IconComponent className="w-5 h-5 text-indigo-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-1">
                                    <h4 className="text-sm font-semibold text-gray-900">{rec.title}</h4>
                                    <Badge variant="outline" className="text-xs">
                                      {rec.category}
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-gray-600">{rec.description}</p>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                  {message.role === 'user' && (
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0">
                      <User className="w-5 h-5 text-gray-600" />
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t p-4 bg-white">
              <div className="flex gap-2">
                <Button
                  onClick={toggleVoiceInput}
                  variant={isListening ? 'destructive' : 'outline'}
                  size="icon"
                  className="flex-shrink-0"
                  title={isListening ? 'Stop listening' : 'Voice input'}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={isListening ? 'Listening...' : 'Ask me anything about finances...'}
                  className="flex-1"
                  disabled={isListening}
                />
                <Button onClick={handleSend} disabled={!input.trim() || isListening} className="flex-shrink-0">
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Tip: Try asking "How do I save for retirement?" or "Should I buy or rent?"
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Feature Highlights */}
        <div className="mt-8 grid md:grid-cols-3 gap-4">
          <Card className="text-center p-4">
            <Sparkles className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1">Context-Aware</h3>
            <p className="text-xs text-gray-600">Remembers your conversation for better advice</p>
          </Card>
          <Card className="text-center p-4">
            <Mic className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1">Voice Input</h3>
            <p className="text-xs text-gray-600">Speak your questions naturally</p>
          </Card>
          <Card className="text-center p-4">
            <Calculator className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
            <h3 className="font-semibold text-sm mb-1">Smart Links</h3>
            <p className="text-xs text-gray-600">Direct access to relevant calculators</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
