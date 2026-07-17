#!/usr/bin/env node
/**
 * Generates a professional multi-page budget template PDF using raw PDF syntax.
 * CostSmart brand colors: #059669 (emerald), #0D9488 (teal), #00D4AA (accent)
 * 
 * PDF color values (RGB 0-1 scale):
 * Emerald #059669: 0.020 0.588 0.412
 * Teal #0D9488: 0.051 0.580 0.533
 * Accent #00D4AA: 0.000 0.831 0.667
 * Dark text: 0.133 0.133 0.133
 * Gray text: 0.400 0.400 0.400
 * Light gray bg: 0.945 0.969 0.961
 */

const fs = require('fs');
const path = require('path');

// Helper to escape PDF string special characters
function pdfStr(s) {
  return s.replace(/\\/g, '\\\\').replace(/\(/g, '\\(').replace(/\)/g, '\\)');
}

// Page dimensions
const W = 612; // Letter width
const H = 792; // Letter height
const MARGIN = 54; // 0.75 inch margins
const CONTENT_W = W - 2 * MARGIN;

// Colors
const EMERALD = '0.020 0.588 0.412';
const TEAL = '0.051 0.580 0.533';
const DARK = '0.133 0.133 0.133';
const GRAY = '0.400 0.400 0.400';
const LIGHT_BG = '0.945 0.969 0.961';
const WHITE = '1.000 1.000 1.000';

// Helper: draw a filled rectangle
function rect(x, y, w, h, color) {
  return `${color} rg\n${x} ${y} ${w} ${h} re f\n`;
}

// Helper: draw a stroked rectangle
function strokeRect(x, y, w, h, color, lineWidth = 0.5) {
  return `${lineWidth} w\n${color} RG\n${x} ${y} ${w} ${h} re S\n`;
}

// Helper: draw a line
function line(x1, y1, x2, y2, color, lineWidth = 0.5) {
  return `${lineWidth} w\n${color} RG\n${x1} ${y1} m ${x2} ${y2} l S\n`;
}

// Helper: text at position
function text(x, y, str, font, size, color) {
  return `BT\n${color} rg\n/${font} ${size} Tf\n${x} ${y} Td\n(${pdfStr(str)}) Tj\nET\n`;
}

// Footer for each page
function footer(pageNum, totalPages) {
  let s = '';
  // Footer line
  s += line(MARGIN, 50, W - MARGIN, 50, EMERALD, 0.75);
  // Footer text
  s += text(MARGIN, 34, `Created with CostSmart | costsmart.app`, 'F1', 8, GRAY);
  s += text(W - MARGIN - 60, 34, `Page ${pageNum} of ${totalPages}`, 'F1', 8, GRAY);
  return s;
}

