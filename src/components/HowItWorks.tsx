import React from 'react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: 'Faça upload da sua apólice',
      description: 'Envie o arquivo PDF da sua apólice de seguro automotivo através da nossa plataforma segura.',
    },
    {
      number: 2,
      title: 'Nossa IA analisa o documento',
      description: 'Nossa tecnologia de inteligência artificial lê e interpreta os termos técnicos da sua apólice.',
    },
    {
      number: 3,
      title: 'Receba uma tradução clara',
      description: 'Visualize as informações importantes da sua apólice em linguagem simples e direta.',
    },
    {
      number: 4,
      title: 'Tire suas dúvidas',
      description: 'Use nosso chatbot para esclarecer qualquer dúvida específica sobre sua cobertura.',
    },
  ];

  return (
    <section id="como-funciona" className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Em apenas alguns passos simples, você terá acesso a uma versão clara e compreensível da sua apólice de seguro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mb-6">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 