import React from 'react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-12">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">
              <span className="text-primary">Confia</span>
              <span className="text-yellow-300">.AI</span>
            </h3>
            <p className="text-gray-300">
              Traduzindo apólices de seguro para uma linguagem que você entende.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link href="#como-funciona" className="text-gray-300 hover:text-white">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link href="#beneficios" className="text-gray-300 hover:text-white">
                  Benefícios
                </Link>
              </li>
              <li>
                <Link href="#upload" className="text-gray-300 hover:text-white">
                  Analisar Apólice
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="text-gray-300">contato@confia.ai</li>
              <li className="text-gray-300">(11) 99999-9999</li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                Instagram
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                LinkedIn
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                Twitter
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} <span className="text-primary">Confia</span><span className="text-yellow-300">.AI</span>. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 