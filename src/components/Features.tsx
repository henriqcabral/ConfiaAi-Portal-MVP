import React from 'react';

const Features = () => {
  const features = [
    {
      title: 'Upload Simples',
      description: 'Faça upload da sua apólice em PDF e receba a análise em segundos.',
      icon: '📄',
    },
    {
      title: 'Tradução Clara',
      description: 'Entenda os termos técnicos da sua apólice em linguagem simples e direta.',
      icon: '🔍',
    },
    {
      title: 'Destaques Importantes',
      description: 'Visualize as coberturas, franquias e exclusões mais importantes do seu seguro.',
      icon: '✅',
    },
    {
      title: 'Assistência 24h',
      description: 'Saiba exatamente quais serviços de assistência estão inclusos na sua apólice.',
      icon: '🚗',
    },
    {
      title: 'Chatbot Inteligente',
      description: 'Tire suas dúvidas sobre a apólice com nosso chatbot especializado.',
      icon: '💬',
    },
    {
      title: 'Segurança Total',
      description: 'Seus dados são processados com segurança e não são compartilhados com terceiros.',
      icon: '🔒',
    },
  ];

  return (
    <section id="beneficios" className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Por que usar o Confia.<span className="text-yellow-500">AI</span>?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Nossa plataforma torna o entendimento de apólices de seguro simples e acessível para todos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features; 