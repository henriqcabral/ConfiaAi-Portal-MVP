'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import FileUpload from './FileUpload';
import AnalysisView from './AnalysisView';
import { getApiUrl } from '@/config/api';
import { PolicyData } from '@/lib/analyze-policy';

export default function Hero() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [policyData, setPolicyData] = useState<PolicyData | null>(null);

  const handleFileUpload = async (file: File) => {
    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // console.log('Enviando arquivo para análise...', {
      //   fileName: file.name,
      //   fileType: file.type,
      //   fileSize: file.size
      // });

      const response = await fetch(getApiUrl('ANALYZE_POLICY'), {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
        mode: 'cors',
      });

      // console.log('Resposta recebida:', {
      //   status: response.status,
      //   statusText: response.statusText,
      //   headers: Object.fromEntries(response.headers.entries()),
      //   url: response.url
      // });

      if (!response.ok) {
        const errorText = await response.text();
        // console.error('Erro na resposta:', errorText);
        throw new Error(`Falha ao processar o arquivo: ${response.status} ${response.statusText}\n${errorText}`);
      }

      const data = await response.json() as PolicyData;
      // console.log('Dados recebidos:', data);
      if ((data as any).error) { // Mantido cast para any para verificar a propriedade 'error' que pode vir na resposta de erro
        throw new Error((data as any).error);
      }
      
      // Atualiza o estado com os dados da apólice
      setPolicyData(data);
    } catch (err) {
      // console.error('Erro ao enviar arquivo:', err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao processar sua apólice. Por favor, tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  // Se tiver dados da apólice, mostra a view de análise
  if (policyData) {
    return <AnalysisView data={policyData} />;
  }

  return (
    <section className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-20">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight">
              Não entendeu sua apólice de seguro?
            </h1>
            <p className="text-3xl font-semibold text-blue-100">
              O Confia.<span className="text-yellow-300">AI</span> traduz pra você.
            </p>
            <p className="text-xl text-blue-100">
              Carregada de termos técnicos, sua apólice esconde informações importantes. A gente decodifica tudo com IA — em segundos — pra que você saiba exatamente o que está contratando.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
                onClick={() => router.push('/upload')}
              >
                Quero entender minha apólice agora
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-blue-600"
                onClick={() => router.push('/como-funciona')}
              >
                Veja como funciona
              </Button>
            </div>
          </div>
          <div> {/* Container para a área de upload */}
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
} 