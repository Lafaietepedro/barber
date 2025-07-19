// Appointments utility using localStorage
export const appointments = {
  // Get all appointments for a user
  getUserAppointments: (userEmail) => {
    if (typeof window === 'undefined') return [];
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    return allAppointments.filter(appointment => appointment.userEmail === userEmail);
  },

  // Book a new appointment
  bookAppointment: (appointmentData) => {
    if (typeof window === 'undefined') return false;
    
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const newAppointment = {
      id: Date.now().toString(),
      ...appointmentData,
      createdAt: new Date().toISOString()
    };
    
    allAppointments.push(newAppointment);
    localStorage.setItem('appointments', JSON.stringify(allAppointments));
    return true;
  },

  // Cancel an appointment
  cancelAppointment: (appointmentId) => {
    if (typeof window === 'undefined') return false;
    
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const filteredAppointments = allAppointments.filter(app => app.id !== appointmentId);
    localStorage.setItem('appointments', JSON.stringify(filteredAppointments));
    return true;
  },

  // Get available time slots for a date
  getAvailableSlots: (date) => {
    const allAppointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    const dateAppointments = allAppointments.filter(app => app.date === date);
    
    // Available time slots (9 AM to 6 PM, every hour)
    const allSlots = [
      '09:00', '10:00', '11:00', '12:00', '13:00', 
      '14:00', '15:00', '16:00', '17:00', '18:00'
    ];
    
    const bookedSlots = dateAppointments.map(app => app.time);
    return allSlots.filter(slot => !bookedSlots.includes(slot));
  }
}; 