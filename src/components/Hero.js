'use client';

import { useEffect, useState } from 'react';

const carouselImages = [
  '/media/a-barbers-hands-trim-a-customers-hair.jpg',
  '/media/barber-brushes-and-cuts-hair.jpg',
  '/media/barber-inspects-his-work-of-a-clean-haircut.jpg',
  '/media/barber-adds-final-touches-to-a-haircut.jpg',
  '/media/close-up-of-a-straight-razor-in-use.jpg',
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="inicio" className="relative bg-barber-primary text-white">
      {/* Carousel background images */}
      <div className="absolute inset-0">
        {carouselImages.map((src, idx) => (
          <img
            key={src}
            src={src}
            alt="Barber shop scene"
            className={`w-full h-full object-cover object-center absolute inset-0 z-0 transition-opacity duration-1000 ${idx === current ? 'opacity-100' : 'opacity-0'}`}
            style={{ filter: 'brightness(0.6)' }}
            draggable={false}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-barber-dark to-transparent opacity-90 z-10"></div>
      </div>
      <div className="container mx-auto px-4 py-48 md:py-72 relative z-20 flex flex-col items-center md:items-start">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center md:text-left opacity-0 animate-fade-in">
          Estilo e Precisão<br />
          <span className="text-barber-secondary">em Cada Corte</span>
        </h2>
        <p className="font-sans text-lg md:text-xl mb-8 max-w-lg text-center md:text-left opacity-0 animate-fade-in delay-100">
          Transforme seu visual com os melhores profissionais da cidade. Experiência premium em um ambiente sofisticado.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 opacity-0 animate-fade-in delay-200 font-sans">
          <a href="#servicos" className="bg-barber-secondary text-barber-primary px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300 text-center" tabIndex="0">
            Nossos Serviços
          </a>
          <a href="#agendamento" className="border-2 border-barber-secondary text-white px-6 py-3 rounded-md font-medium hover:bg-barber-secondary hover:bg-opacity-20 transition-all duration-300 text-center" tabIndex="0">
            Agendar Agora
          </a>
        </div>
      </div>
    </section>
  );
}