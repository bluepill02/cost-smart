"use client";

import { useState, useEffect } from 'react';

export function useAdBlockDetected(): boolean {
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const detect = async () => {
      try {
        // Method 1: Try to fetch a bait resource that ad blockers typically block
        await fetch(
          'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
          { method: 'HEAD', mode: 'no-cors' }
        );
      } catch {
        setBlocked(true);
        return;
      }

      // Method 2: Create a bait element that ad blockers target
      const bait = document.createElement('div');
      bait.className = 'adsbox ad-container adsbygoogle';
      bait.style.cssText = 'position:absolute;top:-999px;left:-999px;width:1px;height:1px;';
      bait.innerHTML = '&nbsp;';
      document.body.appendChild(bait);

      // Wait a tick for ad blockers to hide/remove it
      await new Promise(resolve => setTimeout(resolve, 100));

      if (bait.offsetHeight === 0 || bait.clientHeight === 0 || !document.body.contains(bait)) {
        setBlocked(true);
      }

      if (document.body.contains(bait)) {
        document.body.removeChild(bait);
      }
    };

    // Small delay to let ad blocker extensions initialize
    const timer = setTimeout(detect, 1000);
    return () => clearTimeout(timer);
  }, []);

  return blocked;
}
