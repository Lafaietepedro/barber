import clientPromise, { MONGODB_DB } from '@/lib/mongodb';

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    if (typeof username !== 'string' || typeof password !== 'string') {
      return new Response(JSON.stringify({ success: false, message: 'Invalid request payload' }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(MONGODB_DB);
    const user = await db.collection('users').findOne({ username, password });

    if (user) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    const details =
      process.env.NODE_ENV === 'development' && error instanceof Error
        ? error.message
        : 'Check MONGODB_URI and MONGODB_DB values in .env.local';

    return new Response(JSON.stringify({
      success: false,
      message: 'Database connection failed',
      details,
    }), { status: 500 });
  }
}
