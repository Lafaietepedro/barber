'use client';

export default function ConfirmationModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Agendamento Confirmado!</h3>
          <p className="text-gray-600 mb-6">Seu horário foi reservado com sucesso. Enviaremos uma confirmação por e-mail.</p>
          <button 
            onClick={onClose}
            className="w-full bg-barber-secondary text-barber-primary py-2 rounded hover:bg-opacity-90 transition-all duration-300"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}