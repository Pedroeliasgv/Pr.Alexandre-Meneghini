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
    className="relative overflow-hidden bg-[#020617] py-28 md:py-36"
  >
    {/* BACKGROUND GLOW */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-[140px]" />
      <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-indigo-500/20 blur-[120px]" />
    </div>

    <div className="container relative z-10 mx-auto px-4">
      {/* HEADER */}
      <div className="mb-16 text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/40 bg-blue-500/10 px-5 py-2 text-blue-300 backdrop-blur">
          <Zap size={16} />
          <span className="text-xs font-semibold tracking-wider">
            COMUNIDADE OFICIAL
          </span>
        </div>

        <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
          Receba acesso direto à comunidade
        </h2>

        <p className="mx-auto max-w-xl text-lg text-blue-100/80">
          Entre para a comunidade e receba direcionamentos, conteúdos e avisos exclusivos.
        </p>
      </div>

      {/* FORM */}
      <div className="mx-auto max-w-2xl">
        <div className="relative">

          {/* BORDA GLOW */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 opacity-30 blur-2xl" />

          <form
            onSubmit={handleSubmit}
            className="relative space-y-7 rounded-3xl border border-blue-500/20 bg-slate-950/90 p-10 shadow-[0_0_80px_rgba(37,99,235,0.15)] backdrop-blur-xl md:p-12"
          >
            {/* NOME */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-blue-200">
                Seu nome
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleInputChange}
                placeholder="Digite seu nome"
                disabled={loading}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-blue-200">
                Seu email
              </label>

              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seuemail@gmail.com"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-700 bg-slate-900/80 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                />
              </div>
            </div>

            {/* CPF */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-blue-200">
                CPF
              </label>

              <input
                type="text"
                name="cpf"
                value={formData.cpf}
                onChange={handleCpfChange}
                placeholder="000.000.000-00"
                disabled={loading}
                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white placeholder:text-slate-500 transition-all focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* CHECKBOX */}
            <label className="flex cursor-pointer items-start gap-3 text-sm text-slate-400">
              <input
                type="checkbox"
                name="maior"
                checked={formData.maior}
                onChange={handleInputChange}
                disabled={loading}
                className="mt-1 h-4 w-4 accent-blue-600"
              />

              <span>
                Declaro que sou maior de 18 anos e autorizo o uso dos meus dados.
              </span>
            </label>

            {/* ERROR */}
            {error && (
              <div className="flex items-center gap-2 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                <AlertCircle size={18} />
                {error}
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="flex items-center gap-2 rounded-xl border border-green-500/40 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                <CheckCircle size={18} />
                Acesso enviado! Verifique seu email.
              </div>
            )}

            {/* BOTÃO */}
            <button
              type="submit"
              disabled={loading}
              className="
                group relative w-full overflow-hidden rounded-xl
                bg-gradient-to-r from-blue-600 to-indigo-600
                py-4 font-bold text-white
                transition-all duration-300
                hover:scale-[1.02]
                hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]
                disabled:opacity-50
              "
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {loading ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Receber acesso agora
                  </>
                )}
              </span>

              <span className="absolute inset-0 bg-white/10 opacity-0 transition group-hover:opacity-100" />
            </button>

            <p className="text-center text-xs text-slate-500">
              Seus dados estão protegidos.
            </p>
          </form>
        </div>
      </div>
    </div>
</section>
  );
};

export default NewsletterSection;