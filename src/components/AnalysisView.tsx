import React from 'react';
import ChatBot from './ChatBot';

interface Cobertura {
  nome: string;
  descricao: string;
  valor: string;
}

interface Beneficio {
  nome: string;
  descricao: string;
}

interface PolicyData {
  resumo: string;
  coberturas: Cobertura[];
  beneficios: Beneficio[];
  recomendacoes: string[];
  riscos: string[];
}

interface AnalysisViewProps {
  data: PolicyData;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ data }) => {
  // Verifica se os dados existem
  if (!data) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Carregando análise...</h2>
          <p className="text-gray-600">Por favor, aguarde enquanto processamos sua apólice.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chat lateral */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg h-[calc(100vh-8rem)]">
              <ChatBot policyData={data} />
            </div>
          </div>

          {/* Dados da apólice */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-center">Análise da sua Apólice</h2>
              
              {/* Resumo */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-3 text-primary">Resumo</h3>
                <p className="text-gray-700">{data.resumo}</p>
              </div>
              
              {/* Coberturas */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-primary">Coberturas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.coberturas?.map((cobertura, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4">
                      <h4 className="font-medium mb-2">{cobertura.nome}</h4>
                      <p className="text-gray-600 text-sm mb-2">{cobertura.descricao}</p>
                      <p className="text-primary font-medium">Valor: {cobertura.valor}</p>
                    </div>
                  )) || <p className="text-gray-600">Nenhuma cobertura encontrada</p>}
                </div>
              </div>
              
              {/* Benefícios */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-primary">Benefícios</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.beneficios?.map((beneficio, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4">
                      <h4 className="font-medium mb-2">{beneficio.nome}</h4>
                      <p className="text-gray-600 text-sm">{beneficio.descricao}</p>
                    </div>
                  )) || <p className="text-gray-600">Nenhum benefício encontrado</p>}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Recomendações */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Recomendações</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.recomendacoes?.map((recomendacao, index) => (
                      <li key={index} className="text-gray-700">{recomendacao}</li>
                    )) || <li className="text-gray-700">Nenhuma recomendação encontrada</li>}
                  </ul>
                </div>
                
                {/* Riscos */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Riscos</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.riscos?.map((risco, index) => (
                      <li key={index} className="text-gray-700">{risco}</li>
                    )) || <li className="text-gray-700">Nenhum risco encontrado</li>}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalysisView; 