/**
 * CostSmart Full SEO Audit Script
 * Scans all page.tsx files and checks for SEO issues
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const ISSUES = [];
const STATS = {
  totalPages: 0,
  titleMissing: 0,
  titleTooLong: 0,
  titleTooShort: 0,
  descMissing: 0,
  descTooLong: 0,
  descTooShort: 0,
  canonicalMissing: 0,
  ogUrlMismatch: 0,
  ogTitleMissing: 0,
  ogDescMissing: 0,
  multipleH1: 0,
  noH1: 0,
  schemaMissing: 0,
  duplicateTitles: 0,
  duplicateDescs: 0,
};

const seenTitles = {};
const seenDescs = {};
const pageResults = [];

function getAllPageFiles(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      // Skip node_modules, .next, .git
      if (!['node_modules', '.next', '.git', 'siteaudit'].includes(entry.name)) {
        getAllPageFiles(fullPath, results);
      }
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      results.push(fullPath);
    }
  }
  return results;
}

function extractString(content, pattern) {
  const match = content.match(pattern);
  return match ? match[1].trim() : null;
}

function analyzeFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const relPath = filePath.replace(ROOT + path.sep, '').replace(/\\/g, '/');
  const urlPath = relPath
    .replace(/^app/, '')
    .replace(/\/page\.tsx$/, '')
    .replace(/\/page\.ts$/, '') || '/';

  const issues = [];
  const info = { path: relPath, url: urlPath || '/', title: null, desc: null, canonical: null, ogUrl: null, ogTitle: null, ogDesc: null };

  // --- Extract title ---
  let titleMatch =
    content.match(/title:\s*['"`](.*?)['"`]/) ||
    content.match(/title:\s*\{\s*default:\s*['"`](.*?)['"`]/) ||
    content.match(/title:\s*\{\s*template:\s*['"`](.*?)['"`]/);
  if (titleMatch) info.title = titleMatch[1];

  // --- Extract description ---
  let descMatch = content.match(/description:\s*['"`]([\s\S]*?)['"`]\s*[,\n}]/);
  if (descMatch) info.desc = descMatch[1].replace(/\s+/g, ' ').trim();

  // --- Extract canonical ---
  let canonMatch = content.match(/canonical:\s*['"`](.*?)['"`]/);
  if (canonMatch) info.canonical = canonMatch[1];

  // --- Extract OG URL ---
  let ogUrlMatch = content.match(/(?:openGraph[\s\S]{0,200}?url:|url:\s*['"`]https).*?['"`](https?:\/\/[^'"`]+)['"`]/);
  if (!ogUrlMatch) {
    ogUrlMatch = content.match(/url:\s*`[^`]*`/);
  }
  // simpler OG url extraction
  const ogSection = content.match(/openGraph\s*:\s*\{([\s\S]{0,600}?)\}/);
  if (ogSection) {
    const ogContent = ogSection[1];
    const ogUrlInner = ogContent.match(/url:\s*['"`](.*?)['"`]/);
    if (ogUrlInner) info.ogUrl = ogUrlInner[1];
    const ogTitleInner = ogContent.match(/title:\s*['"`](.*?)['"`]/);
    if (ogTitleInner) info.ogTitle = ogTitleInner[1];
    const ogDescInner = ogContent.match(/description:\s*['"`](.*?)['"`]/);
    if (ogDescInner) info.ogDesc = ogDescInner[1];
  }

  // --- H1 analysis ---
  const h1Matches = content.match(/<h1[\s>]/gi) || [];
  const h1Count = h1Matches.length;

  // --- Schema analysis ---
  const hasSchema = content.includes('JsonLd') || content.includes('ld+json') ||
    content.includes('getCalculatorSchema') || content.includes('CalculatorSchemaInjector') ||
    content.includes('getArticleSchema') || content.includes('generateSchema') ||
    content.includes('@type') || content.includes('application/ld+json');

  // ===== ISSUE CHECKS =====

  // Title checks
  if (!info.title) {
    issues.push({ severity: 'ERROR', type: 'TITLE_MISSING', msg: 'No title found in metadata' });
    STATS.titleMissing++;
  } else {
    const len = info.title.length;
    if (len > 60) {
      issues.push({ severity: 'WARN', type: 'TITLE_TOO_LONG', msg: `Title is ${len} chars (max 60): "${info.title}"` });
      STATS.titleTooLong++;
    }
    if (len < 30) {
      issues.push({ severity: 'WARN', type: 'TITLE_TOO_SHORT', msg: `Title is only ${len} chars (min 30): "${info.title}"` });
      STATS.titleTooShort++;
    }
    // Duplicate check
    if (seenTitles[info.title] && !urlPath.includes('[')) {
      issues.push({ severity: 'WARN', type: 'TITLE_DUPLICATE', msg: `Duplicate title also used by: ${seenTitles[info.title]}` });
      STATS.duplicateTitles++;
    } else {
      seenTitles[info.title] = urlPath;
    }
  }

  // Description checks
  if (!info.desc) {
    issues.push({ severity: 'ERROR', type: 'DESC_MISSING', msg: 'No meta description found' });
    STATS.descMissing++;
  } else {
    const len = info.desc.length;
    if (len > 160) {
      issues.push({ severity: 'WARN', type: 'DESC_TOO_LONG', msg: `Description is ${len} chars (max 160)` });
      STATS.descTooLong++;
    }
    if (len < 120) {
      issues.push({ severity: 'INFO', type: 'DESC_TOO_SHORT', msg: `Description is ${len} chars (optimal 120-160)` });
      STATS.descTooShort++;
    }
    // Duplicate check
    if (seenDescs[info.desc] && !urlPath.includes('[')) {
      issues.push({ severity: 'WARN', type: 'DESC_DUPLICATE', msg: `Duplicate description also used by: ${seenDescs[info.desc]}` });
      STATS.duplicateDescs++;
    } else {
      seenDescs[info.desc] = urlPath;
    }
  }

  // Canonical checks
  if (!info.canonical) {
    // Only flag pages that have metadata (not API routes, dynamic without metadata etc.)
    if (content.includes('export const metadata') || content.includes('generateMetadata')) {
      issues.push({ severity: 'WARN', type: 'CANONICAL_MISSING', msg: 'No canonical URL in metadata' });
      STATS.canonicalMissing++;
    }
  }

  // OG URL vs Canonical mismatch
  if (info.ogUrl && info.canonical && info.ogUrl !== info.canonical) {
    issues.push({ severity: 'ERROR', type: 'OG_URL_MISMATCH', msg: `OG url "${info.ogUrl}" ≠ canonical "${info.canonical}"` });
    STATS.ogUrlMismatch++;
  }

  // OG tags missing
  if ((content.includes('export const metadata') || content.includes('generateMetadata')) && !ogSection) {
    issues.push({ severity: 'INFO', type: 'OG_MISSING', msg: 'No openGraph metadata block' });
    STATS.ogTitleMissing++;
  }

  // H1 checks
  if (h1Count === 0 && content.includes('return') && content.includes('<')) {
    issues.push({ severity: 'WARN', type: 'H1_MISSING', msg: 'No <h1> tag found on page' });
    STATS.noH1++;
  }
  if (h1Count > 1) {
    issues.push({ severity: 'ERROR', type: 'MULTIPLE_H1', msg: `Found ${h1Count} <h1> tags (should be exactly 1)` });
    STATS.multipleH1++;
  }

  // Schema check  
  if (!hasSchema && (content.includes('export const metadata') || content.includes('generateMetadata'))) {
    // Only flag non-blog pages
    if (!relPath.includes('/blog/') && !relPath.includes('/compare/') && !relPath.includes('/cookies') && !relPath.includes('/privacy') && !relPath.includes('/terms') && !relPath.includes('/about')) {
      issues.push({ severity: 'INFO', type: 'SCHEMA_MISSING', msg: 'No structured data (JSON-LD) found' });
      STATS.schemaMissing++;
    }
  }

  STATS.totalPages++;
  return { ...info, issues, h1Count, hasSchema };
}

// Run the audit
console.log('Scanning all page.tsx files...\n');
const appDir = path.join(ROOT, 'app');
const files = getAllPageFiles(appDir);

for (const file of files) {
  try {
    const result = analyzeFile(file);
    if (result.issues.length > 0) {
      pageResults.push(result);
    }
  } catch (e) {
    console.error(`Error analyzing ${file}: ${e.message}`);
  }
}

// Sort by issue count (most issues first)
pageResults.sort((a, b) => {
  const aErrors = a.issues.filter(i => i.severity === 'ERROR').length;
  const bErrors = b.issues.filter(i => i.severity === 'ERROR').length;
  if (aErrors !== bErrors) return bErrors - aErrors;
  return b.issues.length - a.issues.length;
});

// Generate JSON output
const output = {
  summary: STATS,
  pages: pageResults.map(p => ({
    url: p.url,
    file: p.path,
    title: p.title,
    titleLen: p.title ? p.title.length : 0,
    desc: p.desc ? p.desc.substring(0, 100) + (p.desc.length > 100 ? '...' : '') : null,
    descLen: p.desc ? p.desc.length : 0,
    canonical: p.canonical,
    ogUrl: p.ogUrl,
    issues: p.issues,
  }))
};

fs.writeFileSync('seo-audit-results.json', JSON.stringify(output, null, 2));
console.log('Audit complete. Results written to seo-audit-results.json');
console.log('\n=== SUMMARY ===');
console.log(JSON.stringify(STATS, null, 2));
console.log(`\nPages with issues: ${pageResults.length} / ${STATS.totalPages}`);
