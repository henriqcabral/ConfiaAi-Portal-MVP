'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/como-funciona" className="text-gray-400 hover:text-white">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="/beneficios" className="text-gray-400 hover:text-white">
                  Benefícios
                </Link>
              </li>
              <li>
                <Link href="/upload" className="text-gray-400 hover:text-white">
                  Analisar Apólice
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Contato</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                Email: contato@confia.ai
              </li>
              <li className="text-gray-400">
                Telefone: (11) 99999-9999
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Siga o Confia.AI</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://instagram.com" className="text-gray-400 hover:text-white">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="https://linkedin.com" className="text-gray-400 hover:text-white">
                  LinkedIn
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com" className="text-gray-400 hover:text-white">
                  Twitter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/termos" className="text-gray-400 hover:text-white">
                  Termos de Uso
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="text-gray-400 hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>© 2024 Confia.AI. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
} 