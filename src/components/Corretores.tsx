'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export default function Corretores() {
  const router = useRouter();

  const beneficios = [
    'Economize tempo em cada proposta',
    'Reduza objeções e dúvidas',
    'Agregue valor à sua consultoria',
    'Aumente a taxa de fechamento com clientes confiantes',
    'Use tecnologia como diferencial no atendimento'
  ];

  return (
    <section className="py-20 bg-blue-50">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-5xl font-extrabold mb-8 text-gray-700">
              Você é corretor de seguros?
            </h3>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              O Confia.AI ajuda seus clientes a entenderem melhor — e ajuda você a vender mais.
            </h2>
            <p className="text-xl text-gray-600">
              Você já passou horas explicando uma apólice? Deixa que a gente traduz.
              <br />
              Você cuida da venda, a gente cuida da clareza.
            </p>
          </div>

          <Card className="p-8 bg-white shadow-lg">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Benefícios para corretores:</h3>
                <ul className="space-y-3">
                  {beneficios.map((beneficio, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <span className="text-green-500">✓</span>
                      <span className="text-gray-700">{beneficio}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push('/parceiros')}
                >
                  Sou corretor. Quero oferecer o Confia.AI
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}