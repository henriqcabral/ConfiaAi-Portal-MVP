import React from 'react';
import ChatBot from './ChatBot';

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

interface AnalysisViewProps {
  data: PolicyData;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({ data }) => {
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
              <h2 className="text-2xl font-bold mb-6 text-center">Informações da sua Apólice</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Dados Gerais</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Número da Apólice:</span> {data.policyNumber}</p>
                    <p><span className="font-medium">Seguradora:</span> {data.insurer}</p>
                    <p><span className="font-medium">Vigência:</span> {data.validFrom} a {data.validTo}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Dados do Veículo</h3>
                  <div className="space-y-2">
                    <p><span className="font-medium">Veículo:</span> {data.vehicle.make} {data.vehicle.model} ({data.vehicle.year})</p>
                    <p><span className="font-medium">Placa:</span> {data.vehicle.licensePlate}</p>
                    <p><span className="font-medium">Franquia:</span> {data.deductible}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-primary">Coberturas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.coverages.map((coverage, index) => (
                    <div key={index} className="border border-gray-200 rounded-md p-4">
                      <h4 className="font-medium mb-2">{coverage.title}</h4>
                      <p className="text-gray-600 text-sm mb-2">{coverage.description}</p>
                      <p className="text-primary font-medium">Limite: {coverage.limit}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Exclusões</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.exclusions.map((exclusion, index) => (
                      <li key={index} className="text-gray-700">{exclusion}</li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-primary">Assistência 24h</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.assistance.map((item, index) => (
                      <li key={index} className="text-gray-700">{item}</li>
                    ))}
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