'use client';

import React, { useState } from 'react';
import FileUpload from '@/components/FileUpload';
import AnalysisView from '@/components/AnalysisView';
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
      console.log('Enviando arquivo para análise...', {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      });
      
      const response = await fetch('http://localhost:8080/api/analyze-policy', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      console.log('Resposta recebida:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        url: response.url
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro na resposta:', errorText);
        throw new Error(`Falha ao processar o arquivo: ${response.status} ${response.statusText}\n${errorText}`);
      }

      const data = await response.json();
      console.log('Dados recebidos:', data);
      if (data.error) {
        throw new Error(data.error);
      }
      setPolicyData(data);
    } catch (err) {
      console.error('Erro ao enviar arquivo:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao processar sua apólice. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  if (policyData) {
    return <AnalysisView data={policyData} />;
  }

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