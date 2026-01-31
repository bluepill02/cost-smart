'use client';

import { useState } from 'react';
import { Upload, FileText, Download, TrendingDown, TrendingUp, AlertCircle, CheckCircle, Sparkles, PieChart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';
import { formatCurrency } from '@/lib/formatters';

const PieChartComponent = dynamic(() => import('recharts').then(mod => mod.PieChart), { ssr: false });
const Pie = dynamic(() => import('recharts').then(mod => mod.Pie), { ssr: false });
const Cell = dynamic(() => import('recharts').then(mod => mod.Cell), { ssr: false });
const BarChart = dynamic(() => import('recharts').then(mod => mod.BarChart), { ssr: false });
const Bar = dynamic(() => import('recharts').then(mod => mod.Bar), { ssr: false });
const XAxis = dynamic(() => import('recharts').then(mod => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import('recharts').then(mod => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import('recharts').then(mod => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import('recharts').then(mod => mod.Tooltip), { ssr: false });
const Legend = dynamic(() => import('recharts').then(mod => mod.Legend), { ssr: false });
const ResponsiveContainer = dynamic(() => import('recharts').then(mod => mod.ResponsiveContainer), { ssr: false });

interface Transaction {
  date: string;
  description: string;
  amount: number;
  type: 'debit' | 'credit';
  category?: string;
}

interface CategoryData {
  name: string;
  amount: number;
  percentage: number;
  color: string;
  transactions: number;
  [key: string]: string | number; // Index signature for Recharts compatibility
}

interface BudgetInsight {
  type: 'warning' | 'info' | 'success';
  title: string;
  message: string;
  savings?: number;
}

const CATEGORY_COLORS: Record<string, string> = {
  'Food & Dining': '#10b981',
  'Shopping': '#f59e0b',
  'Transportation': '#3b82f6',
  'Bills & Utilities': '#8b5cf6',
  'Entertainment': '#ec4899',
  'Health & Fitness': '#14b8a6',
  'Travel': '#f97316',
  'Education': '#6366f1',
  'Investments': '#22c55e',
  'Others': '#94a3b8',
  'Income': '#059669',
  'Transfers': '#64748b',
};

export default function BudgetAnalyzer() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [insights, setInsights] = useState<BudgetInsight[]>([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);

  const categorizeTransaction = (description: string): string => {
    const desc = description.toLowerCase();
    
    // Income
    if (desc.match(/salary|wage|income|refund|cashback|interest.*credit/)) return 'Income';
    
    // Food & Dining
    if (desc.match(/swiggy|zomato|uber.*eats|restaurant|cafe|food|dining|mcdonald|kfc|domino|pizza|starbucks/)) 
      return 'Food & Dining';
    
    // Shopping
    if (desc.match(/amazon|flip.*kart|myntra|ajio|meesho|shopping|mall|store|retail|supermarket|grocery/))
      return 'Shopping';
    
    // Transportation
    if (desc.match(/uber|ola|rapido|metro|fuel|petrol|diesel|parking|toll|taxi|bus|train|flight|makemytrip|goibibo/))
      return 'Transportation';
    
    // Bills & Utilities
    if (desc.match(/electricity|water|gas|internet|broadband|mobile|recharge|jio|airtel|vi|vodafone|bill.*payment|rent/))
      return 'Bills & Utilities';
    
    // Entertainment
    if (desc.match(/netflix|prime|hotstar|spotify|youtube|movie|theatre|pvr|inox|game|gaming|xbox|playstation/))
      return 'Entertainment';
    
    // Health & Fitness
    if (desc.match(/pharmacy|medicine|doctor|hospital|clinic|gym|fitness|cult.*fit|medical|health|insurance/))
      return 'Health & Fitness';
    
    // Travel
    if (desc.match(/hotel|booking|oyo|airbnb|travel|vacation|tour|trip/))
      return 'Travel';
    
    // Education
    if (desc.match(/course|udemy|coursera|school|college|university|tuition|book|education/))
      return 'Education';
    
    // Investments
    if (desc.match(/mutual.*fund|sip|stock|zerodha|groww|upstox|invest|demat|trading|fd|ppf|insurance.*premium/))
      return 'Investments';
    
    // Transfers
    if (desc.match(/transfer|upi|neft|imps|rtgs|paytm|phonepe|googlepay|gpay/))
      return 'Transfers';
    
    return 'Others';
  };

  const parseCSV = (text: string): Transaction[] => {
    const lines = text.split('\n').filter(line => line.trim());
    const transactions: Transaction[] = [];
    
    // Skip header row
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      // Try to parse CSV (handle commas within quotes)
      const matches = line.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
      if (!matches || matches.length < 3) continue;
      
      const date = matches[0]?.replace(/"/g, '').trim() || '';
      const description = matches[1]?.replace(/"/g, '').trim() || matches[2]?.replace(/"/g, '').trim() || 'Unknown';
      const amountStr = matches[matches.length - 2]?.replace(/[₹",]/g, '').trim() || matches[matches.length - 1]?.replace(/[₹",]/g, '').trim() || '0';
      
      const amount = Math.abs(parseFloat(amountStr));
      if (isNaN(amount) || amount === 0) continue;
      
      // Determine if debit or credit (look for negative signs or "Dr"/"Cr" indicators)
      const type: 'debit' | 'credit' = line.toLowerCase().includes('cr') || line.includes('+') ? 'credit' : 'debit';
      
      const category = categorizeTransaction(description);
      
      transactions.push({
        date,
        description,
        amount,
        type,
        category
      });
    }
    
    return transactions;
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (!uploadedFile) return;

    setFile(uploadedFile);
    setLoading(true);
    
    try {
      const text = await uploadedFile.text();
      const parsedTransactions = parseCSV(text);
      
      if (parsedTransactions.length === 0) {
        alert('No transactions found. Please ensure your CSV has columns: Date, Description, Amount');
        setLoading(false);
        return;
      }
      
      setTransactions(parsedTransactions);
      
      // Calculate category-wise data
      const categoryMap = new Map<string, { amount: number; count: number }>();
      let income = 0;
      let expense = 0;
      
      parsedTransactions.forEach(txn => {
        if (txn.type === 'credit' || txn.category === 'Income') {
          income += txn.amount;
        } else {
          expense += txn.amount;
          const existing = categoryMap.get(txn.category || 'Others');
          if (existing) {
            existing.amount += txn.amount;
            existing.count += 1;
          } else {
            categoryMap.set(txn.category || 'Others', { amount: txn.amount, count: 1 });
          }
        }
      });
      
      setTotalIncome(income);
      setTotalExpense(expense);
      
      // Convert to array and calculate percentages
      const categories: CategoryData[] = Array.from(categoryMap.entries())
        .map(([name, data]) => ({
          name,
          amount: data.amount,
          percentage: (data.amount / expense) * 100,
          color: CATEGORY_COLORS[name] || CATEGORY_COLORS['Others'],
          transactions: data.count,
        }))
        .sort((a, b) => b.amount - a.amount);
      
      setCategoryData(categories);
      
      // Generate insights
      generateInsights(categories, income, expense, parsedTransactions.length);
      
    } catch (error) {
      alert('Error parsing file. Please ensure it\'s a valid CSV format.');
      console.error(error);
    }
    
    setLoading(false);
  };

  const generateInsights = (categories: CategoryData[], income: number, expense: number, txnCount: number) => {
    const insights: BudgetInsight[] = [];
    const savingsRate = ((income - expense) / income) * 100;
    
    // Savings rate insight
    if (savingsRate < 10) {
      insights.push({
        type: 'warning',
        title: 'Low Savings Rate',
        message: `You're saving only ${savingsRate.toFixed(1)}% of income. Aim for 20-30% to build wealth.`,
        savings: (income * 0.2) - (income - expense),
      });
    } else if (savingsRate >= 20) {
      insights.push({
        type: 'success',
        title: 'Great Savings!',
        message: `You're saving ${savingsRate.toFixed(1)}% of income. Keep it up!`,
      });
    } else {
      insights.push({
        type: 'info',
        title: 'Decent Savings',
        message: `Saving ${savingsRate.toFixed(1)}%. Try to increase to 20%+ for faster wealth building.`,
        savings: (income * 0.2) - (income - expense),
      });
    }
    
    // Category-specific insights
    categories.forEach(cat => {
      if (cat.name === 'Food & Dining' && cat.percentage > 15) {
        insights.push({
          type: 'warning',
          title: 'High Dining Expenses',
          message: `${cat.percentage.toFixed(1)}% spent on food. Cooking at home 2-3 times/week can save ₹${Math.round(cat.amount * 0.3)}/month.`,
          savings: cat.amount * 0.3,
        });
      }
      
      if (cat.name === 'Shopping' && cat.percentage > 20) {
        insights.push({
          type: 'warning',
          title: 'Shopping Overspend',
          message: `${cat.percentage.toFixed(1)}% on shopping. Review subscriptions and impulse purchases.`,
          savings: cat.amount * 0.2,
        });
      }
      
      if (cat.name === 'Entertainment' && cat.percentage > 10) {
        insights.push({
          type: 'info',
          title: 'Entertainment Budget',
          message: `${cat.percentage.toFixed(1)}% on entertainment. Consider cutting 1-2 subscriptions to save ₹${Math.round(cat.amount * 0.25)}/month.`,
          savings: cat.amount * 0.25,
        });
      }
    });
    
    // Investments insight
    const investmentCat = categories.find(c => c.name === 'Investments');
    if (!investmentCat || investmentCat.percentage < 10) {
      insights.push({
        type: 'warning',
        title: 'Low Investment Rate',
        message: `Only ${investmentCat?.percentage.toFixed(1) || 0}% going to investments. Automate SIP/PPF contributions.`,
      });
    }
    
    setInsights(insights);
  };

  const exportOptimizedBudget = () => {
    if (categoryData.length === 0) return;
    
    let csv = 'Category,Current Spending,Recommended,Savings Potential\n';
    
    categoryData.forEach(cat => {
      const recommended = cat.percentage > 20 ? cat.amount * 0.8 : cat.amount;
      const savings = cat.amount - recommended;
      csv += `${cat.name},₹${cat.amount.toFixed(0)},₹${recommended.toFixed(0)},₹${savings.toFixed(0)}\n`;
    });
    
    csv += `\nTotal Income,₹${totalIncome.toFixed(0)}\n`;
    csv += `Total Expense,₹${totalExpense.toFixed(0)}\n`;
    csv += `Current Savings,₹${(totalIncome - totalExpense).toFixed(0)}\n`;
    csv += `Potential Savings,₹${insights.reduce((sum, i) => sum + (i.savings || 0), 0).toFixed(0)}\n`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'optimized-budget.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      {transactions.length === 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-6 h-6 text-blue-600" />
              Upload Bank Statement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
              <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Drop your CSV file here</h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload bank statement in CSV format. We'll analyze your spending patterns.
              </p>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
                disabled={loading}
              />
              <label htmlFor="file-upload">
                <span className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 cursor-pointer ${loading ? 'opacity-50 pointer-events-none' : ''}`}>
                  {loading ? 'Analyzing...' : 'Choose File'}
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-4">
                CSV Format: Date, Description, Amount (supports most Indian banks)
              </p>
            </div>
            
            {/* Sample Format */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-sm mb-2">Expected CSV Format:</h4>
              <pre className="text-xs text-gray-700 overflow-x-auto">
{`Date,Description,Amount
01/01/2026,Swiggy Food Order,-450
02/01/2026,Salary Credit,+75000
03/01/2026,Amazon Shopping,-2500
...`}
              </pre>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Analysis Results */}
      {transactions.length > 0 && (
        <>
          {/* Summary Cards */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Income</p>
                    <p className="text-2xl font-bold text-green-600">{formatCurrency(totalIncome, 'INR', 'en-IN')}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Expense</p>
                    <p className="text-2xl font-bold text-red-600">{formatCurrency(totalExpense, 'INR', 'en-IN')}</p>
                  </div>
                  <TrendingDown className="w-8 h-8 text-red-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Net Savings</p>
                    <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalIncome - totalExpense, 'INR', 'en-IN')}</p>
                  </div>
                  <PieChart className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Transactions</p>
                    <p className="text-2xl font-bold text-purple-600">{transactions.length}</p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-6 h-6 text-indigo-600" />
                AI-Powered Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {insights.map((insight, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border-l-4 ${
                    insight.type === 'warning'
                      ? 'bg-orange-50 border-orange-500'
                      : insight.type === 'success'
                      ? 'bg-green-50 border-green-500'
                      : 'bg-blue-50 border-blue-500'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {insight.type === 'warning' && <AlertCircle className="w-5 h-5 text-orange-600 flex-shrink-0 mt-0.5" />}
                    {insight.type === 'success' && <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />}
                    {insight.type === 'info' && <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />}
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                      <p className="text-sm text-gray-700">{insight.message}</p>
                      {insight.savings && (
                        <Badge className="mt-2" variant="outline">
                          💰 Potential savings: {formatCurrency(insight.savings, 'INR', 'en-IN')}/month
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Pie Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChartComponent>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry) => `${entry.name}: ${((entry.percent || 0) * 100).toFixed(1)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value) || 0, 'INR', 'en-IN')}
                    />
                  </PieChartComponent>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Bar Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Category Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} fontSize={10} />
                    <YAxis fontSize={12} />
                    <Tooltip
                      formatter={(value) => formatCurrency(Number(value) || 0, 'INR', 'en-IN')}
                    />
                    <Legend />
                    <Bar dataKey="amount" fill="#3b82f6" name="Spending" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Category Details */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Category Details</CardTitle>
              <Button onClick={exportOptimizedBudget} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Budget Plan
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryData.map((cat, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: cat.color }}
                      />
                      <div>
                        <p className="font-semibold text-sm">{cat.name}</p>
                        <p className="text-xs text-gray-600">{cat.transactions} transactions</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(cat.amount, 'INR', 'en-IN')}</p>
                      <p className="text-xs text-gray-600">{cat.percentage.toFixed(1)}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={() => {
                setTransactions([]);
                setCategoryData([]);
                setInsights([]);
                setFile(null);
              }}
              variant="outline"
            >
              Analyze Another Statement
            </Button>
            <Button onClick={exportOptimizedBudget} variant="default">
              <Download className="w-4 h-4 mr-2" />
              Download Report
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