// ============ PAGE 1: Cover/Instructions ============
function page1Content() {
  let s = '';
  
  // Top header bar
  s += rect(0, H - 120, W, 120, EMERALD);
  
  // Title on header
  s += text(MARGIN, H - 60, 'CostSmart', 'F2', 28, WHITE);
  s += text(MARGIN, H - 90, 'Monthly Budget Template', 'F2', 22, WHITE);
  s += text(MARGIN, H - 110, 'Take control of your finances with the 50/30/20 framework', 'F1', 10, WHITE);
  
  // Subtitle section
  let y = H - 160;
  s += text(MARGIN, y, 'How to Use This Template', 'F2', 16, DARK);
  y -= 8;
  s += line(MARGIN, y, MARGIN + 200, y, EMERALD, 1);
  
  y -= 24;
  s += text(MARGIN, y, '1.  Track all your income sources on Page 2', 'F1', 11, DARK);
  y -= 18;
  s += text(MARGIN, y, '2.  Categorize expenses using the 50/30/20 rule on Page 3', 'F1', 11, DARK);
  y -= 18;
  s += text(MARGIN, y, '3.  Set and monitor savings goals on Page 4', 'F1', 11, DARK);
  y -= 18;
  s += text(MARGIN, y, '4.  Plan your debt payoff strategy on Page 5', 'F1', 11, DARK);
  y -= 18;
  s += text(MARGIN, y, '5.  Complete the monthly review checklist on Page 6', 'F1', 11, DARK);
  
  // 50/30/20 Rule section
  y -= 44;
  s += text(MARGIN, y, 'The 50/30/20 Rule Explained', 'F2', 16, DARK);
  y -= 8;
  s += line(MARGIN, y, MARGIN + 230, y, EMERALD, 1);
  
  y -= 28;
  // Needs box
  const boxW = CONTENT_W / 3 - 10;
  const boxH = 140;
  const boxY = y - boxH;
  
  // Box 1: Needs 50%
  s += rect(MARGIN, boxY, boxW, boxH, LIGHT_BG);
  s += strokeRect(MARGIN, boxY, boxW, boxH, EMERALD, 0.75);
  s += rect(MARGIN, boxY + boxH - 28, boxW, 28, EMERALD);
  s += text(MARGIN + 10, boxY + boxH - 20, '50% - NEEDS', 'F2', 11, WHITE);
  s += text(MARGIN + 8, boxY + boxH - 48, 'Essential expenses you', 'F1', 9, DARK);
  s += text(MARGIN + 8, boxY + boxH - 62, 'cannot avoid:', 'F1', 9, DARK);
  s += text(MARGIN + 8, boxY + boxH - 80, '- Housing / Rent', 'F1', 9, GRAY);
  s += text(MARGIN + 8, boxY + boxH - 94, '- Utilities', 'F1', 9, GRAY);
  s += text(MARGIN + 8, boxY + boxH - 108, '- Groceries', 'F1', 9, GRAY);
  s += text(MARGIN + 8, boxY + boxH - 122, '- Transportation', 'F1', 9, GRAY);
  s += text(MARGIN + 8, boxY + boxH - 136, '- Insurance', 'F1', 9, GRAY);
  
  // Box 2: Wants 30%
  const box2X = MARGIN + boxW + 15;
  s += rect(box2X, boxY, boxW, boxH, LIGHT_BG);
  s += strokeRect(box2X, boxY, boxW, boxH, TEAL, 0.75);
  s += rect(box2X, boxY + boxH - 28, boxW, 28, TEAL);
  s += text(box2X + 10, boxY + boxH - 20, '30% - WANTS', 'F2', 11, WHITE);
  s += text(box2X + 8, boxY + boxH - 48, 'Lifestyle choices that', 'F1', 9, DARK);
  s += text(box2X + 8, boxY + boxH - 62, 'improve quality of life:', 'F1', 9, DARK);
  s += text(box2X + 8, boxY + boxH - 80, '- Entertainment', 'F1', 9, GRAY);
  s += text(box2X + 8, boxY + boxH - 94, '- Dining Out', 'F1', 9, GRAY);
  s += text(box2X + 8, boxY + boxH - 108, '- Shopping', 'F1', 9, GRAY);
  s += text(box2X + 8, boxY + boxH - 122, '- Subscriptions', 'F1', 9, GRAY);
  s += text(box2X + 8, boxY + boxH - 136, '- Travel', 'F1', 9, GRAY);
  
  // Box 3: Savings 20%
  const box3X = MARGIN + 2 * (boxW + 15);
  s += rect(box3X, boxY, boxW, boxH, LIGHT_BG);
  s += strokeRect(box3X, boxY, boxW, boxH, EMERALD, 0.75);
  s += rect(box3X, boxY + boxH - 28, boxW, 28, EMERALD);
  s += text(box3X + 10, boxY + boxH - 20, '20% - SAVINGS', 'F2', 11, WHITE);
  s += text(box3X + 8, boxY + boxH - 48, 'Building wealth and', 'F1', 9, DARK);
  s += text(box3X + 8, boxY + boxH - 62, 'reducing debt:', 'F1', 9, DARK);
  s += text(box3X + 8, boxY + boxH - 80, '- Emergency Fund', 'F1', 9, GRAY);
  s += text(box3X + 8, boxY + boxH - 94, '- Investments/SIP', 'F1', 9, GRAY);
  s += text(box3X + 8, boxY + boxH - 108, '- Extra Debt Payments', 'F1', 9, GRAY);
  s += text(box3X + 8, boxY + boxH - 122, '- Retirement Fund', 'F1', 9, GRAY);
  
  // Tips section
  y = boxY - 36;
  s += text(MARGIN, y, 'Quick Tips for Success', 'F2', 14, DARK);
  y -= 8;
  s += line(MARGIN, y, MARGIN + 170, y, EMERALD, 1);
  
  y -= 22;
  s += text(MARGIN + 12, y, 'Print this template or fill it in digitally each month', 'F1', 10, DARK);
  y -= 16;
  s += text(MARGIN + 12, y, 'Review your budget weekly to stay on track', 'F1', 10, DARK);
  y -= 16;
  s += text(MARGIN + 12, y, 'Adjust categories to match your lifestyle - the 50/30/20 is a guideline', 'F1', 10, DARK);
  y -= 16;
  s += text(MARGIN + 12, y, 'Use the Monthly Review Checklist (Page 6) to close out each month', 'F1', 10, DARK);
  y -= 16;
  s += text(MARGIN + 12, y, 'Visit costsmart.app for interactive calculators and AI-powered insights', 'F1', 10, DARK);
  
  // Month/Year field
  y -= 36;
  s += text(MARGIN, y, 'Budget Month: _________________________    Year: ____________', 'F1', 11, DARK);
  
  s += footer(1, 6);
  return s;
}

