'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function Upload() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/api/analyze-policy', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
        cache: 'no-store',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Falha ao processar o arquivo: ${response.status} ${response.statusText}\n${errorText}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      
      router.push('/analise');
    } catch (err) {
      console.error('Erro ao enviar arquivo:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao processar sua apólice. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Não entendeu sua apólice de seguro?
          </h2>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            O Confia.AI traduz pra você.
          </h2>
          <p className="text-xl text-gray-600">
            Carregada de termos técnicos, sua apólice esconde informações importantes. A gente decodifica tudo com IA — em segundos — pra que você saiba exatamente o que está contratando.
          </p>
        </div>

        <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Analise sua Apólice Agora</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handleFileUpload(file);
              }}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer inline-block"
            >
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading}
              >
                {isLoading ? 'Processando...' : 'Enviar apólice e ver análise'}
              </Button>
            </label>
          </div>

          {error && (
            <div className="mt-6 bg-red-50 text-red-700 p-4 rounded-lg">
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 