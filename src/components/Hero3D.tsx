'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface Hero3DProps {
  images: string[];
}

export const Hero3D: React.FC<Hero3DProps> = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  const N = images.length;
  const theta = 360 / N;

  // Animation refs
  const rotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const scrollAccumulator = useRef(0);
  const lastScrollY = useRef(0);
  const radiusRef = useRef(900);
  const cardWRef = useRef(500);
  const cardHRef = useRef(400); // 500 * 4/5

  // Drag state
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);

  // Responsive sizing
  useEffect(() => {
    const update = () => {
      const isMobile = window.innerWidth < 768;
      const cw = isMobile ? 280 : 500;
      const ch = Math.round(cw * 4 / 5);
      const r = Math.round((cw / 2) / Math.tan(Math.PI / N)) + (isMobile ? 50 : 120);
      cardWRef.current = cw;
      cardHRef.current = ch;
      radiusRef.current = r;
      if (sceneRef.current) {
        sceneRef.current.style.width = `${cw}px`;
        sceneRef.current.style.height = `${ch}px`;
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [N]);

  // Helper: set target rotation and derive active index
  const updateTarget = (newTarget: number) => {
    targetRotationRef.current = newTarget;
    const norm = ((newTarget % 360) + 360) % 360;
    let best = 0, minD = 360;
    for (let i = 0; i < N; i++) {
      const a = (i * theta - norm + 360) % 360;
      const d = Math.min(a, 360 - a);
      if (d < minD) { minD = d; best = i; }
    }
    setActiveIdx(best);
  };

  // rAF animation loop — drives rotation AND per-card wave scaling
  useEffect(() => {
    let raf: number;

    const loop = () => {
      // Interpolate toward target when not dragging
      if (!isDragging.current) {
        rotationRef.current += (targetRotationRef.current - rotationRef.current) * 0.1;
      }

      if (sceneRef.current) {
        // Rotate the whole drum
        sceneRef.current.style.transform = `rotateY(${-rotationRef.current}deg)`;

        // Wave effect on every card
        const cards = sceneRef.current.querySelectorAll('.carousel-card') as NodeListOf<HTMLElement>;
        cards.forEach((card, i) => {
          // Absolute angular position in radians
          const angRad = (i * theta - rotationRef.current) * Math.PI / 180;
          const cos = Math.cos(angRad);
          
          // Proximity: 1 at front, -1 at back. 
          // We map the front half (0 to 1) to a smooth scale.
          const proximity = Math.max(0, cos);
          const smooth = Math.pow(proximity, 2); // Squared for a nicer curve than linear

          // Specification-aligned values
          // Scale: 0.8 (side) -> 1.4 (center)
          const scale   = 0.8 + smooth * 0.6;
          // Blur: 6px (side) -> 0px (center)
          const blur    = 6 * (1 - smooth); 
          // Opacity: 0.5 (side) -> 1.0 (center)
          const opacity = 0.5 + smooth * 0.5;
          // Z-Index: 0 (side) -> 20 (center)
          const zIdx    = Math.round(smooth * 20);
          
          card.style.transform = `rotateY(${i * theta}deg) translateZ(${radiusRef.current}px) scale(${scale})`;
          card.style.filter    = `blur(${blur}px)`;
          card.style.opacity   = String(opacity);
          card.style.zIndex    = String(zIdx);
        });
      }

      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, [theta]);

  // Scroll → snap
  useEffect(() => {
    lastScrollY.current = window.scrollY;
    const onScroll = () => {
      if (isDragging.current) { lastScrollY.current = window.scrollY; return; }
      const dy = window.scrollY - lastScrollY.current;
      lastScrollY.current = window.scrollY;
      scrollAccumulator.current += dy;
      if (Math.abs(scrollAccumulator.current) > 120) {
        updateTarget(targetRotationRef.current + Math.sign(scrollAccumulator.current) * theta);
        scrollAccumulator.current = 0;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [theta]);

  // Pointer drag
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    velocity.current = 0;
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    velocity.current = dx;
    rotationRef.current -= dx * 0.4;

    // Update active index live during drag
    const norm = ((rotationRef.current % 360) + 360) % 360;
    let best = 0, minD = 360;
    for (let i = 0; i < N; i++) {
      const a = (i * theta - norm + 360) % 360;
      const d = Math.min(a, 360 - a);
      if (d < minD) { minD = d; best = i; }
    }
    setActiveIdx(best);
  };
  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const projected = rotationRef.current - velocity.current * 2;
    updateTarget(Math.round(projected / theta) * theta);
  };

  return (
    <section
      ref={containerRef}
      data-nav-transparent="true"
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[var(--background)] cursor-grab active:cursor-grabbing select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Atmospheric blurred background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {images.map((src, idx) => (
          <div
            key={`bg-${src}`}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === activeIdx ? 'opacity-40' : 'opacity-0'}`}
          >
            <Image src={src} alt="" fill className="object-cover blur-[50px] scale-110" priority={idx === 0} />
          </div>
        ))}
        <div className="absolute inset-0 bg-white/10" />
      </div>

      {/* 3D Carousel */}
      <div
        className="relative z-10 pointer-events-none"
        style={{ perspective: '1200px' }}
      >
        {/*
          KEY STRUCTURAL FIX:
          This scene div has the exact dimensions of ONE card.
          All carousel-card children use `absolute inset-0` to fill it,
          so every card starts from the same center point.
          rotateY + translateZ then distributes them correctly on a cylinder.
        */}
        <div
          ref={sceneRef}
          className="carousel-3d-inner relative pointer-events-none"
          style={{
            width: `${cardWRef.current}px`,
            height: `${cardHRef.current}px`,
            transformStyle: 'preserve-3d',
          }}
        >
          {images.map((src, idx) => (
            <div
              key={src}
              className="carousel-card absolute inset-0 pointer-events-none"
              style={{
                transformStyle: 'preserve-3d',
                // Initial values — overwritten every frame by the rAF loop
                transform: `rotateY(${idx * theta}deg) translateZ(${radiusRef.current}px) scale(0.75)`,
                opacity: 0.25,
                filter: 'blur(14px)',
              }}
            >
              {/* Card fills scene div entirely */}
              <div className="relative w-full h-full shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden border border-white/10">
                <Image
                  src={src}
                  alt={`Hero ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 280px, 500px"
                  className="object-cover object-center"
                  priority={idx < 3 || idx > N - 3}
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-12 md:bottom-20 z-20 text-center w-full pointer-events-none">
        <p className="text-white/60 tracking-[0.3em] text-xs uppercase">Scorri o Trascina</p>
      </div>
    </section>
  );
};