// ============ PAGE 2: Income Tracking Worksheet ============
function page2Content() {
  let s = '';
  
  // Page header
  s += rect(0, H - 60, W, 60, EMERALD);
  s += text(MARGIN, H - 40, 'Income Tracking Worksheet', 'F2', 18, WHITE);
  s += text(W - MARGIN - 180, H - 40, 'Month: _______________', 'F1', 10, WHITE);
  
  let y = H - 90;
  s += text(MARGIN, y, 'Record all sources of income for the month. Compare expected vs actual to improve future budgets.', 'F1', 10, GRAY);
  
  // Table header
  y -= 30;
  const col1 = MARGIN;
  const col2 = MARGIN + 200;
  const col3 = MARGIN + 320;
  const col4 = MARGIN + 440;
  const rowH = 32;
  const tableW = CONTENT_W;
  
  // Header row
  s += rect(col1, y - rowH, tableW, rowH, EMERALD);
  s += text(col1 + 10, y - 22, 'Income Source', 'F2', 11, WHITE);
  s += text(col2 + 10, y - 22, 'Expected', 'F2', 11, WHITE);
  s += text(col3 + 10, y - 22, 'Actual', 'F2', 11, WHITE);
  s += text(col4 + 10, y - 22, 'Difference', 'F2', 11, WHITE);
  
  y -= rowH;
  
  // Data rows
  const incomeItems = [
    'Primary Salary/Wages',
    'Secondary Job',
    'Freelance / Contract Work',
    'Investment Income (Dividends)',
    'Rental Income',
    'Side Hustle / Gig Work',
    'Government Benefits',
    'Child Support / Alimony',
    'Other Income 1',
    'Other Income 2',
  ];
  
  for (let i = 0; i < incomeItems.length; i++) {
    const bgColor = i % 2 === 0 ? LIGHT_BG : WHITE;
    s += rect(col1, y - rowH, tableW, rowH, bgColor);
    s += strokeRect(col1, y - rowH, tableW, rowH, '0.800 0.800 0.800', 0.25);
    s += text(col1 + 10, y - 22, incomeItems[i], 'F1', 10, DARK);
    // Blank lines for filling in
    s += text(col2 + 10, y - 22, '$___________', 'F1', 10, GRAY);
    s += text(col3 + 10, y - 22, '$___________', 'F1', 10, GRAY);
    s += text(col4 + 10, y - 22, '$___________', 'F1', 10, GRAY);
    y -= rowH;
  }
  
  // Total row
  s += rect(col1, y - rowH, tableW, rowH, EMERALD);
  s += text(col1 + 10, y - 22, 'TOTAL INCOME', 'F2', 11, WHITE);
  s += text(col2 + 10, y - 22, '$___________', 'F2', 11, WHITE);
  s += text(col3 + 10, y - 22, '$___________', 'F2', 11, WHITE);
  s += text(col4 + 10, y - 22, '$___________', 'F2', 11, WHITE);
  y -= rowH;
  
  // Notes section
  y -= 30;
  s += text(MARGIN, y, 'Income Notes:', 'F2', 12, DARK);
  y -= 6;
  s += line(MARGIN, y, W - MARGIN, y, EMERALD, 0.5);
  y -= 20;
  for (let i = 0; i < 5; i++) {
    s += line(MARGIN, y, W - MARGIN, y, '0.850 0.850 0.850', 0.25);
    y -= 20;
  }
  
  s += footer(2, 6);
  return s;
}

