import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';

const LEADS_QUEUE_PATH = '/tmp/costsmart-leads-queue.json';

export async function POST() {
  try {
    const webhookUrl = process.env.ZAPIER_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'ZAPIER_WEBHOOK_URL is not configured. Cannot flush leads.' },
        { status: 503 }
      );
    }

    let leads: Record<string, unknown>[] = [];

    try {
      const data = await fs.readFile(LEADS_QUEUE_PATH, 'utf-8');
      leads = JSON.parse(data);
    } catch {
      return NextResponse.json(
        { message: 'No queued leads found.', flushed: 0 },
        { status: 200 }
      );
    }

    if (!Array.isArray(leads) || leads.length === 0) {
      return NextResponse.json(
        { message: 'No queued leads found.', flushed: 0 },
        { status: 200 }
      );
    }

    const results: { success: number; failed: number } = {
      success: 0,
      failed: 0,
    };
    const failedLeads: Record<string, unknown>[] = [];

    for (const lead of leads) {
      try {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(lead),
        });

        if (response.ok) {
          results.success++;
        } else {
          results.failed++;
          failedLeads.push(lead);
        }
      } catch {
        results.failed++;
        failedLeads.push(lead);
      }
    }

    // Write back only the failed leads (or remove the file if all succeeded)
    if (failedLeads.length > 0) {
      await fs.writeFile(
        LEADS_QUEUE_PATH,
        JSON.stringify(failedLeads, null, 2)
      );
    } else {
      await fs.unlink(LEADS_QUEUE_PATH).catch(() => {
        // File may already be removed
      });
    }

    return NextResponse.json({
      message: `Flushed ${results.success} leads to Zapier.`,
      flushed: results.success,
      failed: results.failed,
      remaining: failedLeads.length,
    });
  } catch (err) {
    console.error('[leads/flush] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function GET() {
  try {
    let leads: Record<string, unknown>[] = [];

    try {
      const data = await fs.readFile(LEADS_QUEUE_PATH, 'utf-8');
      leads = JSON.parse(data);
    } catch {
      return NextResponse.json({ queued: 0, leads: [] });
    }

    return NextResponse.json({
      queued: leads.length,
      leads,
    });
  } catch (err) {
    console.error('[leads/flush] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
