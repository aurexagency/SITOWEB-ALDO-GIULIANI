'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const SERVICE_MAP: Record<string, string> = {
  matrimoni: 'Matrimoni',
  moda: 'Portrait',
  petphoto: 'Pet Photo',
  sport: 'Sport',
  wildlife: 'WildLife',
};

const SERVICES = ['Matrimoni', 'Portrait', 'Pet Photo', 'Sport', 'WildLife'];
const SOURCES = ['Instagram', 'Passaparola', 'Google', 'Altro'];

const inputClass =
  'w-full bg-[#1A1A1A] border-b border-white/15 focus:border-[var(--champagne)] text-white placeholder:text-white/25 py-3 outline-none transition-all duration-500 font-light tracking-wide text-sm';
const selectClass =
  'w-full bg-[#1A1A1A] border-b border-white/15 focus:border-[var(--champagne)] text-white py-3 outline-none transition-all duration-500 font-light tracking-wide text-sm cursor-pointer appearance-none';
const labelClass =
  'block text-[10px] tracking-[0.35em] uppercase text-white/35 mb-2 font-light';


export function PreventivoBrief() {
  const searchParams = useSearchParams();
  const [animate, setAnimate] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefono: '',
    servizio: '',
    data: '',
    luogo: '',
    visione: '',
    fonte: '',
  });

  useEffect(() => {
    // Force the body (which is white by default) to be dark on this page
    const prevBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#1A1A1A';
    document.documentElement.style.backgroundColor = '#1A1A1A';

    const slug = searchParams.get('servizio');
    if (slug && SERVICE_MAP[slug]) {
      setFormData((prev) => ({ ...prev, servizio: SERVICE_MAP[slug] }));
    }
    const timer = setTimeout(() => setAnimate(true), 120);
    return () => {
      clearTimeout(timer);
      document.body.style.backgroundColor = prevBg;
      document.documentElement.style.backgroundColor = '';
    };
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  /* ─────────────────────────────────────────────────────── Confirmation */
  if (submitted) {
    return (
      <main className="flex-1 bg-[#1A1A1A] flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          {/* vertical gold ornament – top */}
          <div className="w-[1px] h-20 bg-gradient-to-b from-transparent via-[var(--champagne)] to-transparent mx-auto mb-12 opacity-60" />

          <p
            className="text-[9px] tracking-[0.6em] uppercase text-[var(--champagne)] mb-8"
            style={{ letterSpacing: '0.5em' }}
          >
            Messaggio Ricevuto
          </p>

          <h1 className="font-serif text-4xl md:text-5xl text-white mb-8 leading-tight">
            Grazie, la tua storia<br />è nelle mie mani.
          </h1>

          <p className="text-white/40 text-sm leading-relaxed tracking-wide mb-14 font-light">
            Ho ricevuto la tua richiesta. Ti risponderò entro 24 ore per iniziare
            a costruire insieme qualcosa di indimenticabile.
          </p>

          <Link
            href="/"
            className="text-[10px] tracking-[0.45em] uppercase text-[var(--champagne)] border-b border-[var(--champagne)]/30 pb-1 hover:border-[var(--champagne)] transition-all duration-300"
          >
            Torna alla Home
          </Link>

          {/* vertical gold ornament – bottom */}
          <div className="w-[1px] h-20 bg-gradient-to-b from-[var(--champagne)] to-transparent mx-auto mt-12 opacity-40" />
        </div>
      </main>
    );
  }

  /* ─────────────────────────────────────────────────────── Main Form */
  return (
    <main className="flex-1 bg-[#1A1A1A]">

      {/* ── Hero Header */}
      <section className="pt-40 pb-16 px-6 text-center border-b border-white/5 relative overflow-hidden">
        {/* Subtle background texture gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(197,160,89,0.04)_0%,_transparent_65%)] pointer-events-none" />

        <p
          className={`text-[9px] tracking-[0.65em] uppercase text-[var(--champagne)] mb-7 transition-all duration-[1400ms] ease-out ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {formData.servizio
            ? `Preventivo — ${formData.servizio}`
            : 'Chiedi un Preventivo'}
        </p>

        <h1
          className={`font-serif text-5xl md:text-7xl text-white mb-6 leading-tight transition-all duration-[1400ms] ease-out delay-100 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Raccontami<br />la tua storia.
        </h1>

        <p
          className={`text-white/35 text-sm tracking-wide max-w-sm mx-auto font-light leading-relaxed transition-all duration-[1400ms] ease-out delay-200 ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Ogni grande fotografia nasce da un dialogo.<br />
          Dimmi chi sei, cosa vuoi preservare per sempre.
        </p>

        {/* Gold ornamental divider */}
        <div
          className={`mt-14 flex items-center justify-center gap-5 transition-all duration-[1400ms] ease-out delay-300 ${
            animate ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[var(--champagne)]/30" />
          <div className="w-[3px] h-[3px] rounded-full bg-[var(--champagne)]/50" />
          <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[var(--champagne)]/30" />
        </div>
      </section>

      {/* ── Form */}
      <section className="bg-[#1A1A1A] py-20 px-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col gap-12">

          {/* Row 1: Nome + Email */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-10 transition-all duration-[1000ms] delay-[400ms] ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div>
              <label htmlFor="nome" className={labelClass}>
                Nome e Cognome <span className="text-[var(--champagne)]">*</span>
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                value={formData.nome}
                onChange={handleChange}
                placeholder="Mario Rossi"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email <span className="text-[var(--champagne)]">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="mario@example.com"
                className={inputClass}
              />
            </div>
          </div>

          {/* Row 2: Telefono + Servizio */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-10 transition-all duration-[1000ms] delay-[500ms] ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div>
              <label htmlFor="telefono" className={labelClass}>Telefono</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="+39 333 000 0000"
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="servizio" className={labelClass}>
                Tipo di Servizio <span className="text-[var(--champagne)]">*</span>
              </label>
              <select
                id="servizio"
                name="servizio"
                required
                value={formData.servizio}
                onChange={handleChange}
                className={selectClass}
                style={{ backgroundImage: 'none' }}
              >
                <option value="" disabled className="bg-[#1A1A1A] text-white/40">
                  Seleziona…
                </option>
                {SERVICES.map((s) => (
                  <option key={s} value={s} className="bg-[#1A1A1A] text-white">
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 3: Data + Luogo */}
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-10 transition-all duration-[1000ms] delay-[600ms] ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div>
              <label htmlFor="data" className={labelClass}>Data dell'Evento</label>
              <input
                type="date"
                id="data"
                name="data"
                value={formData.data}
                onChange={handleChange}
                className={`${inputClass} [color-scheme:dark]`}
                style={{ colorScheme: 'dark' }}
              />
            </div>
            <div>
              <label htmlFor="luogo" className={labelClass}>Luogo / Città</label>
              <input
                type="text"
                id="luogo"
                name="luogo"
                value={formData.luogo}
                onChange={handleChange}
                placeholder="Roma, Italia"
                className={inputClass}
              />
            </div>
          </div>

          {/* Textarea: Visione */}
          <div
            className={`transition-all duration-[1000ms] delay-[700ms] ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <label htmlFor="visione" className={labelClass}>Racconta la tua visione</label>
            <textarea
              id="visione"
              name="visione"
              rows={5}
              value={formData.visione}
              onChange={handleChange}
              placeholder="Descrivi il tuo progetto, le emozioni che vuoi catturare, i dettagli che contano per te…"
              className="w-full bg-[#1A1A1A] resize-none border border-white/10 focus:border-[var(--champagne)] text-white placeholder:text-white/25 px-4 py-4 outline-none transition-all duration-500 font-light tracking-wide text-sm"
            />
          </div>

          {/* Come ci hai conosciuto – radio pills */}
          <div
            className={`transition-all duration-[1000ms] delay-[800ms] ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <label className={`${labelClass} mb-5`}>
              Come ci hai conosciuto?
            </label>
            <div className="flex flex-wrap gap-3">
              {SOURCES.map((source) => (
                <label
                  key={source}
                  className="flex items-center gap-2 cursor-pointer group select-none"
                >
                  <input
                    type="radio"
                    name="fonte"
                    value={source}
                    checked={formData.fonte === source}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span
                    className={`flex items-center justify-center w-3.5 h-3.5 rounded-full border transition-all duration-300 shrink-0 ${
                      formData.fonte === source
                        ? 'border-[var(--champagne)] bg-[var(--champagne)]'
                        : 'border-white/20 group-hover:border-[var(--champagne)]/40'
                    }`}
                  >
                    {formData.fonte === source && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#1A1A1A]" />
                    )}
                  </span>
                  <span
                    className={`text-[10px] tracking-[0.35em] uppercase transition-colors duration-300 ${
                      formData.fonte === source
                        ? 'text-[var(--champagne)]'
                        : 'text-white/35 group-hover:text-white/55'
                    }`}
                  >
                    {source}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* ── Submit */}
          <div
            className={`pt-6 pb-10 text-center transition-all duration-[1000ms] delay-[900ms] ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Divider */}
            <div className="flex items-center justify-center gap-5 mb-12">
              <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-[var(--champagne)]/25" />
              <div className="w-[3px] h-[3px] rounded-full bg-[var(--champagne)]/40" />
              <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-[var(--champagne)]/25" />
            </div>

            <button
              type="button"
              disabled
              className="px-14 py-4 border border-white/15 text-white/25 text-[11px] tracking-[0.45em] uppercase font-medium bg-transparent cursor-not-allowed"
            >
              Invia la Richiesta
            </button>

            <p className="mt-4 text-[9px] text-white/20 tracking-[0.35em] uppercase font-light">
              Configurazione invio in corso…
            </p>
          </div>

        </form>
      </section>
    </main>
  );
}