// ============ PAGE 3: Expense Categories (50/30/20 Rule) ============
function page3Content() {
  let s = '';
  
  // Page header
  s += rect(0, H - 60, W, 60, EMERALD);
  s += text(MARGIN, H - 40, 'Expense Categories (50/30/20 Rule)', 'F2', 18, WHITE);
  
  let y = H - 82;
  
  // Section helper
  function expenseSection(title, percentage, color, items, startY) {
    let sy = startY;
    // Section header
    s += rect(MARGIN, sy - 22, CONTENT_W, 22, color);
    s += text(MARGIN + 8, sy - 16, `${title} (${percentage}%)`, 'F2', 11, WHITE);
    s += text(MARGIN + CONTENT_W - 200, sy - 16, 'Budget          Actual          Difference', 'F1', 8, WHITE);
    sy -= 22;
    
    for (let i = 0; i < items.length; i++) {
      const bgColor = i % 2 === 0 ? LIGHT_BG : WHITE;
      const rH = 20;
      s += rect(MARGIN, sy - rH, CONTENT_W, rH, bgColor);
      s += text(MARGIN + 12, sy - 14, items[i], 'F1', 9, DARK);
      s += text(MARGIN + CONTENT_W - 200, sy - 14, '$________', 'F1', 9, GRAY);
      s += text(MARGIN + CONTENT_W - 130, sy - 14, '$________', 'F1', 9, GRAY);
      s += text(MARGIN + CONTENT_W - 60, sy - 14, '$________', 'F1', 9, GRAY);
      sy -= rH;
    }
    // Subtotal
    s += rect(MARGIN, sy - 20, CONTENT_W, 20, color);
    s += text(MARGIN + 12, sy - 14, `SUBTOTAL`, 'F2', 9, WHITE);
    s += text(MARGIN + CONTENT_W - 200, sy - 14, '$________', 'F2', 9, WHITE);
    s += text(MARGIN + CONTENT_W - 130, sy - 14, '$________', 'F2', 9, WHITE);
    s += text(MARGIN + CONTENT_W - 60, sy - 14, '$________', 'F2', 9, WHITE);
    sy -= 20;
    return sy;
  }
  
  // Needs (50%)
  const needsItems = [
    'Housing / Rent / Mortgage',
    'Utilities (Electric, Gas, Water)',
    'Groceries & Household',
    'Transportation (Gas, Transit)',
    'Insurance (Health, Auto, Home)',
    'Minimum Debt Payments',
    'Phone / Internet',
    'Childcare / Education',
  ];
  y = expenseSection('NEEDS', 50, EMERALD, needsItems, y);
  
  // Wants (30%)
  y -= 16;
  const wantsItems = [
    'Entertainment (Movies, Games)',
    'Dining Out / Takeaway',
    'Shopping (Clothes, Electronics)',
    'Subscriptions (Streaming, Gym)',
    'Travel / Vacations',
    'Hobbies & Recreation',
    'Personal Care / Beauty',
  ];
  y = expenseSection('WANTS', 30, TEAL, wantsItems, y);
  
  // Savings & Debt (20%)
  y -= 16;
  const savingsItems = [
    'Emergency Fund',
    'Investments / SIP / Mutual Funds',
    'Extra Debt Payments',
    'Retirement (401k, IRA, NPS)',
    'Education Savings',
    'Other Savings Goals',
  ];
  y = expenseSection('SAVINGS & DEBT REPAYMENT', 20, EMERALD, savingsItems, y);
  
  // Grand total
  y -= 16;
  s += rect(MARGIN, y - 24, CONTENT_W, 24, DARK);
  s += text(MARGIN + 12, y - 17, 'TOTAL EXPENSES', 'F2', 11, WHITE);
  s += text(MARGIN + CONTENT_W - 200, y - 17, '$________', 'F2', 10, WHITE);
  s += text(MARGIN + CONTENT_W - 130, y - 17, '$________', 'F2', 10, WHITE);
  s += text(MARGIN + CONTENT_W - 60, y - 17, '$________', 'F2', 10, WHITE);
  
  s += footer(3, 6);
  return s;
}

