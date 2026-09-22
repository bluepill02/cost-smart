import { test, expect } from '@playwright/test';

test.describe('API Security Tests', () => {
  test('Azure Detect Language API rate limiting resists IP spoofing', async ({ request }) => {
    // Send 25 requests with the same real IP but different spoofed X-Forwarded-For headers
    const requests = Array.from({ length: 25 }).map((_, i) => {
      return request.post('/api/azure/detect-language', {
        data: { text: 'Hello, world!' },
        headers: {
          'X-Forwarded-For': `10.0.0.${i}`,
          'X-Real-IP': '192.168.1.100'
        }
      });
    });

    const responses = await Promise.all(requests);

    // Check if rate limiting kicked in (status 429)
    const rateLimitedResponses = responses.filter(r => r.status() === 429);

    // Max requests is 20, so we expect exactly 5 requests to be rate limited
    expect(rateLimitedResponses.length).toBeGreaterThan(0);
    expect(rateLimitedResponses.length).toBe(5);
  });
});
