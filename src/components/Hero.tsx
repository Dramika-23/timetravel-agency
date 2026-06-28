import { ChevronDown, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section
      id="accueil"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <img
          src="https://res.cloudinary.com/dndvxzqkn/image/upload/v1782665248/ChatGPT_Image_28_juin_2026_18_38_49_ada6nb.png"
          alt=""
          aria-hidden="true"
          loading="lazy"
          className="h-full w-full object-cover"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-ink-950/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-950/60 via-ink-950/50 to-ink-950/90" />
        {/* Subtle starfield / temporal grid */}
        <div
          className="absolute inset-0 opacity-[0.10]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(212,168,56,0.5) 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Deep vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,#050506_85%)]" />
        {/* Glow */}
        <div className="absolute left-1/2 top-1/3 h-[44rem] w-[44rem] -translate-x-1/2 rounded-full bg-gold-500/10 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="mb-8 inline-flex animate-fade-in items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gold-200">
          <Sparkles className="h-3.5 w-3.5" />
          Voyages temporels d'exception
        </div>

        <h1 className="animate-fade-up font-display text-6xl font-semibold leading-[1.02] text-stone-50 sm:text-7xl md:text-8xl lg:text-9xl">
          Voyagez à travers
          <br />
          <span className="text-gradient-gold italic">le temps</span>
        </h1>

        <p
          className="mx-auto mt-8 max-w-2xl animate-fade-up text-base leading-relaxed text-stone-300 sm:text-lg md:text-xl"
          style={{ animationDelay: '0.15s' }}
        >
          TimeTravel Agency vous ouvre les portes des époques les plus
          convoitées. Un service de conciergerie temporelle de luxe, où chaque
          saut dans le temps est orchestré avec une élégance absolue.
        </p>

        <div
          className="mt-12 flex animate-fade-up flex-col items-center justify-center gap-4 sm:flex-row"
          style={{ animationDelay: '0.3s' }}
        >
          <a
            href="#destinations"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-8 py-4 text-sm font-semibold tracking-wide text-ink-950 shadow-[0_8px_40px_-8px_rgba(212,168,56,0.6)] transition-all duration-300 hover:shadow-[0_12px_50px_-8px_rgba(212,168,56,0.8)] hover:brightness-110"
          >
            <span className="relative z-10">Découvrir les destinations</span>
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
          </a>
          <a
            href="#chat"
            className="rounded-full border border-white/15 px-8 py-4 text-sm font-medium tracking-wide text-stone-200 transition-colors hover:border-gold-400/50 hover:text-gold-200"
          >
            Parler à un conseiller
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#destinations"
        className="group absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3 text-stone-400 transition-colors hover:text-gold-200"
        aria-label="Défiler vers les destinations"
      >
        <span className="text-[10px] uppercase tracking-widest">Explorer</span>
        <span className="relative flex h-9 w-5 items-start justify-center rounded-full border border-white/20 p-1 transition-colors group-hover:border-gold-400/50">
          <span className="h-1.5 w-1 animate-bounce rounded-full bg-gold-300" />
        </span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
