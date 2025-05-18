'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FileUpload from './FileUpload';
import AnalysisView from './AnalysisView';
import { getApiUrl } from '@/config/api';

const Hero = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [policyData, setPolicyData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('Enviando arquivo para análise...', {
        fileName: file.name,
        fileType: file.type,
        fileSize: file.size
      });

      const response = await fetch(getApiUrl('ANALYZE_POLICY'), {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
        cache: 'no-store',
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
    <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Entenda sua apólice de seguro de automóvel em linguagem simples
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              O <span className="text-white">Confia</span><span className="text-yellow-300">.AI</span> traduz os termos técnicos e complexos da sua apólice para uma linguagem que qualquer pessoa consegue entender.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link href="#upload" className="btn-primary bg-white text-blue-600 hover:bg-gray-100">
                Analisar minha apólice
              </Link>
              <Link href="#como-funciona" className="btn-secondary bg-transparent border-white text-white hover:bg-blue-600">
                Como funciona
              </Link>
            </div>
          </div>
          <div>
            <div className="bg-white p-8 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Analise sua Apólice Agora</h2>
              <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
              {error && (
                <div className="mt-6 bg-red-50 text-red-700 p-4 rounded-lg">
                  <p>{error}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 