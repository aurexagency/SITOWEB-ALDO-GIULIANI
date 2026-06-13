export type ServiceCategory = "matrimoni" | "moda" | "sport" | "wildlife" | "petphoto";

export interface ServiceSeoConfig {
  title: string;
  description: string;
  h1: string;
  concept: string;
}

export const servicesSeo: Record<ServiceCategory, ServiceSeoConfig> = {
  matrimoni: {
    title: "Fotografo Matrimoni Firenze & Forte dei Marmi | Aldo Giuliani",
    description: "Servizi fotografici di lusso per matrimoni in Toscana, Firenze e Roma. Il reportage matrimoniale d'autore firmato Aldo Giuliani, luce naturale e alta moda.",
    h1: "L'Eternità in un Istante",
    concept: "Un reportage matrimoniale che trascende il tempo. Luce naturale, estetica da alta moda e narrazione spontanea per il tuo destination wedding in Toscana, Firenze, Forte dei Marmi o Roma.",
  },
  moda: {
    title: "Fotografo Moda & Portrait Milano e Roma | Aldo Giuliani",
    description: "Shooting editoriali di alta moda e ritratti d'autore a Milano e Roma. Aldo Giuliani esalta l'eleganza con un'estetica minimale ed essenziale.",
    h1: "Estetica dell'Essenziale",
    concept: "La moda non è solo abito, è attitudine. Ritratti editoriali e campagne fashion a Milano e Roma, dove l'eleganza incontra il rigore visivo e la purezza della forma.",
  },
  sport: {
    title: "Fotografo Sport e Motorsport in Italia | Aldo Giuliani",
    description: "Fotografia sportiva d'élite e motorsport in tutta Italia. Dinamismo, azione e narrazione visiva per eventi esclusivi e atleti professionisti.",
    h1: "L'Azione Diventa Arte",
    concept: "Cogliere l'apice del movimento. Dall'adrenalina del motorsport all'eleganza degli eventi sportivi esclusivi, un racconto visivo che celebra la potenza e la dedizione in tutta Italia.",
  },
  wildlife: {
    title: "Fotografo Wildlife Internazionale | Aldo Giuliani Reportage",
    description: "Reportage naturalistico d'autore in tutto il mondo. Fotografia wildlife internazionale firmata Aldo Giuliani, un omaggio silenzioso alla bellezza della natura.",
    h1: "Il Respiro del Selvaggio",
    concept: "Testimoni discreti della natura incontaminata. Un reportage wildlife internazionale che cattura l'anima pura degli animali nel loro habitat, con rispetto e sublime meraviglia.",
  },
  petphoto: {
    title: "Fotografo Animali Domestici Grosseto & Toscana | Aldo Giuliani",
    description: "Ritratti artistici e di lusso per animali domestici a Grosseto e in Toscana. Celebra il legame speciale con il tuo pet attraverso scatti d'autore.",
    h1: "Nobiltà a Quattro Zampe",
    concept: "Non semplici fotografie, ma veri e propri ritratti d'autore per i vostri compagni di vita. A Grosseto e in Toscana, immortaliamo la bellezza e l'anima del tuo pet con un tocco luxury e artistico.",
  },
};

export const isValidServiceCategory = (category: string): category is ServiceCategory => {
  return category in servicesSeo;
};
