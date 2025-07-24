import '../styles/globals.css';

export const metadata = {
  title: 'BarberElite',
  description: 'Barbearia de alto padrão',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}