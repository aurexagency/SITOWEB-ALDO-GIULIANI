'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const SERVICES = [
  {
    name: 'Matrimoni',
    href: '/servizi/matrimoni',
    image: '/Home/Servizi/Matrimoni.jpg',
    label: 'Il giorno più bello',
  },
  {
    name: 'Portrait',
    href: '/servizi/moda',
    image: '/Home/Servizi/Portrait.jpg',
    label: 'La tua essenza',
  },
  {
    name: 'Pet Photo',
    href: '/servizi/petphoto',
    image: '/Home/Servizi/Pet Photo.jpg',
    label: 'Anime autentiche',
  },
  {
    name: 'Sport',
    href: '/servizi/sport',
    image: '/Home/Servizi/Sport.jpg',
    label: "L'istante perfetto",
  },
  {
    name: 'WildLife',
    href: '/servizi/wildlife',
    image: '/Home/Servizi/WildLife.jpg',
    label: 'La natura selvaggia',
  },
];

// Durata del loop completo in secondi — più alto = più lento
const LOOP_DURATION = 35;

// Duplica i card per creare il loop seamless
const LOOPED = [...SERVICES, ...SERVICES];

const getTranslateX = (el: HTMLElement): number => {
  const matrix = new DOMMatrix(window.getComputedStyle(el).transform);
  return matrix.m41;
};

