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
    <main className="w-full relative">
      {pageContent}
      {pageContent}
    </main>
  );
}
