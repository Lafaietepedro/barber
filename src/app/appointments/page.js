'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/lib/auth';
import { appointments } from '@/lib/appointments';

export default function AppointmentsPage() {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    service: '',
    barber: ''
  });
  const [availableSlots, setAvailableSlots] = useState([]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const currentUser = auth.getCurrentUser();
    if (!currentUser) {
      router.push('/login');
      return;
    }
    setUser(currentUser);
  }, [router]);

  useEffect(() => {
    if (formData.date) {
      const slots = appointments.getAvailableSlots(formData.date);
      setAvailableSlots(slots);
      // Reset time if current selection is not available
      if (formData.time && !slots.includes(formData.time)) {
        setFormData(prev => ({ ...prev, time: '' }));
      }
    }
  }, [formData.date]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.date || !formData.time || !formData.service || !formData.barber) {
      setError('Please fill in all fields');
      return;
    }

    const appointmentData = {
      ...formData,
      userEmail: user.email,
      userName: user.name
    };

    if (appointments.bookAppointment(appointmentData)) {
      setSuccess('Appointment booked successfully!');
      setFormData({ date: '', time: '', service: '', barber: '' });
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);
    } else {
      setError('Failed to book appointment. Please try again.');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!user) {
    return <div className="min-h-screen bg-barber-primary flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-barber-primary text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-barber-secondary mb-2">
              Book an Appointment
            </h1>
            <p className="text-gray-300">Choose your preferred service, date, and time</p>
          </div>

          {success && (
            <div className="bg-green-500 text-white p-4 rounded-md mb-6 text-center">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-500 text-white p-4 rounded-md mb-6 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-lg p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-barber-secondary focus:border-barber-secondary"
                  required
                />
              </div>

              <div>
                <label htmlFor="time" className="block text-sm font-medium text-gray-300 mb-2">
                  Time
                </label>
                <select
                  id="time"
                  name="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-barber-secondary focus:border-barber-secondary"
                  required
                >
                  <option value="">Select Time</option>
                  {availableSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-sm font-medium text-gray-300 mb-2">
                Service
              </label>
              <select
                id="service"
                name="service"
                value={formData.service}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-barber-secondary focus:border-barber-secondary"
                required
              >
                <option value="">Select Service</option>
                <option value="Haircut">Haircut - $45</option>
                <option value="Shave">Shave - $35</option>
                <option value="Beard Trim">Beard Trim - $25</option>
                <option value="Haircut + Shave">Haircut + Shave - $75</option>
                <option value="Kids Haircut">Kids Haircut - $30</option>
              </select>
            </div>

            <div>
              <label htmlFor="barber" className="block text-sm font-medium text-gray-300 mb-2">
                Barber
              </label>
              <select
                id="barber"
                name="barber"
                value={formData.barber}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-600 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-barber-secondary focus:border-barber-secondary"
                required
              >
                <option value="">Select Barber</option>
                <option value="John">John - Master Barber</option>
                <option value="Mike">Mike - Style Specialist</option>
                <option value="Alex">Alex - Beard Expert</option>
                <option value="Carlos">Carlos - Classic Cuts</option>
              </select>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-barber-secondary text-barber-primary py-3 px-6 rounded-md font-medium hover:bg-opacity-90 transition"
              >
                Book Appointment
              </button>
              <a
                href="/dashboard"
                className="flex-1 bg-gray-600 text-white py-3 px-6 rounded-md font-medium hover:bg-gray-700 transition text-center"
              >
                Back to Dashboard
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 