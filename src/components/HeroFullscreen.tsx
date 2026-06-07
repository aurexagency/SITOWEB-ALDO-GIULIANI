'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from './Button';
import { Bodoni_Moda } from 'next/font/google';

const bodoni = Bodoni_Moda({ subsets: ['latin'], display: 'swap', style: ['normal', 'italic'] });

interface HeroFullscreenProps {
  images?: string[];
  mobileImages?: string[];
  title?: string;
  subtitle?: string;
  tagline?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

// Desktop: immagini landscape originali
const DEFAULT_HERO_IMAGES = [
  '/Home/hero/Wedding01.avif',
  '/Home/hero/Portrait01.avif',
  '/Home/hero/Sport01.avif',
  '/Home/hero/Wildlife01.avif',
  '/Home/hero/Pet01.avif',
  '/Home/hero/Wedding02.avif',
  '/Home/hero/Portrait02.avif',
  '/Home/hero/Sport02.avif',
  '/Home/hero/Wildlife02.avif',
  '/Home/hero/Pet02.avif',
  '/Home/hero/Wedding03.avif',
  '/Home/hero/Portrait03.avif',
  '/Home/hero/Sport03.avif',
  '/Home/hero/Wildlife03.avif',
  '/Home/hero/Pet03.avif',
  '/Home/hero/Wedding04.avif',
  '/Home/hero/Portrait04.avif',
  '/Home/hero/Sport04.avif',
  '/Home/hero/Wildlife04.avif',
  '/Home/hero/Pet04.avif',
  '/Home/hero/Wedding05.avif',
  '/Home/hero/Portrait05.avif',
  '/Home/hero/Sport05.avif',
  '/Home/hero/Wildlife05.avif',
  '/Home/hero/Pet05.avif',
  '/Home/hero/Sport06.avif',
];

// Mobile: immagini verticali native dalla cartella hero-mobile (tutte e 27 bilanciate)
const DEFAULT_HERO_MOBILE_IMAGES = [
  // Ciclo 1
  '/Home/hero-mobile/Wedding01.avif',
  '/Home/hero-mobile/Portrait01.avif',
  '/Home/hero-mobile/Sport01.avif',
  '/Home/hero-mobile/Wildlife01.avif',
  '/Home/hero-mobile/Pet01.avif',
  // Ciclo 2
  '/Home/hero-mobile/Wedding02.avif',
  '/Home/hero-mobile/Portrait02.avif',
  '/Home/hero-mobile/Sport02.avif',
  '/Home/hero-mobile/Wildlife02.avif',
  '/Home/hero-mobile/Pet02.avif',
  // Ciclo 3
  '/Home/hero-mobile/Wedding03.avif',
  '/Home/hero-mobile/Portrait03.avif',
  '/Home/hero-mobile/Sport03.avif',
  '/Home/hero-mobile/Wildlife03.avif',
  '/Home/hero-mobile/Pet03.avif',
  // Ciclo 4
  '/Home/hero-mobile/Wedding04.avif',
  '/Home/hero-mobile/Portrait04.avif',
  '/Home/hero-mobile/Sport04.avif',
  '/Home/hero-mobile/Wildlife04.avif',
  '/Home/hero-mobile/Pet04.avif',
  // Ciclo 5
  '/Home/hero-mobile/Wedding05.avif',
  '/Home/hero-mobile/Portrait05.avif',
  '/Home/hero-mobile/Sport05.avif',
  '/Home/hero-mobile/Wildlife05.avif',
  '/Home/hero-mobile/Pet05.avif',
  // Ciclo 6 (rimanenti)
  '/Home/hero-mobile/Portrait06.avif',
  '/Home/hero-mobile/Sport06.avif',
];

/**
 * Hook per rilevare schermi mobile (< 768px).
 * Restituisce false durante SSR per evitare hydration mismatch.
 */
function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    setIsMobile(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  return isMobile;
}

export const HeroFullscreen: React.FC<HeroFullscreenProps> = ({
  images = DEFAULT_HERO_IMAGES,
  mobileImages = DEFAULT_HERO_MOBILE_IMAGES,
  title = 'ALDO GIULIANI',
  subtitle = 'PHOTOGRAPHY',
  tagline = 'L\'eternità di un istante racchiusa nella luce naturale.',
  ctaText = 'CHIEDI UN PREVENTIVO',
  onCtaClick,
}) => {
  // Art direction: switcha automaticamente tra immagini desktop e mobile
  const isMobile = useIsMobile();
  const activeImages = isMobile ? mobileImages : images;
  const [animate, setAnimate] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Attiva le animazioni raffinate all'avvio dopo il mount del client
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Quando cambia il device (es. rotazione schermo), resetta indice e riavvia lo slideshow
  useEffect(() => {
    setCurrentIndex(0);
    const pool = isMobile ? mobileImages : images;
    if (!pool || pool.length <= 1) return;

    // Gestisce la rotazione automatica delle immagini (slideshow)
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % pool.length);
    }, 6000); // Cambia immagine ogni 6 secondi
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <section
      data-nav-transparent="true"
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-black"
    >
      {/* 1 & 2. IMMAGINI BACKGROUND (Slideshow con Art Direction Responsive) */}
      {/* Desktop: landscape da /Home/hero/ — Mobile: verticali da /Home/hero- mobile/ */}
      {activeImages.map((img, index) => (
        <div key={img} className="absolute inset-0 z-0">
          <Image
            src={img}
            alt={`${title} - Hero Background ${index + 1}`}
            fill
            priority={index === 0}
            sizes="100vw"
            unoptimized={img.endsWith('.avif')}
            className={`object-cover transition-all duration-[2000ms] ease-in-out ${
              isMobile ? 'object-[center_top]' : 'object-center'
            } ${
              (animate ? index === currentIndex : index === 0)
                ? 'opacity-100 scale-100'
                : 'opacity-0 scale-105'
            }`}
          />
        </div>
      ))}

