// Simple authentication utility using localStorage
export const auth = {
  // Check if user is logged in
  isAuthenticated: () => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('user') !== null;
  },

  // Get current user
  getCurrentUser: () => {
    if (typeof window === 'undefined') return null;
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Login user
  login: (email, password) => {
    // Simple demo authentication - in real app, this would validate against backend
    if (email && password) {
      const user = { email, name: email.split('@')[0] };
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  },

  // Register user
  register: (name, email, password) => {
    if (name && email && password) {
      const user = { name, email };
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('user');
  }
}; 