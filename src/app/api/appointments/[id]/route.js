import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the appointments data file
const dataFilePath = path.join(process.cwd(), 'data', 'appointments.json');

// Read appointments from file
const readAppointments = () => {
  try {
    if (fs.existsSync(dataFilePath)) {
      const data = fs.readFileSync(dataFilePath, 'utf8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading appointments:', error);
    return [];
  }
};

// Write appointments to file
const writeAppointments = (appointments) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(appointments, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing appointments:', error);
    return false;
  }
};

// PUT - Update appointment status
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    if (!status || !['pending', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const appointments = readAppointments();
    const appointmentIndex = appointments.findIndex(apt => apt.id === id);

    if (appointmentIndex === -1) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Update appointment status
    appointments[appointmentIndex].status = status;
    appointments[appointmentIndex].updatedAt = new Date().toISOString();

    const success = writeAppointments(appointments);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to update appointment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Appointment updated successfully',
      appointment: appointments[appointmentIndex]
    });
  } catch (error) {
    console.error('Error updating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to update appointment' },
      { status: 500 }
    );
  }
}

// DELETE - Remove appointment
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const appointments = readAppointments();
    const appointmentIndex = appointments.findIndex(apt => apt.id === id);

    if (appointmentIndex === -1) {
      return NextResponse.json(
        { error: 'Appointment not found' },
        { status: 404 }
      );
    }

    // Remove appointment
    appointments.splice(appointmentIndex, 1);

    const success = writeAppointments(appointments);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to delete appointment' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting appointment:', error);
    return NextResponse.json(
      { error: 'Failed to delete appointment' },
      { status: 500 }
    );
  }
} 