import clientPromise from '@/lib/mongodb';

// GET - Retrieve all appointments
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('barber');
    const appointments = await db.collection('appointments').find({}).toArray();
    return new Response(JSON.stringify({ appointments }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to fetch appointments' }), { status: 500 });
  }
}

// POST - Create new appointment
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, service, date, time, notes } = body;

    // Validate required fields
    if (!name || !phone || !service || !date || !time) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400 });
    }

    // Create new appointment
    const newAppointment = {
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
    const db = client.db('barber');
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