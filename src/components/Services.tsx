import Image from 'next/image';

export default function Services() {
  return (
    <section id="servicos" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-2 text-center">
          Our <span className="text-barber-secondary">Services</span>
        </h2>
        <p className="font-sans text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          We offer a wide range of premium services tailored to your style and grooming needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden card opacity-0 animate-fade-in">
            <div className="image-container h-56">
              <Image src="/media/barber-inspects-his-work-of-a-clean-haircut.jpg" alt="Haircut" width={400} height={300} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="font-serif text-xl font-bold mb-2">Haircut</h3>
              <p className="font-sans text-gray-600 mb-4">Traditional cut with a flawless finish and attention to detail.</p>
              <div className="flex justify-between items-center font-sans">
                <span className="text-barber-secondary font-bold text-xl">$40.00</span>
                <button className="bg-barber-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300" tabIndex={0}>
                  Book
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden card opacity-0 animate-fade-in delay-100">
            <div className="image-container h-56">
              <Image src="/media/man-getting-his-beard-trimmed-by-barber.jpg" alt="Full Beard Trim" width={400} height={300} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Full Beard Trim</h3>
              <p className="text-gray-600 mb-4">Shaping, hydration, and finishing with premium products.</p>
              <div className="flex justify-between items-center">
                <span className="text-barber-secondary font-bold text-xl">$35.00</span>
                <button className="bg-barber-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300" tabIndex={0}>
                  Book
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden card opacity-0 animate-fade-in delay-200">
            <div className="image-container h-56">
              <Image src="/media/barber-adds-final-touches-to-a-haircut.jpg" alt="Haircut + Beard Combo" width={400} height={300} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">Haircut + Beard Combo</h3>
              <p className="text-gray-600 mb-4">Haircut, beard care, facial treatment, and relaxing massage.</p>
              <div className="flex justify-between items-center">
                <span className="text-barber-secondary font-bold text-xl">$60.00</span>
                <button className="bg-barber-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-all duration-300" tabIndex={0}>
                  Book
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
