'use client';

import { useState, useEffect } from 'react';

export default function VoiceModal({ onClose }) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const startListening = () => {
    setIsListening(true);
    setTranscript('');
    // Simulate voice recognition
    setTimeout(() => {
      setTranscript('Gostaria de agendar um corte clássico para amanhã às 14h');
      setIsListening(false);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const processBooking = () => {
    setIsProcessing(true);
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      onClose();
      alert('Agendamento realizado com sucesso via voz!');
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-gray-900">Agendamento por Voz</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-300"
            tabIndex="0"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="text-center mb-6">
          <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${
            isListening ? 'bg-red-500 animate-pulse' : 'bg-barber-secondary'
          }`}>
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>
          
          <p className="text-gray-600 mb-4">
            {isListening 
              ? 'Ouvindo... Fale sobre o serviço, data e horário desejados'
              : 'Clique no botão para começar a gravar sua solicitação'
            }
          </p>

          {transcript && (
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-sm text-gray-700">
                <strong>Reconhecido:</strong> {transcript}
              </p>
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          {!isListening && !transcript && (
            <button
              onClick={startListening}
              className="flex-1 bg-barber-secondary text-barber-primary px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300"
              tabIndex="0"
            >
              Começar Gravação
            </button>
          )}

          {isListening && (
            <button
              onClick={stopListening}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300"
              tabIndex="0"
            >
              Parar Gravação
            </button>
          )}

          {transcript && !isProcessing && (
            <button
              onClick={processBooking}
              className="flex-1 bg-green-500 text-white px-4 py-2 rounded-md font-medium hover:bg-opacity-90 transition-all duration-300"
              tabIndex="0"
            >
              Confirmar Agendamento
            </button>
          )}

          {isProcessing && (
            <div className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processando...
            </div>
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md font-medium hover:bg-gray-50 transition-all duration-300"
            tabIndex="0"
          >
            Cancelar
          </button>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            Exemplo: "Gostaria de agendar um corte clássico para amanhã às 14h"
          </p>
        </div>
      </div>
    </div>
  );
}
