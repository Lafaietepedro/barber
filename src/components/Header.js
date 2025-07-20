'use client';

import { useState, useEffect } from 'react';
import Logo3D from './Logo3D';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState(100);

  // Verificar preferências salvas
  useEffect(() => {
    if (localStorage.getItem('high-contrast') === 'true') {
      setHighContrast(true);
      document.documentElement.classList.add('high-contrast');
    }
    
    const savedFontSize = localStorage.getItem('font-size');
    if (savedFontSize) {
      setFontSize(parseInt(savedFontSize));
      document.body.style.fontSize = `${savedFontSize}%`;
    }
  }, []);

  // Atualizar alto contraste
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast');
      localStorage.setItem('high-contrast', 'true');
    } else {
      document.documentElement.classList.remove('high-contrast');
      localStorage.setItem('high-contrast', 'false');
    }
  }, [highContrast]);

  // Atualizar tamanho da fonte
  useEffect(() => {
    document.body.style.fontSize = `${fontSize}%`;
    localStorage.setItem('font-size', fontSize.toString());
  }, [fontSize]);

  return (
    <header className="bg-barber-primary text-white sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <div className="logo-3d-container mr-3 w-16 h-16">
            <Logo3D />
          </div>
          <h1 className="text-2xl font-serif font-bold">Barber<span className="text-barber-secondary">Elite</span></h1>
        </div>

        <nav className="flex flex-col md:flex-row items-center space-y-3 md:space-y-0 md:space-x-6">
          <a href="#inicio" className="hover:text-barber-secondary transition-colors duration-300" tabIndex="0">Início</a>
          <a href="#servicos" className="hover:text-barber-secondary transition-colors duration-300" tabIndex="0">Serviços</a>
          <a href="#galeria" className="hover:text-barber-secondary transition-colors duration-300" tabIndex="0">Galeria</a>
          <a href="#agendamento" className="hover:text-barber-secondary transition-colors duration-300" tabIndex="0">Agendamento</a>
          <a href="#contato" className="hover:text-barber-secondary transition-colors duration-300" tabIndex="0">Contato</a>
        </nav>
      </div>
    </header>
  );
}