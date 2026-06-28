import { useEffect, useState } from 'react';
import { ArrowRight, Clock, MapPin, X } from 'lucide-react';

type Destination = {
  id: string;
  name: string;
  era: string;
  tagline: string;
  description: string;
  image: string;
  highlights: string[];
  year: string;
};

const DESTINATIONS: Destination[] = [
  {
    id: 'paris-1889',
    name: 'Paris 1889',
    era: 'Belle Époque',
    tagline:
      "Tour Eiffel toute neuve, Exposition Universelle, élégance et effervescence urbaine.",
    description:
      "Plongez dans le Paris de la Belle Époque, à l'aube de l'Exposition Universelle de 1889. Contemplez une Tour Eiffel fraîchement érigée, encore controversée par les artistes de l'époque. Promenez-vous sur les Grands Boulevards, assistez aux premières projections des frères Lumière, et savourez l'effervescence d'une capitale qui redéfinit l'élégance moderne. Un séjour orchestré par nos concierges temporels, entre cabarets, ateliers d'artistes et salons mondains.",
    image:
      'https://res.cloudinary.com/dndvxzqkn/image/upload/v1782665248/ChatGPT_Image_28_juin_2026_18_38_49_ada6nb.png',
    highlights: ['Exposition Universelle', 'Tour Eiffel neuve', 'Cabarets & salons'],
    year: '1889',
  },
  {
    id: 'cretace',
    name: 'Crétacé -65M',
    era: 'Ère des dinosaures',
    tagline:
      'Nature sauvage et préhistorique, faune spectaculaire, aventure absolue.',
    description:
      "Voyagez 65 millions d'années en arrière, au cœur du Crétacé tardif. Observez les derniers grands dinosaures dans leur habitat naturel, des plaines luxuriantes aux rivages tropicaux. Nos bulles d'observation protégées vous garantissent une immersion totale en toute sécurité, face à une faune spectaculaire et des paysages à couper le souffle. L'aventure absolue, pour les voyageurs en quête d'une expérience irréductible à toute autre.",
    image:
      'https://res.cloudinary.com/dndvxzqkn/image/upload/v1782665225/ChatGPT_Image_28_juin_2026_18_41_54_frolat.png',
    highlights: ['Faune préhistorique', 'Paysages tropicaux', "Bulles d'observation"],
    year: '-65 000 000',
  },
  {
    id: 'florence-1504',
    name: 'Florence 1504',
    era: 'Renaissance',
    tagline:
      'Art, Michel-Ange, génie créatif, architecture sublime.',
    description:
      "Assistez à l'âge d'or de la Renaissance florentine. En 1504, Michel-Ange achève son David, symbole d'une ville qui redéfinit l'art occidental. Flânez dans les ateliers des maîtres, contemplez la coupole de Brunelleschi, et respirez l'air d'une époque où le génie créatif et l'architecture sublime se rencontrent à chaque coin de rue. Un voyage culturel d'exception, guidé par nos historiens de l'art.",
    image:
      'https://res.cloudinary.com/dndvxzqkn/image/upload/v1782665222/ChatGPT_Image_28_juin_2026_18_40_06_fipwdl.png',
    highlights: ['Le David de Michel-Ange', 'Coupole du Duomo', 'Ateliers de maîtres'],
    year: '1504',
  },
];

export default function Destinations() {
  const [active, setActive] = useState<Destination | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = active ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <section id="destinations" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <div className="mb-16 text-center md:mb-20">
          <span className="text-xs font-medium uppercase tracking-widest text-gold-300">
            Notre collection
          </span>
          <h2 className="mt-4 font-display text-4xl font-semibold text-stone-50 md:text-5xl lg:text-6xl">
            Nos destinations
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base text-stone-400 md:text-lg">
            Trois époques soigneusement sélectionnées, chacune orchestrée par
            nos concierges temporels pour une immersion sans compromis.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {DESTINATIONS.map((d, i) => (
            <article
              key={d.id}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-ink-800/60 transition-all duration-500 hover:-translate-y-2 hover:scale-[1.03] hover:border-gold-400/70 hover:shadow-[0_20px_60px_-15px_rgba(212,168,56,0.45)]"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Golden glow ring on hover */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 ring-1 ring-gold-400/0 transition-all duration-500 group-hover:opacity-100 group-hover:ring-gold-400/60" />
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={d.image}
                  alt={d.name}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.15]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/30 to-transparent transition-opacity duration-500 group-hover:from-ink-800" />
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full glass px-3 py-1 text-xs font-medium text-gold-200">
                  <Clock className="h-3 w-3" />
                  {d.year}
                </div>
              </div>

              {/* Body */}
              <div className="p-7">
                <span className="text-xs font-medium uppercase tracking-widest text-gold-300">
                  {d.era}
                </span>
                <h3 className="mt-2 font-display text-2xl font-semibold text-stone-50">
                  {d.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-400">
                  {d.tagline}
                </p>

                <button
                  onClick={() => setActive(d)}
                  className="group/btn mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-200 transition-colors hover:text-gold-100"
                >
                  En savoir plus
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </button>
              </div>

              {/* Hover top sheen */}
              <div className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-3xl bg-gradient-to-b from-gold-400/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </article>
          ))}
        </div>
      </div>

      {/* Modal */}
      {active && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center bg-ink-950/80 p-0 backdrop-blur-sm animate-fade-in sm:items-center sm:p-6"
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-2xl overflow-hidden rounded-t-3xl border border-white/10 bg-ink-800 animate-slide-up sm:rounded-3xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 overflow-hidden sm:h-64">
              <img
                src={active.image}
                alt={active.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-800 via-ink-800/40 to-transparent" />
              <button
                onClick={() => setActive(null)}
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full glass text-stone-200 transition-colors hover:text-gold-200"
                aria-label="Fermer"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="absolute bottom-4 left-6">
                <span className="text-xs font-medium uppercase tracking-widest text-gold-300">
                  {active.era}
                </span>
                <h3 className="font-display text-3xl font-semibold text-stone-50">
                  {active.name}
                </h3>
              </div>
            </div>

            <div className="max-h-[55vh] overflow-y-auto p-7">
              <div className="mb-5 flex flex-wrap gap-2">
                {active.highlights.map((h) => (
                  <span
                    key={h}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gold-400/20 bg-gold-400/5 px-3 py-1 text-xs text-gold-200"
                  >
                    <MapPin className="h-3 w-3" />
                    {h}
                  </span>
                ))}
              </div>
              <p className="text-sm leading-relaxed text-stone-300 md:text-base">
                {active.description}
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <button className="flex-1 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 transition-all hover:brightness-110">
                  Réserver ce voyage
                </button>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-stone-300 transition-colors hover:border-gold-400/40 hover:text-gold-200"
                >
                  Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
