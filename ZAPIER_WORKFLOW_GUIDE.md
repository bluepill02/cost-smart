# Zapier Workflow Guide - CostSmart Lead Capture

A comprehensive guide for the automated Zapier Zap workflow that turns CostSmart lead captures into engagement, nurturing, and conversions.

> **STATUS: LIVE** — This workflow has been set up and tested via Zapier MCP. All infrastructure (Mailchimp tags, Google Sheets tracker, Zapier Skill) is provisioned and verified.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Setup](#2-setup)
3. [Payload Reference](#3-payload-reference)
4. [Recommended Zaps](#4-recommended-zaps)
5. [Creative Automation Ideas](#5-creative-automation-ideas)
6. [Lead Scoring Reference Table](#6-lead-scoring-reference-table)
7. [Free Tier Considerations](#7-free-tier-considerations)
8. [Testing](#8-testing)

---

## 1. Overview

### Integration Architecture

CostSmart uses a fire-and-forget webhook pattern to send lead data to Zapier without blocking the user experience:

```
User Interaction
    |
    v
Lead Capture Form (5 form types)
    |
    v
POST /api/lead-capture
    |
    |-- Validates email
    |-- Computes lead score (0-100)
    |-- Determines tier, segment, engagement path
    |-- Enriches with UTM, referrer, user-agent
    |
    v
Fire-and-forget POST to Zapier Catch Hook
    |
    v
AUTOMATED ZAP (4-step pipeline):
    |
    ├── STEP 1: Google Sheets → Log lead to CostSmart Lead Tracker
    |            (Spreadsheet: 1xG8F1mwFCfF_YXFk5_ky_O9MeS_F9CHWZkQ_9bcm-dg)
    |
    ├── STEP 2: Mailchimp → Add/Update Subscriber
    |            (Audience: 20b157c32a, tag by tier)
    |
    ├── STEP 3: Mailchimp → Tag by Lead Tier
    |            Hot → CostSmart-Hot-Lead (ID: 1943433)
    |            Warm → CostSmart-Warm-Lead (ID: 1943434)
    |            Cool → CostSmart-Newsletter (ID: 1943435)
    |            Cold → CostSmart-Cold-Lead (ID: 1943436)
    |
    └── STEP 4: Gmail → Personalized Welcome Email
                 (Tier-specific content, CTA, related calculators)
```

### Key Design Decisions

- **Non-blocking**: The webhook fires without waiting for a response, so Zapier downtime never affects form submissions.
- **Pre-scored leads**: The API computes lead scores server-side before sending, so Zapier receives fully enriched data ready for routing.
- **Source-aware**: Each form type produces a distinct `form_source` identifier, enabling form-specific automations.
- **UTM-enriched**: Campaign attribution data flows through to Zapier for full-funnel tracking.
- **Mailchimp over MailerLite**: Mailchimp offers better free tier limits (500 contacts, 1000 emails/month, built-in automation triggers on tags) compared to MailerLite's restrictions.

### Live Infrastructure (Provisioned via Zapier MCP)

| Asset | Service | ID / Reference |
|-------|---------|----------------|
| Lead Tracker Spreadsheet | Google Sheets | `1xG8F1mwFCfF_YXFk5_ky_O9MeS_F9CHWZkQ_9bcm-dg` |
| Audience | Mailchimp | `20b157c32a` (B. P Miller) |
| Tag: Hot Leads | Mailchimp | `CostSmart-Hot-Lead` (ID: 1943433) |
| Tag: Warm Leads | Mailchimp | `CostSmart-Warm-Lead` (ID: 1943434) |
| Tag: Newsletter | Mailchimp | `CostSmart-Newsletter` (ID: 1943435) |
| Tag: Cold Leads | Mailchimp | `CostSmart-Cold-Lead` (ID: 1943436) |
| Reusable Skill | Zapier MCP | `costsmart-lead-capture` |
| MailerLite Hot Leads | MailerLite (backup) | Group ID: 189716386762720319 |
| MailerLite Warm Leads | MailerLite (backup) | Group ID: 189716389354800198 |
| MailerLite Newsletter | MailerLite (backup) | Group ID: 189716403061786415 |
| MailerLite Cold Leads | MailerLite (backup) | Group ID: 189716394243261737 |

---

## 2. Setup

### Step 1: Create a Zapier Catch Hook

1. Log in to [Zapier](https://zapier.com) and click **Create Zap**.
2. For the trigger, search for **Webhooks by Zapier**.
3. Select **Catch Hook** as the trigger event.
4. Click **Continue** (you can skip the "Pick off a Child Key" step).
5. Zapier will generate a unique webhook URL like:
   ```
   https://hooks.zapier.com/hooks/catch/123456/abcdef/
   ```
6. Copy this URL -- you will need it in the next step.

### Step 2: Configure the Environment Variable

**Local Development (.env.local):**

```bash
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/123456/abcdef/
```

**Vercel Deployment:**

1. Go to your Vercel project dashboard.
2. Navigate to **Settings** > **Environment Variables**.
3. Add a new variable:
   - Name: `ZAPIER_WEBHOOK_URL`
   - Value: Your Catch Hook URL from Step 1
   - Environment: Production (and optionally Preview)
4. Redeploy your application for the change to take effect.

### Step 3: Test the Connection

After deploying, submit a test form on your site. Return to Zapier and click **Test trigger** to confirm data is received. See the [Testing](#8-testing) section for manual curl-based testing.

### Step 4: Build Your Zap Actions

With the trigger receiving data, add action steps. The sections below provide recommended workflows.

---

## 3. Payload Reference

Every lead capture submission sends the following JSON payload to Zapier:

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `email` | string | Lead's email address | `"user@example.com"` |
| `name` | string | Lead's name (empty if not provided) | `"Priya Sharma"` |
| `form_source` | string | Identifier for the capture form | `"costsmart-calculator-gate-form"` |
| `page_url` | string | Page where the form was submitted | `"/calculators/sip"` |
| `referrer` | string | HTTP referrer URL | `"https://google.com"` |
| `user_agent` | string | Browser user-agent string | `"Mozilla/5.0..."` |
| `timestamp` | string (ISO 8601) | Client-side timestamp | `"2025-01-15T10:30:00.000Z"` |
| `utm_params` | object | Campaign attribution parameters | See below |
| `lead_score` | number (0-100) | Computed interest/intent score | `90` |
| `lead_tier` | string | Score-based tier classification | `"hot"` |
| `engagement_path` | string | Recommended follow-up cadence | `"immediate_followup"` |
| `lead_segment` | string | Behavioral segment | `"calculator_power_user"` |
| `calculator_context` | object or null | Calculator usage details | See below |
| `submitted_at` | string (ISO 8601) | Server-side submission timestamp | `"2025-01-15T10:30:01.123Z"` |

### `utm_params` Object

| Field | Type | Description |
|-------|------|-------------|
| `utm_source` | string | Traffic source (e.g., `"google"`, `"facebook"`) |
| `utm_medium` | string | Medium (e.g., `"cpc"`, `"organic"`, `"email"`) |
| `utm_campaign` | string | Campaign name |
| `utm_content` | string | Ad/content variant |
| `utm_term` | string | Search keyword |

### `calculator_context` Object (when not null)

| Field | Type | Description |
|-------|------|-------------|
| `calculatorName` | string | Name of the calculator used (e.g., `"SIP Calculator"`, `"EMI Calculator"`) |
| `resultSummary` | string | Summary of the calculation result |

### `form_source` Values

| Value | Description |
|-------|-------------|
| `costsmart-calculator-gate-form` | Shown after calculator usage, gates detailed results |
| `costsmart-exit-intent-form` | Triggered when user moves to leave the page |
| `costsmart-newsletter-form` | Inline newsletter signup form |
| `costsmart-blog-sidebar-form` | Sidebar form on blog/content pages |
| `costsmart-bottombar-form` | Floating bottom bar CTA |

### `lead_tier` Values

| Tier | Score Range | Meaning |
|------|-------------|---------|
| `hot` | 80-100 | High intent, immediate follow-up needed |
| `warm` | 50-79 | Moderate intent, nurture sequence |
| `cool` | 30-49 | Low intent, weekly touchpoints |
| `cold` | 0-29 | Minimal intent, monthly roundup |

### `engagement_path` Values

| Path | Mapped Tier | Recommended Action |
|------|-------------|-------------------|
| `immediate_followup` | hot | Sales outreach within 1 hour |
| `nurture_sequence` | warm | 5-email drip over 14 days |
| `weekly_digest` | cool | Weekly content roundup |
| `monthly_roundup` | cold | Monthly newsletter |

### `lead_segment` Values

| Segment | Condition | Ideal Content |
|---------|-----------|---------------|
| `calculator_power_user` | Used a calculator | Calculator-specific financial tips |
| `content_reader` | Blog sidebar form | Related articles and guides |
| `newsletter_subscriber` | Newsletter or bottom bar | General financial content |
| `exit_intent_capture` | Exit intent popup | Urgency offers, quick wins |
| `general` | Other/fallback | Broad financial content |

---

## 4. Recommended Zaps

### Zap 1: Personalized Welcome Email Sequence

**Purpose:** Send a customized welcome email based on how the lead was captured.

**Trigger:** Webhooks by Zapier - Catch Hook

**Action Steps:**

1. **Filter** (by Zapier): Only continue if `email` is not empty.
2. **Paths** (by Zapier): Branch based on `form_source`:
   - Path A (`costsmart-calculator-gate-form`): Send calculator-specific welcome
   - Path B (`costsmart-exit-intent-form`): Send "Don't miss out" email
   - Path C (`costsmart-newsletter-form` or `costsmart-blog-sidebar-form`): Send content-focused welcome
   - Path D (`costsmart-bottombar-form`): Send brief intro email
3. **Email by Zapier** or **Mailchimp/ConvertKit**: Send the appropriate template with personalization:
   - Use `{{name}}` for greeting (or "there" if empty)
   - Use `{{calculator_context__calculatorName}}` for calculator-specific content
   - Use `{{page_url}}` to reference what they were reading

**Example email for Path A (Calculator users):**
```
Subject: Your {{calculator_context__calculatorName}} results + bonus tips

Hi {{name}},

Thanks for using our {{calculator_context__calculatorName}}!
Here are 3 tips to maximize your returns based on your results...
```

---

### Zap 2: CRM Lead Scoring and Tagging (HubSpot/Apollo)

**Purpose:** Automatically create or update contacts in your CRM with proper scoring and segmentation.

**Trigger:** Webhooks by Zapier - Catch Hook

**Action Steps:**

1. **HubSpot - Create or Update Contact:**
   - Email: `{{email}}`
   - First Name: `{{name}}`
   - Lead Score (custom property): `{{lead_score}}`
   - Lead Source: `{{form_source}}`
   - UTM Source: `{{utm_params__utm_source}}`
   - UTM Campaign: `{{utm_params__utm_campaign}}`

2. **HubSpot - Add Contact to List:**
   - Use `{{lead_tier}}` to route to the appropriate list:
     - "Hot Leads - Immediate Follow-up"
     - "Warm Leads - Nurture"
     - "Cool Leads - Weekly"
     - "Cold Leads - Monthly"

3. **HubSpot - Create Task** (only for hot leads):
   - Filter: `lead_tier` equals `hot`
   - Task: "Follow up with {{name}} ({{email}}) - Score: {{lead_score}}"
   - Due: Today
   - Assign to: Sales team member

---

### Zap 3: Hot Lead Instant Notification (Slack/Teams)

**Purpose:** Alert your team immediately when a high-intent lead comes in.

**Trigger:** Webhooks by Zapier - Catch Hook

**Filter:** Only continue when `lead_tier` equals `hot`

**Action Steps:**

1. **Slack - Send Channel Message:**
   - Channel: `#sales-leads`
   - Message:
   ```
   :fire: Hot Lead Alert!
   
   Name: {{name}}
   Email: {{email}}
   Score: {{lead_score}}/100
   Segment: {{lead_segment}}
   Source: {{form_source}}
   Page: {{page_url}}
   Calculator: {{calculator_context__calculatorName}}
   
   UTM: {{utm_params__utm_source}} / {{utm_params__utm_medium}} / {{utm_params__utm_campaign}}
   
   Action: Reach out within 1 hour!
   ```

2. **Optional - Google Calendar - Create Event:**
   - Title: "Follow up: {{name}} (Hot Lead)"
   - Start: 1 hour from now
   - Description: Include lead details and context

---

### Zap 4: Calculator-Specific Follow-Up Drip

**Purpose:** Send targeted financial content based on which calculator the user engaged with.

**Trigger:** Webhooks by Zapier - Catch Hook

**Filter:** Only continue when `lead_segment` equals `calculator_power_user`

**Action Steps:**

1. **Paths** (by Zapier): Branch on `calculator_context__calculatorName`:

   - **SIP Calculator users:**
     - Day 0: "Understanding SIP returns - a beginner's guide"
     - Day 3: "Top 5 mutual funds for SIP in 2025"
     - Day 7: "SIP vs lump sum: when to choose what"
   
   - **EMI Calculator users:**
     - Day 0: "Smart borrowing: how to minimize your EMI burden"
     - Day 3: "Compare home loan rates across 10 banks"
     - Day 7: "Pre-payment strategies that save lakhs"
   
   - **PPF Calculator users:**
     - Day 0: "PPF vs other tax-saving instruments"
     - Day 3: "Maximize PPF returns with this deposit timing trick"
     - Day 7: "Building a retirement corpus: PPF + NPS strategy"
   
   - **Tax Calculator users:**
     - Day 0: "Old vs New tax regime - which saves more?"
     - Day 3: "5 deductions most Indians miss"
     - Day 7: "Tax planning calendar for the financial year"
   
   - **Import Duty Calculator users:**
     - Day 0: "Understanding India's import duty structure"
     - Day 3: "How to calculate total landed cost for imports"
     - Day 7: "Common items and their actual duty rates"
   
   - **Solar ROI Calculator users:**
     - Day 0: "Solar panel ROI: what the numbers really mean"
     - Day 3: "Government subsidies for residential solar in 2025"
     - Day 7: "Choosing the right solar panel size for your home"

2. **ConvertKit/Mailchimp - Add Subscriber to Sequence:**
   - Tag based on calculator name
   - Start the matching email sequence

---

### Zap 5: Re-engagement Campaign for Cool/Cold Leads

**Purpose:** Automatically re-engage leads who showed low initial intent after a waiting period.

**Trigger:** Webhooks by Zapier - Catch Hook

**Filter:** Only continue when `lead_tier` equals `cool` OR `cold`

**Action Steps:**

1. **Delay by Zapier:** Wait 7 days

2. **Paths** based on `lead_segment`:
   - **newsletter_subscriber:** Send "Here's what you missed this week" digest
   - **exit_intent_capture:** Send "Still thinking about it?" with a free resource
   - **content_reader:** Send "More articles you might like" based on `page_url`
   - **general:** Send "Top financial tools our users love"

3. **Mailchimp - Send Campaign:**
   - Template: Re-engagement series
   - Personalization: Reference original page/calculator

4. **Optional - Delay 14 more days**, then:
   - If no email opens (check via Mailchimp integration): Remove from active list
   - If opened: Upgrade to weekly digest

---

### Zap 6: Weekly Lead Digest Summary

**Purpose:** Send your team a consolidated summary of all leads captured during the week.

**Trigger:** Schedule by Zapier - Every Monday at 9:00 AM IST

**Action Steps:**

1. **Google Sheets - Get Rows:** Fetch all rows added in the last 7 days (from the tracking sheet populated by Zap 7 below)

2. **Formatter by Zapier - Utilities:** Create summary:
   - Total leads this week
   - Breakdown by tier (hot/warm/cool/cold)
   - Top form sources
   - Top UTM campaigns

3. **Email by Zapier - Send Outbound Email:**
   - To: team@yourdomain.com
   - Subject: "Weekly Lead Report - {{date}}"
   - Body: Formatted summary with key metrics

4. **Slack - Send Channel Message:**
   - Channel: `#marketing-metrics`
   - Message: Weekly lead summary with highlights

---

### Zap 7: UTM Attribution Tracking (Google Sheets)

**Purpose:** Log every lead with full UTM attribution for campaign analysis.

**Trigger:** Webhooks by Zapier - Catch Hook

**Action Steps:**

1. **Google Sheets - Create Spreadsheet Row:**
   - Spreadsheet: "CostSmart Lead Tracking 2025"
   - Worksheet: "All Leads"
   - Columns:
     | Column | Value |
     |--------|-------|
     | A - Date | `{{submitted_at}}` |
     | B - Email | `{{email}}` |
     | C - Name | `{{name}}` |
     | D - Score | `{{lead_score}}` |
     | E - Tier | `{{lead_tier}}` |
     | F - Segment | `{{lead_segment}}` |
     | G - Form Source | `{{form_source}}` |
     | H - Page URL | `{{page_url}}` |
     | I - UTM Source | `{{utm_params__utm_source}}` |
     | J - UTM Medium | `{{utm_params__utm_medium}}` |
     | K - UTM Campaign | `{{utm_params__utm_campaign}}` |
     | L - UTM Content | `{{utm_params__utm_content}}` |
     | M - UTM Term | `{{utm_params__utm_term}}` |
     | N - Calculator | `{{calculator_context__calculatorName}}` |
     | O - Referrer | `{{referrer}}` |
     | P - Engagement Path | `{{engagement_path}}` |

2. **Optional - Filter + Google Sheets:** Create a second row in a "Hot Leads" worksheet when `lead_tier` is `hot`

---

## 5. Creative Automation Ideas

### Calculator-Based Personalized Journeys

Each calculator reveals specific financial intent. Use this to craft hyper-relevant follow-ups:

| Calculator | User Intent | Follow-Up Content |
|-----------|-------------|-------------------|
| SIP Calculator | Wealth building | Mutual fund comparisons, market updates, goal-based investing tips |
| EMI Calculator | Loan consideration | Bank rate comparisons, pre-approval offers, refinancing guides |
| PPF Calculator | Tax-saving, long-term savings | PPF timing strategies, Section 80C guides, retirement planning |
| Tax Calculator | Tax optimization | Regime comparison, deduction checklists, ITR filing reminders |
| Import Duty Calculator | International purchasing | Landed cost guides, duty exemptions, customs clearance tips |
| Solar ROI Calculator | Green energy investment | Subsidy updates, installer comparisons, payback period analysis |

**Implementation:** Use Zapier Paths to branch on `calculator_context.calculatorName` and route leads to specific ConvertKit/Mailchimp sequences.

### Exit Intent Re-Engagement with Urgency

Leads captured via exit intent have fleeting attention. Use time-sensitive tactics:

1. **Immediate (within 5 minutes):** Send a "Before you go..." email with the top calculator result or article they were viewing
2. **After 2 hours:** "Quick tip" email related to their page topic
3. **After 24 hours:** "Did you know?" with a surprising financial fact + CTA back to the site
4. **After 72 hours:** "Free resource" download (PDF guide related to their interest)

### Time-Based Financial Tips

Leverage timing for maximum relevance:

- **Monday mornings:** "Start your week with a financial win" for newsletter subscribers
- **Month-end (25th-30th):** "Investment reminder" for SIP calculator users
- **Tax season (Jan-March):** Increased frequency for tax calculator users
- **Market drops:** Triggered emails to SIP users about "buying the dip"

**Implementation:** Combine Schedule by Zapier triggers with filtered sends to specific segments stored in your email tool.

### Engagement Scoring Ladder

Promote leads up the tier ladder based on engagement:

```
Cold (score 0-29)
  |
  | Opens 2+ emails --> Promote to Cool
  v
Cool (score 30-49)
  |
  | Clicks link + returns to site --> Promote to Warm
  v
Warm (score 50-79)
  |
  | Uses calculator OR replies to email --> Promote to Hot
  v
Hot (score 80-100)
  |
  | --> Sales team follow-up
```

**Implementation with Zapier:**
1. Track email opens/clicks via Mailchimp/ConvertKit triggers
2. When engagement threshold is met, use Zapier to update the lead's tag/score in your CRM
3. Moving to a new tier triggers the corresponding engagement path

### Multi-Channel Touchpoints

Diversify beyond email for higher engagement:

- **WhatsApp (via Twilio):** Send calculator results summary to hot leads
- **SMS:** Quick financial tip of the day for engaged subscribers
- **Browser push notifications:** New calculator or tool announcements
- **LinkedIn (via Phantombuster):** Connect with hot B2B leads

### Referral Program Automation

Turn engaged leads into referral sources:

1. After a lead opens 3+ emails (tracked via email tool): Send referral program invite
2. When a referral link is used: Zapier catches the event and credits the referrer
3. At referral milestones: Send reward notification

### Content Consumption Tracking

Use `page_url` and `referrer` to build interest profiles:

- Lead visits `/calculators/sip` then `/calculators/ppf`: Tag as "wealth builder"
- Lead visits `/calculators/emi` then `/blog/home-loans`: Tag as "home buyer"
- Lead comes from `utm_source=google` with `utm_term=tax saving`: Tag as "tax optimizer"

---

## 6. Lead Scoring Reference Table

### Scoring Model

The lead score is computed server-side based on form source, name presence, calculator context, and UTM data:

| Form Source | Base Score | +Name | +Calculator Context | +Paid UTM | Score Range |
|-------------|-----------|-------|--------------------:|-----------|-------------|
| `costsmart-calculator-gate-form` | 80 | +10 | +10 | N/A | 80-100 |
| `costsmart-exit-intent-form` | 50 | +10 | N/A | +10 | 50-70 |
| `costsmart-newsletter-form` | 30 | +10 | N/A | +10 | 30-50 |
| `costsmart-blog-sidebar-form` | 30 | +10 | N/A | +10 | 30-50 |
| `costsmart-bottombar-form` | 10 | +10 | N/A | +10 | 10-30 |

> **Paid UTM** is triggered when `utm_medium` equals `"cpc"` or `"paid"`.

### Tier Mapping

| Lead Score | Tier | Engagement Path | Action Cadence |
|-----------|------|-----------------|----------------|
| 80-100 | Hot | `immediate_followup` | Within 1 hour |
| 50-79 | Warm | `nurture_sequence` | 5-email drip over 14 days |
| 30-49 | Cool | `weekly_digest` | Weekly content |
| 0-29 | Cold | `monthly_roundup` | Monthly newsletter |

### Segment Mapping

| Condition | Segment | Priority Content |
|-----------|---------|-----------------|
| Calculator context present | `calculator_power_user` | Calculator-specific tips, advanced tools |
| Blog sidebar form | `content_reader` | Related articles, new content alerts |
| Newsletter or bottom bar form | `newsletter_subscriber` | Broad financial content, weekly roundup |
| Exit intent form | `exit_intent_capture` | Quick wins, urgency-based content |
| Fallback | `general` | General financial literacy |

### Automation Routing Matrix

Use this matrix to decide which Zap actions fire for each lead:

| Tier + Segment | Slack Alert | CRM Task | Email Sequence | Google Sheets |
|---------------|-------------|----------|----------------|---------------|
| Hot + calculator_power_user | Yes (immediate) | Yes (1h deadline) | Calculator drip | Yes |
| Hot + exit_intent_capture | Yes (immediate) | Yes (2h deadline) | Urgency sequence | Yes |
| Warm + content_reader | No | Yes (24h) | Content recommendations | Yes |
| Warm + newsletter_subscriber | No | No | Nurture sequence | Yes |
| Cool + any | No | No | Weekly digest add | Yes |
| Cold + any | No | No | Monthly roundup add | Yes |

---

## 7. Free Tier Considerations

### Zapier Plan Limits

| Plan | Tasks/Month | Multi-Step Zaps | Premium Apps | Paths |
|------|-------------|-----------------|--------------|-------|
| Free | 100 | No (2-step only) | No | No |
| Starter | 750 | Yes | No | No |
| Professional | 2,000 | Yes | Yes | Yes |
| Team | 50,000 | Yes | Yes | Yes |

> **Important:** A "task" is counted per action step execution. A 5-step Zap triggered once uses 5 tasks (trigger is free, but each action counts as 1 task).

### Task-Efficient Design Strategies

#### 1. Use Filters Early

Place Filter steps immediately after the trigger. Filtered-out Zaps do NOT count as tasks.

```
Trigger (free) -> Filter (free) -> Action (1 task)
```

Instead of sending all leads to Slack, filter for `lead_tier = hot` first.

#### 2. Consolidate Actions

Instead of separate Zaps for each action, use a single multi-step Zap:

**Inefficient (costs 3 tasks for hot leads):**
- Zap A: Webhook -> Slack notification
- Zap B: Webhook -> HubSpot create contact
- Zap C: Webhook -> Google Sheets row

**Efficient (costs 3 tasks but uses 1 trigger):**
- Zap A: Webhook -> Filter (hot) -> Slack + HubSpot + Sheets

#### 3. Use Paths Wisely (Professional plan)

One Zap with Paths replaces multiple single-purpose Zaps:

```
Trigger -> Paths:
  Path A (hot): Slack + CRM + Sheets (3 tasks)
  Path B (warm): CRM + Sheets (2 tasks)
  Path C (cool/cold): Sheets only (1 task)
```

Only the matching path executes, saving tasks on every trigger.

#### 4. Batch Where Possible

For non-urgent actions (weekly digest, monthly roundup), use Schedule triggers instead of per-lead triggers:

- **Per-lead approach:** 100 leads/month x 1 task = 100 tasks for Sheets logging
- **Batch approach:** 4 weekly summaries x 1 task = 4 tasks (use Google Sheets search + update)

#### 5. Priority-Based Activation

On the free tier (100 tasks/month), prioritize which automations to enable:

| Priority | Automation | Tasks/Lead | Monthly Estimate |
|----------|-----------|-----------|-----------------|
| 1 | Google Sheets logging | 1 | ~50 tasks |
| 2 | Hot lead Slack alert (filtered) | 1 | ~5 tasks |
| 3 | Welcome email (all leads) | 1 | ~50 tasks |

This fits within 100 tasks/month for moderate traffic (~50 leads).

### Upgrading Path

If you consistently hit task limits:
1. Start with Free: Sheets logging + hot lead alerts
2. Move to Starter (750 tasks): Add email sequences + CRM
3. Move to Professional (2,000 tasks): Add Paths for full routing + re-engagement delays

---

## 8. Testing

### Local Testing with curl

Test the lead capture API endpoint locally without needing Zapier configured:

```bash
# Basic newsletter signup
curl -X POST http://localhost:3000/api/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test User",
    "formSource": "costsmart-newsletter-form",
    "pageUrl": "/blog/sip-vs-lumpsum",
    "timestamp": "2025-01-15T10:30:00.000Z",
    "utmParams": {
      "utm_source": "google",
      "utm_medium": "cpc",
      "utm_campaign": "sip-calculator"
    }
  }'
```

```bash
# Calculator gate form with context (produces hot lead)
curl -X POST http://localhost:3000/api/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "email": "investor@example.com",
    "name": "Priya Sharma",
    "formSource": "costsmart-calculator-gate-form",
    "pageUrl": "/calculators/sip",
    "timestamp": "2025-01-15T11:00:00.000Z",
    "calculatorContext": {
      "calculatorName": "SIP Calculator",
      "resultSummary": "Monthly SIP of Rs 10,000 for 20 years at 12% = Rs 99.9 lakhs"
    }
  }'
```

```bash
# Exit intent capture (produces warm lead)
curl -X POST http://localhost:3000/api/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "email": "visitor@example.com",
    "formSource": "costsmart-exit-intent-form",
    "pageUrl": "/calculators/emi",
    "referrer": "https://www.google.com/search?q=emi+calculator",
    "timestamp": "2025-01-15T12:00:00.000Z"
  }'
```

```bash
# Bottom bar form (produces cold lead)
curl -X POST http://localhost:3000/api/lead-capture \
  -H "Content-Type: application/json" \
  -d '{
    "email": "casual@example.com",
    "formSource": "costsmart-bottombar-form",
    "pageUrl": "/",
    "timestamp": "2025-01-15T13:00:00.000Z"
  }'
```

### Expected Responses

**Success:**
```json
{ "success": true, "lead_score": 90 }
```

**Validation Error:**
```json
{ "error": "Valid email is required" }
```

### Verifying Zapier Receives Data

1. In your Zap editor, go to the trigger step.
2. Click **Test trigger**.
3. Zapier will show the most recent webhook payload received.
4. Verify all fields are present and correctly populated.
5. If no data appears, check:
   - The `ZAPIER_WEBHOOK_URL` environment variable is set
   - The URL matches your Catch Hook URL exactly
   - Your application has been redeployed after adding the variable

### Troubleshooting Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| No data in Zapier | `ZAPIER_WEBHOOK_URL` not set | Add the env var and redeploy |
| Partial data | Form not sending all fields | Check the form component passes `formSource`, `pageUrl`, etc. |
| Wrong lead score | Incorrect `formSource` value | Verify form uses exact identifier strings |
| Zapier shows "waiting" | No test submission sent yet | Submit a form or use curl to send test data |
| 500 error from API | Malformed JSON body | Ensure Content-Type header is set and body is valid JSON |
| Leads not scoring correctly | UTM params not passed | Verify UTM extraction in `lead-capture-utils.ts` |
| Delayed Zapier execution | Zapier polling interval | Catch Hook triggers are instant; check Zap is turned on |

### Testing Individual Zap Steps

1. **Use Zapier's built-in test:** Each action step has a "Test" button that runs with sample data.
2. **Use Zapier's Task History:** After going live, monitor Tasks > History for failures.
3. **Set up error notifications:** In Zapier Settings > Notifications, enable "Zap error" alerts.

### End-to-End Testing Checklist

- [ ] Submit each form type on the live site
- [ ] Verify lead score matches expected range for each form
- [ ] Confirm Zapier trigger receives the full payload
- [ ] Test each Zap action step individually
- [ ] Verify CRM contact creation (if configured)
- [ ] Verify email delivery (check spam folders)
- [ ] Verify Slack/Teams notification (if configured)
- [ ] Verify Google Sheets row creation (if configured)
- [ ] Test with and without UTM parameters
- [ ] Test with and without name provided
- [ ] Test calculator form with and without calculator context

---

## Appendix: Quick Reference

### Environment Variables

```bash
# Required for Zapier integration
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/XXXXXX/XXXXXX/

# Optional: disable lead capture forms entirely
NEXT_PUBLIC_LEAD_CAPTURE_ENABLED=true
```

### API Endpoint

```
POST /api/lead-capture
Content-Type: application/json
```

### Form Source Quick Reference

| Form Component | form_source Value | Typical Score |
|---------------|-------------------|---------------|
| CalculatorResultGate | `costsmart-calculator-gate-form` | 80-100 |
| ExitIntentPopup | `costsmart-exit-intent-form` | 50-70 |
| NewsletterInlineForm | `costsmart-newsletter-form` | 30-50 |
| BlogSidebarForm | `costsmart-blog-sidebar-form` | 30-50 |
| FloatingBottomBar | `costsmart-bottombar-form` | 10-30 |