// ============ PAGE 4: Savings Goals Tracker ============
function page4Content() {
  let s = '';
  
  // Page header
  s += rect(0, H - 60, W, 60, EMERALD);
  s += text(MARGIN, H - 40, 'Savings Goals Tracker', 'F2', 18, WHITE);
  
  let y = H - 86;
  s += text(MARGIN, y, 'Define your financial goals and track progress monthly. Break big goals into manageable monthly contributions.', 'F1', 10, GRAY);
  
  // Goals table
  y -= 30;
  const rowH = 28;
  const cols = [MARGIN, MARGIN + 130, MARGIN + 230, MARGIN + 330, MARGIN + 420, MARGIN + 490];
  const colWidths = [130, 100, 100, 90, 70, CONTENT_W - 490 + MARGIN];
  
  // Header
  s += rect(MARGIN, y - rowH, CONTENT_W, rowH, EMERALD);
  s += text(cols[0] + 6, y - 18, 'Goal Name', 'F2', 9, WHITE);
  s += text(cols[1] + 6, y - 18, 'Target Amount', 'F2', 9, WHITE);
  s += text(cols[2] + 6, y - 18, 'Current Saved', 'F2', 9, WHITE);
  s += text(cols[3] + 6, y - 18, 'Monthly Amt', 'F2', 9, WHITE);
  s += text(cols[4] + 6, y - 18, 'Target Date', 'F2', 9, WHITE);
  s += text(cols[5] + 6, y - 18, 'Progress', 'F2', 9, WHITE);
  y -= rowH;
  
  // 5 goal rows
  const goalExamples = [
    'Emergency Fund (6 months)',
    'Vacation / Travel Fund',
    'Down Payment / Home',
    'New Car / Vehicle',
    'Education / Course',
  ];
  
  for (let i = 0; i < goalExamples.length; i++) {
    const bgColor = i % 2 === 0 ? LIGHT_BG : WHITE;
    const rH = 36;
    s += rect(MARGIN, y - rH, CONTENT_W, rH, bgColor);
    s += strokeRect(MARGIN, y - rH, CONTENT_W, rH, '0.800 0.800 0.800', 0.25);
    s += text(cols[0] + 6, y - 14, goalExamples[i], 'F1', 8, GRAY);
    s += text(cols[0] + 6, y - 28, '______________________', 'F1', 8, GRAY);
    s += text(cols[1] + 6, y - 22, '$__________', 'F1', 9, GRAY);
    s += text(cols[2] + 6, y - 22, '$__________', 'F1', 9, GRAY);
    s += text(cols[3] + 6, y - 22, '$__________', 'F1', 9, GRAY);
    s += text(cols[4] + 6, y - 22, '___/___/___', 'F1', 9, GRAY);
    s += text(cols[5] + 6, y - 22, '_____%', 'F1', 9, GRAY);
    y -= rH;
  }
  
  // Progress visualization section
  y -= 30;
  s += text(MARGIN, y, 'Goal Progress Bars (shade in your progress)', 'F2', 14, DARK);
  y -= 8;
  s += line(MARGIN, y, MARGIN + 280, y, EMERALD, 1);
  
  y -= 30;
  for (let i = 0; i < 5; i++) {
    s += text(MARGIN, y, `Goal ${i + 1}: `, 'F1', 10, DARK);
    // Draw empty progress bar
    s += strokeRect(MARGIN + 50, y - 4, 400, 16, '0.700 0.700 0.700', 0.5);
    // Percentage markers
    s += line(MARGIN + 50 + 100, y - 4, MARGIN + 50 + 100, y + 12, '0.850 0.850 0.850', 0.25);
    s += line(MARGIN + 50 + 200, y - 4, MARGIN + 50 + 200, y + 12, '0.850 0.850 0.850', 0.25);
    s += line(MARGIN + 50 + 300, y - 4, MARGIN + 50 + 300, y + 12, '0.850 0.850 0.850', 0.25);
    s += text(MARGIN + 50 + 95, y - 16, '25%', 'F1', 7, GRAY);
    s += text(MARGIN + 50 + 195, y - 16, '50%', 'F1', 7, GRAY);
    s += text(MARGIN + 50 + 295, y - 16, '75%', 'F1', 7, GRAY);
    s += text(MARGIN + 50 + 390, y - 16, '100%', 'F1', 7, GRAY);
    y -= 40;
  }
  
  // Tips
  y -= 16;
  s += rect(MARGIN, y - 60, CONTENT_W, 60, LIGHT_BG);
  s += strokeRect(MARGIN, y - 60, CONTENT_W, 60, EMERALD, 0.5);
  s += text(MARGIN + 12, y - 16, 'Pro Tip: Automate your savings!', 'F2', 10, DARK);
  s += text(MARGIN + 12, y - 32, 'Set up automatic transfers on payday so savings happen before spending.', 'F1', 9, GRAY);
  s += text(MARGIN + 12, y - 48, 'Even small amounts add up - $50/month becomes $600/year plus interest.', 'F1', 9, GRAY);
  
  s += footer(4, 6);
  return s;
}

