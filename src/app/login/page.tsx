'use client';

import Login from '@/components/Login';
import { SessionProvider } from 'next-auth/react';

export default function LoginPage() {
  return (
    <SessionProvider>
      <Login />
    </SessionProvider>
  );
} 