export const ServicesScroll: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const hasDragged = useRef(false);

  // ── Avvio drag ─────────────────────────────────────────────
  const startDrag = (clientX: number) => {
    if (!trackRef.current) return;

    // Congela l'animazione catturando la posizione corrente
    const currentX = getTranslateX(trackRef.current);
    dragStartOffset.current = currentX;
    dragStartX.current = clientX;
    hasDragged.current = false;

    trackRef.current.style.animation = 'none';
    trackRef.current.style.transform = `translateX(${currentX}px)`;

    setIsDragging(true);
  };

  // ── Movimento drag ─────────────────────────────────────────
  const moveDrag = (clientX: number) => {
    if (!trackRef.current) return;
    const delta = clientX - dragStartX.current;
    if (Math.abs(delta) > 4) hasDragged.current = true;
    trackRef.current.style.transform = `translateX(${dragStartOffset.current + delta}px)`;
  };

  // ── Fine drag: riprende l'animazione dal punto esatto ──────
  const stopDrag = (clientX: number) => {
    if (!trackRef.current) return;

    const delta = clientX - dragStartX.current;
    const finalX = dragStartOffset.current + delta;

    // Larghezza di un singolo set (metà del track totale)
    const totalWidth = trackRef.current.scrollWidth / 2;

    // Normalizza la posizione nel range [-totalWidth, 0]
    let normalizedX = finalX % totalWidth;
    if (normalizedX > 0) normalizedX -= totalWidth;

    // Riprende l'animazione con delay negativo proporzionale alla posizione
    const progress = Math.abs(normalizedX) / totalWidth;
    const delay = -progress * LOOP_DURATION;

    trackRef.current.style.transform = '';
    trackRef.current.style.animation = `services-loop ${LOOP_DURATION}s linear infinite`;
    trackRef.current.style.animationDelay = `${delay}s`;

    setIsDragging(false);
  };

  // ── Handlers mouse ─────────────────────────────────────────
  const handleMouseDown = (e: React.MouseEvent) => startDrag(e.clientX);
  const handleMouseMove = (e: React.MouseEvent) => { if (isDragging) moveDrag(e.clientX); };
  const handleMouseUp   = (e: React.MouseEvent) => { if (isDragging) stopDrag(e.clientX); };
  const handleMouseLeave = (e: React.MouseEvent) => { if (isDragging) stopDrag(e.clientX); };

  // ── Handlers touch ─────────────────────────────────────────
  const handleTouchStart = (e: React.TouchEvent) => startDrag(e.touches[0].clientX);
  const handleTouchMove  = (e: React.TouchEvent) => { if (isDragging) moveDrag(e.touches[0].clientX); };
  const handleTouchEnd   = (e: React.TouchEvent) => { if (isDragging) stopDrag(e.changedTouches[0].clientX); };

  return (
    <>
      {/* Keyframe dedicato per il loop dei servizi */}
      <style>{`
        @keyframes services-loop {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section className="py-20 bg-[var(--background)] overflow-hidden">
        {/* Titolo sezione */}
        <div className="text-center mb-14 px-6">
          <p className="text-[10px] tracking-[0.5em] uppercase text-[var(--champagne)] font-light mb-3">
            Cosa fotografo
          </p>
          <h2 className="font-serif text-4xl md:text-5xl text-[var(--foreground)]">
            Servizi
          </h2>
        </div>

        {/* Wrapper overflow */}
        <div
          className="relative w-full overflow-hidden"
          style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Track animato */}
          <div
            ref={trackRef}
            className="flex w-max items-stretch gap-5 px-8"
            style={{
              animation: `services-loop ${LOOP_DURATION}s linear infinite`,
              willChange: 'transform',
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            {LOOPED.map((service, index) => (
              <Link
                key={`${service.name}-${index}`}
                href={service.href}
                draggable={false}
                onClick={(e) => { if (hasDragged.current) e.preventDefault(); }}
                className="group relative shrink-0 overflow-hidden rounded-sm select-none"
                style={{
                  width: 'clamp(240px, 28vw, 400px)',
                  aspectRatio: '3 / 4',
                }}
              >
                {/* Foto */}
                <Image
                  src={service.image}
                  alt={`Fotografia ${service.name} - Aldo Giuliani`}
                  fill
                  sizes="(max-width: 768px) 80vw, 400px"
                  className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  draggable={false}
                />

                {/* Overlay sfumato fisso (bottom) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />

                {/* Overlay oro su hover */}
                <div className="absolute inset-0 bg-[var(--champagne)]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Linea oro top su hover */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-[var(--champagne)] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                {/* Testo in basso */}
                <div className="absolute bottom-0 left-0 w-full p-6 flex flex-col gap-2">
                  {/* Label poetica — appare su hover */}
                  <p
                    className="text-[9px] tracking-[0.5em] uppercase font-medium
                               translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0
                               transition-all duration-300 ease-out"
                    style={{
                      color: '#ffffff',
                      textShadow: `
                        -1px -1px 0 rgba(0,0,0,0.95),
                         1px -1px 0 rgba(0,0,0,0.95),
                        -1px  1px 0 rgba(0,0,0,0.95),
                         1px  1px 0 rgba(0,0,0,0.95),
                         0    0  10px rgba(0,0,0,0.70)
                      `,
                    }}
                  >
                    {service.label}
                  </p>

                  {/* Nome servizio — sempre visibile */}
                  <h3
                    className="font-serif text-2xl md:text-3xl text-white leading-tight"
                    style={{
                      textShadow: `
                        -1px -1px 0 rgba(0,0,0,0.7),
                         1px -1px 0 rgba(0,0,0,0.7),
                        -1px  1px 0 rgba(0,0,0,0.7),
                         1px  1px 0 rgba(0,0,0,0.7),
                         0    0  12px rgba(0,0,0,0.5)
                      `,
                    }}
                  >
                    {service.name}
                  </h3>

                  {/* Scopri → — appare su hover */}
                  <span
                    className="mt-1 inline-flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase font-medium
                               opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0
                               transition-all duration-500 delay-75"
                    style={{
                      color: '#C5A059',
                      textShadow: `
                        -1px -1px 0 rgba(0,0,0,0.95),
                         1px -1px 0 rgba(0,0,0,0.95),
                        -1px  1px 0 rgba(0,0,0,0.95),
                         1px  1px 0 rgba(0,0,0,0.95),
                         0    0  8px rgba(0,0,0,0.80)
                      `,
                    }}
                  >
                    Scopri
                    <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
