'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Marquee } from '@/components/Marquee';
import { MyStyle } from '@/components/MyStyle';

const initialHeroImages = [
  '/Home/hero/01.jpg',
  '/Home/hero/02.jpg',
  '/Home/hero/03.jpg',
  '/Home/hero/04.jpg',
  '/Home/hero/05.jpg',
  '/Home/hero/06.jpg',
  '/Home/hero/07.jpg',
  '/Home/hero/08.jpg',
  '/Home/hero/09.jpg',
  '/Home/hero/10.jpg',
  '/Home/hero/11.jpg',
  '/Home/hero/12.jpg',
  '/Home/hero/13.jpg',
  '/Home/hero/14.jpg',
  '/Home/hero/15.jpg',
  '/Home/hero/16.jpg',
  '/Home/hero/17.jpg'
];

export default function Home() {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  // Time-based crossfade for Hero images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIdx((prev) => (prev + 1) % initialHeroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Infinite Scroll Logic
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    let isScrolling = false;

    const handleScroll = () => {
      if (isScrolling) return;

      const contentHeight = content.offsetHeight;
      const scrollTop = window.scrollY;

      if (scrollTop >= contentHeight) {
        isScrolling = true;
        window.scrollTo({ top: scrollTop - contentHeight, behavior: 'instant' });
        setTimeout(() => { isScrolling = false; }, 20);
      } else if (scrollTop <= 0) {
        isScrolling = true;
        window.scrollTo({ top: scrollTop + contentHeight, behavior: 'instant' });
        setTimeout(() => { isScrolling = false; }, 20);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial offset so user can scroll up immediately
    if (window.scrollY === 0) {
      window.scrollTo({ top: 10, behavior: 'instant' });
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const pageContent = (
    <div ref={contentRef} className="w-full flex flex-col">
      {/* Hero Section */}
      <section data-nav-transparent="true" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[var(--background)] px-6">
        <div className="relative w-full max-w-[90vw] aspect-[4/5] md:h-[85dvh] md:w-auto z-0 overflow-hidden shadow-2xl">
          {initialHeroImages.map((src, idx) => (
            <div 
              key={src} 
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentImageIdx ? 'opacity-100' : 'opacity-0'}`}
            >
              <Image
                src={src}
                alt="Hero Background"
                fill
                sizes="(max-width: 768px) 100vw, 70vw"
                className="object-cover object-center"
                priority={idx === 0}
              />
            </div>
          ))}
          <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        </div>
      </section>

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
    </div>
  );

  return (
    <main className="w-full relative">
      {pageContent}
      {pageContent}
    </main>
  );
}
