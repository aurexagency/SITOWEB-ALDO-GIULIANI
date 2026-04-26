'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // If the Navbar intersects with any of the transparent triggers, it should be transparent (isScrolled = false)
        const isIntersecting = entries.some((entry) => entry.isIntersecting);
        setIsScrolled(!isIntersecting);
      },
      {
        rootMargin: '-50px 0px 0px 0px', // Trigger slightly below the top to give a bit of leeway
      }
    );

    const elements = document.querySelectorAll('[data-nav-transparent="true"]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Matrimoni', href: '/servizi/matrimoni' },
    { name: 'Moda', href: '/servizi/moda' },
    { name: 'Pet Photo', href: '/servizi/petphoto' },
    { name: 'Sport', href: '/servizi/sport' },
    { name: 'WildLife', href: '/servizi/wildlife' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-[var(--background)]/90 backdrop-blur-md py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        <Link href="/" className="relative h-12 w-32 flex items-center">
          <Image 
            src="/logo.png.png" 
            alt="Aldo Giuliani Logo" 
            fill
            className={`object-contain transition-opacity duration-300 ${pathname === '/' && !isScrolled ? 'opacity-100 brightness-0 invert' : 'opacity-100'}`}
          />
        </Link>
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-sm tracking-widest uppercase transition-colors hover:text-[var(--champagne)] ${pathname === link.href ? 'text-[var(--champagne)] font-medium' : (pathname === '/' && !isScrolled ? 'text-white/80' : 'text-[var(--foreground)]/80')}`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};
