import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import UploadSection from '@/app/components/UploadSection';
import Footer from '@/components/Footer';
import ComoFunciona from '@/components/ComoFunciona';
import Beneficios from '@/components/Beneficios';
import Upload from '@/components/Upload';
import Corretores from '@/components/Corretores';

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <UploadSection />
      <ComoFunciona />
      <Beneficios />
      <Upload />
      <Corretores />
      <Footer />
    </main>
  );
} 