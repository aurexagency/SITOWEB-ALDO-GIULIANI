'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Lightbox } from './Lightbox';

export const MyStyle: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <section className="w-full bg-[var(--background)] py-32">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-16 mb-32">
            <div className="md:w-1/2">
              <h2 className="text-sm tracking-[0.3em] uppercase text-[var(--champagne)] mb-6">Il mio Stile</h2>
              <p className="font-serif text-3xl md:text-5xl leading-tight text-[var(--foreground)]">
                La fotografia è l'arte di trattenere il respiro mentre tutte le tue facoltà convergono.
              </p>
            </div>
            <div className="md:w-1/2">
              <p className="text-lg text-gray-600 leading-relaxed max-w-lg">
                Catturare un istante significa preservarne l'essenza. Il mio approccio combina la spontaneità del reportage con l'eleganza della moda, creando ricordi senza tempo.
              </p>
            </div>
          </div>
        </div>

        <div 
          className="w-full h-[70vh] relative mb-32 cursor-pointer group overflow-hidden"
          onClick={() => setSelectedImage("/Home/il%20mio%20stile%202.jpg")}
        >
          <Image
            src="/Home/il%20mio%20stile%202.jpg"
            alt="Editorial style photography"
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-105"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
            <span className="text-white text-sm tracking-widest uppercase">Espandi</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16">
            <div 
              className="md:w-1/2 relative h-[80vh] w-full cursor-pointer group overflow-hidden"
              onClick={() => setSelectedImage("/Home/Leone.jpg")}
            >
              <Image
                src="/Home/Leone.jpg"
                alt="Reportage style photography"
                fill
                className="object-cover grayscale transition-all duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <span className="text-white text-sm tracking-widest uppercase">Espandi</span>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h3 className="font-serif text-4xl mb-8 text-[var(--foreground)]">
                Eleganza & Autenticità
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed mb-12">
                Non mi limito a documentare un evento. Racconto una storia attraverso luci, ombre e sguardi rubati. Ogni scatto è un'opera a sé, pensata per durare per sempre.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Lightbox src={selectedImage} onClose={() => setSelectedImage(null)} />
    </>
  );
};
