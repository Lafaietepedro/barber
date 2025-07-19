import { NextResponse } from 'next/server';

// Simple admin credentials (in production, use environment variables and proper hashing)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'barber123'
};

export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // In a real app, you'd use JWT tokens or sessions
      return NextResponse.json({
        success: true,
        message: 'Login successful',
        user: { username: 'admin', role: 'admin' }
      });
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Login failed' },
      { status: 500 }
    );
  }
} 