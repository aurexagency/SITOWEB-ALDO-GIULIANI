import React from 'react';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Marquee } from '@/components/Marquee';
import { Button } from '@/components/Button';

// Mock data for services
const servicesData: Record<string, { title: string, subtitle: string, description: string, images: string[], mainImage: string, tagline?: string }> = {
  matrimoni: {
    title: 'Matrimoni',
    subtitle: 'L\'eleganza del vostro giorno più bello',
    description: 'Un racconto per immagini che cattura l\'essenza del vostro amore, unendo la spontaneità del reportage all\'eleganza della fotografia di moda.',
    tagline: 'Esclusivamente in Bianco e Nero',
    images: [
      '/Matrimoni/DSC_0022.jpg',
      '/Matrimoni/DSC_0044.jpg',
      '/Matrimoni/DSC_0060.jpg',
      '/Matrimoni/DSC_0081.jpg',
      '/Matrimoni/DSC_0138.jpg',
      '/Matrimoni/DSC_0192.jpg',
      '/Matrimoni/DSC_0350.jpg',
      '/Matrimoni/DSC_0359.jpg',
      '/Matrimoni/DSC_0415.jpg',
      '/Matrimoni/DSC_0494.jpg',
      '/Matrimoni/DSC_0530.jpg',
      '/Matrimoni/DSC_0664.jpg',
      '/Matrimoni/DSC_0846.jpg',
      '/Matrimoni/DSC_9223.jpg',
      '/Matrimoni/DSC_9248.jpg',
      '/Matrimoni/DSC_9290.jpg',
      '/Matrimoni/DSC_9379.jpg',
      '/Matrimoni/DSC_9419.jpg',
      '/Matrimoni/DSC_9424.jpg',
      '/Matrimoni/DSC_9430.jpg',
      '/Matrimoni/DSC_9446.jpg',
      '/Matrimoni/DSC_9461.jpg',
      '/Matrimoni/DSC_9463.jpg',
      '/Matrimoni/DSC_9486.jpg',
      '/Matrimoni/DSC_9493.jpg',
      '/Matrimoni/DSC_9499.jpg',
      '/Matrimoni/DSC_9535.jpg',
      '/Matrimoni/DSC_9572.jpg',
      '/Matrimoni/DSC_9599.jpg',
      '/Matrimoni/DSC_9601.jpg',
      '/Matrimoni/DSC_9605.jpg',
      '/Matrimoni/DSC_9615.jpg',
      '/Matrimoni/DSC_9641.jpg',
      '/Matrimoni/DSC_9657.jpg',
      '/Matrimoni/DSC_9670.jpg',
      '/Matrimoni/DSC_9683.jpg',
      '/Matrimoni/DSC_9701.jpg',
      '/Matrimoni/DSC_9703.jpg',
      '/Matrimoni/DSC_9719.jpg',
      '/Matrimoni/DSC_9730.jpg',
      '/Matrimoni/DSC_9746.jpg',
      '/Matrimoni/DSC_9747.jpg',
      '/Matrimoni/DSC_9795.jpg',
      '/Matrimoni/DSC_9802.jpg',
      '/Matrimoni/DSC_9822.jpg',
      '/Matrimoni/DSC_9829.jpg',
      '/Matrimoni/DSC_9846.jpg',
      '/Matrimoni/DSC_9882.jpg',
      '/Matrimoni/DSC_9893.jpg',
      '/Matrimoni/DSC_9977.jpg',
      '/Matrimoni/IMG_0042.jpg',
      '/Matrimoni/IMG_0185.jpg',
      '/Matrimoni/IMG_0257.jpg',
      '/Matrimoni/IMG_0442.jpg',
      '/Matrimoni/IMG_0466.jpg',
      '/Matrimoni/IMG_0475.jpg',
      '/Matrimoni/IMG_0487.jpg',
      '/Matrimoni/IMG_0513.jpg',
      '/Matrimoni/IMG_0525.jpg',
      '/Matrimoni/IMG_6524.jpg',
      '/Matrimoni/IMG_6539.jpg',
      '/Matrimoni/IMG_6604.jpg',
      '/Matrimoni/IMG_6678.jpg',
      '/Matrimoni/IMG_6778.jpg',
      '/Matrimoni/IMG_6887.jpg',
      '/Matrimoni/IMG_6902.jpg',
      '/Matrimoni/IMG_6921.jpg',
      '/Matrimoni/IMG_6935.jpg',
      '/Matrimoni/IMG_6951.jpg',
      '/Matrimoni/IMG_6972.jpg',
      '/Matrimoni/IMG_6994.jpg',
      '/Matrimoni/IMG_6995.jpg',
      '/Matrimoni/IMG_7002.jpg',
      '/Matrimoni/IMG_7025.jpg',
      '/Matrimoni/IMG_7040.jpg',
      '/Matrimoni/IMG_7048.jpg',
      '/Matrimoni/IMG_7144.jpg',
      '/Matrimoni/IMG_7155.jpg',
      '/Matrimoni/IMG_7165.jpg',
      '/Matrimoni/IMG_7211.jpg',
      '/Matrimoni/IMG_7253.jpg',
      '/Matrimoni/IMG_7327.jpg',
      '/Matrimoni/IMG_7338.jpg',
      '/Matrimoni/IMG_7339.jpg',
      '/Matrimoni/IMG_7341.jpg',
      '/Matrimoni/IMG_7390.jpg',
      '/Matrimoni/IMG_7397.jpg',
      '/Matrimoni/IMG_7419.jpg',
      '/Matrimoni/IMG_7426.jpg',
      '/Matrimoni/IMG_7452.jpg',
      '/Matrimoni/IMG_9942.jpg',
      '/Matrimoni/IMG_9996.jpg',
      '/Matrimoni/_DSC3183.jpg',
      '/Matrimoni/_DSC3250.jpg',
      '/Matrimoni/_DSC3268.jpg',
      '/Matrimoni/_DSC3276.jpg',
      '/Matrimoni/_DSC3369.jpg',
      '/Matrimoni/_DSC3372.jpg',
      '/Matrimoni/_DSC3410.jpg',
      '/Matrimoni/_DSC3416.jpg',
      '/Matrimoni/_DSC3431.jpg',
      '/Matrimoni/_DSC3569.jpg',
      '/Matrimoni/_DSC3627.jpg',
      '/Matrimoni/_DSC3701.jpg',
      '/Matrimoni/_DSC3707.jpg',
      '/Matrimoni/_DSC3727.jpg',
      '/Matrimoni/_DSC3795.jpg',
      '/Matrimoni/_DSC3863.jpg',
      '/Matrimoni/_DSC3908.jpg',
      '/Matrimoni/_DSC3932.jpg',
      '/Matrimoni/_DSC4050.jpg',
      '/Matrimoni/_DSC4113.jpg',
      '/Matrimoni/_DSC4129.jpg',
      '/Matrimoni/_DSC4160.jpg',
      '/Matrimoni/_DSC4186.jpg',
      '/Matrimoni/_DSC4201.jpg',
      '/Matrimoni/_DSC4218.jpg',
      '/Matrimoni/_DSC4279.jpg',
      '/Matrimoni/_DSC4299.jpg',
      '/Matrimoni/_DSC4315.jpg',
      '/Matrimoni/_DSC4443.jpg',
      '/Matrimoni/_DSC4532.jpg',
      '/Matrimoni/_DSC4541.jpg',
      '/Matrimoni/_DSC4653.jpg',
      '/Matrimoni/_DSC4669.jpg',
      '/Matrimoni/_DSC4685.jpg',
      '/Matrimoni/_DSC4688.jpg',
      '/Matrimoni/_DSC4734.jpg',
      '/Matrimoni/_DSC4746.jpg',
      '/Matrimoni/_DSC4773.jpg',
      '/Matrimoni/_DSC4800.jpg',
      '/Matrimoni/_DSC4809.jpg',
      '/Matrimoni/_DSC4885.jpg',
      '/Matrimoni/_DSC4896.jpg',
      '/Matrimoni/_DSC4941.jpg',
      '/Matrimoni/_DSC4992.jpg',
      '/Matrimoni/_DSC5210.jpg',
      '/Matrimoni/_DSC5251.jpg',
      '/Matrimoni/_DSC5296.jpg',
      '/Matrimoni/_DSC5516.jpg',
      '/Matrimoni/_DSC5531.jpg',
      '/Matrimoni/_DSC5761.jpg',
      '/Matrimoni/_DSC5927.jpg',
      '/Matrimoni/_DSC5940.jpg',
      '/Matrimoni/_DSC5958.jpg',
      '/Matrimoni/_DSC6247.jpg',
      '/Matrimoni/_DSC6337.jpg'
    ],
    mainImage: '/Matrimoni/Caschet.jpg'
  },
  moda: {
    title: ' portrait ',
    subtitle: 'Estetica e precisione',
    description: 'Campagne pubblicitarie ed editoriali curati in ogni dettaglio, dove la luce scolpisce forme e texture per un impatto visivo senza compromessi.',
    images: [
      '/Moda/IMG_4935.jpg',
      '/Moda/IMG_4936.jpg',
      '/Moda/IMG_4939.jpg',
      '/Moda/IMG_4941.jpg',
      '/Moda/IMG_4944.jpg',
      '/Moda/IMG_4945.jpg',
      '/Moda/IMG_4952.jpg',
      '/Moda/IMG_4954.jpg',
      '/Moda/IMG_4959.jpg',
      '/Moda/IMG_4960.jpg',
      '/Moda/IMG_4961.jpg',
      '/Moda/IMG_4964.jpg'
    ],
    mainImage: '/Moda/IMG_4935.jpg'
  },
  petphoto: {
    title: 'Pet Photo',
    subtitle: 'L\'anima del tuo compagno di vita',
    description: 'Ritratti autentici e pieni di personalità per immortalare il carattere unico del tuo animale domestico. Ogni scatto racconta un legame speciale, con la stessa cura e attenzione riservata ai servizi di alta moda.',
    images: [
      '/Pet%20Photography/01.jpg',
      '/Pet%20Photography/01Web%202.jpg',
      '/Pet%20Photography/01Web.jpg',
      '/Pet%20Photography/02.jpg',
      '/Pet%20Photography/02Web.jpg',
      '/Pet%20Photography/03Web%202.jpg',
      '/Pet%20Photography/03Web%203.jpg',
      '/Pet%20Photography/03Web%204.jpg',
      '/Pet%20Photography/03Web.jpg',
      '/Pet%20Photography/05Web%202.jpg',
      '/Pet%20Photography/05Web.jpg',
      '/Pet%20Photography/Hope02Web.jpg',
      '/Pet%20Photography/Leonida01Web.jpg',
      '/Pet%20Photography/Xena01Web.jpg',
    ],
    mainImage: '/Pet%20Photography/01Web.jpg'
  },
  sport: {
    title: 'Sport',
    subtitle: 'Dinamismo e potenza',
    description: 'Catturare l\'attimo di massima tensione, lo sforzo e la vittoria. Fotografia sportiva che esalta il gesto atletico con stile editoriale.',
    images: ['/Sport/Atletica01.jpg', '/Sport/Atletica02.jpg', '/Sport/Atletica03.jpg', '/Sport/Atletica04.jpg', '/Sport/Basket02.jpg', '/Sport/Basket03.jpg', '/Sport/BeachVolley01.jpg', '/Sport/BeachVolley02.jpg', '/Sport/BeachVolley03.jpg', '/Sport/Boxe01.jpg', '/Sport/Boxe02.jpg', '/Sport/Boxe03.jpg', '/Sport/Boxe04.jpg', '/Sport/Calcio01.jpg', '/Sport/Calcio02.jpg', '/Sport/Calcio03.jpg', '/Sport/Calcio04.jpg', '/Sport/Calcio05.jpg', '/Sport/Calcio06.jpg', '/Sport/Calcio07.jpg', '/Sport/Vela01.jpg', '/Sport/Vela02.jpg', '/Sport/Vela03.jpg', '/Sport/Vela04.jpg', '/Sport/Vela05.jpg'],
    mainImage: '/Sport/Basket01.jpg'
  },
  wildlife: {
    title: 'WildLife',
    subtitle: 'L\'anima della natura',
    description: 'Esplorare il mondo selvaggio per immortalare la grandezza della natura incontaminata, con uno stile profondo, drammatico e lussuoso.',
    images: [
      '/WildLife/Alce.jpg',
      '/WildLife/Aquila%20Coda%20Bianca.jpg',
      '/WildLife/Civetta.jpg',
      '/WildLife/Fenicottero.jpg',
      '/WildLife/Ibis%20Eremita.jpg',
      '/WildLife/Langoon.jpg',
      '/WildLife/Leone.jpg',
      '/WildLife/Leopardo.jpg',
      '/WildLife/Linci.jpg',
      '/WildLife/Lupo.jpg',
      '/WildLife/Orso.jpg',
      '/WildLife/Pellicano%20Riccio.jpg',
      '/WildLife/Tigre.jpg',
      '/WildLife/Volpe.jpg',
    ],
    mainImage: '/WildLife/Leone.jpg'
  }
};

