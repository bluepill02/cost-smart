import { NextRequest, NextResponse } from 'next/server';

interface ExportRequest {
  calculatorType: string;
  title: string;
  values: Record<string, number | string>;
  result: Record<string, any>;
}

export async function POST(request: NextRequest) {
  try {
    const body: ExportRequest = await request.json();
    const { calculatorType, title, values, result } = body;

    if (!calculatorType || !title || !values) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate CSV content
    const csvContent = generateCSV(title, values, result);

    // Generate JSON content
    const jsonContent = {
      calculator: calculatorType,
      title,
      generatedAt: new Date().toISOString(),
      inputs: values,
      results: result,
    };

    // Track analytics
    const analytics = {
      event: 'calculator_export',
      calculatorType,
      format: 'csv+json',
      timestamp: new Date().toISOString(),
    };

    return NextResponse.json(
      {
        success: true,
        export: {
          csv: csvContent,
          json: jsonContent,
        },
        analytics,
      },
      {
        headers: {
          'Cache-Control': 'public, max-age=1800',
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (error) {
    console.error('Export error:', error);
    return NextResponse.json(
      { error: 'Failed to export data' },
      { status: 500 }
    );
  }
}

function generateCSV(title: string, values: Record<string, any>, result: Record<string, any>): string {
  const lines: string[] = [];

  // Header
  lines.push(`Calculator Export Report`);
  lines.push(`Title,${title}`);
  lines.push(`Generated,${new Date().toISOString()}`);
  lines.push('');

  // Input values
  lines.push('INPUT VALUES');
  lines.push('Parameter,Value');
  Object.entries(values).forEach(([key, value]) => {
    lines.push(`${formatKey(key)},${value}`);
  });

  lines.push('');

  // Results
  lines.push('RESULTS');
  lines.push('Metric,Value');
  Object.entries(result).forEach(([key, value]) => {
    const formattedValue = typeof value === 'number' ? value.toFixed(2) : value;
    lines.push(`${formatKey(key)},${formattedValue}`);
  });

  return lines.join('\n');
}

function formatKey(key: string): string {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}
