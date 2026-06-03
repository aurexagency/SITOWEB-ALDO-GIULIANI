'use client'; 
import React, { useRef, useState, useEffect, useCallback } from 'react'; 
import Image from 'next/image'; 
import Link from 'next/link';

const SERVICES = [ 
  { name: 'Matrimoni', href: '/servizi/matrimoni', image: '/Home/Servizi/Matrimoni.jpg', label: 'Il giorno più bello' }, 
  { name: 'Portrait', href: '/servizi/moda', image: '/Home/Servizi/Portrait.jpg', label: 'La tua essenza' }, 
  { name: 'Pet Photo', href: '/servizi/petphoto', image: '/Home/Servizi/Pet Photo.jpg', label: 'Anime autentiche' }, 
  { name: 'Sport', href: '/servizi/sport', image: '/Home/Servizi/Sport.jpg', label: "L'istante perfetto" }, 
  { name: 'WildLife', href: '/servizi/wildlife', image: '/Home/Servizi/WildLife.jpg', label: 'La natura selvaggia' }, 
];

// Duplichiamo le card per creare il loop seamless
const LOOPED = [...SERVICES, ...SERVICES];

export const ServicesScroll: React.FC = () => { 
  const trackRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  const [isDraggingState, setIsDraggingState] = useState(false);

  // Refs per le performance e logica Antigravity
  const positionRef = useRef(0);
  const dragStartX = useRef(0);
  const isHovered = useRef(false);
  const isDraggingRef = useRef(false);
  const hasDragged = useRef(false);

  // Velocità dello scroll automatico
  const speed = 0.5;

  // ── Il Motore Antigravity ─────────────────────────────────────────
  const animate = useCallback(() => {
    if (!trackRef.current) return;

    // Pausa automatica su hover o trascinamento (Polite & Educated)
    if (!isDraggingRef.current && !isHovered.current) {
      positionRef.current -= speed;
    }

    const maxScroll = trackRef.current.scrollWidth / 2;

    if (Math.abs(positionRef.current) >= maxScroll) {
      positionRef.current = 0; 
    } else if (positionRef.current > 0) {
      positionRef.current = -maxScroll; 
    }

    trackRef.current.style.transform = `translateX(${positionRef.current}px)`;
    requestRef.current = requestAnimationFrame(animate);
  }, [speed]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  // ── Gestione Unificata Pointer (Mouse + Touch) ────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsDraggingState(true);
    dragStartX.current = e.clientX - positionRef.current;
    hasDragged.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX;
    const newPosition = currentX - dragStartX.current;

    // Se il movimento supera i 4px, è un trascinamento, non un click
    if (Math.abs(positionRef.current - newPosition) > 4) {
      hasDragged.current = true;
    }
    positionRef.current = newPosition;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsDraggingState(false);
  };

  const handlePointerLeave = () => {
    isHovered.current = false;
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDraggingState(false);
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[var(--background)] py-16 md:py-24">
      {/* Intestazione della sezione */}
      <div className="container mx-auto px-6 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif text-[var(--foreground)]">Cosa fotografo</h2>
          <p className="font-sans text-[var(--champagne)] tracking-widest uppercase text-sm mt-4">Servizi</p>
        </div>
      </div>
      
      {/* Contenitore Trascinabile */}
      <div
        className="w-full overflow-hidden"
        style={{
          cursor: isDraggingState ? 'grabbing' : 'grab',
          touchAction: 'pan-y'
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerLeave}
        onMouseEnter={() => { isHovered.current = true; }}
        onMouseLeave={() => { isHovered.current = false; handlePointerLeave(); }}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center gap-6 md:gap-10 px-6"
          style={{ willChange: 'transform' }}
        >
          {LOOPED.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="relative group w-[280px] md:w-[400px] h-[380px] md:h-[500px] flex-shrink-0 overflow-hidden block"
              onClick={(e) => {
                // Fondamentale: impedisce la navigazione se l'utente voleva solo trascinare
                if (hasDragged.current) e.preventDefault();
              }}
              draggable={false}
            >
              <Image
                src={service.image}
                alt={service.name}
                fill
                sizes="(max-width: 768px) 280px, 400px"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105 pointer-events-none"
                draggable={false}
              />
              {/* Overlay per leggibilità testo */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
              
              <div className="absolute bottom-8 left-8 text-white pointer-events-none">
                <p className="font-sans text-xs md:text-sm tracking-widest uppercase mb-2 text-[var(--champagne)]">{service.label}</p>
                <h3 className="font-serif text-3xl md:text-4xl">{service.name}</h3>
                <span className="inline-block mt-4 text-sm tracking-wider opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                  Scopri →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  ); 
};
