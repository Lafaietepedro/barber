import Image from 'next/image';

export default function Services() {
  return (
    <section id="servicos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-2 text-center">
          Nossos <span className="text-barber-secondary">Serviços</span>
        </h2>
        <p className="font-sans text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Oferecemos uma variedade de serviços premium para atender às suas necessidades de estilo e cuidados pessoais.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Serviço 1 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden card opacity-0 animate-fade-in">
            <div className="image-container h-56">
              <Image src="/media/barber-inspects-his-work-of-a-clean-haircut.jpg" alt="Corte de Cabelo" width={400} height={300} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold mb-2">Corte de Cabelo</h3>
              <p className="font-sans text-gray-600 mb-4">Corte tradicional com acabamento perfeito e atenção aos detalhes.</p>
              <div className="flex justify-between items-center font-sans">
                <span className="text-barber-secondary font-bold text-xl">R$ 40,00</span>
                <button className="bg-barber-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300" tabIndex="0">
                  Agendar
                </button>
              </div>
            </div>
          </div>

          {/* Serviço 2 */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden card opacity-0 animate-fade-in delay-100">
            <div className="image-container h-56">
              <Image src="/media/man-getting-his-beard-trimmed-by-barber.jpg" alt="Barba Completa" width={400} height={300} className="w-full h-full object-cover" />
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
              <Image src="/media/barber-adds-final-touches-to-a-haircut.jpg" alt="Combo Corte + Barba" width={400} height={300} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Combo Corte + Barba</h3>
              <p className="text-gray-600 mb-4">Corte, barba, tratamento facial e massagem relaxante.</p>
              <div className="flex justify-between items-center">
                <span className="text-barber-secondary font-bold text-xl">R$ 60,00</span>
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