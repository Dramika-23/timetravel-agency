import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, Sparkles, X, Minus } from 'lucide-react';

type Msg = { id: number; from: 'bot' | 'user'; text: string };

const CHAT_API = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;
const CHAT_HEADERS = {
  Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json',
};

export default function FloatingChat() {
  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onOpen = () => {
      setOpen(true);
      setMinimized(false);
    };
    window.addEventListener('open-chat', onOpen as EventListener);
    return () => window.removeEventListener('open-chat', onOpen as EventListener);
  }, []);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open, typing]);

  const send = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || typing) return;

    const userMsg: Msg = { id: Date.now(), from: 'user', text };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    const history = [...messages, userMsg]
      .filter((m) => m.from === 'user' || m.from === 'bot')
      .map((m) => ({ role: m.from === 'user' ? 'user' : 'assistant', content: m.text }));

    try {
      const res = await fetch(CHAT_API, {
        method: 'POST',
        headers: CHAT_HEADERS,
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const reply = data?.reply;
      if (!reply) throw new Error('Réponse vide');

      setMessages((m) => [
        ...m,
        { id: Date.now() + 1, from: 'bot', text: reply },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          id: Date.now() + 1,
          from: 'bot',
          text: "Désolé, je rencontre un souci technique pour le moment. Notre équipe de conciergerie temporelle revient vers vous très vite. En attendant, n'hésitez pas à explorer nos destinations ci-dessus !",
        },
      ]);
    } finally {
      setTyping(false);
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => {
          setOpen(true);
          setMinimized(false);
        }}
        className={`group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 shadow-[0_8px_30px_-4px_rgba(212,168,56,0.6)] transition-all duration-300 hover:scale-105 hover:shadow-[0_12px_40px_-4px_rgba(212,168,56,0.8)] ${
          open && !minimized ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        }`}
        aria-label="Ouvrir le chat"
      >
        {!open && (
          <span className="absolute inset-0 rounded-full bg-gold-400 animate-pulse-ring" />
        )}
        <MessageCircle className="relative h-6 w-6 text-ink-950" />
        {!open && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-ink-950 text-[9px] font-bold text-gold-300">
            1
          </span>
        )}
      </button>

      {/* Chat window */}
      {open && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[calc(100vw-3rem)] max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-ink-800 shadow-2xl transition-all duration-300 sm:w-96 ${
            minimized ? 'h-16' : 'h-[32rem] max-h-[80vh]'
          }`}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-ink-900/80 px-4 py-3">
            <div className="flex items-center gap-3">
              <div className="relative flex h-9 w-9 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10">
                <Sparkles className="h-4 w-4 text-gold-300" />
                <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-ink-900 bg-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-100">
                  Conseiller temporel
                </p>
                <p className="text-[11px] text-stone-500">En ligne</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setMinimized((v) => !v)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-white/5 hover:text-gold-200"
                aria-label="Réduire"
              >
                <Minus className="h-4 w-4" />
              </button>
              <button
                onClick={() => setOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 transition-colors hover:bg-white/5 hover:text-gold-200"
                aria-label="Fermer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              {/* Body */}
              <div
                ref={bodyRef}
                className="h-[calc(100%-7.5rem)] space-y-4 overflow-y-auto px-4 py-5"
              >
                <div className="flex items-start gap-2.5">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10">
                    <Sparkles className="h-3.5 w-3.5 text-gold-300" />
                  </div>
                  <div className="max-w-[80%] rounded-2xl rounded-tl-sm bg-white/5 px-4 py-2.5 text-sm text-stone-300">
                    Bonjour, je suis votre conseiller temporel. Posez-moi vos
                    questions sur les voyages temporels...
                  </div>
                </div>

                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex items-start gap-2.5 ${
                      m.from === 'user' ? 'flex-row-reverse' : ''
                    }`}
                  >
                    {m.from === 'bot' ? (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10">
                        <Sparkles className="h-3.5 w-3.5 text-gold-300" />
                      </div>
                    ) : (
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold-400/20 font-display text-sm font-semibold text-gold-200">
                        V
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                        m.from === 'user'
                          ? 'rounded-tr-sm bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950'
                          : 'rounded-tl-sm bg-white/5 text-stone-300'
                      }`}
                    >
                      {m.text}
                    </div>
                  </div>
                ))}

                {typing && (
                  <div className="flex items-start gap-2.5">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold-400/40 bg-gold-400/10">
                      <Sparkles className="h-3.5 w-3.5 text-gold-300" />
                    </div>
                    <div className="rounded-2xl rounded-tl-sm bg-white/5 px-4 py-3 text-sm text-stone-400">
                      <span className="inline-flex gap-1">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-300 [animation-delay:-0.3s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-300 [animation-delay:-0.15s]" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-gold-300" />
                      </span>
                    </div>
                  </div>
                )}

                {messages.length === 0 && (
                  <div className="space-y-2 pt-2">
                    {[
                      'Quelles époques puis-je visiter ?',
                      'Le voyage temporel est-il sûr ?',
                      'Combien coûte un séjour ?',
                    ].map((q) => (
                      <button
                        key={q}
                        onClick={() => send(q)}
                        className="block w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-left text-xs text-stone-300 transition-colors hover:border-gold-400/30 hover:text-gold-200"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="border-t border-white/10 bg-ink-900/80 p-3">
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-ink-800 px-4 py-2.5 focus-within:border-gold-400/40">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    placeholder="Posez-moi vos questions sur les voyages temporels..."
                    disabled={typing}
                    className="flex-1 bg-transparent text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none disabled:opacity-50"
                  />
                  <button
                    onClick={() => send()}
                    disabled={!input.trim() || typing}
                    className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-gold-500 text-ink-950 transition-all hover:brightness-110 disabled:opacity-40"
                    aria-label="Envoyer"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
