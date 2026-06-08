'use client';

import { useState, useCallback } from 'react';
import { Camera, Upload, FileText, Download, Loader2, Lock, Sparkles, Receipt, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LineItem {
  description: string;
  amount: number | null;
}

interface ScanResult {
  vendor: string | null;
  date: string | null;
  totalAmount: number | null;
  subtotal: number | null;
  tax: number | null;
  gstNumber: string | null;
  invoiceNumber: string | null;
  lineItems: LineItem[];
  rawText: string;
  category: string;
}

interface AnalysisResult {
  keyPhrases: string[];
  sentiment: {
    overall: string;
    confidence: { positive: number; neutral: number; negative: number };
  };
  documentType: string;
  summary: string;
}

export default function DocumentScanner() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [isPro, setIsPro] = useState(false);
  const [upgradeMessage, setUpgradeMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileSelect = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (JPEG, PNG, etc.)');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be under 10MB');
      return;
    }

    setError(null);
    setScanResult(null);
    setAnalysis(null);
    setUpgradeMessage(null);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    // Convert to base64 for API
    const base64Reader = new FileReader();
    base64Reader.onload = async (e) => {
      const base64 = e.target?.result as string;
      await processImage(base64);
    };
    base64Reader.readAsDataURL(file);
  }, []);

  const processImage = async (base64Image: string) => {
    setLoading(true);
    setLoadingStage('Uploading and analyzing document...');

    try {
      // Get subscription info from localStorage
      const subscriptionId = typeof window !== 'undefined' ? localStorage.getItem('subscriptionId') : null;
      const userIsPro = !!subscriptionId;

      // Step 1: OCR Scan
      setLoadingStage('Extracting text with OCR...');
      const scanResponse = await fetch('/api/azure/document-scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          image: base64Image,
          isPro: userIsPro,
          subscriptionId,
        }),
      });

      const scanData = await scanResponse.json();

      if (!scanResponse.ok) {
        setError(scanData.error || 'Failed to scan document');
        setLoading(false);
        return;
      }

      setScanResult(scanData.data);
      setIsPro(scanData.isPro || false);
      if (scanData.upgradeMessage) {
        setUpgradeMessage(scanData.upgradeMessage);
      }

      // Step 2: Document Analysis (if we have text)
      if (scanData.data?.rawText || scanData.data?.vendor) {
        setLoadingStage('Analyzing document content...');
        const textForAnalysis = scanData.data.rawText || `${scanData.data.vendor || ''} ${scanData.data.date || ''} ${scanData.data.totalAmount || ''}`;

        const analyzeResponse = await fetch('/api/azure/document-analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text: textForAnalysis,
            isPro: userIsPro,
            subscriptionId,
          }),
        });

        if (analyzeResponse.ok) {
          const analyzeData = await analyzeResponse.json();
          setAnalysis(analyzeData.analysis);
        }
      }
    } catch (err) {
      console.error('Scan error:', err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
      setLoadingStage('');
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const exportCSV = () => {
    if (!scanResult) return;

    let csv = 'Field,Value\n';
    csv += `Vendor,${scanResult.vendor || 'N/A'}\n`;
    csv += `Date,${scanResult.date || 'N/A'}\n`;
    csv += `Total Amount,${scanResult.totalAmount || 'N/A'}\n`;
    csv += `Category,${scanResult.category || 'N/A'}\n`;

    if (isPro) {
      csv += `Subtotal,${scanResult.subtotal || 'N/A'}\n`;
      csv += `Tax/GST,${scanResult.tax || 'N/A'}\n`;
      csv += `GST Number,${scanResult.gstNumber || 'N/A'}\n`;
      csv += `Invoice Number,${scanResult.invoiceNumber || 'N/A'}\n`;
      csv += '\nLine Items\n';
      csv += 'Description,Amount\n';
      scanResult.lineItems.forEach(item => {
        csv += `"${item.description}",${item.amount || 'N/A'}\n`;
      });
    }

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `scan-${scanResult.vendor || 'document'}-${Date.now()}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const resetScanner = () => {
    setImagePreview(null);
    setScanResult(null);
    setAnalysis(null);
    setError(null);
    setUpgradeMessage(null);
    setIsPro(false);
  };

  const categoryLabels: Record<string, string> = {
    receipt: 'Receipt',
    invoice: 'Invoice',
    bill: 'Bill',
    salary_slip: 'Salary Slip',
    tax_document: 'Tax Document',
  };

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      {!scanResult && !loading && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="w-6 h-6 text-purple-600" />
              Scan Document
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                dragActive
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 hover:border-purple-500'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Receipt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Drop your receipt or invoice here
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Upload a photo of any receipt, invoice, bill, or financial document
              </p>

              <div className="flex items-center justify-center gap-3">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleInputChange}
                  className="hidden"
                  id="doc-upload"
                />
                <label htmlFor="doc-upload">
                  <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 cursor-pointer">
                    <Upload className="w-4 h-4" />
                    Choose File
                  </span>
                </label>

                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleInputChange}
                  className="hidden"
                  id="doc-camera"
                />
                <label htmlFor="doc-camera">
                  <span className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all px-4 py-2 border border-purple-600 text-purple-600 hover:bg-purple-50 cursor-pointer">
                    <Camera className="w-4 h-4" />
                    Take Photo
                  </span>
                </label>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Supports JPEG, PNG, BMP, TIFF (max 10MB)
              </p>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Loading State */}
      {loading && (
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Processing Document</h3>
              <p className="text-sm text-gray-600">{loadingStage}</p>
              {imagePreview && (
                <div className="mt-6 max-w-xs mx-auto">
                  <img
                    src={imagePreview}
                    alt="Uploaded document"
                    className="rounded-lg shadow-md w-full h-auto opacity-50"
                  />
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {scanResult && !loading && (
        <>
          {/* Image Preview + Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Scanned Image */}
            {imagePreview && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-sm">Scanned Document</CardTitle>
                </CardHeader>
                <CardContent>
                  <img
                    src={imagePreview}
                    alt="Scanned document"
                    className="rounded-lg shadow-sm w-full h-auto max-h-80 object-contain"
                  />
                </CardContent>
              </Card>
            )}

            {/* Extracted Data Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <FileText className="w-5 h-5 text-purple-600" />
                  Extracted Information
                  <Badge variant="outline" className="ml-auto">
                    {categoryLabels[scanResult.category] || 'Document'}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Vendor</p>
                      <p className="font-semibold text-sm">{scanResult.vendor || 'Not detected'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">Date</p>
                      <p className="font-semibold text-sm">{scanResult.date || 'Not detected'}</p>
                    </div>
                  </div>

                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-xs text-purple-600 uppercase tracking-wide">Total Amount</p>
                    <p className="text-3xl font-bold text-purple-700">
                      {scanResult.totalAmount !== null
                        ? `₹${scanResult.totalAmount.toLocaleString('en-IN')}`
                        : 'Not detected'}
                    </p>
                  </div>

                  {/* Pro-gated content */}
                  {isPro ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Subtotal</p>
                          <p className="font-semibold text-sm">
                            {scanResult.subtotal !== null ? `₹${scanResult.subtotal.toLocaleString('en-IN')}` : 'N/A'}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Tax/GST</p>
                          <p className="font-semibold text-sm">
                            {scanResult.tax !== null ? `₹${scanResult.tax.toLocaleString('en-IN')}` : 'N/A'}
                          </p>
                        </div>
                      </div>
                      {scanResult.gstNumber && (
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">GST Number</p>
                          <p className="font-mono text-sm">{scanResult.gstNumber}</p>
                        </div>
                      )}
                      {scanResult.invoiceNumber && (
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">Invoice Number</p>
                          <p className="font-mono text-sm">{scanResult.invoiceNumber}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="relative">
                      <div className="space-y-3 blur-sm select-none pointer-events-none">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Subtotal</p>
                            <p className="font-semibold text-sm">₹1,200</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wide">Tax/GST</p>
                            <p className="font-semibold text-sm">₹216</p>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 uppercase tracking-wide">GST Number</p>
                          <p className="font-mono text-sm">29ABCDE1234F1Z5</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-lg">
                        <div className="text-center">
                          <Lock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                          <p className="text-sm font-medium text-gray-700">Pro Feature</p>
                          <a href="/pricing" className="text-xs text-purple-600 hover:underline">
                            Upgrade for full details
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Line Items (Pro only) */}
          {isPro && scanResult.lineItems.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Line Items
                  <Badge className="ml-2 bg-purple-100 text-purple-700">PRO</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3 font-medium text-gray-600">Description</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-600">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {scanResult.lineItems.map((item, idx) => (
                        <tr key={idx} className="border-b last:border-0">
                          <td className="py-2 px-3">{item.description}</td>
                          <td className="py-2 px-3 text-right font-mono">
                            {item.amount !== null ? `₹${item.amount.toLocaleString('en-IN')}` : '-'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Line Items blurred for free users */}
          {!isPro && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Line Items
                  <Badge className="ml-2 bg-purple-100 text-purple-700">PRO</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <div className="blur-sm select-none pointer-events-none">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-2 px-3 font-medium text-gray-600">Description</th>
                        <th className="text-right py-2 px-3 font-medium text-gray-600">Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b"><td className="py-2 px-3">Item 1</td><td className="py-2 px-3 text-right">₹500</td></tr>
                      <tr className="border-b"><td className="py-2 px-3">Item 2</td><td className="py-2 px-3 text-right">₹350</td></tr>
                      <tr className="border-b"><td className="py-2 px-3">Item 3</td><td className="py-2 px-3 text-right">₹200</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-white/60 rounded-lg">
                  <div className="text-center">
                    <Lock className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-700">Upgrade to see all line items</p>
                    <a href="/pricing" className="text-xs text-purple-600 hover:underline">
                      View Pro plans
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Document Analysis */}
          {analysis && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-sm">
                  <Sparkles className="w-5 h-5 text-indigo-600" />
                  AI Document Analysis
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Document Type</p>
                  <Badge variant="outline">{categoryLabels[analysis.documentType] || analysis.documentType}</Badge>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Summary</p>
                  <p className="text-sm text-gray-700">{analysis.summary}</p>
                </div>
                {analysis.keyPhrases.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">Key Phrases</p>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keyPhrases.map((phrase, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {phrase}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Upgrade Banner */}
          {upgradeMessage && (
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6">
              <div className="flex items-start gap-3">
                <Sparkles className="w-6 h-6 text-purple-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-purple-900 mb-1">Unlock Full Analysis</h3>
                  <p className="text-sm text-purple-700 mb-3">{upgradeMessage}</p>
                  <a
                    href="/pricing"
                    className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-purple-700 transition-colors"
                  >
                    Upgrade to Pro
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-center gap-4">
            <Button onClick={resetScanner} variant="outline">
              Scan Another Document
            </Button>
            <Button onClick={exportCSV} variant="default">
              <Download className="w-4 h-4 mr-2" />
              Export as CSV
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
