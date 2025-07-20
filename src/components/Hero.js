export default function Hero() {
  return (
    <section id="inicio" className="relative bg-barber-primary text-white">
      {/* Background image with gradient overlay */}
      <div className="absolute inset-0">
        <img
          src="/media/clippers-trim-a-mans-beard.jpg"
          alt="Barber trims a man's beard with clippers"
          className="w-full h-full object-cover object-center absolute inset-0 z-0"
          style={{ filter: 'brightness(0.6)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-barber-dark to-transparent opacity-90 z-10"></div>
      </div>
      <div className="container mx-auto px-4 py-24 md:py-32 relative z-20 flex flex-col items-center md:items-start">
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-center md:text-left opacity-0 animate-fade-in">
          Estilo e Precisão<br />
          <span className="text-barber-secondary">em Cada Corte</span>
        </h2>
        <p className="text-lg md:text-xl mb-8 max-w-lg text-center md:text-left opacity-0 animate-fade-in delay-100">
          Transforme seu visual com os melhores profissionais da cidade. Experiência premium em um ambiente sofisticado.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 opacity-0 animate-fade-in delay-200">
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