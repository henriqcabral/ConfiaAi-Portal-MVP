'use client';

import { Card } from '@/components/ui/card';

export default function Beneficios() {
  const beneficios = [
    {
      title: 'Upload sem fricção',
      description: 'Envie seu PDF e veja o resultado em segundos.',
      icon: '⚡'
    },
    {
      title: 'Tradução que você realmente entende',
      description: 'Nada de jargões: tudo explicado com clareza e precisão.',
      icon: '📖'
    },
    {
      title: 'O que importa em destaque',
      description: 'Veja o que está (ou não está) coberto, e evite surpresas.',
      icon: '✨'
    },
    {
      title: 'Assistência 24h? Tá na sua apólice? A gente mostra.',
      description: 'Descubra se você pode contar com guincho, chaveiro, carro reserva e mais.',
      icon: '🚗'
    },
    {
      title: 'Chatbot especialista em seguros',
      description: 'Tire dúvidas em tempo real sobre sua cobertura.',
      icon: '🤖'
    },
    {
      title: 'Privacidade garantida',
      description: 'Seus dados são tratados com criptografia e nunca compartilhados.',
      icon: '🔒'
    }
  ];

  return (
    <section className="py-20">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Por que confiar no Confia.AI?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Porque entender seu seguro não deveria exigir um dicionário jurídico.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {beneficios.map((beneficio, index) => (
            <Card key={index} className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{beneficio.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{beneficio.title}</h3>
              <p className="text-gray-600">{beneficio.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}