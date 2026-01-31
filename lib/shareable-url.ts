/**
 * Shareable URL System
 * 
 * Encodes calculator results in URL query parameters for easy sharing.
 * Format: /calculator?share=[base64-encoded-data]
 * 
 * Benefits:
 * - No user accounts needed
 * - Instant sharing via copy/paste, WhatsApp, social media
 * - Preserves all calculation inputs and results
 * - Works across all calculators
 */

export interface ShareableData {
  calculator: string;
  inputs: Record<string, any>;
  results?: Record<string, any>;
  timestamp?: number;
}

export class ShareableURLManager {
  /**
   * Encode calculation data into a shareable URL
   */
  static encode(data: ShareableData): string {
    try {
      // Add timestamp for freshness tracking
      const dataWithTimestamp: ShareableData = {
        ...data,
        timestamp: Date.now()
      };

      // Convert to JSON and encode
      const jsonString = JSON.stringify(dataWithTimestamp);
      const encoded = btoa(jsonString);
      
      return encoded;
    } catch (error) {
      console.error('Error encoding shareable data:', error);
      throw new Error('Failed to create shareable link');
    }
  }

  /**
   * Decode shareable URL parameter back to calculation data
   */
  static decode(encodedData: string): ShareableData | null {
    try {
      const decoded = atob(encodedData);
      const data: ShareableData = JSON.parse(decoded);
      
      // Validate basic structure
      if (!data.calculator || !data.inputs) {
        throw new Error('Invalid data structure');
      }

      return data;
    } catch (error) {
      console.error('Error decoding shareable data:', error);
      return null;
    }
  }

  /**
   * Generate full shareable URL for a calculator
   */
  static generateShareableURL(
    calculator: string,
    inputs: Record<string, any>,
    results?: Record<string, any>,
    baseURL: string = typeof window !== 'undefined' ? window.location.origin : ''
  ): string {
    const data: ShareableData = {
      calculator,
      inputs,
      results
    };

    const encoded = this.encode(data);
    return `${baseURL}/${calculator}?share=${encodeURIComponent(encoded)}`;
  }

  /**
   * Extract share parameter from URL
   */
  static getShareDataFromURL(): ShareableData | null {
    if (typeof window === 'undefined') return null;

    const params = new URLSearchParams(window.location.search);
    const shareParam = params.get('share');

    if (!shareParam) return null;

    return this.decode(decodeURIComponent(shareParam));
  }

  /**
   * Check if current URL has shared data
   */
  static hasSharedData(): boolean {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).has('share');
  }

  /**
   * Get age of shared data in days
   */
  static getShareDataAge(data: ShareableData): number | null {
    if (!data.timestamp) return null;
    
    const ageMs = Date.now() - data.timestamp;
    return Math.floor(ageMs / (1000 * 60 * 60 * 24));
  }

  /**
   * Check if share data is fresh (< 30 days old)
   */
  static isShareDataFresh(data: ShareableData, maxAgeDays: number = 30): boolean {
    const age = this.getShareDataAge(data);
    return age !== null && age <= maxAgeDays;
  }

  /**
   * Copy shareable URL to clipboard
   */
  static async copyToClipboard(url: string): Promise<boolean> {
    if (typeof navigator === 'undefined' || !navigator.clipboard) {
      return false;
    }

    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
      return false;
    }
  }

  /**
   * Generate WhatsApp share URL
   */
  static generateWhatsAppURL(shareableURL: string, message?: string): string {
    const text = message 
      ? `${message}\n\n${shareableURL}`
      : shareableURL;
    
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  }

  /**
   * Generate Twitter share URL
   */
  static generateTwitterURL(shareableURL: string, message?: string): string {
    const text = message || 'Check out my calculation';
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareableURL)}`;
  }

  /**
   * Generate Facebook share URL
   */
  static generateFacebookURL(shareableURL: string): string {
    return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareableURL)}`;
  }

  /**
   * Generate LinkedIn share URL
   */
  static generateLinkedInURL(shareableURL: string): string {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareableURL)}`;
  }

  /**
   * Generate email share URL
   */
  static generateEmailURL(shareableURL: string, subject?: string, body?: string): string {
    const emailSubject = subject || 'Check out this calculation';
    const emailBody = body 
      ? `${body}\n\n${shareableURL}`
      : shareableURL;

    return `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  }

  /**
   * Shorten shareable URL (for future implementation with URL shortener service)
   */
  static async shortenURL(longURL: string): Promise<string> {
    // TODO: Implement with URL shortener service (Bitly, TinyURL, etc.)
    // For now, return the original URL
    return longURL;
  }

  /**
   * Validate calculator data structure
   */
  static validateData(data: ShareableData, requiredInputs: string[]): boolean {
    if (!data.calculator || !data.inputs) return false;

    // Check if all required inputs are present
    for (const key of requiredInputs) {
      if (!(key in data.inputs)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Get human-readable share age string
   */
  static getShareAgeString(data: ShareableData): string {
    const age = this.getShareDataAge(data);
    
    if (age === null) return 'Unknown';
    if (age === 0) return 'Today';
    if (age === 1) return 'Yesterday';
    if (age < 7) return `${age} days ago`;
    if (age < 30) return `${Math.floor(age / 7)} weeks ago`;
    if (age < 365) return `${Math.floor(age / 30)} months ago`;
    
    return `${Math.floor(age / 365)} years ago`;
  }
}

/**
 * React Hook for using shareable URLs in components
 */
export function useShareableURL() {
  const [shareData, setShareData] = React.useState<ShareableData | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (ShareableURLManager.hasSharedData()) {
      const data = ShareableURLManager.getShareDataFromURL();
      setShareData(data);
    }
    setIsLoading(false);
  }, []);

  const createShareURL = (
    calculator: string,
    inputs: Record<string, any>,
    results?: Record<string, any>
  ): string => {
    return ShareableURLManager.generateShareableURL(calculator, inputs, results);
  };

  const copyShareURL = async (url: string): Promise<boolean> => {
    return ShareableURLManager.copyToClipboard(url);
  };

  return {
    shareData,
    isLoading,
    hasSharedData: shareData !== null,
    createShareURL,
    copyShareURL,
    isDataFresh: shareData ? ShareableURLManager.isShareDataFresh(shareData) : false,
    dataAge: shareData ? ShareableURLManager.getShareAgeString(shareData) : null
  };
}

// React import for the hook
import React from 'react';

export default ShareableURLManager;