export default async function ServicePage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const service = servicesData[params.slug];

  if (!service) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[var(--background)]">
      {/* Service Hero */}
      <section data-nav-transparent="true" className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden">
        <Image
          src={service.mainImage}
          alt={service.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center px-6 mt-16">
          <h1 className="font-serif text-5xl md:text-7xl text-white mb-6">
            {service.title}
          </h1>
          <p className="text-base md:text-lg tracking-[0.4em] uppercase text-white mb-8 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            {service.subtitle}
          </p>
        </div>
      </section>

      {/* Service Description */}
      <section className="py-24 px-6 md:px-12 max-w-4xl mx-auto text-center">
        <p className="text-xl md:text-2xl font-serif leading-relaxed text-[var(--foreground)]">
          {service.description}
        </p>
        {service.tagline && (
          <div className="mt-12 text-center leading-none">
            <p className="font-serif text-xl md:text-2xl tracking-widest text-[var(--champagne)] uppercase mb-2">Esclusivamente in</p>
            <p className="font-serif text-5xl md:text-7xl tracking-widest text-[var(--champagne)] uppercase leading-tight">Bianco e Nero</p>
          </div>
        )}
      </section>

      {/* Marquee Gallery as requested in Task 1 */}
      <section className="py-12 bg-[var(--background)]">
        <div className="text-center mb-12">
          <h2 className="text-sm tracking-[0.3em] uppercase text-[var(--champagne)]">Galleria</h2>
        </div>
        <Marquee images={service.images} duration={640} />
      </section>

      {/* Call to Action for the specific service */}
      <section className="py-32 bg-[var(--foreground)] text-center px-6">
        <h2 className="font-serif text-4xl text-white mb-8">Vuoi raccontare la tua storia?</h2>
        <Button variant="primary" className="border-white text-white hover:bg-white hover:text-[var(--foreground)]">
          Preventivo {service.title}
        </Button>
      </section>
    </main>
  );
}
