import { useState, useEffect } from "react";
import { Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const data = {
      nome: String(formData.get("nome") || "").trim(),
      sobrenome: String(formData.get("sobrenome") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      mensagem: String(formData.get("mensagem") || "").trim(),
    };

    // ✅ VALIDAÇÃO
    if (!data.nome || !data.email || !data.mensagem) {
      toast({
        title: "Campos obrigatórios",
        description: "Preencha nome, email e mensagem.",
        variant: "destructive",
      });
      return;
    }

    if (!data.email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Digite um email válido.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3001/submit-testimony", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Erro ao enviar testemunho");
      }

      toast({
        title: "Testemunho enviado! 🙌",
        description: "Obrigado por compartilhar! Seu testemunho será revisado e publicado em breve.",
      });

      setSubmitted(true);
      form.reset();
    } catch (error) {
      console.error("Erro:", error);
      toast({
        title: "Erro ao enviar testemunho",
        description: error instanceof Error ? error.message : "Tente novamente mais tarde.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        setSubmitted(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [submitted]);

  return (
    <section id="contact" className="py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4">

        {/* HEAD */}
        <div className="text-center mb-14">
          <p className="text-primary tracking-[0.3em] text-sm mb-4 uppercase">
            Testemunho
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Compartilhe o que Deus fez
          </h2>

          <p className="text-muted-foreground max-w-lg mx-auto mt-4">
            Seu testemunho pode alcançar e transformar outras vidas.
          </p>

          <div className="w-20 h-[2px] bg-blue-500 mx-auto mt-6" />
        </div>

        {/* CARD */}
        <div className="max-w-xl mx-auto">
          <div className="relative bg-background border border-primary/10 rounded-xl p-8 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">

            {submitted ? (
              <div className="text-center py-10 space-y-4">
                <p className="text-2xl font-semibold text-blue-400">
                  Recebido 🙌
                </p>

                <p className="text-white/70">
                  Seu testemunho foi enviado com sucesso. Será revisado e publicado em breve!
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-blue-400 hover:underline"
                >
                  Enviar outro testemunho
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">

                {/* NOME */}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    name="nome"
                    type="text"
                    placeholder="Nome"
                    required
                    disabled={isLoading}
                    className="bg-card border border-primary/10 rounded-lg px-4 py-3 text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  />

                  <input
                    name="sobrenome"
                    type="text"
                    placeholder="Sobrenome"
                    disabled={isLoading}
                    className="bg-card border border-primary/10 rounded-lg px-4 py-3 text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                {/* EMAIL */}
                <input
                  name="email"
                  type="email"
                  placeholder="Email"
                  required
                  disabled={isLoading}
                  className="w-full bg-card border border-primary/10 rounded-lg px-4 py-3 text-black disabled:opacity-50 disabled:cursor-not-allowed"
                />

                {/* MENSAGEM */}
                <textarea
                  name="mensagem"
                  placeholder="Conte seu testemunho..."
                  rows={4}
                  required
                  disabled={isLoading}
                  className="w-full bg-card border border-primary/10 rounded-lg px-4 py-3 text-black resize-none disabled:opacity-50 disabled:cursor-not-allowed"
                />

                {/* BOTÃO */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send size={18} />
                  {isLoading ? "ENVIANDO..." : "ENVIAR TESTEMUNHO"}
                </button>

              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;