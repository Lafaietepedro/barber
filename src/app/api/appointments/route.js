import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Path to the appointments data file
const dataFilePath = path.join(process.cwd(), 'data', 'appointments.json');

// Ensure data directory exists
const ensureDataDirectory = () => {
  const dataDir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
};

// Read appointments from file
const readAppointments = () => {
  try {
    ensureDataDirectory();
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
    ensureDataDirectory();
    fs.writeFileSync(dataFilePath, JSON.stringify(appointments, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing appointments:', error);
    return false;
  }
};

// GET - Retrieve all appointments
export async function GET() {
  try {
    const appointments = readAppointments();
    return NextResponse.json({ appointments });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch appointments' },
      { status: 500 }
    );
  }
}

// POST - Create new appointment
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, phone, service, date, time, notes } = body;

    // Validate required fields
    if (!name || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create new appointment
    const newAppointment = {
      id: Date.now().toString(),
      name,
      phone,
      service,
      date,
      time,
      notes: notes || '',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    // Read existing appointments
    const appointments = readAppointments();
    
    // Add new appointment
    appointments.push(newAppointment);
    
    // Save to file
    const success = writeAppointments(appointments);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Failed to save appointment' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Appointment created successfully',
        appointment: newAppointment 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Failed to create appointment' },
      { status: 500 }
    );
  }
} 