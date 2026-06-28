import { MessageCircle, Send, Sparkles } from 'lucide-react';

export default function ChatSection() {
  return (
    <section id="chat" className="relative overflow-hidden py-28 md:py-36">
      {/* Ambient glow */}
      <div className="absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold-500/8 blur-[120px]" />

      <div className="relative mx-auto max-w-3xl px-6 text-center">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-gold-400/5 px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-gold-200">
          <Sparkles className="h-3.5 w-3.5" />
          Conseiller temporel
        </div>

        <h2 className="font-display text-4xl font-semibold leading-tight text-stone-50 md:text-5xl lg:text-6xl">
          Une question ? Parlez à notre
          <span className="text-gradient-gold italic"> conseiller temporel</span>
        </h2>

        <p className="mx-auto mt-6 max-w-xl text-base text-stone-400 md:text-lg">
          Notre intelligence artificielle spécialisée répond à toutes vos
          questions sur les voyages temporels : époques, sécurité, itinéraires,
          tarifs. Disponible à toute heure, de n'importe quelle époque.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <button
            onClick={() => {
              window.dispatchEvent(new CustomEvent('open-chat'));
            }}
            className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-300 to-gold-500 px-7 py-3.5 text-sm font-semibold text-ink-950 shadow-[0_8px_40px_-8px_rgba(212,168,56,0.6)] transition-all hover:brightness-110"
          >
            <MessageCircle className="h-4 w-4" />
            Lancer la conversation
            <Send className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>

        {/* Mini preview of chat */}
        <div className="mx-auto mt-14 max-w-md">
          <div className="glass rounded-2xl border border-white/10 p-5 text-left">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10">
                <Sparkles className="h-4 w-4 text-gold-300" />
              </div>
              <div className="rounded-2xl rounded-tl-sm bg-white/5 px-4 py-3 text-sm text-stone-300">
                Bonjour, je suis votre conseiller temporel. Quelle époque
                souhaitez-vous explorer ?
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
