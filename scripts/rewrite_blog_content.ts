
import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'app/blog');

// Helper to generate full article content
const generateFullArticle = (title: string, calculatorName: string, link: string) => {
  return `
      <h2>Introduction</h2>
      <p>The <strong>${calculatorName}</strong> is an essential financial tool designed to help individuals and professionals make data-driven decisions. In today's complex economic landscape, accuracy is paramount. This guide will walk you through how to use our calculator to optimize your financial planning, whether you are managing personal wealth or business finances.</p>

      <h2>How to Use This Calculator</h2>
      <p>Using the ${calculatorName} is straightforward, but understanding the inputs ensures precise results:</p>
      <ol>
        <li><strong>Input Key Data:</strong> Enter your specific financial figures (e.g., investment amount, interest rate, income). Accurate inputs lead to accurate outputs.</li>
        <li><strong>Adjust Variables:</strong> Use the interactive sliders or input fields to test different scenarios. "What if" analysis is key to smart planning.</li>
        <li><strong>Analyze the Output:</strong> Review the calculated results, charts, and breakdowns. Focus on the long-term impact of these numbers.</li>
      </ol>

      <h2>Why Accuracy Matters</h2>
      <p>Financial errors compound over time. A small miscalculation in ${calculatorName} logic can lead to significant discrepancies over 10 or 20 years. Our tool uses verified algorithms aligned with the latest FY 2024-25 financial regulations and RBI guidelines to ensure you get the right numbers every time.</p>

      <h2>Common Use Cases</h2>
      <ul>
        <li><strong>Scenario Planning:</strong> Compare different financial strategies side-by-side.</li>
        <li><strong>Goal Setting:</strong> Determine exactly what you need to save or earn to hit your targets.</li>
        <li><strong>Audit & Verification:</strong> Double-check manual calculations or quotes from agents.</li>
      </ul>

      <div className="bg-blue-50 p-6 rounded-lg my-8 border border-blue-100">
        <h3 className="text-xl font-bold text-blue-900 mb-2">Ready to Calculate?</h3>
        <p className="mb-4 text-blue-800">Stop guessing and start planning with precision.</p>
        <a href="${link}" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm">
          Launch ${calculatorName}
        </a>
      </div>

      <div className="mt-12 p-6 bg-slate-50 rounded-xl border-l-4 border-emerald-500">
        <h2 className="text-xl font-bold text-slate-900 mb-4">Expert Financial Perspective</h2>
        <p className="mb-4"><strong>The Strategic View:</strong> Don't just look at the immediate output. Consider the opportunity cost. ${calculatorName.includes('Loan') ? 'Is the interest rate fixed or floating? How does prepayment affect your tenure?' : ''} ${calculatorName.includes('Investment') ? 'Are you accounting for inflation-adjusted returns (Real ROI)?' : ''} ${calculatorName.includes('Tax') ? 'Have you maximized all available deductions under the latest regime?' : ''}</p>

        <p><strong>Pro Tip:</strong> Re-calculate your position annually. Financial rules change, and so do your personal circumstances. Make this tool a part of your yearly financial health checkup.</p>
      </div>
  `;
};

function rewriteBlogContent() {
  if (!fs.existsSync(blogDir)) {
    console.error(`Blog directory not found: ${blogDir}`);
    return;
  }

  const files = fs.readdirSync(blogDir);

  files.forEach(dir => {
    const pagePath = path.join(blogDir, dir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      let content = fs.readFileSync(pagePath, 'utf-8');

      // Extract metadata to preserve it
      const metadataMatch = content.match(/export const metadata[\s\S]*?};/);
      const blogLayoutMatch = content.match(/<BlogLayout[\s\S]*?>/);

      if (metadataMatch && blogLayoutMatch) {
        const metadata = metadataMatch[0];
        const layoutOpen = blogLayoutMatch[0];

        // Derive names from directory
        // dir = "how-to-use-gst-calculator"
        const nameParts = dir.replace('how-to-use-', '').replace('ultimate-guide-', '').split('-');
        const name = nameParts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');

        // Map to link (heuristic)
        let link = '/';
        if (dir.includes('gst')) link = '/in/gst-calculator';
        else if (dir.includes('ppf')) link = '/in/ppf-calculator';
        else if (dir.includes('sip')) link = '/in/sip-calculator';
        else if (dir.includes('loan')) link = '/home-loan-calculator';
        // ... default fallback

        const newBody = generateFullArticle(name, name, link);

        const newFileContent = `import { Metadata } from 'next';
import BlogLayout from '@/components/blog/BlogLayout';

${metadata}

export default function Post() {
  return (
    ${layoutOpen}
${newBody}
    </BlogLayout>
  );
}
`;
        fs.writeFileSync(pagePath, newFileContent, 'utf-8');
        console.log(`Rewrote ${dir}`);
      }
    }
  });
}

rewriteBlogContent();
