'use client';

import React, { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
interface HeroSlide {
  src: string;
  title?: string;
  subtitle?: string;
}

interface Hero3DProps {
  images: string[];         // Backwards compat — plain string array
  slides?: HeroSlide[];     // Rich data with captions
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
export const Hero3D: React.FC<Hero3DProps> = ({ images, slides: propSlides }) => {
  // Normalise input
  const slides: HeroSlide[] = propSlides ?? images.map((src) => ({ src }));

  const N = slides.length;
  const wrapRef = useRef<HTMLDivElement>(null);            // perspective wrapper
  const trackRef = useRef<HTMLDivElement>(null);           // horizontally translated track
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);  // each card wrapper
  const textRefs = useRef<(HTMLDivElement | null)[]>([]);  // text overlays
  const bgRef = useRef<HTMLDivElement>(null);              // gradient bg layer

  // Animation state — no React state to avoid re-renders
  const posRef = useRef(0);           // current continuous position (float index)
  const targetRef = useRef(0);        // target position (set by snap)
  const velocityRef = useRef(0);      // velocity for inertia
  const isDragging = useRef(false);
  const lastXRef = useRef(0);
  const rafRef = useRef(0);

  // Layout constants
  const GAP = typeof window !== 'undefined' && window.innerWidth < 768 ? 30 : 60;
  const CARD_W = typeof window !== 'undefined' && window.innerWidth < 768 ? 260 : 420;

  /* ---------------------------------------------------------------- */
  /*  Helper: wrap index for infinite loop                             */
  /* ---------------------------------------------------------------- */
  const wrapIdx = useCallback((i: number) => ((i % N) + N) % N, [N]);

  /* ---------------------------------------------------------------- */
  /*  Core render loop — runs at 60fps, GSAP-powered interpolation     */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    const stepW = CARD_W + GAP;
    let prevActiveIdx = -1;

    const tick = () => {
      rafRef.current = requestAnimationFrame(tick);

      // Inertial interpolation toward target
      if (!isDragging.current) {
        const dist = targetRef.current - posRef.current;
        // Use GSAP-style exponential decay
        posRef.current += dist * 0.08;
        // Snap tolerance
        if (Math.abs(dist) < 0.001) posRef.current = targetRef.current;
      }

      const pos = posRef.current;
      const centerOffset = typeof window !== 'undefined' ? window.innerWidth / 2 : 768;

      for (let i = 0; i < N; i++) {
        const card = cardRefs.current[i];
        const text = textRefs.current[i];
        if (!card) continue;

        // Infinite: virtual position wraps around
        let offset = i - pos;
        // Wrap to keep cards within -N/2 … +N/2 of the center
        while (offset < -N / 2) offset += N;
        while (offset > N / 2) offset -= N;

        const x = offset * stepW;
        const distFromCenter = Math.abs(offset);

        // --- 3D Depth Mapping ---
        // Center (distFromCenter ≈ 0): scale 1.5, translateZ +200
        // Side   (distFromCenter ≥ 1): scale 0.7, translateZ -300
        const t = Math.max(0, 1 - distFromCenter);  // 1 at center, 0 at ±1+
        const smooth = Math.sin(t * Math.PI / 2);   // ease-out curve

        const scale = 0.7 + 0.8 * smooth;            // 0.7 → 1.5
        const zTrans = -300 + 500 * smooth;           // -300 → +200
        const blur = 10 * (1 - smooth);               // 10px → 0
        const opacity = 0.4 + 0.6 * smooth;           // 0.4 → 1.0
        const brightness = 0.5 + 0.5 * smooth;        // dim sides

        card.style.transform = `translateX(${x}px) translateZ(${zTrans}px) scale(${scale})`;
        card.style.filter = `blur(${blur}px) brightness(${brightness})`;
        card.style.opacity = `${opacity}`;
        card.style.zIndex = `${Math.round(smooth * 100)}`;

        // Text contextual info — fade in only when centered
        if (text) {
          const textOpacity = Math.max(0, smooth - 0.3) / 0.7;  // threshold at 0.3
          text.style.opacity = `${textOpacity}`;
          text.style.transform = `translateY(${20 * (1 - textOpacity)}px)`;
        }
      }

      // Update background gradient based on active image
      const activeIdx = wrapIdx(Math.round(pos));
      if (activeIdx !== prevActiveIdx && bgRef.current) {
        prevActiveIdx = activeIdx;
        // Cycle through dark tones that shift subtly
        const hues = [220, 240, 200, 260, 180, 210, 250, 190, 230, 215, 205, 225, 245, 195, 235, 255, 185];
        const hue = hues[activeIdx % hues.length];
        gsap.to(bgRef.current, {
          background: `radial-gradient(ellipse at center, hsl(${hue}, 15%, 12%) 0%, hsl(${hue}, 20%, 5%) 100%)`,
          duration: 1.2,
          ease: 'power2.out',
        });
      }
    };

    tick();
    return () => cancelAnimationFrame(rafRef.current);
  }, [N, CARD_W, GAP, wrapIdx]);

  /* ---------------------------------------------------------------- */
  /*  Wheel handler — scroll to advance                                */
  /* ---------------------------------------------------------------- */
  useEffect(() => {
    let accumulated = 0;
    const stepW = CARD_W + GAP;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      accumulated += e.deltaY;

      // Every ~80px of scroll = 1 step
      if (Math.abs(accumulated) > 80) {
        const dir = Math.sign(accumulated);
        targetRef.current += dir;
        accumulated = 0;
      }
    };

    window.addEventListener('wheel', onWheel, { passive: false });
    return () => window.removeEventListener('wheel', onWheel);
  }, [CARD_W, GAP]);

  /* ---------------------------------------------------------------- */
  /*  Pointer drag handlers                                            */
  /* ---------------------------------------------------------------- */
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastXRef.current = e.clientX;
    velocityRef.current = 0;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - lastXRef.current;
    lastXRef.current = e.clientX;
    velocityRef.current = dx;

    const stepW = CARD_W + GAP;
    posRef.current -= dx / stepW;  // Convert pixels to index units
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    // Apply velocity-based inertia then snap
    const stepW = CARD_W + GAP;
    const inertia = -velocityRef.current / stepW * 3;
    const projected = posRef.current + inertia;
    targetRef.current = Math.round(projected);  // snap to nearest whole index
  };

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */
  return (
    <section
      data-nav-transparent="true"
      className="relative h-[100dvh] w-full overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerLeave={onPointerUp}
    >
      {/* Immersive gradient background */}
      <div
        ref={bgRef}
        className="absolute inset-0 z-0 transition-none"
        style={{
          background: 'radial-gradient(ellipse at center, hsl(220, 15%, 12%) 0%, hsl(220, 20%, 5%) 100%)',
        }}
      />

      {/* Subtle vignette overlay */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.6) 100%)',
        }}
      />

      {/* 3D Carousel */}
      <div
        ref={wrapRef}
        className="absolute inset-0 z-[2] flex items-center justify-center pointer-events-none"
        style={{ perspective: '1500px' }}
      >
        {/* Cards */}
        {slides.map((slide, i) => (
          <div
            key={`card-${i}`}
            ref={(el) => { cardRefs.current[i] = el; }}
            className="absolute pointer-events-none"
            style={{
              width: `${CARD_W}px`,
              transformStyle: 'preserve-3d',
              willChange: 'transform, opacity, filter',
            }}
          >
            {/* Image card */}
            <div
              className="relative w-full overflow-hidden rounded-md"
              style={{ aspectRatio: '4/5' }}
            >
              <Image
                src={slide.src}
                alt={slide.title || `Photo ${i + 1}`}
                fill
                sizes={`(max-width: 768px) 260px, 420px`}
                className="object-cover object-center"
                priority={i < 3}
              />
              {/* Dark gradient overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Contextual text overlay */}
            <div
              ref={(el) => { textRefs.current[i] = el; }}
              className="absolute bottom-0 left-0 right-0 px-6 pb-6 pointer-events-none"
              style={{ opacity: 0, willChange: 'opacity, transform' }}
            >
              {slide.title && (
                <h3 className="font-serif text-2xl md:text-3xl text-white mb-1 drop-shadow-lg">
                  {slide.title}
                </h3>
              )}
              {slide.subtitle && (
                <p className="text-white/70 text-sm md:text-base tracking-[0.15em] uppercase drop-shadow-md">
                  {slide.subtitle}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom indicator */}
      <div className="absolute bottom-10 md:bottom-16 z-[3] text-center w-full pointer-events-none">
        <p className="text-white/40 tracking-[0.3em] text-[10px] uppercase">
          Trascina o Scorri
        </p>
      </div>
    </section>
  );
};
