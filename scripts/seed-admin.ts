import { MongoClient } from 'mongodb';
import bcrypt from 'bcryptjs';
import * as readline from 'readline';

const uri = process.env.MONGODB_URI;
const dbName = process.env.MONGODB_DB || 'barber';

if (!uri) {
  console.error('MONGODB_URI not found in environment variables');
  process.exit(1);
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

const ask = (question: string): Promise<string> =>
  new Promise((resolve) => rl.question(question, resolve));

async function seed() {
  const username = await ask('Admin username: ');
  const password = await ask('Admin password: ');
  rl.close();

  const hashedPassword = await bcrypt.hash(password, 12);

  const client = new MongoClient(uri!);
  await client.connect();
  const db = client.db(dbName);

  await db.collection('users').deleteMany({ username });
  await db.collection('users').insertOne({
    username,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  });

  console.log(`Admin user "${username}" created successfully`);
  await client.close();
}

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