// ============ PAGE 5: Debt Payoff Planner ============
function page5Content() {
  let s = '';
  
  // Page header
  s += rect(0, H - 60, W, 60, EMERALD);
  s += text(MARGIN, H - 40, 'Debt Payoff Planner', 'F2', 18, WHITE);
  
  let y = H - 86;
  s += text(MARGIN, y, 'List all debts and plan your payoff strategy. Focus extra payments on the highest interest debt (Avalanche)', 'F1', 10, GRAY);
  y -= 14;
  s += text(MARGIN, y, 'or the smallest balance (Snowball) for psychological wins.', 'F1', 10, GRAY);
  
  // Debt table
  y -= 28;
  const rowH = 30;
  
  // Header
  s += rect(MARGIN, y - rowH, CONTENT_W, rowH, EMERALD);
  s += text(MARGIN + 6, y - 20, 'Creditor / Debt', 'F2', 9, WHITE);
  s += text(MARGIN + 120, y - 20, 'Balance', 'F2', 9, WHITE);
  s += text(MARGIN + 200, y - 20, 'Interest %', 'F2', 9, WHITE);
  s += text(MARGIN + 280, y - 20, 'Min Payment', 'F2', 9, WHITE);
  s += text(MARGIN + 370, y - 20, 'Extra Pmt', 'F2', 9, WHITE);
  s += text(MARGIN + 445, y - 20, 'Payoff Date', 'F2', 9, WHITE);
  y -= rowH;
  
  // 8 debt rows
  const debtExamples = [
    'Credit Card 1',
    'Credit Card 2',
    'Student Loan',
    'Car Loan',
    'Personal Loan',
    'Medical Debt',
    'Store Credit',
    'Other Debt',
  ];
  
  for (let i = 0; i < debtExamples.length; i++) {
    const bgColor = i % 2 === 0 ? LIGHT_BG : WHITE;
    s += rect(MARGIN, y - rowH, CONTENT_W, rowH, bgColor);
    s += strokeRect(MARGIN, y - rowH, CONTENT_W, rowH, '0.800 0.800 0.800', 0.25);
    s += text(MARGIN + 6, y - 20, debtExamples[i], 'F1', 9, GRAY);
    s += text(MARGIN + 120, y - 20, '$_________', 'F1', 9, GRAY);
    s += text(MARGIN + 200, y - 20, '______%', 'F1', 9, GRAY);
    s += text(MARGIN + 280, y - 20, '$_________', 'F1', 9, GRAY);
    s += text(MARGIN + 370, y - 20, '$_________', 'F1', 9, GRAY);
    s += text(MARGIN + 445, y - 20, '___/___/___', 'F1', 9, GRAY);
    y -= rowH;
  }
  
  // Totals row
  s += rect(MARGIN, y - rowH, CONTENT_W, rowH, EMERALD);
  s += text(MARGIN + 6, y - 20, 'TOTALS', 'F2', 10, WHITE);
  s += text(MARGIN + 120, y - 20, '$_________', 'F2', 9, WHITE);
  s += text(MARGIN + 280, y - 20, '$_________', 'F2', 9, WHITE);
  s += text(MARGIN + 370, y - 20, '$_________', 'F2', 9, WHITE);
  y -= rowH;
  
  // Strategy section
  y -= 28;
  s += text(MARGIN, y, 'Payoff Strategy', 'F2', 14, DARK);
  y -= 8;
  s += line(MARGIN, y, MARGIN + 120, y, EMERALD, 1);
  
  y -= 24;
  s += text(MARGIN + 12, y, 'My chosen method:    [ ] Avalanche (highest interest first)    [ ] Snowball (smallest balance first)', 'F1', 10, DARK);
  y -= 20;
  s += text(MARGIN + 12, y, 'Total monthly debt budget: $_______________', 'F1', 10, DARK);
  y -= 20;
  s += text(MARGIN + 12, y, 'Extra amount available for debt: $_______________', 'F1', 10, DARK);
  y -= 20;
  s += text(MARGIN + 12, y, 'Debt-free target date: _______________', 'F1', 10, DARK);
  
  // Motivation box
  y -= 36;
  s += rect(MARGIN, y - 70, CONTENT_W, 70, LIGHT_BG);
  s += strokeRect(MARGIN, y - 70, CONTENT_W, 70, EMERALD, 0.5);
  s += text(MARGIN + 12, y - 16, 'Debt Payoff Milestones', 'F2', 11, DARK);
  s += text(MARGIN + 12, y - 34, 'First debt paid off: ________________    Date achieved: ___/___/___', 'F1', 9, GRAY);
  s += text(MARGIN + 12, y - 50, '50% of total debt paid: ______________    Date achieved: ___/___/___', 'F1', 9, GRAY);
  s += text(MARGIN + 12, y - 66, 'Completely debt-free: _______________    Date achieved: ___/___/___', 'F1', 9, GRAY);
  
  s += footer(5, 6);
  return s;
}

