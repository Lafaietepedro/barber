import { buildExpiredAdminSessionCookie } from '@/lib/adminSession';

export async function POST() {
  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Set-Cookie': buildExpiredAdminSessionCookie(),
    },
  });
}
