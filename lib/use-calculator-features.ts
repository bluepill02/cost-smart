import { useState, useCallback } from 'react';

interface UseCalculatorInsightsProps {
  calculatorType: string;
}

interface InsightsResponse {
  success: boolean;
  insights: Record<string, string>;
  analytics: Record<string, any>;
}

export function useCalculatorInsights({ calculatorType }: UseCalculatorInsightsProps) {
  const [insights, setInsights] = useState<Record<string, string> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getInsights = useCallback(
    async (values: Record<string, number | string>, result: any) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/ai-insights', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            calculatorType,
            values,
            result,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to fetch insights');
        }

        const data: InsightsResponse = await response.json();
        setInsights(data.insights);

        // Track event for analytics
        if (window.gtag) {
          window.gtag('event', 'get_ai_insights', {
            calculator: calculatorType,
          });
        }

        return data.insights;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [calculatorType]
  );

  return { insights, loading, error, getInsights };
}

interface ExportResponse {
  success: boolean;
  export: {
    csv: string;
    json: Record<string, any>;
  };
  analytics: Record<string, any>;
}

export function useCalculatorExport() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportResults = useCallback(
    async (calculatorType: string, title: string, values: Record<string, any>, result: Record<string, any>) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/export', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            calculatorType,
            title,
            values,
            result,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to export results');
        }

        const data: ExportResponse = await response.json();

        // Trigger download
        const element = document.createElement('a');
        element.setAttribute('href', `data:text/csv;charset=utf-8,${encodeURIComponent(data.export.csv)}`);
        element.setAttribute('download', `${calculatorType}_${Date.now()}.csv`);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);

        // Track event
        if (window.gtag) {
          window.gtag('event', 'export_results', {
            calculator: calculatorType,
          });
        }

        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, error, exportResults };
}
