import { NextRequest } from 'next/server';

export function getClientIp(request: NextRequest): string {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ip = (request as any).ip;
  if (ip) {
    return ip;
  }

  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',').pop()?.trim() || 'unknown';
  }

  return 'unknown';
}
