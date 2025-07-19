'use client';

import { useState } from 'react';

export default function Login({ onLogin }) {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (data.success) {
        // Store admin session (in production, use proper session management)
        localStorage.setItem('adminLoggedIn', 'true');
        onLogin();
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="login" className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-serif font-bold mb-6 text-center text-barber-primary">
            <span className="text-barber-secondary">Admin</span> Login
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">
                Usuário
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary"
                required
                tabIndex="0"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
                Senha
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-barber-secondary"
                required
                tabIndex="0"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-barber-secondary text-barber-primary px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-opacity-90'
              }`}
              tabIndex="0"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Credenciais de demonstração:</p>
            <p><strong>Usuário:</strong> admin</p>
            <p><strong>Senha:</strong> barber123</p>
          </div>
        </div>
      </div>
    </section>
  );
} 