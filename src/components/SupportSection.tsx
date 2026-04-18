import { useState } from "react";

const SupportSection = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("41.521.967/0001-04");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="support" className="py-28 bg-background relative">
      <div className="container mx-auto px-4 text-center">

        {/* HEAD */}
        <div className="max-w-2xl mx-auto mb-16 reveal">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Apoie essa obra
          </h2>

          <p className="text-white/70 text-lg">
            Sua contribuição mantém essa mensagem viva, alcançando pessoas e
            transformando vidas diariamente.
          </p>

          <p className="text-white/40 text-sm mt-3">
            Cada oferta é um passo para que mais pessoas sejam impactadas.
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

          {/* PIX */}
          <div className="reveal-left group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-left transition-all duration-300 hover:border-blue-500/40 hover:bg-white/10">

            {/* linha animada */}
            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />

            <p className="text-xs text-blue-400 uppercase tracking-widest mb-2">
              Pix (rápido e direto)
            </p>

            <p className="text-white font-medium text-lg break-all">
              11 9 1931 1999
            </p>

            <p className="text-white/50 text-sm mt-2">
              Copie a chave e contribua de forma simples, segura e instantânea.
            </p>

            <button
              onClick={handleCopy}
              className="
                mt-4 text-sm text-white/80

                px-4 py-2 rounded-md
                border border-white/10

                transition-all duration-300
                hover:text-white hover:border-blue-500 hover:bg-blue-500/10
              "
            >
              {copied ? "Copiado ✓" : "Copiar chave"}
            </button>
          </div>

          {/* PAYPAL */}
          <div className="reveal-right group relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-md p-6 text-left transition-all duration-300 hover:border-blue-500/40 hover:bg-white/10">

            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />

            <p className="text-xs text-blue-400 uppercase tracking-widest mb-2">
              PayPal
            </p>

            <p className="text-white font-medium text-lg break-all">
              meneghini.adv79@gmail.com
            </p>

            <p className="text-white/50 text-sm mt-2">
              Ideal para contribuições internacionais ou via cartão.
            </p>

            <a
              href="https://www.paypal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-block mt-4 text-sm text-white/80

                px-4 py-2 rounded-md
                border border-white/10

                transition-all duration-300
                hover:text-white hover:border-blue-500 hover:bg-blue-500/10
              "
            >
              Doar via PayPal
            </a>
          </div>

        </div>

        {/* BLOCO EXTRA (novo — dá peso) */}
        <div className="mt-16 max-w-2xl mx-auto reveal">
          <p className="text-white/70 text-base leading-relaxed">
            Ao contribuir, você está ajudando a expandir esse trabalho,
            permitindo que mais pessoas tenham acesso à palavra, direção e
            transformação espiritual.
          </p>

          <p className="text-white/40 text-sm mt-4">
            Sua semente gera frutos que vão muito além do que você pode ver.
          </p>
        </div>

        {/* FRASE FINAL */}
        <p className="text-white/40 text-sm mt-12 reveal italic">
          Cada contribuição é uma semente plantada.
        </p>

      </div>

      {/* FUNDO SUAVE */}
      <div className="
        absolute top-1/2 left-1/2
        w-[500px] h-[500px]
        bg-blue-500/5
        blur-[120px]
        -translate-x-1/2 -translate-y-1/2
        animate-soft-breath
        pointer-events-none
      " />
    </section>
  );
};

export default SupportSection;