export default function Services() {
  return (
    <section id="servicos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-2 text-center">
          Nossos <span className="text-barber-secondary">Serviços</span>
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Oferecemos uma variedade de serviços premium para atender às suas necessidades de estilo e cuidados pessoais.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Serviço 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden card opacity-0 animate-fade-in">
            <div className="image-container h-56">
              <svg className="w-full h-full object-cover" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="200" fill="#1a1a1a" />
                <path d="M200,50 C240,50 270,80 270,120 C270,160 240,190 200,190 C160,190 130,160 130,120 C130,80 160,50 200,50 Z" fill="#c8a97e" />
                <path d="M180,80 L180,160 M220,80 L220,160 M160,120 L240,120" stroke="white" strokeWidth="8" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Corte Clássico</h3>
              <p className="text-gray-600 mb-4">Corte tradicional com acabamento perfeito e atenção aos detalhes.</p>
              <div className="flex justify-between items-center">
                <span className="text-barber-secondary font-bold text-xl">R$ 45,00</span>
                <button className="bg-barber-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300" tabIndex="0">
                  Agendar
                </button>
              </div>
            </div>
          </div>

          {/* Serviço 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden card opacity-0 animate-fade-in delay-100">
            <div className="image-container h-56">
              <svg className="w-full h-full object-cover" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="200" fill="#1a1a1a" />
                <path d="M200,30 C250,30 290,70 290,120 C290,170 250,210 200,210 C150,210 110,170 110,120 C110,70 150,30 200,30 Z" fill="#c8a97e" />
                <path d="M170,80 L230,160 M230,80 L170,160" stroke="white" strokeWidth="8" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Barba Completa</h3>
              <p className="text-gray-600 mb-4">Modelagem, hidratação e finalização com produtos premium.</p>
              <div className="flex justify-between items-center">
                <span className="text-barber-secondary font-bold text-xl">R$ 35,00</span>
                <button className="bg-barber-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300" tabIndex="0">
                  Agendar
                </button>
              </div>
            </div>
          </div>

          {/* Serviço 3 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden card opacity-0 animate-fade-in delay-200">
            <div className="image-container h-56">
              <svg className="w-full h-full object-cover" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="200" fill="#1a1a1a" />
                <path d="M150,50 L250,50 L250,150 L150,150 Z" fill="#c8a97e" />
                <path d="M170,70 L230,70 L230,130 L170,130 Z" stroke="white" strokeWidth="8" fill="none" />
              </svg>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Combo Premium</h3>
              <p className="text-gray-600 mb-4">Corte, barba, tratamento facial e massagem relaxante.</p>
              <div className="flex justify-between items-center">
                <span className="text-barber-secondary font-bold text-xl">R$ 75,00</span>
                <button className="bg-barber-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300" tabIndex="0">
                  Agendar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}