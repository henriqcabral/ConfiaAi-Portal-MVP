'use client';

import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import PolicyResult from '@/components/PolicyResult';
import ChatBot from '@/components/ChatBot';

const UploadSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [policyData, setPolicyData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    // Criar um FormData para enviar o arquivo
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Enviando arquivo para análise...');
      const response = await fetch('/api/analyze-policy', {
        method: 'POST',
        body: formData,
      });

      console.log('Resposta recebida:', response.status);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Falha ao processar o arquivo');
      }

      const data = await response.json();
      console.log('Dados recebidos:', data);
      setPolicyData(data);
    } catch (err) {
      console.error('Erro ao enviar arquivo:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao processar sua apólice. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="upload" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Analise sua Apólice em Detalhes</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Faça o upload da sua apólice em PDF e receba uma análise detalhada com todas as informações importantes.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />

          {error && (
            <div className="mt-6 bg-red-50 text-red-700 p-4 rounded-lg">
              <p>{error}</p>
            </div>
          )}

          {policyData && <PolicyResult data={policyData} />}
        </div>

        {policyData && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-4">Tire suas Dúvidas</h2>
              <p className="text-gray-600 max-w-3xl mx-auto">
                Tem alguma dúvida sobre sua apólice? Converse com nosso assistente virtual.
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <ChatBot policyData={policyData} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default UploadSection; 