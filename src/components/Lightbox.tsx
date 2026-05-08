'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';

interface LightboxProps {
  src: string | null;
  onClose: () => void;
}

export const Lightbox: React.FC<LightboxProps> = ({ src, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (src) {
      window.addEventListener('keydown', handleKeyDown);
      // Prevent scrolling when lightbox is open
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-md cursor-zoom-out transition-opacity duration-300"
      onClick={onClose}
    >
      <button 
        className="absolute top-6 right-6 md:top-10 md:right-10 text-white/50 hover:text-white transition-all duration-300 z-[110] flex flex-col items-center gap-1 group"
        onClick={onClose}
        aria-label="Chiudi"
      >
        <span className="text-4xl md:text-5xl font-extralight leading-none group-hover:rotate-90 transition-transform duration-500">&times;</span>
        <span className="text-[10px] tracking-[0.3em] uppercase opacity-0 group-hover:opacity-100 transition-opacity hidden md:block">Chiudi</span>
      </button>

      <div 
        className="relative w-full h-full flex items-center justify-center p-4 md:p-12 cursor-default" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full h-full max-w-7xl max-h-[85vh] flex items-center justify-center">
          <Image
            src={src}
            alt="Immagine a tutto schermo"
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />
        </div>
      </div>
    </div>
  );
};
