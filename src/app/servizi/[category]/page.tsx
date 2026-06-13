import { notFound } from "next/navigation";
import { Metadata } from "next";
import { servicesSeo, isValidServiceCategory } from "@/config/servicesSeo";
import Link from "next/link";
import { Button } from "@/components/Button";

type Props = {
  params: Promise<{ category: string }>;
};

// SSG: Genera staticamente le rotte in fase di build
export async function generateStaticParams() {
  return Object.keys(servicesSeo).map((category) => ({
    category,
  }));
}

// Meta tag dinamici basati sulla categoria per la SEO locale
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const { category } = resolvedParams;

  if (!isValidServiceCategory(category)) {
    return {
      title: "Servizio Non Trovato | Aldo Giuliani",
    };
  }

  const seoData = servicesSeo[category];

  return {
    title: seoData.title,
    description: seoData.description,
    openGraph: {
      title: seoData.title,
      description: seoData.description,
      type: "website",
      url: `https://aldogiuliani.it/servizi/${category}`,
    },
    alternates: {
      canonical: `https://aldogiuliani.it/servizi/${category}`,
    },
  };
}

export default async function ServiceCategoryPage({ params }: Props) {
  // In Next.js 16+ con React 19, `params` è una Promise e deve essere risolta
  const resolvedParams = await params;
  const { category } = resolvedParams;

  // Se lo slug non corrisponde a nessuna categoria in configurazione, restituisce 404
  if (!isValidServiceCategory(category)) {
    notFound();
  }

  const seoData = servicesSeo[category];

  // Schema.org BreadcrumbList locale per questa specifica pagina
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://aldogiuliani.it"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Servizi",
        "item": "https://aldogiuliani.it/servizi" // Assumendo che esista una root, o comunque semanticamente corretta
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": seoData.h1,
        "item": `https://aldogiuliani.it/servizi/${category}`
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      
      <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)] pt-32 pb-24 px-6 flex flex-col items-center">
        
        {/* Intestazione della pagina servizio */}
        <div className="max-w-4xl text-center flex flex-col items-center gap-6 mt-12 mb-20 animate-fade-in">
          <span className="text-[var(--champagne)] uppercase tracking-[0.2em] text-sm font-medium">
            Servizi • {category}
          </span>
          
          <h1 className="font-serif text-4xl md:text-6xl text-white tracking-tight drop-shadow-md">
            {seoData.h1}
          </h1>
          
          <div className="w-12 h-[1px] bg-[var(--champagne)] my-4 opacity-50"></div>
          
          <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto tracking-wide">
            {seoData.concept}
          </p>
        </div>

        {/* Qui andrà eventualmente la galleria o altri dettagli. */}
        <div className="w-full max-w-6xl min-h-[40vh] border border-white/5 rounded-2xl bg-white/5 flex items-center justify-center p-8 mb-24 backdrop-blur-sm">
          <p className="text-gray-400 font-light italic">
            [ Galleria portfolio specifica per {category} ]
          </p>
        </div>

        {/* CTA */}
        <section className="text-center mt-12">
          <h2 className="font-serif text-3xl text-white mb-8">Racconta la tua storia</h2>
          <Link href={`/preventivo?service=${category}`}>
            <Button
              variant="outline"
              className="border-[var(--champagne)] text-[var(--champagne)] bg-black/20 hover:bg-[var(--champagne)] hover:text-black hover:scale-105 duration-500 shadow-lg shadow-[rgba(197,160,89,0.1)] px-10 py-4"
            >
              CHIEDI UN PREVENTIVO
            </Button>
          </Link>
        </section>
      </main>
    </>
  );
}
