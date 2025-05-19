'use client';

import { Card } from '@/components/ui/card';

export default function ComoFunciona() {
  const steps = [
    {
      title: 'Envie sua apólice em PDF',
      description: 'Upload rápido e seguro direto na plataforma.',
      icon: '📤'
    },
    {
      title: 'Nossa IA entra em ação',
      description: 'Identifica termos técnicos, cláusulas e detalhes ocultos.',
      icon: '🤖'
    },
    {
      title: 'Receba uma versão fácil de entender',
      description: 'Coberturas, exclusões, valores e obrigações — tudo claro como água.',
      icon: '📝'
    },
    {
      title: 'Tire dúvidas com nosso Chatbot',
      description: 'Um assistente pronto pra responder o que a apólice não explica.',
      icon: '💬'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Como o Confia.AI descomplica tudo pra você
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chega de burocracia e linguagem difícil. Em poucos cliques, você entende o que o seguro cobre — e o que não cobre.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}