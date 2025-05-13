'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import FileUpload from './FileUpload';
import PolicyResult from './PolicyResult';

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
            <div className="bg-white p-8 rounded-lg shadow-xl mb-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Analise sua Apólice Agora</h2>
              <FileUpload onFileUpload={handleFileUpload} isLoading={isLoading} />
              {error && (
                <div className="mt-6 bg-red-50 text-red-700 p-4 rounded-lg">
                  <p>{error}</p>
                </div>
              )}
              {policyData && (
                <div className="mt-6">
                  <PolicyResult data={policyData} />
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