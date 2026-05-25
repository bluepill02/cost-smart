'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageSquare, X, Send, Bot, User, Calculator, TrendingUp, PiggyBank, Home } from 'lucide-react';
import Link from 'next/link';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  recommendations?: Recommendation[];
}

interface Recommendation {
  title: string;
  description: string;
  link: string;
  icon: 'calculator' | 'savings' | 'home' | 'trending';
  category: string;
}

function analyzeQuery(query: string): { intent: string; entities: string[] } {
  const lowerQuery = query.toLowerCase();

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

  const entities: string[] = [];
  const amountMatches = lowerQuery.match(/₹?(\d+)(k|l|lakhs?|crores?|cr)?/gi);
  if (amountMatches) entities.push(...amountMatches);

  return { intent, entities };
}

function generateResponse(query: string, { intent, entities }: { intent: string; entities: string[] }): {
  content: string;
  recommendations: Recommendation[];
} {
  let content = '';
  const recommendations: Recommendation[] = [];

  switch (intent) {
    case 'home_loan':
      content = `For home loan planning, consider these key factors:\n\n• Down Payment: Aim for 20% to get better rates\n• Interest Rate: Current rates: 8.5-9.5% p.a.\n• Tenure: 15-20 years balances EMI affordability with total interest\n• Tax Benefits: Save up to ₹3.5L/year\n\nTip: Pre-payment can save lakhs in interest!${entities.length > 0 ? `\n\nBased on your mention of ${entities[0]}, I can help further.` : ''}`;
      recommendations.push(
        { title: 'Home Loan EMI Calculator', description: 'Calculate EMI, total interest, and affordability', link: '/home-loan-calculator', icon: 'home', category: 'Loans' },
        { title: 'City-Specific EMI', description: 'Get property prices for your city', link: '/in', icon: 'calculator', category: 'Location-Based' }
      );
      break;

    case 'salary':
      content = `Understanding CTC vs In-hand Salary:\n\n• CTC (Cost to Company): Gross salary including all benefits\n• In-hand: What you actually receive (typically 70-80% of CTC)\n• Deductions: EPF (12%), Professional Tax, Income Tax\n• Tax Planning: Use Section 80C (₹1.5L), HRA, NPS (₹50K)\n\nPro Tip: Old vs New tax regime - check which saves you more!`;
      recommendations.push(
        { title: 'Salary Calculator', description: 'Calculate in-hand from CTC with deductions', link: '/salary-calculator', icon: 'trending', category: 'Income' },
        { title: 'City Cost of Living', description: 'Compare salaries across Indian cities', link: '/in/salary-calculator/mumbai', icon: 'calculator', category: 'Location-Based' }
      );
      break;

    case 'investment':
      content = `Smart Investment Strategy:\n\n• Emergency Fund First: 6 months expenses in liquid funds\n• SIP in Equity: ₹5K-10K/month can build ₹50L+ in 15 years\n• Asset Allocation: 60% equity, 30% debt, 10% gold\n• Diversification: Don't put all eggs in one basket\n• Start Early: ₹5K/month at 25 > ₹15K/month at 35`;
      recommendations.push(
        { title: 'SIP Calculator', description: 'See how regular investments grow over time', link: '/in/sip-calculator', icon: 'trending', category: 'Investments' },
        { title: 'FD vs Mutual Funds', description: 'Compare returns and pick wisely', link: '/compare/fd-vs-mutual-fund', icon: 'calculator', category: 'Comparison' }
      );
      break;

    case 'savings':
      content = `Best Savings Options:\n\nSafe & Guaranteed:\n• PPF: 7.1% p.a., 15 years, EEE taxation\n• FD: 6.5-7% p.a., flexible tenure\n• NSC: 7.7% p.a., 5 years, 80C benefit\n\nTax-Saving:\n• ELSS: 12-15% expected, 3-year lock-in\n• NPS: Market-linked, extra ₹50K deduction\n\nRule of Thumb: Save 20-30% of monthly income!`;
      recommendations.push(
        { title: 'FD Calculator', description: 'Calculate fixed deposit returns', link: '/fd-calculator', icon: 'savings', category: 'Savings' },
        { title: 'PPF Calculator', description: 'Long-term tax-free wealth building', link: '/in/ppf-calculator', icon: 'savings', category: 'Savings' }
      );
      break;

    case 'solar':
      content = `Solar ROI for Indian Homes:\n\n• Payback: 3-5 years (with subsidy)\n• Subsidy: ₹18,000/kW (up to 3kW)\n• Savings: ₹20,000-50,000/year on electricity\n• Lifespan: 25 years (minimal maintenance)\n• ROI: 18-25% annually\n\nBest for: High electricity bills (>₹3,000/month)`;
      recommendations.push(
        { title: 'Solar ROI Calculator', description: 'Check your savings with solar panels', link: '/solar-roi', icon: 'trending', category: 'Green Energy' }
      );
      break;

    case 'retirement':
      content = `Retirement Planning Essentials:\n\n• Start Young: ₹10K/month from 25 = ₹3+ Cr at 60\n• Target: 25-30x annual expenses\n• Invest Wisely: Mix of equity (till 50) + debt (post-50)\n• NPS: Government-backed, extra tax benefit\n• PPF: Safe long-term option\n\nRule: Replace 70-80% of pre-retirement income!`;
      recommendations.push(
        { title: 'Retirement Calculator', description: 'How much do you need to retire?', link: '/retirement-calculator', icon: 'trending', category: 'Retirement' },
        { title: 'SIP Calculator', description: 'Build retirement corpus with SIP', link: '/in/sip-calculator', icon: 'calculator', category: 'Investments' }
      );
      break;

    case 'budget':
      content = `Smart Budgeting (50/30/20 Rule):\n\n• 50% - Needs: Rent, food, utilities, EMIs\n• 30% - Wants: Dining, entertainment, shopping\n• 20% - Savings: Investments, emergency fund\n\nTips:\n• Track expenses for 3 months\n• Automate savings (first expense, not last)\n• Cut subscriptions you don't use`;
      recommendations.push(
        { title: 'Budget Analyzer', description: 'Upload bank statement & get AI insights', link: '/tools/budget-analyzer', icon: 'calculator', category: 'Budgeting' },
        { title: 'Emergency Fund Calculator', description: 'Are you prepared for emergencies?', link: '/emergency-fund-calculator', icon: 'savings', category: 'Safety Net' }
      );
      break;

    case 'tax':
      content = `Tax Saving Guide:\n\nSection 80C (₹1.5L):\n• EPF, PPF, ELSS, Life Insurance, Home Loan Principal\n\nOther Deductions:\n• 80D: ₹25K (health insurance) + ₹50K (parents)\n• 80CCD(1B): ₹50K (NPS)\n• 24(b): ₹2L (home loan interest)\n\nTotal Max Savings: ~₹4L+ deductions!`;
      recommendations.push(
        { title: 'Income Tax Calculator', description: 'Calculate tax liability & savings', link: '/in/income-tax-calculator', icon: 'calculator', category: 'Tax' },
        { title: 'TDS Calculator', description: 'Check TDS on salary/investments', link: '/in/tds-calculator', icon: 'calculator', category: 'Tax' }
      );
      break;

    case 'loan':
      content = `Loan Planning Tips:\n\n• Compare interest rates across lenders\n• Check your credit score (750+ for best rates)\n• Shorter tenure = less interest paid\n• Pre-payment reduces total cost significantly\n• Consider processing fees in total cost\n\nNeed help with a specific loan type?`;
      recommendations.push(
        { title: 'Home Loan EMI Calculator', description: 'Calculate EMI, total interest, and affordability', link: '/home-loan-calculator', icon: 'home', category: 'Loans' },
        { title: 'All Calculators', description: 'Browse 30+ financial tools', link: '/dashboard', icon: 'calculator', category: 'Tools' }
      );
      break;

    default:
      content = `I can help you with:\n\n• Home Loans & EMI planning\n• Salary calculations (CTC to in-hand)\n• Investment strategies (SIP, FD, PPF)\n• Tax saving tips\n• Solar panel ROI\n• Retirement planning\n• Budget management\n\nWhat would you like to explore?`;
      recommendations.push(
        { title: 'All Calculators', description: 'Browse 30+ financial tools', link: '/dashboard', icon: 'calculator', category: 'Tools' },
        { title: 'Compare Options', description: 'FD vs MF, PPF vs FD, Rent vs Buy', link: '/compare', icon: 'trending', category: 'Comparisons' }
      );
  }

  return { content, recommendations };
}