// ============ PAGE 6: Monthly Review Checklist ============
function page6Content() {
  let s = '';
  
  // Page header
  s += rect(0, H - 60, W, 60, EMERALD);
  s += text(MARGIN, H - 40, 'Monthly Review Checklist', 'F2', 18, WHITE);
  
  let y = H - 86;
  s += text(MARGIN, y, 'Complete this checklist at the end of each month to stay on track and improve your budgeting.', 'F1', 10, GRAY);
  
  // Checklist items
  y -= 30;
  s += text(MARGIN, y, 'End-of-Month Review', 'F2', 14, DARK);
  y -= 8;
  s += line(MARGIN, y, MARGIN + 160, y, EMERALD, 1);
  
  y -= 24;
  const checkItems = [
    'Recorded all income received this month',
    'Categorized and recorded all expenses',
    'Compared actual spending vs budget for each category',
    'Identified any overspending areas',
    'Updated savings goals progress',
    'Made all minimum debt payments on time',
    'Applied extra payments to target debt',
    'Reviewed and cancelled unused subscriptions',
    'Checked all bills for errors or unexpected charges',
    'Updated net worth calculation',
    'Set next month budget based on learnings',
    'Celebrated wins (no matter how small!)',
  ];
  
  for (let i = 0; i < checkItems.length; i++) {
    s += strokeRect(MARGIN + 4, y - 2, 12, 12, EMERALD, 0.75);
    s += text(MARGIN + 24, y, checkItems[i], 'F1', 10, DARK);
    y -= 22;
  }
  
  // Monthly summary
  y -= 20;
  s += text(MARGIN, y, 'Monthly Summary', 'F2', 14, DARK);
  y -= 8;
  s += line(MARGIN, y, MARGIN + 130, y, EMERALD, 1);
  
  y -= 22;
  s += text(MARGIN + 12, y, 'Total Income:  $_______________', 'F1', 10, DARK);
  y -= 18;
  s += text(MARGIN + 12, y, 'Total Expenses:  $_______________', 'F1', 10, DARK);
  y -= 18;
  s += text(MARGIN + 12, y, 'Net Savings:  $_______________', 'F1', 10, DARK);
  y -= 18;
  s += text(MARGIN + 12, y, 'Savings Rate:  _______________%', 'F1', 10, DARK);
  
  // Next month adjustments
  y -= 30;
  s += text(MARGIN, y, 'Next Month Adjustments', 'F2', 14, DARK);
  y -= 8;
  s += line(MARGIN, y, MARGIN + 180, y, EMERALD, 1);
  
  y -= 20;
  s += text(MARGIN, y, 'What worked well this month:', 'F1', 10, DARK);
  y -= 4;
  for (let i = 0; i < 3; i++) {
    y -= 18;
    s += line(MARGIN + 12, y, W - MARGIN, y, '0.850 0.850 0.850', 0.25);
  }
  
  y -= 20;
  s += text(MARGIN, y, 'What needs improvement:', 'F1', 10, DARK);
  y -= 4;
  for (let i = 0; i < 3; i++) {
    y -= 18;
    s += line(MARGIN + 12, y, W - MARGIN, y, '0.850 0.850 0.850', 0.25);
  }
  
  y -= 20;
  s += text(MARGIN, y, 'Specific changes for next month:', 'F1', 10, DARK);
  y -= 4;
  for (let i = 0; i < 3; i++) {
    y -= 18;
    s += line(MARGIN + 12, y, W - MARGIN, y, '0.850 0.850 0.850', 0.25);
  }
  
  s += footer(6, 6);
  return s;
}

