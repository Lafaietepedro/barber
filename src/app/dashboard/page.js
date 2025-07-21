'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { appointments } from '@/lib/appointments';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [userAppointments, setUserAppointments] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
    
    // Load user appointments
    const userAppts = appointments.getUserAppointments(currentUser.email);
    setUserAppointments(userAppts);
  }, [router]);

  const handleLogout = () => {
    auth.logout();
    router.push('/');
  };

  const handleCancelAppointment = (appointmentId) => {
    if (appointments.cancelAppointment(appointmentId)) {
      // Refresh appointments list
      const updatedAppointments = appointments.getUserAppointments(user.email);
      setUserAppointments(updatedAppointments);
    }
  };

  if (!user) {
    return <div className="min-h-screen bg-barber-primary flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-barber-primary text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-barber-secondary mb-2">
              Welcome, {user.name}!
            </h1>
            <p className="text-gray-300">Manage your appointments</p>
          </div>
          <div className="flex gap-4">
            <a
              href="/appointments"
              className="bg-barber-secondary text-barber-primary px-4 py-2 rounded-md hover:bg-opacity-90 transition"
            >
              Book New Appointment
            </a>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-barber-secondary">
            Your Appointments
          </h2>
          
          {userAppointments.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-4">No appointments found</p>
              <a
                href="/appointments"
                className="bg-barber-secondary text-barber-primary px-6 py-2 rounded-md hover:bg-opacity-90 transition"
              >
                Book Your First Appointment
              </a>
            </div>
          ) : (
            <div className="grid gap-4">
              {userAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="bg-gray-700 rounded-lg p-4 border-l-4 border-barber-secondary"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{
                        appointment.service
                          .split(' ')
                          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                          .join(' ')
                      }</h3>
                      <p className="text-gray-300">
                        {appointment.date} at {appointment.time}
                      </p>
                      <p className="text-gray-400">Barber: {appointment.barber}</p>
                    </div>
                    <button
                      onClick={() => handleCancelAppointment(appointment.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 