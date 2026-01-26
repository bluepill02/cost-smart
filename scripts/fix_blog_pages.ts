
import fs from 'fs';
import path from 'path';

const blogDir = path.join(process.cwd(), 'app/blog');

function fixBlogPages() {
  if (!fs.existsSync(blogDir)) {
    console.error(`Blog directory not found: ${blogDir}`);
    return;
  }

  const files = fs.readdirSync(blogDir);

  files.forEach(file => {
    const filePath = path.join(blogDir, file, 'page.tsx');
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf-8');
      let modified = false;

      // Fix 1: Change readTime to readingTime in BlogLayout props
      if (content.includes('readTime=')) {
        content = content.replace(/readTime=/g, 'readingTime=');
        modified = true;
      }

      // Fix 2: Wrap return statement in Fragment if JsonLd is adjacent to another element at root
      // This is a heuristic. We look for the pattern where JsonLd is followed by another tag without a wrapper.
      // The broken pattern likely looks like:
      // return (
      //   <JsonLd ... />
      //   <BlogLayout ...>
      // );

      // We will blindly wrap the content of return (...) in <> ... </> if it contains JsonLd and isn't already wrapped.
      // A safer regex approach: capture everything inside return ( ... ); and wrap it.

      const returnMatch = content.match(/return\s*\(\s*([\s\S]*?)\s*\);/);
      if (returnMatch) {
        const returnBody = returnMatch[1];

        // check if it starts with <JsonLd and doesn't have a parent wrapper
        // If the body starts with <JsonLd and has multiple root elements, it needs a fragment.
        // We can just wrap it in <>...</> regardless, as nested fragments are harmless.

        // However, we need to be careful not to double wrap if we already fixed it or if it was correct.
        // But the previous error showed "return (" followed immediately by "<JsonLd".

        // Let's strictly target the specific broken structure we created.
        if (returnBody.trim().startsWith('<JsonLd') && !returnBody.trim().startsWith('<>')) {
             const newReturnBody = `<>
      ${returnBody}
    </>`;
             content = content.replace(returnBody, newReturnBody);
             modified = true;
        }
      }

      if (modified) {
        fs.writeFileSync(filePath, content, 'utf-8');
        console.log(`Fixed ${filePath}`);
      }
    }
  });
}

fixBlogPages();
