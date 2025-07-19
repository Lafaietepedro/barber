import React from 'react'

export default function Team() {
  const teamMembers = [
    {
      id: 1,
      name: "João Silva",
      role: "Barbeiro Chefe",
      specialty: "Cortes Clássicos",
      experience: "15 anos",
      description: "Especialista em cortes tradicionais e modernos com mais de 15 anos de experiência.",
      social: {
        instagram: "#",
        facebook: "#",
        linkedin: "#"
      }
    },
    {
      id: 2,
      name: "Carlos Santos",
      role: "Barbeiro Senior",
      specialty: "Fades e Desenhos",
      experience: "10 anos",
      description: "Mestre em fades, desenhos e técnicas modernas de barbeiro.",
      social: {
        instagram: "#",
        facebook: "#",
        linkedin: "#"
      }
    },
    {
      id: 3,
      name: "Pedro Costa",
      role: "Barbeiro",
      specialty: "Barbas e Tratamentos",
      experience: "8 anos",
      description: "Especialista em modelagem de barbas e tratamentos faciais premium.",
      social: {
        instagram: "#",
        facebook: "#",
        linkedin: "#"
      }
    }
  ];

  return (
    <section id="equipe" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-serif font-bold mb-2 text-center">
          Nossa <span className="text-barber-secondary">Equipe</span>
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Conheça os profissionais que fazem da BarberElite uma referência em qualidade e estilo.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div 
              key={member.id} 
              className="bg-white rounded-lg shadow-lg overflow-hidden card opacity-0 animate-fade-in"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <div className="h-64 bg-barber-primary flex items-center justify-center">
                  <svg className="w-32 h-32" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="64" cy="64" r="60" fill="#c8a97e" />
                    <circle cx="64" cy="50" r="20" fill="#1a1a1a" />
                    <path d="M40,80 Q64,100 88,80" fill="#1a1a1a" />
                    <path d="M50,45 L78,45 M50,55 L78,55" stroke="white" strokeWidth="2" />
                  </svg>
                </div>
                <div className="absolute top-4 right-4 bg-barber-secondary text-barber-primary px-3 py-1 rounded-full text-sm font-medium">
                  {member.experience}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-barber-secondary font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm mb-3">{member.specialty}</p>
                <p className="text-gray-600 text-sm mb-4">{member.description}</p>
                
                <div className="flex space-x-3">
                  <a href={member.social.instagram} className="text-gray-400 hover:text-barber-secondary transition-colors duration-300" tabIndex="0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                  <a href={member.social.facebook} className="text-gray-400 hover:text-barber-secondary transition-colors duration-300" tabIndex="0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </a>
                  <a href={member.social.linkedin} className="text-gray-400 hover:text-barber-secondary transition-colors duration-300" tabIndex="0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Quer fazer parte da nossa equipe?</p>
          <button className="bg-barber-primary text-white px-8 py-3 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300" tabIndex="0">
            Enviar Currículo
          </button>
        </div>
      </div>
    </section>
  );
}