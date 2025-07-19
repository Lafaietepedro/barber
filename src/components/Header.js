'use client';

import { useState, useEffect } from 'react';
import Logo3D from './Logo3D';
import VoiceModal from './VoiceModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
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
          <a href="#equipe" className="hover:text-barber-secondary transition-colors duration-300" tabIndex="0">Equipe</a>
          <a href="#agendamento" className="hover:text-barber-secondary transition-colors duration-300" tabIndex="0">Agendamento</a>
          <a href="#contato" className="hover:text-barber-secondary transition-colors duration-300" tabIndex="0">Contato</a>
          <button 
            id="voice-booking" 
            className="bg-barber-secondary text-barber-primary px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 flex items-center space-x-2"
            onClick={() => setIsVoiceModalOpen(true)}
            tabIndex="0"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
            <span>Agendar por Voz</span>
          </button>
        </nav>
      </div>

      {isVoiceModalOpen && (
        <VoiceModal onClose={() => setIsVoiceModalOpen(false)} />
      )}
    </header>
  );
}