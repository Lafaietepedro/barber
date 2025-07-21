import clientPromise from '@/lib/mongodb';

export async function POST(req) {
  const { username, password } = await req.json();
  const client = await clientPromise;
  const db = client.db('barber');
  const user = await db.collection('users').findOne({ username, password });
  if (user) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } else {
    return new Response(JSON.stringify({ success: false, message: 'Invalid credentials' }), { status: 401 });
  }
} 