// ============ BUILD PDF ============
function buildPDF() {
  const objects = [];
  let objNum = 1;
  
  // We'll build: Catalog, Pages, Font(Helvetica), Font(Helvetica-Bold), then Page+Content pairs
  
  // Generate page contents first
  const pageContents = [
    page1Content(),
    page2Content(),
    page3Content(),
    page4Content(),
    page5Content(),
    page6Content(),
  ];
  
  // Object layout:
  // 1: Catalog
  // 2: Pages
  // 3: Font F1 (Helvetica)
  // 4: Font F2 (Helvetica-Bold)
  // 5,6: Page 1 (page obj, content stream)
  // 7,8: Page 2
  // 9,10: Page 3
  // 11,12: Page 4
  // 13,14: Page 5
  // 15,16: Page 6
  
  const numPages = 6;
  const pageObjNums = [];
  for (let i = 0; i < numPages; i++) {
    pageObjNums.push(5 + i * 2);
  }
  
  // Object 1: Catalog
  objects.push(`1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj`);
  
  // Object 2: Pages
  const kidsStr = pageObjNums.map(n => `${n} 0 R`).join(' ');
  objects.push(`2 0 obj\n<< /Type /Pages /Kids [${kidsStr}] /Count ${numPages} >>\nendobj`);
  
  // Object 3: Font F1 (Helvetica)
  objects.push(`3 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>\nendobj`);
  
  // Object 4: Font F2 (Helvetica-Bold)
  objects.push(`4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>\nendobj`);
  
  // Pages and content streams
  for (let i = 0; i < numPages; i++) {
    const pageObjNum = 5 + i * 2;
    const contentObjNum = 6 + i * 2;
    const content = pageContents[i];
    const contentBytes = Buffer.byteLength(content, 'latin1');
    
    // Page object
    objects.push(`${pageObjNum} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${W} ${H}] /Contents ${contentObjNum} 0 R /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> >>\nendobj`);
    
    // Content stream
    objects.push(`${contentObjNum} 0 obj\n<< /Length ${contentBytes} >>\nstream\n${content}\nendstream\nendobj`);
  }
  
  // Build the PDF file
  const header = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
  
  let body = '';
  const offsets = [];
  let currentOffset = Buffer.byteLength(header, 'latin1');
  
  for (let i = 0; i < objects.length; i++) {
    offsets.push(currentOffset);
    const objStr = objects[i] + '\n';
    body += objStr;
    currentOffset += Buffer.byteLength(objStr, 'latin1');
  }
  
  // Cross-reference table
  const xrefOffset = currentOffset;
  const totalObjects = objects.length + 1; // +1 for object 0
  let xref = `xref\n0 ${totalObjects}\n`;
  xref += '0000000000 65535 f \n';
  for (let i = 0; i < offsets.length; i++) {
    xref += offsets[i].toString().padStart(10, '0') + ' 00000 n \n';
  }
  
  // Trailer
  const trailer = `trailer\n<< /Size ${totalObjects} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;
  
  const pdf = header + body + xref + trailer;
  
  // Write as binary (latin1 preserves byte values)
  const outputPath = path.join(__dirname, '..', 'public', 'budget-template.pdf');
  fs.writeFileSync(outputPath, pdf, 'latin1');
  
  console.log(`PDF generated: ${outputPath}`);
  console.log(`Size: ${Buffer.byteLength(pdf, 'latin1')} bytes`);
  console.log(`Objects: ${objects.length}`);
  console.log(`Pages: ${numPages}`);
}

buildPDF();
