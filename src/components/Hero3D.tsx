'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';

interface Hero3DProps {
  images: string[];
}

export const Hero3D: React.FC<Hero3DProps> = ({ images }) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const N = images.length;
  const theta = 360 / N;

  // Animation and state refs
  const rotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const scrollAccumulator = useRef(0);
  const lastScrollY = useRef(0);
  const radiusRef = useRef(800);

  // Drag states
  const isDragging = useRef(false);
  const lastX = useRef(0);
  const velocity = useRef(0);

  // Ensure cardRefs array matches image count
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, N);
    while (cardRefs.current.length < N) {
      cardRefs.current.push(null);
    }
  }, [N]);

  // Responsive radius
  useEffect(() => {
    const updateRadius = () => {
      const cardWidth = window.innerWidth < 768 ? 280 : 500;
      const r = Math.round((cardWidth / 2) / Math.tan(Math.PI / N)) + (window.innerWidth < 768 ? 40 : 100);
      radiusRef.current = r;
    };
    updateRadius();
    window.addEventListener('resize', updateRadius);
    return () => window.removeEventListener('resize', updateRadius);
  }, [N]);

  // Helper to update target and active index
  const updateTarget = useCallback((newTarget: number) => {
    targetRotationRef.current = newTarget;
    const normalized = ((newTarget % 360) + 360) % 360;
    let closestIdx = 0;
    let minDiff = 360;
    for (let i = 0; i < N; i++) {
      const angle = (i * theta - normalized + 360) % 360;
      const diff = Math.min(angle, 360 - angle);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    setActiveIdx(closestIdx);
  }, [N, theta]);

  // Animation Loop — applies breathing effect via direct refs
  useEffect(() => {
    let rafId: number;
    const thetaVal = theta;
    const nVal = N;

    const loop = () => {
      if (!isDragging.current) {
        const diff = targetRotationRef.current - rotationRef.current;
        rotationRef.current += diff * 0.1;
      }

      // Rotate the whole carousel drum
      if (carouselRef.current) {
        carouselRef.current.style.transform = `rotateY(${-rotationRef.current}deg)`;
      }

      // Apply breathing effect to each card via direct refs
      for (let i = 0; i < nVal; i++) {
        const card = cardRefs.current[i];
        if (!card) continue;

        // Calculate angular distance from center (0 = facing viewer)
        let angleDiff = (i * thetaVal - rotationRef.current) % 360;
        if (angleDiff > 180) angleDiff -= 360;
        if (angleDiff < -180) angleDiff += 360;

        const absDiff = Math.abs(angleDiff);

        // Influence zone: 2 steps on each side for wider breathing wave
        const influence = thetaVal * 2;
        const proximity = Math.max(0, 1 - absDiff / influence);

        // Smooth ease-in-out curve (breathing)
        const smooth = (1 - Math.cos(proximity * Math.PI)) / 2;

        // Scale: 0.65 (far side, small) → 1.15 (center, big & prominent)
        const scale = 0.65 + 0.5 * smooth;
        // Blur: 12px (side, very blurry) → 0px (center, crystal sharp)
        const blur = 12 * (1 - smooth);
        // Opacity: 0.3 (side, faded) → 1.0 (center, fully visible)
        const opacity = 0.3 + 0.7 * smooth;

        card.style.transform = `rotateY(${i * thetaVal}deg) translateZ(${radiusRef.current}px) scale(${scale})`;
        card.style.filter = `blur(${blur}px)`;
        card.style.opacity = `${opacity}`;
      }

      rafId = requestAnimationFrame(loop);
    };

    loop();
    return () => cancelAnimationFrame(rafId);
  }, [theta, N]);

  // Handle scroll to snap
  useEffect(() => {
    lastScrollY.current = window.scrollY;

    const handleScroll = () => {
      if (isDragging.current) {
        lastScrollY.current = window.scrollY;
        return;
      }

      const currentScrollY = window.scrollY;
      const deltaY = currentScrollY - lastScrollY.current;
      lastScrollY.current = currentScrollY;

      scrollAccumulator.current += deltaY;

      if (Math.abs(scrollAccumulator.current) > 120) {
        const direction = Math.sign(scrollAccumulator.current);
        updateTarget(targetRotationRef.current + direction * theta);
        scrollAccumulator.current = 0;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [theta, updateTarget]);

  // Pointer Events for Dragging
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    lastX.current = e.clientX;
    velocity.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - lastX.current;
    lastX.current = e.clientX;
    velocity.current = deltaX;

    const dragSensitivity = 0.4;
    rotationRef.current -= deltaX * dragSensitivity;

    // Keep active index updated while dragging
    const normalized = ((rotationRef.current % 360) + 360) % 360;
    let closestIdx = 0;
    let minDiff = 360;
    for (let i = 0; i < N; i++) {
      const angle = (i * theta - normalized + 360) % 360;
      const diff = Math.min(angle, 360 - angle);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    setActiveIdx(closestIdx);
  };

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;

    const projectedRotation = rotationRef.current - velocity.current * 2;
    const nearestIndex = Math.round(projectedRotation / theta);
    updateTarget(nearestIndex * theta);
  };

  return (
    <section
      ref={containerRef}
      data-nav-transparent="true"
      className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-[var(--background)] cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >

      {/* Background Fill: Blurred Active Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {images.map((src, idx) => (
          <div
            key={`bg-${src}`}
            className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === activeIdx ? 'opacity-40' : 'opacity-0'}`}
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
        className="relative z-10 flex items-center justify-center w-full h-full pointer-events-none"
        style={{ perspective: '1200px', transformStyle: 'preserve-3d' }}
      >
        <div
          ref={carouselRef}
          className="relative flex items-center justify-center w-full h-full pointer-events-none"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {images.map((src, i) => (
            <div
              key={src}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="absolute pointer-events-none"
              style={{
                transformStyle: 'preserve-3d',
                willChange: 'transform, opacity, filter',
              }}
            >
              <div className="relative w-[280px] md:w-[500px] aspect-[5/4] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] rounded-sm overflow-hidden border border-white/10">
                <Image
                  src={src}
                  alt={`Hero Image ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 280px, 500px"
                  className="object-cover object-center"
                  priority={i < 3 || i > N - 3}
                />
                <div className="absolute inset-0 bg-black/10 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator overlay */}
      <div className="absolute bottom-12 md:bottom-20 z-20 text-center w-full pointer-events-none">
        <p className="text-white/60 tracking-[0.3em] text-xs uppercase mb-2">Scorri o Trascina</p>
      </div>
    </section>
  );
};
