import { useState } from "react";
import { Send } from "lucide-react";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4">

        {/* HEAD */}
        <div className="text-center mb-14">
          <p className="text-primary tracking-[0.3em] text-sm mb-4 uppercase animate-fade-up">
            Testemunho
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white animate-fade-up delay-100">
            Compartilhe o que Deus fez
          </h2>

          <p className="text-muted-foreground max-w-lg mx-auto mt-4 animate-fade-up delay-200">
            Seu testemunho pode alcançar e transformar outras vidas.
          </p>

          <div className="w-20 h-[2px] bg-blue-500 mx-auto mt-6 animate-fade-up delay-300" />
        </div>

        {/* CARD */}
        <div className="max-w-xl mx-auto">

          <div className="
            relative bg-background border border-primary/10
            rounded-xl p-8 overflow-hidden

            shadow-[0_10px_40px_rgba(0,0,0,0.3)]
            animate-fade-up
          ">

            {/* glow */}
            <div className="absolute top-0 left-1/2 w-[300px] h-[150px] bg-blue-500/10 blur-[100px] -translate-x-1/2 pointer-events-none" />

            {submitted ? (
              <div className="text-center py-10">
                <p className="text-2xl font-semibold text-blue-400 mb-2">
                  Recebido 🙌
                </p>
                <p className="text-white/70">
                  Seu testemunho foi enviado com sucesso.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">

                {/* NOME */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nome"
                    required
                    className="
                      bg-card border border-primary/10
                      rounded-lg px-4 py-3 text-gray-500
                      placeholder:text-gray/20

                      focus:outline-none
                      focus:border-blue-500
                      focus:ring-1 focus:ring-blue-500/40

                      transition-all
                    "
                  />

                  <input
                    type="text"
                    placeholder="Sobrenome"
                    className="
                      bg-card border border-primary/10
                      rounded-lg px-4 py-3 text-gray
                      placeholder:text-gray/20

                      focus:outline-none
                      focus:border-blue-500
                      focus:ring-1 focus:ring-blue-500/40

                      transition-all
                    "
                  />
                </div>

                {/* EMAIL */}
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="
                    w-full bg-card border border-primary/10
                    rounded-lg px-4 py-3 text-gray
                    placeholder:text-gray/20

                    focus:outline-none
                    focus:border-blue-500
                    focus:ring-1 focus:ring-blue-500/40

                    transition-all
                  "
                />

                {/* MENSAGEM */}
                <textarea
                  placeholder="Conte seu testemunho..."
                  rows={4}
                  required
                  className="
                    w-full bg-card border border-primary/10
                    rounded-lg px-4 py-3 text-gray
                    placeholder:text-gray/20

                    focus:outline-none
                    focus:border-blue-500
                    focus:ring-1 focus:ring-blue-500/40

                    transition-all resize-none
                  "
                />

                {/* BOTÃO */}
                <button
                  type="submit"
                  className="
                    w-full bg-blue-500 hover:bg-blue-600
                    text-white py-3 rounded-lg font-bold

                    flex items-center justify-center gap-2

                    transition-all duration-300
                    hover:scale-[1.02]

                    animate-cta
                    shadow-lg
                  "
                >
                  <Send size={18} />
                  ENVIAR TESTEMUNHO
                </button>

              </form>
            )}
          </div>

        </div>
      </div>

      {/* glow geral */}
      <div className="absolute bottom-0 left-1/2 w-[500px] h-[250px] bg-blue-500/10 blur-[120px] -translate-x-1/2 pointer-events-none" />
    </section>
  );
};

export default ContactSection;