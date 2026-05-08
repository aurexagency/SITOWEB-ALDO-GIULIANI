'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { Lightbox } from './Lightbox';

interface MarqueeProps {
  images: string[];
  duration?: number;
}

const DEFAULT_ANIMATION_DURATION = 640; // seconds

export const Marquee: React.FC<MarqueeProps> = ({ images, duration = DEFAULT_ANIMATION_DURATION }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef(0);
  const dragStartOffset = useRef(0);
  const hasDragged = useRef(false);

  // Duplicate images to create a seamless loop
  const duplicatedImages = [...images, ...images];

  const getTranslateX = (el: HTMLElement): number => {
    const matrix = new DOMMatrix(window.getComputedStyle(el).transform);
    return matrix.m41;
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return;
    e.preventDefault();
    startDragging(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!trackRef.current) return;
    startDragging(e.touches[0].clientX);
  };

  const startDragging = (clientX: number) => {
    if (!trackRef.current) return;
    
    // Capture current animated position and freeze it
    const currentX = getTranslateX(trackRef.current);
    dragStartOffset.current = currentX;
    dragStartX.current = clientX;
    hasDragged.current = false;

    trackRef.current.style.animation = 'none';
    trackRef.current.style.transform = `translateX(${currentX}px)`;

    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return;
    moveDragging(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return;
    moveDragging(e.touches[0].clientX);
  };

  const moveDragging = (clientX: number) => {
    if (!isDragging || !trackRef.current) return;

    const delta = clientX - dragStartX.current;
    if (Math.abs(delta) > 5) hasDragged.current = true;

    trackRef.current.style.transform = `translateX(${dragStartOffset.current + delta}px)`;
  };

  const stopDragging = (clientX: number) => {
    if (!trackRef.current) return;
    setIsDragging(false);

    const delta = clientX - dragStartX.current;
    const finalX = dragStartOffset.current + delta;

    // Total width of one set of images (half the full track)
    const totalWidth = trackRef.current.scrollWidth / 2;

    // Normalize position into the loop range [-totalWidth, 0]
    let normalizedX = finalX % totalWidth;
    if (normalizedX > 0) normalizedX -= totalWidth;

    // Resume animation from the current scroll position
    const progress = Math.abs(normalizedX) / totalWidth;
    const delay = -progress * duration;

    trackRef.current.style.transform = '';
    trackRef.current.style.animation = `marquee ${duration}s linear infinite`;
    trackRef.current.style.animationDelay = `${delay}s`;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    stopDragging(e.clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging) return;
    stopDragging(e.changedTouches[0].clientX);
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    if (isDragging) stopDragging(e.clientX);
  };

  return (
    <>
      <div
        className="relative w-full overflow-hidden bg-[var(--background)] py-10"
        style={{ cursor: isDragging ? 'grabbing' : 'grab', touchAction: 'pan-y' }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex w-max items-center gap-8"
          style={{ animation: `marquee ${duration}s linear infinite`, willChange: 'transform' }}
          onMouseDown={handleMouseDown}
        >
          {duplicatedImages.map((src, index) => (
            <div
              key={index}
              className="relative h-[300px] w-[450px] md:h-[400px] md:w-[600px] shrink-0 overflow-hidden group"
              style={{ cursor: isDragging ? 'grabbing' : 'pointer' }}
              onClick={() => {
                if (!hasDragged.current) setSelectedImage(src);
              }}
            >
              <Image
                src={src}
                alt={`Gallery Image ${index + 1}`}
                fill
                className="object-cover transition-transform duration-700 md:group-hover:scale-105 grayscale md:group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 600px"
                draggable={false}
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 md:group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-sm tracking-widest uppercase opacity-0 md:group-hover:opacity-100 transform translate-y-4 md:group-hover:translate-y-0 transition-all duration-500">
                  Espandi
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Lightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
};

