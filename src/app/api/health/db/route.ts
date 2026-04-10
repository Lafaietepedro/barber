import clientPromise, { MONGODB_DB } from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(MONGODB_DB);
    await db.command({ ping: 1 });

    return new Response(
      JSON.stringify({
        ok: true,
        database: MONGODB_DB,
        message: 'MongoDB connection is healthy',
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('MongoDB health check failed:', error);
    const details =
      process.env.NODE_ENV === 'development' && error instanceof Error
        ? error.message
        : 'Check MongoDB network and credentials';

    return new Response(
      JSON.stringify({
        ok: false,
        database: MONGODB_DB,
        message: 'MongoDB connection failed',
        details,
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
