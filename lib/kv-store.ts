import { kv } from '@vercel/kv';

export interface SubscriptionRecord {
  subscriptionId: string;
  email: string;
  status: string;
  planId: string;
  subscriberId: string | null;
  verifiedAt: number; // timestamp ms
}

const SUB_TTL_SECONDS = 24 * 60 * 60; // 24 hours

/**
 * Store a subscription record keyed by subscriptionId (with 24hr TTL)
 * and an email lookup (with same 24hr TTL so both expire together).
 */
export async function storeSubscription(record: SubscriptionRecord): Promise<void> {
  const subKey = `sub:${record.subscriptionId}`;

  await kv.set(subKey, record, { ex: SUB_TTL_SECONDS });

  // Only write the email pointer if a non-empty email is provided
  if (record.email) {
    const emailKey = `email:${record.email.toLowerCase()}`;
    await kv.set(emailKey, record.subscriptionId, { ex: SUB_TTL_SECONDS });
  }
}

/**
 * Look up a subscription by email address (case-insensitive).
 * Returns the full record if found, or null.
 */
export async function getSubscriptionByEmail(email: string): Promise<SubscriptionRecord | null> {
  const emailKey = `email:${email.toLowerCase()}`;
  const subscriptionId = await kv.get<string>(emailKey);

  if (!subscriptionId) {
    return null;
  }

  return getSubscriptionById(subscriptionId);
}

/**
 * Look up a subscription record by its subscription ID.
 */
export async function getSubscriptionById(subscriptionId: string): Promise<SubscriptionRecord | null> {
  const subKey = `sub:${subscriptionId}`;
  const record = await kv.get<SubscriptionRecord>(subKey);
  return record || null;
}

/**
 * Update the status of a subscription record.
 * If no prior record exists (e.g. TTL expired) and an email is provided,
 * creates a minimal record so cancellation/suspension status is persisted.
 */
export async function updateSubscriptionStatus(
  subscriptionId: string,
  status: string,
  email?: string
): Promise<void> {
  const existing = await getSubscriptionById(subscriptionId);

  if (existing) {
    const updated: SubscriptionRecord = {
      ...existing,
      status,
      verifiedAt: Date.now(),
    };
    const subKey = `sub:${subscriptionId}`;
    await kv.set(subKey, updated, { ex: SUB_TTL_SECONDS });
  } else if (email) {
    // Create minimal record for cancellation/suspension tracking
    // so the email pointer correctly resolves to a non-active status.
    const record: SubscriptionRecord = {
      subscriptionId,
      email,
      status,
      planId: '',
      subscriberId: null,
      verifiedAt: Date.now(),
    };
    await storeSubscription(record);
  }
}
