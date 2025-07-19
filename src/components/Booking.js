'use client';

import { useState } from 'react';
import ConfirmationModal from './ConfirmationModal';

export default function Booking() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: '',
    date: '',
    time: '',
    notes: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
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
        // Reset form
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
        alert(`Erro ao agendar: ${error.error}`);
      }
    } catch (error) {
      console.error('Error saving appointment:', error);
      alert('Erro ao salvar agendamento. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="agendamento" className="py-16 bg-barber-primary text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-2 text-center">
          Faça seu <span className="text-barber-secondary">Agendamento</span>
        </h2>
        <p className="text-gray-300 text-center mb-12 max-w-2xl mx-auto">
          Escolha o serviço, data e horário de sua preferência e garanta seu atendimento premium.
        </p>

        <div className="bg-white text-barber-primary rounded-lg shadow-xl p-8 max-w-3xl mx-auto">
          <form id="booking-form" className="space-y-6" onSubmit={handleSubmit}>
            {/* Formulário de agendamento */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Nome Completo</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary" 
                  required 
                  tabIndex="0" 
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Telefone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary" 
                  required 
                  tabIndex="0" 
                />
              </div>
            </div>

            <div>
              <label htmlFor="service" className="block text-gray-700 font-medium mb-2">Serviço</label>
              <select 
                id="service" 
                name="service" 
                value={formData.service}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary" 
                required 
                tabIndex="0"
              >
                <option value="">Selecione um serviço</option>
                <option value="corte">Corte Clássico - R$ 45,00</option>
                <option value="barba">Barba Completa - R$ 35,00</option>
                <option value="combo">Combo Premium - R$ 75,00</option>
                <option value="fade">Fade com Desenho - R$ 55,00</option>
                <option value="hidratacao">Hidratação Capilar - R$ 40,00</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Data</label>
                <input 
                  type="date" 
                  id="date" 
                  name="date" 
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary" 
                  required 
                  tabIndex="0" 
                />
              </div>
              <div>
                <label htmlFor="time" className="block text-gray-700 font-medium mb-2">Horário</label>
                <select 
                  id="time" 
                  name="time" 
                  value={formData.time}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary" 
                  required 
                  tabIndex="0"
                >
                  <option value="">Selecione um horário</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                  <option value="18:00">18:00</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="notes" className="block text-gray-700 font-medium mb-2">Observações (opcional)</label>
              <textarea 
                id="notes" 
                name="notes" 
                value={formData.notes}
                onChange={handleInputChange}
                rows="3" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary" 
                tabIndex="0"
              ></textarea>
            </div>

            <div className="flex justify-center">
              <button 
                type="submit" 
                disabled={isLoading}
                className={`bg-barber-secondary text-barber-primary px-8 py-3 rounded-md font-medium transition-all duration-300 ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
                }`} 
                tabIndex="0"
              >
                {isLoading ? 'Salvando...' : 'Confirmar Agendamento'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {isModalOpen && <ConfirmationModal onClose={() => setIsModalOpen(false)} />}
    </section>
  );
}