      {/* 3. OVERLAY DI LUSSO (Vignettatura scura radiale e lineare) */}
      {/* Garantisce un contrasto eccellente per logo, testi e pulsanti bianchi/oro */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(0,0,0,0.45))]" />

      {/* 4. CONTENUTO CENTRALE */}
      <div className="relative z-20 text-center px-6 w-full flex flex-col items-center gap-4 select-none">
        
        {/* Titolo Principale (Font Bodoni Moda — Alta Moda / Editoriale) */}
        <h1
          className={`${bodoni.className} text-5xl md:text-7xl lg:text-[8vw] tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] transition-all duration-[1200ms] ease-out delay-500 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          Aldo Giuliani
        </h1>

        {/* Sottotitolo (Sans-serif minimale spaziatissimo) */}
        <p
          className={`text-xs md:text-sm tracking-[0.6em] text-white/80 uppercase font-light transition-all duration-[1200ms] ease-out delay-700 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{
            textShadow: `
              -1px -1px 0   rgba(0,0,0,0.90),
               1px -1px 0   rgba(0,0,0,0.90),
              -1px  1px 0   rgba(0,0,0,0.90),
               1px  1px 0   rgba(0,0,0,0.90),
               0    0   8px rgba(0,0,0,0.60)
            `,
          }}
        >
          {subtitle}
        </p>

        {/* Frase poetica d'impatto (Focalizzante su USP) */}
        <p
          className={`text-sm md:text-lg font-serif text-white/90 italic tracking-wide max-w-xl leading-snug transition-all duration-[1200ms] ease-out delay-900 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
          style={{
            textShadow: `
              -1px -1px 0   rgba(0,0,0,0.85),
               1px -1px 0   rgba(0,0,0,0.85),
              -1px  1px 0   rgba(0,0,0,0.85),
               1px  1px 0   rgba(0,0,0,0.85),
               0    0   12px rgba(0,0,0,0.55)
            `,
          }}
        >
          {tagline}
        </p>

        {/* Bottone "Preventivo" con stile Gold Ghost */}
        <div
          className={`transition-all duration-[1200ms] ease-out delay-[1100ms] ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <Link href="/preventivo">
            <Button
              variant="outline"
              className="border-[var(--champagne)] text-[var(--champagne)] bg-black/20 hover:bg-[var(--champagne)] hover:text-black hover:scale-105 duration-500 shadow-lg shadow-[rgba(197,160,89,0.1)] px-10 py-4"
            >
              {ctaText}
            </Button>
          </Link>
        </div>
      </div>

      {/* 5. INDICATORE DI SCROLL MINIMALE (Bottom Center) */}
      <button
        onClick={handleScrollDown}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer focus:outline-none transition-all duration-[1500ms] ease-out delay-[1300ms] ${
          animate ? 'opacity-70 translate-y-0 hover:opacity-100' : 'opacity-0 translate-y-4'
        }`}
        aria-label="Scorri verso il basso"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase text-white/70">Scorri</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/80 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[var(--champagne)] animate-bounce duration-1000" />
        </div>
      </button>
    </section>
  );
};
