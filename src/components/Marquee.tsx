'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Lightbox } from './Lightbox';

interface MarqueeProps {
  images: string[];
  speed?: number; // Velocità in pixel per frame (più è basso, più è lento ed elegante)
}

export const Marquee: React.FC<MarqueeProps> = ({ images, speed = 0.5 }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  // Usiamo useRef per TUTTI gli stati legati all'animazione e al drag.
  // Questo evita i re-render di React durante il movimento continuo.
  const positionRef = useRef(0);
  const dragStartX = useRef(0);
  const isHovered = useRef(false);
  const isDraggingRef = useRef(false);
  const hasDragged = useRef(false);

  // Duplichiamo le immagini per l'illusione del loop infinito
  const duplicatedImages = [...images, ...images];

  // ── Il Motore Antigravity ─────────────────────────────────────────
  const animate = useCallback(() => {
    if (!trackRef.current) return;

    // Se l'utente non sta trascinando e non è in hover, procediamo con l'autoplay
    if (!isDraggingRef.current && !isHovered.current) {
      positionRef.current -= speed;
    }

    // Calcoliamo la metà esatta della larghezza totale del contenitore
    const maxScroll = trackRef.current.scrollWidth / 2;

    // Logica di riavvolgimento istantaneo (Il Loop)
    if (Math.abs(positionRef.current) >= maxScroll) {
      positionRef.current = 0; 
    } else if (positionRef.current > 0) {
      positionRef.current = -maxScroll; 
    }

    // Applichiamo la trasformazione bypassando React
    trackRef.current.style.transform = `translateX(${positionRef.current}px)`;

    // Chiamata ricorsiva al prossimo frame disponibile del browser
    requestRef.current = requestAnimationFrame(animate);
  }, [speed]);

  // Avvio del loop al mount del componente
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animate]);

  // ── Gestione Unificata Pointer (Mouse + Touch) ────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    // Memorizziamo il punto di partenza calcolando l'offset corrente
    dragStartX.current = e.clientX - positionRef.current;
    hasDragged.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const currentX = e.clientX;
    const newPosition = currentX - dragStartX.current;

    // Se ci siamo mossi di più di 3 pixel, consideriamolo un "drag" (non un click)
    if (Math.abs(positionRef.current - newPosition) > 3) {
      hasDragged.current = true;
    }

    positionRef.current = newPosition;
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
    setIsDragging(false);
  };

  const handlePointerLeave = () => {
    isHovered.current = false;
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
    }
  };

  return (
    <>
      <div
        className="relative w-full overflow-hidden bg-[var(--background)] py-10"
        style={{
          cursor: isDragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y' // Fondamentale: permette all'utente di scrollare in giù se tocca la galleria su mobile
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
          className="flex w-max items-center gap-8 h-[350px] md:h-[450px]"
          style={{ willChange: 'transform' }} // Suggerisce al browser di usare l'accelerazione hardware
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative h-full w-auto shrink-0 overflow-hidden group"
              onClick={() => {
                // Apriamo la lightbox solo se l'utente ha cliccato, non se ha trascinato
                if (!hasDragged.current) setSelectedImage(src);
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`Gallery Image ${index + 1}`}
                className="h-full w-auto object-contain transition-transform duration-700 md:group-hover:scale-105 pointer-events-none"
                draggable={false} // Evita il ghosting dell'immagine nativa del browser
              />
              {/* Overlay minimale per invitare al click (The Eternal Story style) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/20 text-white font-serif tracking-widest pointer-events-none">
                Espandi
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Lightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
};
