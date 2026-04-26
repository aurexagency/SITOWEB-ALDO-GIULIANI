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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm cursor-zoom-out transition-opacity"
      onClick={onClose}
    >
      <button 
        className="absolute top-8 right-8 text-white/70 hover:text-white text-5xl transition-colors font-light"
        onClick={onClose}
        aria-label="Chiudi"
      >
        &times;
      </button>
      <div 
        className="relative w-full h-full max-w-[90vw] max-h-[90vh] m-4 cursor-default" 
        onClick={(e) => e.stopPropagation()}
      >
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
  );
};
