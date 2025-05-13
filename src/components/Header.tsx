import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container-custom py-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-2xl font-bold">
            <span className="text-primary">Confia</span>
            <span className="text-yellow-300">.AI</span>
          </Link>
        </div>
        <nav className="hidden md:flex space-x-8">
          <Link href="#como-funciona" className="text-gray-700 hover:text-primary font-medium">
            Como Funciona
          </Link>
          <Link href="#beneficios" className="text-gray-700 hover:text-primary font-medium">
            Benefícios
          </Link>
          <Link href="#contato" className="text-gray-700 hover:text-primary font-medium">
            Contato
          </Link>
        </nav>
        <div>
          <Link href="#upload" className="btn-primary">
            Analisar Apólice
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header; 