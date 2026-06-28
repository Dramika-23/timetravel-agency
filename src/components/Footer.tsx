import { Clock, Mail, Instagram, Twitter, Linkedin } from 'lucide-react';

const TEAM = [
  { name: 'Élise Moreau', role: 'Directrice des opérations temporelles' },
  { name: 'Hugo Lefèvre', role: 'Concierge en chef' },
  { name: 'Sofia Castellani', role: 'Historienne & guide' },
];

export default function Footer() {
  return (
    <footer id="contact" className="relative border-t border-white/10 bg-ink-900">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <a href="#accueil" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10">
                <Clock className="h-5 w-5 text-gold-300" />
              </span>
              <span className="font-display text-2xl font-semibold text-stone-100">
                Time<span className="text-gradient-gold">Travel</span>
              </span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-stone-400">
              L'agence de voyages temporels de luxe. Nous orchestrons des sauts
              dans le temps d'une élégance absolue, pour des voyageurs en quête
              d'époques irréductibles à toute autre.
            </p>
            <div className="mt-6 flex gap-3">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-stone-400 transition-all hover:border-gold-400/40 hover:text-gold-200"
                  aria-label="Réseau social"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-300">
              Navigation
            </h4>
            <ul className="mt-5 space-y-3 text-sm">
              {[
                { label: 'Accueil', href: '#accueil' },
                { label: 'Destinations', href: '#destinations' },
                { label: 'Conseiller', href: '#chat' },
                { label: 'Contact', href: '#contact' },
              ].map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-stone-400 transition-colors hover:text-gold-200"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-300">
              Contact
            </h4>
            <ul className="mt-5 space-y-3 text-sm text-stone-400">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 text-gold-400" />
                <a
                  href="mailto:concierge@timetravel.agency"
                  className="transition-colors hover:text-gold-200"
                >
                  concierge@timetravel.agency
                </a>
              </li>
              <li>Quartier Temporel, Genève</li>
              <li>+41 22 000 0000</li>
            </ul>
          </div>
        </div>

        {/* Team */}
        <div className="mt-16 border-t border-white/10 pt-12">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-gold-300">
            Notre équipe
          </h4>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {TEAM.map((m) => (
              <div
                key={m.name}
                className="rounded-2xl border border-white/10 bg-ink-800/50 p-5 transition-colors hover:border-gold-400/30"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-400/20 to-gold-600/10 font-display text-lg font-semibold text-gold-200">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-100">
                      {m.name}
                    </p>
                    <p className="text-xs text-stone-500">{m.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Credits */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-stone-500 sm:flex-row">
          <p>© {new Date().getFullYear()} TimeTravel Agency. Tous droits réservés.</p>
          <p className="flex items-center gap-1.5">
            Conçu avec précision temporelle à Genève.
          </p>
        </div>
      </div>
    </footer>
  );
}
