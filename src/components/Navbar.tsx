'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const isIntersecting = entries.some((entry) => entry.isIntersecting);
        setIsScrolled(!isIntersecting);
      },
      {
        rootMargin: '-50px 0px 0px 0px',
      }
    );

    const elements = document.querySelectorAll('[data-nav-transparent="true"]');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const links = [
    { name: 'Home', href: '/' },
    { name: 'Matrimoni', href: '/servizi/matrimoni' },
    { name: ' portrait ', href: '/servizi/moda' },
    { name: 'Pet Photo', href: '/servizi/petphoto' },
    { name: 'Sport', href: '/servizi/sport' },
    { name: 'WildLife', href: '/servizi/wildlife' },
  ];

  // La navbar è SEMPRE trasparente — solo il blur e il gradiente cambiano leggermente
  const navBgClass = isMenuOpen
    ? 'bg-transparent py-4'
    : isScrolled
      ? 'bg-black/10 backdrop-blur-md py-4'
      : 'bg-transparent py-6';

  // Testo: bianco con forte drop-shadow per massima leggibilità su qualsiasi sfondo
  const linkColorClass = 'text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]';

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${navBgClass}`}>
        {/* Gradiente permanente che garantisce leggibilità sopra qualsiasi sfondo */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/15 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative z-50">
          <Link href="/" className="relative h-10 w-28 md:h-12 md:w-32 flex items-center">
            <Image 
              src="/logo.png" 
              alt="Aldo Giuliani Logo" 
              fill
              className="object-contain transition-all duration-500 brightness-0 invert drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]"
            />
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-[12px] font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-[1px] hover:text-[var(--champagne)] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] ${pathname === link.href ? 'text-[var(--champagne)]' : 'text-white/95'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden flex flex-col justify-center items-end w-8 h-8 gap-1.5 focus:outline-none z-[60] relative"
            aria-label="Toggle Menu"
          >
            <span className={`h-[1px] bg-white transition-all duration-300 ease-out drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] ${isMenuOpen ? 'w-8 rotate-45 translate-y-[3.5px]' : 'w-8'}`}></span>
            <span className={`h-[1px] bg-white transition-all duration-300 ease-out drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)] ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-[3.5px]' : 'w-5'}`}></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-[var(--background)] z-40 md:hidden transition-all duration-500 ease-in-out overflow-y-auto overscroll-contain ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center min-h-full justify-center px-8 pt-28 pb-12">
          <div className="flex flex-col items-center gap-10 w-full my-auto">
            {links.map((link, index) => (
              <Link 
                key={link.name} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`text-4xl font-serif tracking-[0.2em] uppercase transition-all duration-700 drop-shadow-[0_4px_8px_rgba(0,0,0,0.3)] hover:-translate-y-1 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${pathname === link.href ? 'text-[var(--champagne)]' : 'text-[#1A1A1A] hover:text-[var(--champagne)]'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          
          <div className={`mt-12 pt-8 border-t border-[var(--champagne)]/20 w-full max-w-[180px] flex flex-col items-center gap-4 transition-all duration-700 delay-300 shrink-0 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <p className="text-[10px] tracking-[0.4em] uppercase text-[#1A1A1A]/30 font-light italic">The Eternal Story</p>
          </div>
        </div>
      </div>
    </>
  );
};

