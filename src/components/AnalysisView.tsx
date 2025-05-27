'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import ChatBot from './ChatBot';
import { PolicyData } from '@/types/policy';

interface AnalysisViewProps {
  data: PolicyData;
}

export default function AnalysisView({ data }: AnalysisViewProps) {
  const [showChat, setShowChat] = useState(false);

  if (!data) {
    return (
      <div className="container-custom py-12">
        <div className="text-center">
          <p className="text-gray-600">Carregando análise...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Coluna Principal */}
        <div className="lg:col-span-2 space-y-8">
          {/* Resumo */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Resumo da Análise</h2>
            <p className="text-gray-600">{data.resumo}</p>
          </div>

          {/* Coberturas */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Coberturas</h2>
            <div className="space-y-4">
              {data.coberturas.map((cobertura, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="font-semibold text-gray-800">{cobertura.nome}</h3>
                  <p className="text-gray-600">{cobertura.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Benefícios */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Benefícios</h2>
            <div className="space-y-4">
              {data.beneficios.map((beneficio, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <h3 className="font-semibold text-gray-800">{beneficio.nome}</h3>
                  <p className="text-gray-600">{beneficio.descricao}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recomendações */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recomendações</h2>
            <div className="space-y-4">
              {data.recomendacoes.map((recomendacao, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <p className="text-gray-600">{recomendacao}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Riscos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Riscos Identificados</h2>
            <div className="space-y-4">
              {data.riscos.map((risco, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                  <p className="text-gray-600">{risco}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coluna Lateral */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Precisa de mais informações?</h2>
              <p className="text-gray-600 mb-6">
                Nosso assistente virtual está pronto para responder suas dúvidas sobre a apólice.
              </p>
              <Button
                onClick={() => setShowChat(!showChat)}
                className="w-full"
              >
                {showChat ? 'Fechar Chat' : 'Abrir Chat'}
              </Button>
            </div>

            {showChat && (
              <div className="mt-4">
                <ChatBot policyData={data} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 