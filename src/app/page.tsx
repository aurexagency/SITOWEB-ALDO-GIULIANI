'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Button } from '@/components/Button';
import { Marquee } from '@/components/Marquee';
import { MyStyle } from '@/components/MyStyle';
import { HeroFullscreen } from '@/components/HeroFullscreen';
import { ServicesScroll } from '@/components/ServicesScroll';


export default function Home() {
  const contentRef = useRef<HTMLDivElement>(null);

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
