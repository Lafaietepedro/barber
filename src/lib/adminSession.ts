import { createHmac, timingSafeEqual } from 'crypto';

export const ADMIN_SESSION_COOKIE = 'barber_admin_session';
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 8;

interface AdminSessionPayload {
  exp: number;
  username: string;
}

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET || process.env.AUTH_SECRET || process.env.MONGODB_URI;

  if (!secret) {
    throw new Error('ADMIN_SESSION_SECRET (or AUTH_SECRET) is required');
  }

  return secret;
}

function sign(value: string): string {
  return createHmac('sha256', getSessionSecret()).update(value).digest('base64url');
}

function parseCookieHeader(cookieHeader: string | null): Record<string, string> {
  if (!cookieHeader) return {};

  return cookieHeader
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce<Record<string, string>>((acc, part) => {
      const separatorIndex = part.indexOf('=');
      if (separatorIndex <= 0) return acc;

      const key = part.slice(0, separatorIndex);
      const value = part.slice(separatorIndex + 1);
      acc[key] = value;
      return acc;
    }, {});
}

export function createAdminSessionToken(username: string): string {
  const payload: AdminSessionPayload = {
    exp: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
    username,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString('base64url');
  const signature = sign(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function getAdminSessionTokenFromRequest(request: Request): string | null {
  const cookies = parseCookieHeader(request.headers.get('cookie'));
  return cookies[ADMIN_SESSION_COOKIE] || null;
}

export function validateAdminSessionToken(token: string | null): boolean {
  if (!token) return false;

  const [encodedPayload, signature] = token.split('.');
  if (!encodedPayload || !signature) return false;

  const expectedSignature = sign(encodedPayload);
  const providedBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expectedSignature);

  if (providedBuffer.length !== expectedBuffer.length) return false;
  if (!timingSafeEqual(providedBuffer, expectedBuffer)) return false;

  try {
    const parsed = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString('utf8')) as AdminSessionPayload;
    return Number.isFinite(parsed.exp) && parsed.exp > Date.now();
  } catch {
    return false;
  }
}

export function isAdminAuthenticated(request: Request): boolean {
  const token = getAdminSessionTokenFromRequest(request);
  return validateAdminSessionToken(token);
}

export function buildAdminSessionCookie(token: string): string {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${ADMIN_SESSION_COOKIE}=${token}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${SESSION_MAX_AGE_SECONDS}${secureFlag}`;
}

export function buildExpiredAdminSessionCookie(): string {
  const secureFlag = process.env.NODE_ENV === 'production' ? '; Secure' : '';
  return `${ADMIN_SESSION_COOKIE}=; HttpOnly; Path=/; SameSite=Lax; Max-Age=0${secureFlag}`;
}
