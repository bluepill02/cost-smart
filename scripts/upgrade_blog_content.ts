
import fs from 'fs';
import path from 'path';
import { EXPERT_CONTENT_MAP, DEFAULT_EXPERT_CONTENT } from '../lib/blog-content-map';

const blogDir = path.join(process.cwd(), 'app/blog');

function upgradeBlogContent() {
  if (!fs.existsSync(blogDir)) {
    console.error(`Blog directory not found: ${blogDir}`);
    return;
  }

  const files = fs.readdirSync(blogDir);

  files.forEach(dir => {
    const pagePath = path.join(blogDir, dir, 'page.tsx');
    if (fs.existsSync(pagePath)) {
      let content = fs.readFileSync(pagePath, 'utf-8');

      // Identify the calculator type from the slug (simplified)
      // e.g., 'how-to-use-ppf-calculator' -> 'ppf-calculator'
      let calculatorType = '';
      const slug = dir;

      if (slug.includes('ppf')) calculatorType = 'ppf-calculator';
      else if (slug.includes('gst')) calculatorType = 'gst-calculator';
      else if (slug.includes('home-loan')) calculatorType = 'home-loan-calculator';
      else if (slug.includes('sip')) calculatorType = 'sip-calculator';
      else if (slug.includes('income-tax')) calculatorType = 'income-tax-calculator';

      // Get expert content or default
      const expertContent = EXPERT_CONTENT_MAP[calculatorType] || DEFAULT_EXPERT_CONTENT;

      // Check if we need to inject or replace
      // We look for the closing </BlogLayout> tag and insert before it
      // But we want to replace generic content if it exists.

      // Let's look for a placeholder or just append to the end of the content body

      if (!content.includes('Expert Perspective') && !content.includes('Expert Financial Insight')) {
         // Find the closing </BlogLayout>
         const closingTagIndex = content.lastIndexOf('</BlogLayout>');
         if (closingTagIndex !== -1) {
             const newContent = content.slice(0, closingTagIndex) +
                                `\n      <div className="mt-12 p-6 bg-slate-50 rounded-xl border-l-4 border-emerald-500">\n` +
                                `        ${expertContent}\n` +
                                `      </div>\n` +
                                content.slice(closingTagIndex);
             fs.writeFileSync(pagePath, newContent, 'utf-8');
             console.log(`Upgraded ${dir} with expert content.`);
         }
      }
    }
  });
}

upgradeBlogContent();
