'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/Button';
import { Marquee } from '@/components/Marquee';
import { MyStyle } from '@/components/MyStyle';
import { HeroFullscreen } from '@/components/HeroFullscreen';
import { ServicesScroll } from '@/components/ServicesScroll';


export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

  // 1. Logica del Vero Loop Infinito Verticale
  useEffect(() => { 
    const handleScroll = () => {
      if (!contentRef.current) return;

      // Calcoliamo l'altezza totale del div che contiene TUTTO
      const totalHeight = contentRef.current.scrollHeight;
      
      // La metà esatta corrisponde alla fine del primo blocco {pageContent}
      const halfHeight = totalHeight / 2;

      // L'illusione "Antigravity": se superiamo la metà, riportiamo lo scroll in alto
      // Sottraiamo halfHeight per mantenere l'inerzia esatta dello scroll dell'utente
      if (window.scrollY >= halfHeight) {
        window.scrollTo({ 
          top: window.scrollY - halfHeight, 
          behavior: 'auto' // 'auto' rende il salto istantaneo e invisibile
        });
      }
    };

    // Aggiungiamo l'ascoltatore dello scroll. passive: true migliora le performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Pulizia dell'evento quando il componente viene smontato
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 

  const pageContent = (
    <div className="w-full flex flex-col">
      {/* Hero Section */}
      <HeroFullscreen
        onCtaClick={() => {
          const footer = document.querySelector('section:last-of-type');
          footer?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Services Section */}
      <ServicesScroll />

      {/* My Style Section */}
      <MyStyle />
      
      {/* Footer / Call to Action */}
      <section className="py-32 bg-[var(--foreground)] text-center px-6">
        <h2 className="font-serif text-4xl text-white mb-8">Pronto per il tuo momento?</h2>
        <Link href="/preventivo">
          <Button
            variant="outline"
            className="border-[var(--champagne)] text-[var(--champagne)] bg-black/20 hover:bg-[var(--champagne)] hover:text-black hover:scale-105 duration-500 shadow-lg shadow-[rgba(197,160,89,0.1)] px-10 py-4"
          >
            CHIEDI UN PREVENTIVO
          </Button>
        </Link>
      </section>
    </div>
  );

  return (
    // Il ref ci serve per misurare l'altezza totale
    <main ref={contentRef} className="relative w-full bg-[var(--background)]">
      {pageContent}
      {pageContent}
    </main>
  );
}