function getIconComponent(icon: string) {
  switch (icon) {
    case 'calculator': return Calculator;
    case 'savings': return PiggyBank;
    case 'home': return Home;
    case 'trending': return TrendingUp;
    default: return Calculator;
  }
}

function ChatPanel({ onClose }: { onClose: () => void }) {
  const idCounter = useRef(0);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'msg-0',
      role: 'assistant',
      content: "Hi! I'm your AI Financial Advisor. Ask me about loans, investments, taxes, savings, or budgeting!",
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = useCallback(() => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: 'msg-' + (++idCounter.current),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);

    const analysis = analyzeQuery(input);
    const { content, recommendations } = generateResponse(input, analysis);

    setTimeout(() => {
      const assistantMessage: Message = {
        id: 'msg-' + (++idCounter.current),
        role: 'assistant',
        content,
        recommendations,
      };
      setMessages((prev) => [...prev, assistantMessage]);
    }, 400);

    setInput('');
  }, [input]);

  return (
    <div className="fixed bottom-[7.5rem] right-6 z-50 w-[380px] max-h-[520px] rounded-2xl shadow-2xl overflow-hidden flex flex-col bg-white sm:w-[380px] max-sm:inset-4 max-sm:bottom-4 max-sm:right-4 max-sm:w-auto max-sm:max-h-none max-sm:fixed">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5" />
          <span className="font-semibold text-sm">AI Financial Advisor</span>
        </div>
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
          aria-label="Close chat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-gray-50 min-h-0">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-2 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            {message.role === 'assistant' && (
              <div className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
            )}
            <div className={`max-w-[80%] ${message.role === 'user' ? 'order-1' : ''}`}>
              <div
                className={`rounded-xl px-3 py-2 text-sm ${
                  message.role === 'user'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white border border-gray-200'
                }`}
              >
                <p className="whitespace-pre-line leading-relaxed">{message.content}</p>
              </div>
              {message.recommendations && message.recommendations.length > 0 && (
                <div className="mt-2 space-y-1.5">
                  {message.recommendations.map((rec, idx) => {
                    const IconComponent = getIconComponent(rec.icon);
                    return (
                      <Link
                        key={idx}
                        href={rec.link}
                        className="block bg-white border border-indigo-100 rounded-lg p-2 hover:border-indigo-300 hover:shadow-sm transition-all"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-md bg-indigo-50 flex items-center justify-center flex-shrink-0">
                            <IconComponent className="w-3.5 h-3.5 text-indigo-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-semibold text-gray-900 truncate">{rec.title}</h4>
                            <p className="text-[10px] text-gray-500 truncate">{rec.description}</p>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
            {message.role === 'user' && (
              <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-1">
                <User className="w-3.5 h-3.5 text-gray-600" />
              </div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t p-3 bg-white flex-shrink-0">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about finances..."
            className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
            aria-label="Send message"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FloatingChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Chat Panel */}
      {isOpen && <ChatPanel onClose={() => setIsOpen(false)} />}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`fixed bottom-24 right-6 z-50 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-200 hover:scale-105 ${
          isOpen
            ? 'bg-indigo-700 hover:bg-indigo-800'
            : 'bg-indigo-600 hover:bg-indigo-700'
        }`}
        aria-label={isOpen ? 'Close chat' : 'Open AI Financial Advisor chat'}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}
      </button>
    </>
  );
}
