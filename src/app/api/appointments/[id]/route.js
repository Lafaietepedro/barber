import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

function getAppointmentQuery(id) {
  // Se vier como objeto { $oid: "..." }
  if (typeof id === 'object' && id !== null && id.$oid) {
    id = id.$oid;
  }
  // Tenta converter para ObjectId, se possível
  try {
    if (ObjectId.isValid(id)) {
      return { $or: [ { _id: new ObjectId(id) }, { id: id } ] };
    }
  } catch (e) {
    // Se der erro, ignora e tenta buscar por string
  }
  return { id: id };
}

// PUT - Update appointment status
export async function PUT(request, context) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['pending', 'completed', 'cancelled'].includes(status)) {
      return new Response(JSON.stringify({ error: 'Invalid status' }), { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db('barber');
    const query = getAppointmentQuery(id);
    const result = await db.collection('appointments').findOneAndUpdate(
      query,
      { $set: { status, updatedAt: new Date().toISOString() } },
      { returnDocument: 'after' }
    );

    if (!result.value) {
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

// DELETE - Remove appointment
export async function DELETE(request, context) {
  try {
    const { id } = await context.params;
    const client = await clientPromise;
    const db = client.db('barber');
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