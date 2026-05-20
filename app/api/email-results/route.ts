import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { email, calculatorName, resultSummary } = await req.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // Format email content
    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <style>
    body { font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; margin: 0; padding: 20px; }
    .card { background: white; border-radius: 16px; padding: 32px; max-width: 480px; margin: 0 auto; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
    .logo { font-size: 22px; font-weight: 800; color: #0f172a; margin-bottom: 24px; }
    .logo span { color: #059669; }
    h2 { color: #0f172a; font-size: 18px; margin: 0 0 12px; }
    .result-box { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 16px; margin: 16px 0; }
    .result-box p { margin: 0; color: #15803d; font-size: 15px; font-weight: 500; line-height: 1.6; }
    .cta { display: inline-block; background: #059669; color: white; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 600; font-size: 14px; margin: 20px 0; }
    .footer { color: #94a3b8; font-size: 12px; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 16px; }
  </style>
</head>
<body>
  <div class="card">
    <div class="logo">Cost<span>Smart</span></div>
    <h2>Your ${calculatorName} Results</h2>
    <p style="color:#475569;font-size:14px;">Here are the calculation results you requested:</p>
    <div class="result-box">
      <p>${resultSummary.replace(/\n/g, '<br />')}</p>
    </div>
    <p style="color:#64748b;font-size:13px;">Want to recalculate or try different inputs?</p>
    <a class="cta" href="https://cost-smart-five.vercel.app">Open CostSmart →</a>
    <div class="footer">
      <p>You received this because you requested it on CostSmart.<br />
      CostSmart provides free financial calculators. Not financial advice.</p>
    </div>
  </div>
</body>
</html>`;

    // Try to send via Resend (free tier — 3,000 emails/month)
    // Set RESEND_API_KEY in Vercel env vars to enable
    const resendKey = process.env.RESEND_API_KEY;

    if (resendKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'CostSmart <results@costsmart.in>',
          to: [email],
          subject: `Your ${calculatorName} Results — CostSmart`,
          html: emailHtml,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        console.error('Resend error:', err);
        return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
      }
    } else {
      // No API key configured — log and return success for dev
      console.log('[email-results] No RESEND_API_KEY set. Would have sent to:', email);
      console.log('[email-results] Content:', resultSummary);
    }

    // Store the email lead (you can add a DB call here in the future)
    console.log('[lead]', { email, calculatorName, ts: new Date().toISOString() });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('[email-results] Error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
