'use client';

import React from 'react';
import { signIn, signOut, useSession } from 'next-auth/react';
import Image from 'next/image';

const Login = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="flex items-center gap-4">
        {session.user?.image && (
          <Image
            src={session.user.image}
            alt={session.user.name || 'Avatar'}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span className="text-gray-700">{session.user?.name}</span>
        <button
          onClick={() => signOut()}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
        >
          Sair
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn('google', { callbackUrl: '/' })}
      className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
    >
      Entrar
    </button>
  );
};

export default Login; 