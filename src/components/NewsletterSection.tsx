import { useState } from "react";
import { Mail, Send, CheckCircle, Zap, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

const NewsletterSection = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    maior: false,
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  const formatCPF = (value: string) => {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    setError("");
    setSuccess(false);
  };

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      cpf: formatCPF(e.target.value),
    }));

    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const nome = formData.nome.trim();
    const email = formData.email.trim().toLowerCase();
    const cpf = formData.cpf.trim();

    if (!nome) {
      setError("Digite seu nome.");
      return;
    }

    if (!email) {
      setError("Digite seu email.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Digite um email válido.");
      return;
    }

    if (!cpf || cpf.replace(/\D/g, "").length !== 11) {
      setError("Digite um CPF válido.");
      return;
    }

    if (!formData.maior) {
      setError("Você precisa confirmar que é maior de 18 anos.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const { data: existingSubscriber, error: searchError } = await supabase
        .from("newsletter_subscribers")
        .select("id")
        .eq("email", email)
        .eq("ativo", true)
        .maybeSingle();

      if (searchError) {
        throw searchError;
      }

      if (existingSubscriber) {
        setError("Este email já está inscrito.");
        return;
      }

      const { error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert({
          nome,
          email,
          cpf,
          maior_de_idade: formData.maior,
          ativo: true,
          created_at: new Date().toISOString(),
        });

      if (insertError) {
        throw insertError;
      }

      const { data: emailData, error: emailError } =
        await supabase.functions.invoke("newsletter-welcome", {
          body: {
            nome,
            email,
          },
        });

      console.log("EMAIL DATA:", emailData);
      console.log("EMAIL ERROR:", emailError);

      if (emailError) {
        throw emailError;
      }

      setSuccess(true);
      setFormData({
        nome: "",
        email: "",
        cpf: "",
        maior: false,
      });
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setError(
        "Cadastro salvo, mas não foi possível enviar o email de acesso. Tente novamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 py-24 md:py-32"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-500/20 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/50 bg-blue-500/20 px-4 py-2 text-blue-200">
            <Zap size={16} />
            <span className="text-sm font-semibold">FIQUE POR DENTRO</span>
          </div>

          <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
            Receba conteúdos exclusivos no seu email
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-blue-100">
            Ensinamentos, reflexões e novidades sobre o livro diretamente na sua caixa de entrada.
          </p>
        </div>

        <div className="mx-auto max-w-2xl">
          <div className="relative">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-40 blur-xl" />

            <form
              onSubmit={handleSubmit}
              className="relative space-y-6 rounded-2xl border border-blue-500/30 bg-slate-950/95 p-8 shadow-2xl md:p-12"
            >
              <div>
                <label className="mb-3 block font-semibold text-white">
                  Seu nome
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome"
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60"
                />
              </div>

              <div>
                <label className="mb-3 block font-semibold text-white">
                  Seu email
                </label>

                <div className="relative">
                  <Mail
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
                    size={20}
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="seuemail@gmail.com"
                    disabled={loading}
                    className="w-full rounded-lg border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white placeholder:text-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="mb-3 block font-semibold text-white">
                  CPF
                </label>

                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  placeholder="000.000.000-00"
                  disabled={loading}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-60"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  name="maior"
                  checked={formData.maior}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="mt-1 h-4 w-4 accent-blue-600"
                />

                <span>
                  Declaro que sou maior de 18 anos e autorizo o uso dos meus dados para receber conteúdos e acesso à comunidade.
                </span>
              </label>

              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-red-500/40 bg-red-500/15 px-4 py-3 text-sm text-red-200">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              {success && (
                <div className="flex items-center gap-2 rounded-lg border border-green-500/40 bg-green-500/15 px-4 py-3 text-sm text-green-200">
                  <CheckCircle size={18} />
                  Inscrição confirmada! Verifique seu email para acessar a comunidade.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-bold text-white transition-all hover:from-blue-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Receber acesso no email
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400">
                Seus dados estão seguros e serão usados apenas para comunicação relacionada ao livro e à comunidade.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;