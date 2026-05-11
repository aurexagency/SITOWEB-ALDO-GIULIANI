'use client';

import React from 'react';
import { Button } from '@/components/Button';
import { Marquee } from '@/components/Marquee';
import { MyStyle } from '@/components/MyStyle';
import { Hero3D } from '@/components/Hero3D';

const heroSlides = [
  { src: '/Home/hero/01.jpg', title: 'Reportage', subtitle: 'Storie autentiche' },
  { src: '/Home/hero/02.jpg', title: 'Sport', subtitle: 'Energia pura' },
  { src: '/Home/hero/03.jpg', title: 'Matrimoni', subtitle: 'Emozioni senza tempo' },
  { src: '/Home/hero/04.jpg', title: 'Wildlife', subtitle: 'Natura selvaggia' },
  { src: '/Home/hero/05.jpg', title: 'Portrait', subtitle: "L'essenza di ogni volto" },
  { src: '/Home/hero/06.jpg', title: 'Sport', subtitle: 'Il gesto perfetto' },
  { src: '/Home/hero/07.jpg', title: 'Reportage', subtitle: 'Momenti irripetibili' },
  { src: '/Home/hero/08.jpg', title: 'Matrimoni', subtitle: 'Il giorno più bello' },
  { src: '/Home/hero/09.jpg', title: 'Wildlife', subtitle: 'Istinti primordiali' },
  { src: '/Home/hero/10.jpg', title: 'Portrait', subtitle: 'Sguardi che parlano' },
  { src: '/Home/hero/11.jpg', title: 'Sport', subtitle: 'Oltre il limite' },
  { src: '/Home/hero/12.jpg', title: 'Reportage', subtitle: 'Dietro le quinte' },
  { src: '/Home/hero/13.jpg', title: 'Matrimoni', subtitle: 'Promesse eterne' },
  { src: '/Home/hero/14.jpg', title: 'Wildlife', subtitle: 'Creature maestose' },
  { src: '/Home/hero/15.jpg', title: 'Portrait', subtitle: 'Luce naturale' },
  { src: '/Home/hero/16.jpg', title: 'Sport', subtitle: 'Adrenalina' },
  { src: '/Home/hero/17.jpg', title: 'Reportage', subtitle: 'Verità in ogni scatto' },
];

export default function Home() {
  return (
    <main className="w-full relative">
      {/* Hero Section — Sage East style 3D Depth Carousel */}
      <Hero3D images={[]} slides={heroSlides} />

      {/* Marquee Section */}
      <section className="py-16 bg-[var(--background)]">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl text-[var(--foreground)]">Servizi</h2>
        </div>
        <Marquee images={[
          '/Home/01.jpg',
          '/Home/02.jpg',
          '/Home/03.jpg',
          '/Home/03Web%202.jpg',
          '/Home/03Web%203.jpg',
          '/Home/03Web%204.jpg',
          '/Home/05Web%202.jpg',
          '/Home/05Web.jpg',
          '/Home/Alce.jpg',
          '/Home/Atletica02.jpg',
          '/Home/BeachVolley03.jpg',
          '/Home/Boxe02.jpg',
          '/Home/Calcio01.jpg',
          '/Home/Calcio02.jpg',
          '/Home/Calcio07.jpg',
          '/Home/DSC00931-2.jpg',
          '/Home/DSC01314-2.jpg',
          '/Home/DSC02276-2.jpg',
          '/Home/DSC_0415.jpg',
          '/Home/DSC_9290.jpg',
          '/Home/Fenicottero.jpg',
          '/Home/Hope02Web.jpg',
          '/Home/IMG_0443.jpg',
          '/Home/IMG_4935.jpg',
          '/Home/Leone.jpg',
          '/Home/Leonida01Web.jpg',
          '/Home/Leopardo.jpg',
          '/Home/Linci.jpg',
          '/Home/Orso.jpg',
          '/Home/Pellicano%20Riccio.jpg',
          '/Home/Vela02.jpg',
          '/Home/Vela05.jpg',
          '/Home/_DSC3762.jpg',
          '/Home/_DSC3768.jpg',
          '/Home/_DSC4119.jpg',
          '/Home/_DSC4241.jpg',
          '/Home/_DSC4450.jpg',
          '/Home/_DSC4529.jpg',
          '/Home/_DSC4539.jpg',
          '/Home/_DSC4860.jpg',
          '/Home/_DSC5455.jpg'
        ]} />
      </section>

      {/* My Style Section */}
      <MyStyle />
      
      {/* Footer / Call to Action */}
      <section className="py-32 bg-[var(--foreground)] text-center px-6">
        <h2 className="font-serif text-4xl text-white mb-8">Pronto per il tuo momento?</h2>
        <Button variant="primary" className="border-white text-white hover:bg-white hover:text-[var(--foreground)]">
          Preventivo Matrimoni
        </Button>
      </section>
    </main>
  );
}
