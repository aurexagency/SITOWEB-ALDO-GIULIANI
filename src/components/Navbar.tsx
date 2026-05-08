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
    { name: 'Moda', href: '/servizi/moda' },
    { name: 'Pet Photo', href: '/servizi/petphoto' },
    { name: 'Sport', href: '/servizi/sport' },
    { name: 'WildLife', href: '/servizi/wildlife' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled || isMenuOpen ? 'bg-[var(--background)]/90 backdrop-blur-xl py-4 shadow-sm' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between relative z-50">
        <Link href="/" className="relative h-10 w-28 md:h-12 md:w-32 flex items-center">
          <Image 
            src="/logo.png" 
            alt="Aldo Giuliani Logo" 
            fill
            className={`object-contain transition-all duration-500 ${pathname === '/' && !isScrolled && !isMenuOpen ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className={`text-[10px] tracking-[0.2em] uppercase transition-all duration-300 hover:text-[var(--champagne)] ${pathname === link.href ? 'text-[var(--champagne)]' : (pathname === '/' && !isScrolled ? 'text-white/70' : 'text-[var(--foreground)]/70')}`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden flex flex-col justify-center items-end w-8 h-8 gap-1.5 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span className={`h-[1px] bg-current transition-all duration-300 ease-out ${isMenuOpen ? 'w-8 rotate-45 translate-y-[3.5px]' : 'w-8'} ${pathname === '/' && !isScrolled && !isMenuOpen ? 'bg-white' : 'bg-[var(--foreground)]'}`}></span>
          <span className={`h-[1px] bg-current transition-all duration-300 ease-out ${isMenuOpen ? 'w-8 -rotate-45 -translate-y-[3.5px]' : 'w-5'} ${pathname === '/' && !isScrolled && !isMenuOpen ? 'bg-white' : 'bg-[var(--foreground)]'}`}></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-40 md:hidden transition-all duration-500 ease-in-out overflow-y-auto overscroll-contain ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div className="flex flex-col items-center min-h-full justify-center px-8 pt-28 pb-12">
          <div className="flex flex-col items-center gap-10 w-full my-auto">
            {links.map((link, index) => (
              <Link 
                key={link.name} 
                href={link.href}
                style={{ transitionDelay: `${index * 50}ms` }}
                className={`text-3xl font-serif tracking-[0.2em] uppercase transition-all duration-700 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} ${pathname === link.href ? 'text-[var(--champagne)]' : 'text-[#1A1A1A]'}`}
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
    </nav>
  );
};

