'use client';

import { useState, useEffect, useCallback } from 'react';
import Login from './Login';

interface Appointment {
  _id?: string | { $oid?: string };
  id?: string;
  name: string;
  phone: string;
  service: string;
  date: string;
  time: string;
  status: string;
  notes?: string;
  createdAt?: string;
}

function getAppointmentId(appointment: Appointment): string {
  if (typeof appointment._id === 'string') {
    return appointment._id;
  }

  if (
    appointment._id &&
    typeof appointment._id === 'object' &&
    typeof appointment._id.$oid === 'string'
  ) {
    return appointment._id.$oid;
  }

  return appointment.id || '';
}

export default function Appointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const clearClientAuth = useCallback(() => {
    localStorage.removeItem('adminLoggedIn');
    setIsLoggedIn(false);
  }, []);

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/appointments');
      if (response.status === 401) {
        clearClientAuth();
        setError('Sessão expirada. Faça login novamente.');
      } else if (response.ok) {
        const data = await response.json();
        setAppointments(data.appointments || []);
      } else {
        setError('Erro ao carregar agendamentos');
      }
    } catch (err) {
      console.error('Error fetching appointments:', err);
      setError('Erro ao carregar agendamentos');
    } finally {
      setLoading(false);
    }
  }, [clearClientAuth]);

  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    setIsLoggedIn(adminLoggedIn);

    if (adminLoggedIn) {
      fetchAppointments();
    } else {
      setLoading(false);
    }
  }, [fetchAppointments]);

  const updateAppointmentStatus = async (id: string, newStatus: string) => {
    console.log('Enviando update para id:', id, 'tipo:', typeof id);
    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.status === 401) {
        clearClientAuth();
        return;
      }

      const data = await response.json();

      if (response.ok && data && data.message) {
        await fetchAppointments();
      } else if (data?.error) {
        console.error('Erro ao atualizar agendamento:', data.error);
      }
    } catch (err) {
      console.error('Error updating appointment:', err);
    }
  };

  const deleteAppointment = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este agendamento?')) {
      return;
    }

    try {
      const response = await fetch(`/api/appointments/${id}`, {
        method: 'DELETE',
      });

      if (response.status === 401) {
        clearClientAuth();
      } else if (response.ok) {
        fetchAppointments();
      } else {
        console.error('Erro ao excluir agendamento');
      }
    } catch (err) {
      console.error('Error deleting appointment:', err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error('Error during logout:', err);
    } finally {
      clearClientAuth();
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    fetchAppointments();
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const filteredAppointments = appointments.filter(appointment => {
    if (filter === 'all') return true;
    return appointment.status === filter;
  });

  const stats = {
    total: appointments.length,
    pending: appointments.filter(apt => apt.status === 'pending').length,
    completed: appointments.filter(apt => apt.status === 'completed').length,
    cancelled: appointments.filter(apt => apt.status === 'cancelled').length,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pendente';
      case 'completed':
        return 'Concluído';
      case 'cancelled':
        return 'Cancelado';
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <section id="agendamentos" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-barber-secondary mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando agendamentos...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="agendamentos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-serif font-bold mb-2">
              <span className="text-barber-secondary">Agendamentos</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto md:mx-0">
              Área administrativa - Gerencie todos os agendamentos da barbearia.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="self-center md:self-auto bg-red-600 text-white px-4 py-2 rounded-md font-medium hover:bg-red-700 transition-all duration-300"
            tabIndex={0}
          >
            Sair
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="bg-yellow-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Concluídos</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center">
              <div className="bg-red-500 p-3 rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelados</p>
                <p className="text-2xl font-bold text-gray-900">{stats.cancelled}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                filter === 'all' 
                  ? 'bg-barber-primary text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Todos ({stats.total})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                filter === 'pending' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Pendentes ({stats.pending})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                filter === 'completed' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Concluídos ({stats.completed})
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-4 py-2 rounded-md font-medium transition-all duration-300 ${
                filter === 'cancelled' 
                  ? 'bg-red-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Cancelados ({stats.cancelled})
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {error && (
            <div className="p-4 bg-red-100 text-red-700">
              {error}
            </div>
          )}

          {filteredAppointments.length === 0 ? (
            <div className="p-8 text-center">
              <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <p className="text-gray-600">Nenhum agendamento encontrado.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Serviço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Data
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Horário
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={getAppointmentId(appointment)} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{appointment.name}</div>
                          <div className="text-sm text-gray-500">{appointment.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.service
                          ? appointment.service
                              .split(' ')
                              .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
                              .join(' ')
                          : ''}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatDate(appointment.date)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {appointment.time}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {getStatusText(appointment.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          {appointment.status === 'pending' && (
                            <>
                              <button
                                onClick={() => updateAppointmentStatus(getAppointmentId(appointment), 'completed')}
                                className="text-green-600 hover:text-green-900"
                                title="Marcar como concluído"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                </svg>
                              </button>
                              <button
                                onClick={() => updateAppointmentStatus(getAppointmentId(appointment), 'cancelled')}
                                className="text-red-600 hover:text-red-900"
                                title="Cancelar"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => deleteAppointment(getAppointmentId(appointment))}
                            className="text-gray-600 hover:text-red-900"
                            title="Excluir"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
