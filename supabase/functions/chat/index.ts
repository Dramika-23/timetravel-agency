import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const SYSTEM_PROMPT = `Tu es Chronos, l'assistant virtuel de TimeTravel Agency, une agence de voyage temporel de luxe.
TON RÔLE : conseiller les clients sur nos 3 destinations temporelles, répondre à leurs questions et les aider à choisir le voyage idéal.
TON TON :
- Professionnel mais chaleureux
- Passionné d'histoire, enthousiaste sans être familier
- Expertise en voyage temporel (fictif mais crédible)
- Réponses concises (2-4 phrases), jamais de pavés
NOS 3 DESTINATIONS :
1. Paris 1889 — Belle Époque. Tour Eiffel toute neuve, Exposition Universelle, élégance urbaine. Idéal pour les amateurs d'art de vivre et d'architecture. À partir de 8 900 € (séjour 3 jours).
2. Crétacé -65M — Ère des dinosaures. Nature sauvage, faune préhistorique, aventure absolue. Sécurité renforcée, encadrement expert. Idéal pour les aventuriers. À partir de 14 500 € (expédition 2 jours).
3. Florence 1504 — Renaissance. Art, Michel-Ange, génie créatif, architecture sublime. Idéal pour les passionnés de culture. À partir de 11 200 € (séjour 4 jours).
CE QUE TU SAIS FAIRE :
- Présenter et comparer les destinations
- Donner les prix (toujours cohérents avec ceux ci-dessus)
- Conseiller une époque selon les intérêts du client
- Répondre à la FAQ : sécurité, durée, ce qui est inclus (transport temporel, guide, hébergement d'époque, équipement)
RÈGLES :
- Reste toujours dans ton rôle d'assistant TimeTravel.
- Si on te pose une question hors sujet (sans rapport avec le voyage temporel), ramène gentiment la conversation vers nos destinations.
- Si tu ne sais pas, invente une réponse plausible et cohérente avec l'univers, sans jamais casser l'immersion.`;

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get("MISTRAL_API_KEY");
    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: "MISTRAL_API_KEY non configuré." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const body = await req.json();
    const messages = Array.isArray(body?.messages) ? body.messages : [];

    const payload = {
      model: "mistral-small-latest",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 400,
    };

    const mistralRes = await fetch("https://api.mistral.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!mistralRes.ok) {
      const errText = await mistralRes.text();
      return new Response(
        JSON.stringify({ error: `Mistral API error (${mistralRes.status}): ${errText}` }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const data = await mistralRes.json();
    const reply = data?.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return new Response(
        JSON.stringify({ error: "Réponse vide de Mistral." }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ reply }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err?.message ?? "Erreur interne du serveur." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
