'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Hero3DProps {
  images: string[];
}

export const Hero3D: React.FC<Hero3DProps> = ({ images }) => {
  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(800);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const N = images.length;
  const theta = 360 / N;

  // Responsive radius
  useEffect(() => {
    const updateRadius = () => {
      const cardWidth = window.innerWidth < 768 ? 280 : 500;
      const r = Math.round((cardWidth / 2) / Math.tan(Math.PI / N)) + (window.innerWidth < 768 ? 40 : 100);
      setRadius(r);
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, [N]);

  // Handle scroll to rotate
  useEffect(() => {
    // Keep track of total scroll delta to allow rotating even if page is at top
    // However, native scrolling is usually what we link to.
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const speed = 0.15;
      setRotation(scrollY * speed);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const normalizedRotation = ((rotation % 360) + 360) % 360;
  
  let activeIdx = 0;
  let minDiff = 360;
  for (let i = 0; i < N; i++) {
    const angle = (i * theta - normalizedRotation + 360) % 360;
    const diff = Math.min(angle, 360 - angle);
    if (diff < minDiff) {
      minDiff = diff;
      activeIdx = i;
    }
  }

  return (
    <section ref={containerRef} data-nav-transparent="true" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[var(--background)]">
      
      {/* Background Fill: Blurred Active Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {images.map((src, idx) => (
          <div 
            key={`bg-${src}`} 
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${idx === activeIdx ? 'opacity-40' : 'opacity-0'}`}
          >
            <Image
              src={src}
              alt=""
              fill
              className="object-cover blur-[50px] scale-110"
              priority={idx === 0}
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-white/10" />
      </div>

      {/* 3D Carousel Scene */}
      <div 
        className="relative z-10 flex items-center justify-center w-full h-full"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        <div 
          className="relative flex items-center justify-center w-full h-full"
          style={{ 
            transformStyle: 'preserve-3d', 
            transform: `rotateY(${-rotation}deg)`,
            transition: 'transform 0.1s ease-out'
          }}
        >
          {images.map((src, idx) => {
            const isActive = idx === activeIdx;
            return (
              <div
                key={src}
                className="absolute"
                style={{
                  transform: `rotateY(${idx * theta}deg) translateZ(${radius}px)`,
                  transition: 'all 0.5s ease-out',
                  opacity: isActive ? 1 : 0.4,
                  filter: isActive ? 'blur(0px)' : 'blur(8px)',
                }}
              >
                <div className="relative w-[280px] md:w-[500px] aspect-[5/4] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden border border-white/10">
                  <Image
                    src={src}
                    alt={`Hero Image ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 280px, 500px"
                    className="object-cover object-center"
                    priority={idx < 3 || idx > N - 3}
                  />
                  <div className="absolute inset-0 bg-black/10 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Scroll indicator overlay */}
      <div className="absolute bottom-12 md:bottom-20 z-20 text-center w-full pointer-events-none">
        <p className="text-white/60 tracking-[0.3em] text-xs uppercase mb-2">Scorri per esplorare</p>
      </div>
    </section>
  );
};
