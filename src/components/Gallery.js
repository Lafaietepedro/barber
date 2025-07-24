import React from 'react'

export default function Gallery () {
  const galleryImages = [
    {
      id: 1,
      title: 'Corte Clássico',
      description: 'Tradição e elegância',
      src: '/media/man-gets-his-hair-trimmed-at-the-barbershop.jpg'
    },
    {
      id: 2,
      title: 'Barba Estilizada',
      description: 'Precisão nos detalhes',
      src: '/media/barber-shaves-side-of-persons-head.jpg'
    },
    {
      id: 3,
      title: 'Fade Moderno',
      description: 'Estilo contemporâneo',
      src: '/media/customer-getting-fade-at-barbershop.jpg'
    },
    {
      id: 4,
      title: 'Tratamento Facial',
      description: 'Cuidados especiais',
      src: '/media/barber-sprays-water-on-customers-head.jpg'
    },
    {
      id: 5,
      title: 'Combo Premium',
      description: 'Experiência completa',
      src: '/media/man-with-beard-getting-a-trim.jpg'
    },
    {
      id: 6,
      title: 'Acabamento Perfeito',
      description: 'Qualidade superior',
      src: '/media/close-up-of-barber-giving-a-fade.jpg'
    }
  ]

  return (
    <section id='galeria' className='py-16 bg-gray-50'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-serif font-bold mb-2 text-center'>
          Nossa <span className='text-barber-secondary'>Galeria</span>
        </h2>
        <p className='font-sans text-gray-600 text-center mb-12 max-w-2xl mx-auto'>
          Conheça alguns dos nossos trabalhos e veja a qualidade dos nossos
          serviços.
        </p>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {galleryImages.map((image, index) => (
            <div
              key={image.id}
              className='group relative overflow-hidden rounded-lg shadow-lg cursor-pointer opacity-0 animate-fade-in'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='aspect-w-4 aspect-h-3 bg-barber-primary'>
                {image.src ? (
                  <img
                    src={image.src}
                    alt={image.title}
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <svg
                    className='w-full h-full object-cover'
                    viewBox='0 0 400 300'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <rect width='400' height='300' fill='#1a1a1a' />
                    <circle cx='200' cy='150' r='80' fill='#c8a97e' />
                    <path
                      d='M160,120 L240,180 M240,120 L160,180'
                      stroke='white'
                      strokeWidth='4'
                    />
                    <text
                      x='200'
                      y='220'
                      textAnchor='middle'
                      fill='white'
                      fontSize='14'
                      fontFamily='serif'
                    >
                      {image.title}
                    </text>
                  </svg>
                )}
              </div>

              <div className='absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center'>
                <div className='text-white text-center opacity-0 group-hover:opacity-100 transition-all duration-300'>
                  <h3 className='font-serif text-xl font-bold mb-2'>
                    {image.title}
                  </h3>
                  <p className='font-sans text-sm'>{image.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
