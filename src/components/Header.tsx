import { useEffect, useState } from 'react';
import { Clock, Menu, X } from 'lucide-react';

const NAV = [
  { label: 'Accueil', href: '#accueil' },
  { label: 'Destinations', href: '#destinations' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'glass border-b border-white/10 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-10">
        <a href="#accueil" className="group flex items-center gap-2.5">
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10">
            <Clock className="h-5 w-5 text-gold-300 transition-transform duration-700 group-hover:rotate-180" />
          </span>
          <span className="font-display text-2xl font-semibold tracking-wide text-stone-100">
            Time<span className="text-gradient-gold">Travel</span>
          </span>
        </a>

        <nav className="hidden items-center gap-10 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative text-sm font-medium tracking-wide text-stone-300 transition-colors hover:text-gold-200"
            >
              {item.label}
              <span className="absolute -bottom-1.5 left-0 h-px w-0 bg-gradient-to-r from-gold-300 to-gold-500 transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <a
            href="#destinations"
            className="rounded-full border border-gold-400/50 px-5 py-2 text-sm font-medium tracking-wide text-gold-100 transition-all duration-300 hover:bg-gold-400 hover:text-ink-950"
          >
            Réserver
          </a>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-stone-200 md:hidden"
          aria-label="Menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-500 md:hidden ${
          open ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="mx-auto mt-3 max-w-7xl px-6">
          <div className="glass flex flex-col gap-1 rounded-2xl border border-white/10 p-4">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-stone-300 transition-colors hover:bg-white/5 hover:text-gold-200"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#destinations"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-xl bg-gold-400 px-4 py-3 text-center text-sm font-semibold text-ink-950"
            >
              Réserver
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
