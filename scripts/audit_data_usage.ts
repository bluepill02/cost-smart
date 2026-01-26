
import fs from 'fs';
import path from 'path';

const calcDir = path.join(process.cwd(), 'app');
const componentsDir = path.join(process.cwd(), 'components/calculators');

function checkDataIntegration() {
  const filesToCheck = [
    { name: 'PPF Calculator', path: path.join(componentsDir, 'investment/PPFCalculator.tsx'), dataFile: 'rbi-data.ts' },
    { name: 'FD Calculator', path: path.join(componentsDir, 'investment/FDCalculator.tsx'), dataFile: 'rbi-data.ts' },
    { name: 'Income Tax Calculator', path: path.join(componentsDir, 'tax/IncomeTaxCalculator.tsx'), dataFile: 'tax-data.ts' },
    { name: 'GST Calculator', path: path.join(componentsDir, 'tax/GSTCalculator.tsx'), dataFile: 'tax-data.ts' }
  ];

  filesToCheck.forEach(file => {
    if (fs.existsSync(file.path)) {
      const content = fs.readFileSync(file.path, 'utf-8');
      if (!content.includes(file.dataFile) && !content.includes('lib/' + file.dataFile)) {
        console.log(`[WARNING] ${file.name} does NOT appear to import ${file.dataFile}`);
      } else {
        console.log(`[OK] ${file.name} imports ${file.dataFile}`);
      }
    } else {
       console.log(`[MISSING] ${file.path}`);
    }
  });
}

checkDataIntegration();
