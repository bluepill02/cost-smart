import { NextRequest, NextResponse } from 'next/server';
import { isValidSubscriptionId, verifySubscription } from '@/lib/paypal';
import { azureTranslate } from '@/lib/azure-ai';

const FREE_LANGUAGES = ['hi', 'ta'];
const ALL_LANGUAGES = ['hi', 'ta', 'te', 'bn', 'mr', 'gu', 'kn', 'ml', 'pa', 'or'];
const FREE_CHAR_LIMIT = 500;

// Financial terminology dictionary hints for accurate domain-specific translation
const FINANCIAL_GLOSSARY: Record<string, Record<string, string>> = {
  hi: { EMI: 'EMI (समान मासिक किस्त)', SIP: 'SIP (व्यवस्थित निवेश योजना)', TDS: 'TDS (स्रोत पर कर कटौती)', GST: 'GST (वस्तु एवं सेवा कर)', NPS: 'NPS (राष्ट्रीय पेंशन योजना)', PPF: 'PPF (सार्वजनिक भविष्य निधि)', FD: 'FD (सावधि जमा)', RD: 'RD (आवर्ती जमा)', ITR: 'ITR (आयकर रिटर्न)', HRA: 'HRA (मकान किराया भत्ता)' },
  ta: { EMI: 'EMI (சம மாத தவணை)', SIP: 'SIP (முறையான முதலீட்டு திட்டம்)', TDS: 'TDS (மூலத்தில் வரி பிடித்தம்)', GST: 'GST (பொருள் மற்றும் சேவை வரி)', NPS: 'NPS (தேசிய ஓய்வூதிய திட்டம)', PPF: 'PPF (பொது வருங்கால வைப்பு நிதி)', FD: 'FD (நிலையான வைப்பு)', RD: 'RD (தொடர் வைப்பு)', ITR: 'ITR (வருமான வரி அறிக்கை)', HRA: 'HRA (வீட்டு வாடகை படி)' },
  te: { EMI: 'EMI (సమాన నెలవారీ వాయిదా)', SIP: 'SIP (క్రమబద్ధ పెట్టుబడి ప్రణాళిక)', TDS: 'TDS (మూలం వద్ద పన్ను మినహాయింపు)', GST: 'GST (వస్తువులు మరియు సేవల పన్ను)' },
  bn: { EMI: 'EMI (সমান মাসিক কিস্তি)', SIP: 'SIP (পদ্ধতিগত বিনিয়োগ পরিকল্পনা)', TDS: 'TDS (উৎসে কর কর্তন)', GST: 'GST (পণ্য ও সেবা কর)' },
  mr: { EMI: 'EMI (समान मासिक हप्ता)', SIP: 'SIP (पद्धतशीर गुंतवणूक योजना)', TDS: 'TDS (उगमस्थानी कर कपात)', GST: 'GST (वस्तू आणि सेवा कर)' },
  gu: { EMI: 'EMI (સમાન માસિક હપ્તો)', SIP: 'SIP (વ્યવસ્થિત રોકાણ યોજના)', TDS: 'TDS (સ્ત્રોત પર કર કપાત)', GST: 'GST (વસ્તુ અને સેવા કર)' },
  kn: { EMI: 'EMI (ಸಮಾನ ಮಾಸಿಕ ಕಂತು)', SIP: 'SIP (ವ್ಯವಸ್ಥಿತ ಹೂಡಿಕೆ ಯೋಜನೆ)', TDS: 'TDS (ಮೂಲದಲ್ಲಿ ತೆರಿಗೆ ಕಡಿತ)', GST: 'GST (ಸರಕು ಮತ್ತು ಸೇವಾ ತೆರಿಗೆ)' },
  ml: { EMI: 'EMI (തുല്യ പ്രതിമാസ ഗഡു)', SIP: 'SIP (ചിട്ടയായ നിക്ഷേപ പദ്ധതി)', TDS: 'TDS (ഉറവിടത്തിൽ നികുതി കിഴിവ്)', GST: 'GST (ചരക്ക് സേവന നികുതി)' },
  pa: { EMI: 'EMI (ਬਰਾਬਰ ਮਹੀਨਾਵਾਰ ਕਿਸ਼ਤ)', SIP: 'SIP (ਯੋਜਨਾਬੱਧ ਨਿਵੇਸ਼ ਯੋਜਨਾ)', TDS: 'TDS (ਸਰੋਤ ਤੇ ਟੈਕਸ ਕਟੌਤੀ)', GST: 'GST (ਵਸਤੂ ਅਤੇ ਸੇਵਾ ਟੈਕਸ)' },
  or: { EMI: 'EMI (ସମାନ ମାସିକ କିସ୍ତି)', SIP: 'SIP (ପଦ୍ଧତିଗତ ନିବେଶ ଯୋଜନା)', TDS: 'TDS (ଉତ୍ସରେ କର କଟାଯିବା)', GST: 'GST (ବସ୍ତୁ ଏବଂ ସେବା କର)' },
};

