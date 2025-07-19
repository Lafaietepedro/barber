/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'barber-primary': 'var(--barber-primary)',
        'barber-secondary': 'var(--barber-secondary)',
        'barber-dark': 'var(--barber-dark)',
      },
    },
  },
  plugins: [],
};