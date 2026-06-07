'use client';

import { useState } from 'react';
import { Languages, X, Loader2, Copy, Check, ArrowRightLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LANGUAGES = [
  { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
  { code: 'te', name: 'Telugu', native: 'తెలుగు' },
  { code: 'bn', name: 'Bengali', native: 'বাংলা' },
  { code: 'mr', name: 'Marathi', native: 'मराठी' },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' },
];

interface TranslateButtonProps {
  text?: string;
  className?: string;
}

export default function TranslateButton({ text = '', className = '' }: TranslateButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [targetLang, setTargetLang] = useState('hi');
  const [translatedText, setTranslatedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleTranslate = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setError(null);
    setTranslatedText('');

    try {
      const subscriptionId = typeof window !== 'undefined' ? localStorage.getItem('subscriptionId') : null;
      const userIsPro = !!subscriptionId;

      const res = await fetch('/api/azure/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text,
          targetLanguage: targetLang,
          isPro: userIsPro,
          subscriptionId: subscriptionId || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Translation failed');
        return;
      }

      setTranslatedText(data.translations?.[0]?.translatedText || '');
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!translatedText) return;
    await navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedLang = LANGUAGES.find(l => l.code === targetLang);

  return (
    <div className={`relative inline-block ${className}`}>
      {/* Floating Translate Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="gap-1.5 text-orange-600 border-orange-200 hover:bg-orange-50"
      >
        <Languages className="w-4 h-4" />
        Translate
      </Button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute bottom-full mb-2 right-0 z-50 w-80 bg-white border border-gray-200 rounded-xl shadow-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-900 flex items-center gap-1.5">
              <Languages className="w-4 h-4 text-orange-600" />
              Translate Results
            </h4>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Language Selection */}
          <div className="grid grid-cols-2 gap-1.5 mb-3">
            {LANGUAGES.slice(0, 4).map((lang) => (
              <button
                key={lang.code}
                onClick={() => setTargetLang(lang.code)}
                className={`text-xs p-1.5 rounded-md border transition-all
                  ${targetLang === lang.code
                    ? 'border-orange-500 bg-orange-50 text-orange-700'
                    : 'border-gray-200 hover:border-orange-300'
                  }
                `}
              >
                {lang.native} ({lang.name})
              </button>
            ))}
          </div>

          {/* More languages dropdown */}
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full text-xs p-1.5 border border-gray-200 rounded-md mb-3"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name} ({lang.native})
              </option>
            ))}
          </select>

          {/* Translate Action */}
          <Button
            onClick={handleTranslate}
            disabled={loading || !text.trim()}
            size="sm"
            className="w-full bg-orange-600 hover:bg-orange-700 text-white text-xs"
          >
            {loading ? (
              <Loader2 className="w-3 h-3 animate-spin mr-1" />
            ) : (
              <ArrowRightLeft className="w-3 h-3 mr-1" />
            )}
            Translate to {selectedLang?.name}
          </Button>

          {/* Error */}
          {error && (
            <p className="text-xs text-red-600 mt-2">{error}</p>
          )}

          {/* Translation Result */}
          {translatedText && (
            <div className="mt-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-500">{selectedLang?.name} translation</span>
                <button
                  onClick={handleCopy}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  {copied ? (
                    <Check className="w-3 h-3 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3" />
                  )}
                  {copied ? 'Copied' : 'Copy'}
                </button>
              </div>
              <div className="p-2 bg-orange-50 border border-orange-200 rounded-md text-xs leading-relaxed max-h-32 overflow-y-auto">
                {translatedText}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