interface TranslateRequest {
  text: string | string[];
  targetLanguage: string;
  sourceLanguage?: string;
  isPro?: boolean;
  subscriptionId?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: TranslateRequest = await request.json();
    const { text, targetLanguage, sourceLanguage, isPro, subscriptionId } = body;

    if (!text || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields: text and targetLanguage' },
        { status: 400 }
      );
    }

    if (!ALL_LANGUAGES.includes(targetLanguage) && targetLanguage !== 'en') {
      return NextResponse.json(
        { error: 'Unsupported target language' },
        { status: 400 }
      );
    }

    // Server-side Pro verification
    let verifiedPro = false;
    if (isPro && subscriptionId && typeof subscriptionId === 'string') {
      if (isValidSubscriptionId(subscriptionId)) {
        try {
          const subDetails = await verifySubscription(subscriptionId);
          verifiedPro = subDetails.status === 'ACTIVE';
        } catch {
          verifiedPro = false;
        }
      }
    }

    // Normalize text to array for batch support
    const textArray = Array.isArray(text) ? text : [text];

    // Free tier restrictions
    if (!verifiedPro) {
      if (!FREE_LANGUAGES.includes(targetLanguage) && targetLanguage !== 'en') {
        return NextResponse.json(
          { error: 'Free tier only supports Hindi and Tamil. Upgrade to Pro for all languages.', requiresPro: true },
          { status: 403 }
        );
      }

      const totalChars = textArray.join('').length;
      if (totalChars > FREE_CHAR_LIMIT) {
        return NextResponse.json(
          { error: `Free tier limited to ${FREE_CHAR_LIMIT} characters. Upgrade to Pro for unlimited translation.`, requiresPro: true },
          { status: 403 }
        );
      }

      // Free tier: only single text, no batch
      if (textArray.length > 1) {
        return NextResponse.json(
          { error: 'Batch translation requires Pro. Upgrade for multi-segment translation.', requiresPro: true },
          { status: 403 }
        );
      }
    }

    // Call Azure Translator REST API
    let translations: { translatedText: string; targetLanguage: string }[] = [];
    let detectedLanguage: string | null = null;
    let isRealAI = false;

    try {
      const results = await azureTranslate(textArray, targetLanguage, sourceLanguage);

      if (!results || results.length === 0) {
        return NextResponse.json(
          { error: 'Translation service unavailable. Please try again later.' },
          { status: 502 }
        );
      }

      // Extract translated texts in the expected response format
      translations = results.map((result) => ({
        translatedText: result.translations?.[0]?.text || '',
        targetLanguage,
      }));

      // Detect source language from first result
      detectedLanguage = sourceLanguage ? null : (results[0]?.detectedLanguage?.language || null);
      isRealAI = true;
    } catch (apiErr) {
      console.error('Azure Translator API error (using fallback):', apiErr);
      // Fallback: return the original text with a note that translation is unavailable
      translations = textArray.map((t) => ({
        translatedText: t,
        targetLanguage,
      }));
      detectedLanguage = sourceLanguage || 'en';
      isRealAI = false;
    }

    // Include glossary for the target language
    const glossary = FINANCIAL_GLOSSARY[targetLanguage] || {};

    return NextResponse.json({
      success: true,
      isPro: verifiedPro,
      isRealAI,
      translations,
      glossary,
      detectedLanguage,
    });
  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Failed to translate. Please try again.' },
      { status: 500 }
    );
  }
}
