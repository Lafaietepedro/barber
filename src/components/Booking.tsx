'use client';

import { useState, FormEvent } from 'react';
import ConfirmationModal from './ConfirmationModal';
import { bookingConfig } from '@/config/booking';

interface FormData {
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  notes: string;
}

export default function Booking() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Appointment saved:', result);
        setIsModalOpen(true);
        setFormData({
          name: '',
          phone: '',
          service: '',
          date: '',
          time: '',
          notes: ''
        });
      } else {
        const error = await response.json();
        alert(`Booking error: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('Failed to save booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="agendamento" className="py-16 bg-barber-primary text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-2 text-center">
          Make Your <span className="text-barber-secondary">Booking</span>
        </h2>
        <p className="font-sans text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Choose your preferred service, date, and time to secure your premium appointment.
        </p>

        <div className="bg-white text-barber-primary rounded-lg shadow-xl p-8 max-w-3xl mx-auto">
          <form id="booking-form" className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary" 
                  required 
                  tabIndex={0} 
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary" 
                  required 
                  tabIndex={0} 
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-gray-700 font-medium mb-2">Service</label>
              <select 
                id="service" 
                name="service" 
                value={formData.service}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary" 
                required 
                tabIndex={0}
              >
                <option value="">Select a service</option>
                {bookingConfig.services.map((service) => (
                  <option key={service.id} value={service.id}>
                    {service.label} - ${service.price.toFixed(2)}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Date</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary" 
                  required 
                  tabIndex={0} 
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-gray-700 font-medium mb-2">Time</label>
                <select 
                  id="time" 
                  name="time" 
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary" 
                  required 
                  tabIndex={0}
                >
                  <option value="">Select a time</option>
                  {bookingConfig.timeSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">Notes (optional)</label>
              <textarea 
                id="notes" 
                name="notes" 
                value={formData.notes}
                onChange={handleInputChange}
                rows={3} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary" 
                tabIndex={0}
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button 
                type="submit" 
                disabled={isLoading}
                className={`bg-barber-secondary text-barber-primary px-8 py-3 rounded-md font-medium transition-all duration-300 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
                }`} 
                tabIndex={0}
              >
                {isLoading ? 'Saving...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && <ConfirmationModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}
