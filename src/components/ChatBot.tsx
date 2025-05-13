'use client';

import React, { useState } from 'react';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

interface Coverage {
  title: string;
  description: string;
  limit: string;
}

interface PolicyData {
  policyNumber: string;
  insurer: string;
  validFrom: string;
  validTo: string;
  vehicle: {
    make: string;
    model: string;
    year: string;
    licensePlate: string;
  };
  coverages: Coverage[];
  deductible: string;
  exclusions: string[];
  assistance: string[];
}

interface ChatBotProps {
  policyData: PolicyData;
}

const SUGGESTED_QUESTIONS = [
  "Quais são as coberturas básicas da minha apólice?",
  "Qual é o valor da franquia?",
  "Quais são as exclusões principais?",
  "Quais serviços de assistência estão incluídos?",
  "Qual é o período de vigência da apólice?",
  "Quais são os limites de cobertura?",
];

const ChatBot: React.FC<ChatBotProps> = ({ policyData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: 'bot',
      content: `Olá! Sou o assistente virtual do Confia.AI. Analisei sua apólice da ${policyData.insurer} e posso ajudar você a entender melhor os detalhes. Como posso ajudar?`
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const handleSendMessage = (content: string) => {
    if (!content.trim()) return;

    // Adiciona mensagem do usuário
    setMessages(prev => [...prev, { type: 'user', content }]);
    setInputValue('');

    // Simula resposta do bot (em um cenário real, isso seria uma chamada à API)
    setTimeout(() => {
      let response = '';
      
      if (content.toLowerCase().includes('cobertura')) {
        response = `Sua apólice inclui as seguintes coberturas principais:\n${policyData.coverages.map(c => `- ${c.title}: ${c.limit}`).join('\n')}`;
      } else if (content.toLowerCase().includes('franquia')) {
        response = `O valor da franquia da sua apólice é ${policyData.deductible}.`;
      } else if (content.toLowerCase().includes('exclusão')) {
        response = `As principais exclusões da sua apólice são:\n${policyData.exclusions.map(e => `- ${e}`).join('\n')}`;
      } else if (content.toLowerCase().includes('assistência')) {
        response = `Sua apólice inclui os seguintes serviços de assistência 24h:\n${policyData.assistance.map(a => `- ${a}`).join('\n')}`;
      } else if (content.toLowerCase().includes('vigência')) {
        response = `Sua apólice é válida de ${policyData.validFrom} até ${policyData.validTo}.`;
      } else {
        response = "Desculpe, não entendi sua pergunta. Você pode tentar uma das sugestões abaixo ou reformular sua pergunta.";
      }

      setMessages(prev => [...prev, { type: 'bot', content: response }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Cabeçalho do chat */}
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-800">Assistente Virtual</h3>
        <p className="text-sm text-gray-600">Confia.AI</p>
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Sugestões de perguntas */}
      <div className="p-4 border-t">
        <div className="flex flex-wrap gap-2 mb-4">
          {SUGGESTED_QUESTIONS.map((question, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(question)}
              className="text-sm bg-gray-100 hover:bg-gray-200 text-gray-800 px-3 py-1 rounded-full"
            >
              {question}
            </button>
          ))}
        </div>

        {/* Input de mensagem */}
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputValue)}
            placeholder="Digite sua pergunta..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot; 