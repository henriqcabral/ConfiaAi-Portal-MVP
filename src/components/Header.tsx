'use client';

import React from 'react';
import Link from 'next/link';
import Login from './Login';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            Confia.<span className="text-yellow-500">AI</span>
          </Link>
          <nav className="flex items-center gap-6">
            <Link href="/#features" className="text-gray-600 hover:text-gray-900">
              Recursos
            </Link>
            <Link href="/#how-it-works" className="text-gray-600 hover:text-gray-900">
              Como Funciona
            </Link>
            <Login />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 