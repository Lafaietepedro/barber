import clientPromise, { MONGODB_DB } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface Appointment {
  _id?: ObjectId;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
  status: string;
  createdAt: string;
}

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(MONGODB_DB);
    const appointments = await db.collection('appointments').find({}).toArray();
    return new Response(JSON.stringify({ appointments }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch appointments' }), { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, service, date, time, notes } = body;

    if (!name || !phone || !service || !date || !time) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    const newAppointment: Appointment = {
      name,
      phone,
      service,
      date,
      time,
      notes: notes || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const client = await clientPromise;
    const db = client.db(MONGODB_DB);
    const result = await db.collection('appointments').insertOne(newAppointment);
    newAppointment._id = result.insertedId;

    return new Response(
      JSON.stringify({ message: 'Appointment created successfully', appointment: newAppointment }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to create appointment' }), { status: 500 });
  }
}
