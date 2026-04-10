import clientPromise, { MONGODB_DB } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

interface AppointmentQuery {
  $or: Array<{ _id?: ObjectId } | { id?: string }>;
}

function getAppointmentQuery(id: string): AppointmentQuery {
  if (typeof id === 'object' && id !== null && (id as { $oid?: string }).$oid) {
    id = (id as { $oid: string }).$oid;
  }
  try {
    if (ObjectId.isValid(id)) {
      return { $or: [{ _id: new ObjectId(id) }, { id: id }] };
    }
  } catch (e) {
    // ignore
  }
  return { $or: [{ id: id }] };
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['pending', 'completed', 'cancelled'].includes(status)) {
      return new Response(JSON.stringify({ error: 'Invalid status' }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db(MONGODB_DB);
    const query = getAppointmentQuery(id);
    const result = await db.collection('appointments').findOneAndUpdate(
      query,
      { $set: { status, updatedAt: new Date().toISOString() } },
      { returnDocument: 'after' }
    );

    if (!result || !result.value) {
      return new Response(JSON.stringify({ error: 'Appointment not found' }), { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: 'Appointment updated successfully', appointment: result.value }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to update appointment' }), { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const client = await clientPromise;
    const db = client.db(MONGODB_DB);
    const query = getAppointmentQuery(id);
    const result = await db.collection('appointments').deleteOne(query);

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({ error: 'Appointment not found' }), { status: 404 });
    }

    return new Response(
      JSON.stringify({ message: 'Appointment deleted successfully' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Failed to delete appointment' }), { status: 500 });
  }
}
