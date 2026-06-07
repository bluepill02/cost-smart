'use client';

import { useState } from 'react';
import { Languages, Copy, Check, Loader2, Lock, Sparkles, ArrowRightLeft, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const LANGUAGES = [
  { code: 'hi', name: 'Hindi', native: 'हिन्दी', free: true },
  { code: 'ta', name: 'Tamil', native: 'தமிழ்', free: true },
  { code: 'te', name: 'Telugu', native: 'తెలుగు', free: false },
  { code: 'bn', name: 'Bengali', native: 'বাংলা', free: false },
  { code: 'mr', name: 'Marathi', native: 'मराठी', free: false },
  { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', free: false },
  { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', free: false },
  { code: 'ml', name: 'Malayalam', native: 'മലയാളം', free: false },
  { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', free: false },
  { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ', free: false },
  { code: 'en', name: 'English', native: 'English', free: true },
];

const FREE_CHAR_LIMIT = 500;

const FINANCIAL_TERMS = ['EMI', 'SIP', 'TDS', 'GST', 'NPS', 'PPF', 'FD', 'RD', 'ITR', 'HRA'];

export default function FinancialTranslator() {
  const [sourceText, setSourceText] = useState('');
  const [targetLang, setTargetLang] = useState('hi');
  const [translatedText, setTranslatedText] = useState('');
  const [glossary, setGlossary] = useState<Record<string, string>>({});
  const [detectedLang, setDetectedLang] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [requiresPro, setRequiresPro] = useState(false);

  const subscriptionId = typeof window !== 'undefined' ? localStorage.getItem('subscriptionId') : null;
  const isPro = !!subscriptionId;

  const selectedLang = LANGUAGES.find(l => l.code === targetLang);
  const charCount = sourceText.length;
  const isOverLimit = !isPro && charCount > FREE_CHAR_LIMIT;

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    if (isOverLimit) return;

    const lang = LANGUAGES.find(l => l.code === targetLang);
    if (!lang?.free && !isPro) {
      setRequiresPro(true);
      setError('This language requires a Pro subscription.');
      return;
    }

    setLoading(true);
    setError(null);
    setRequiresPro(false);
    setTranslatedText('');

    try {
      const res = await fetch('/api/azure/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          targetLanguage: targetLang,
          isPro,
          subscriptionId: subscriptionId || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Translation failed');
        setRequiresPro(data.requiresPro || false);
        return;
      }

      setTranslatedText(data.translations?.[0]?.translatedText || '');
      setGlossary(data.glossary || {});
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDetectLanguage = async () => {
    if (!sourceText.trim()) return;

    setDetecting(true);
    setDetectedLang(null);

    try {
      const res = await fetch('/api/azure/detect-language', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setDetectedLang(data.language);
      }
    } catch {
      // Silently fail detection
    } finally {
      setDetecting(false);
    }
  };

  const handleCopy = async () => {
    if (!translatedText) return;
    await navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Main Translation Card */}
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-orange-600" />
            Financial Translator
            {!isPro && (
              <Badge variant="outline" className="ml-2 text-xs">
                Free: Hindi & Tamil only
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Source Text Input */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700">
                Source Text
              </label>
              <div className="flex items-center gap-2">
                {detectedLang && (
                  <Badge variant="secondary" className="text-xs">
                    Detected: {LANGUAGES.find(l => l.code === detectedLang)?.name || detectedLang}
                  </Badge>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDetectLanguage}
                  disabled={detecting || !sourceText.trim()}
                  className="text-xs"
                >
                  {detecting ? (
                    <Loader2 className="w-3 h-3 animate-spin mr-1" />
                  ) : (
                    <Search className="w-3 h-3 mr-1" />
                  )}
                  Detect Language
                </Button>
              </div>
            </div>
            <textarea
              className="w-full h-36 p-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              placeholder="Paste your financial text, calculator results, or document content here..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
            />
            <div className="flex items-center justify-between mt-1">
              <p className="text-xs text-gray-500">
                Paste EMI calculations, SIP results, tax summaries, or any financial content
              </p>
              <span className={`text-xs ${isOverLimit ? 'text-red-600 font-medium' : 'text-gray-400'}`}>
                {charCount}{!isPro && `/${FREE_CHAR_LIMIT}`}
              </span>
            </div>
            {isOverLimit && (
              <p className="text-xs text-red-600 mt-1">
                Free tier limited to {FREE_CHAR_LIMIT} characters. Upgrade to Pro for unlimited translation.
              </p>
            )}
          </div>

          {/* Language Selector */}
          <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Translate To
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
              {LANGUAGES.filter(l => l.code !== 'en').map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setTargetLang(lang.code);
                    setRequiresPro(false);
                    setError(null);
                  }}
                  disabled={!lang.free && !isPro}
                  className={`relative flex items-center gap-2 p-2 rounded-lg border text-sm transition-all
                    ${targetLang === lang.code
                      ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500'
                      : lang.free || isPro
                        ? 'border-gray-200 hover:border-orange-300 hover:bg-orange-50/50'
                        : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
                    }
                  `}
                >
                  <span className="font-medium text-xs">{lang.native}</span>
                  <span className="text-xs text-gray-500">{lang.name}</span>
                  {!lang.free && !isPro && (
                    <Lock className="w-3 h-3 text-gray-400 absolute top-1 right-1" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Translate Button */}
          <div className="flex items-center gap-3">
            <Button
              onClick={handleTranslate}
              disabled={loading || !sourceText.trim() || isOverLimit}
              className="bg-orange-600 hover:bg-orange-700 text-white flex items-center gap-2"
            >
              {loading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <ArrowRightLeft className="w-4 h-4" />
              )}
              Translate to {selectedLang?.name || 'Hindi'}
            </Button>
            {requiresPro && (
              <a
                href="/pricing"
                className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700 font-medium"
              >
                <Sparkles className="w-4 h-4" />
                Upgrade to Pro
              </a>
            )}
          </div>

          {/* Error Display */}
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
              {error}
            </div>
          )}

          {/* Translation Output */}
          {translatedText && (
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-gray-700">
                  Translation ({selectedLang?.name})
                </label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopy}
                  className="text-xs"
                >
                  {copied ? (
                    <Check className="w-3 h-3 mr-1 text-green-600" />
                  ) : (
                    <Copy className="w-3 h-3 mr-1" />
                  )}
                  {copied ? 'Copied!' : 'Copy'}
                </Button>
              </div>
              <div className="w-full p-4 bg-orange-50 border border-orange-200 rounded-lg text-sm leading-relaxed whitespace-pre-wrap">
                {translatedText}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Financial Glossary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-600" />
            Financial Terms Glossary
          </CardTitle>
        </CardHeader>
        <CardContent>
          {Object.keys(glossary).length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {Object.entries(glossary).map(([term, translated]) => (
                <div key={term} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                  <Badge variant="secondary" className="text-xs font-mono">
                    {term}
                  </Badge>
                  <span className="text-sm text-gray-700">{translated}</span>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-sm text-gray-500">
              <p className="mb-3">
                Translate text to see key financial terms in your selected language. Common terms include:
              </p>
              <div className="flex flex-wrap gap-2">
                {FINANCIAL_TERMS.map((term) => (
                  <Badge key={term} variant="outline" className="text-xs">
                    {term}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pro Upsell */}
      {!isPro && (
        <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Lock className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Unlock All Languages</h3>
                <p className="text-sm text-gray-600 mb-3">
                  Pro users get access to all 10 Indian languages, unlimited character count, and batch translation for multiple text segments at once.
                </p>
                <a
                  href="/pricing"
                  className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors"
                >
                  <Sparkles className="w-4 h-4" />
                  Upgrade to Pro
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
