import { Suspense } from 'react';
import { PreventivoBrief } from './PreventivoBrief';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chiedi un Preventivo — Aldo Giuliani Photography',
  description: 'Raccontami la tua storia. Compila il modulo per ricevere un preventivo personalizzato per il tuo servizio fotografico con Aldo Giuliani.',
};

export default function PreventivoPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#1A1A1A]" />}>
      <PreventivoBrief />
    </Suspense>
  );
}
