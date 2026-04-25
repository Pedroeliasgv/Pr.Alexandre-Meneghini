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

      if (searchError) throw searchError;

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

      if (insertError) throw insertError;

      await supabase.functions.invoke("newsletter-welcome", {
        body: {
          nome,
          email,
        },
      });

      setSuccess(true);
      setFormData({
        nome: "",
        email: "",
        cpf: "",
        maior: false,
      });
    } catch (err) {
      console.error("Erro ao cadastrar:", err);
      setError("Não foi possível concluir sua inscrição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="newsletter"
      className="relative py-24 md:py-32 bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-500/20 border border-blue-400/50 text-blue-200">
            <Zap size={16} />
            <span className="text-sm font-semibold">FIQUE POR DENTRO</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Receba conteúdos exclusivos no seu email
          </h2>

          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Ensinamentos, reflexões e novidades sobre o livro diretamente na sua caixa de entrada.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-40" />

            <form
              onSubmit={handleSubmit}
              className="relative bg-slate-950/95 rounded-2xl border border-blue-500/30 p-8 md:p-12 space-y-6 shadow-2xl"
            >
              <div>
                <label className="block text-white font-semibold mb-3">
                  Seu nome
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Digite seu nome"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60"
                />
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">
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
                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-semibold mb-3">
                  CPF
                </label>

                <input
                  type="text"
                  name="cpf"
                  value={formData.cpf}
                  onChange={handleCpfChange}
                  placeholder="000.000.000-00"
                  disabled={loading}
                  className="w-full px-4 py-3 rounded-lg bg-slate-900 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all disabled:opacity-60"
                />
              </div>

              <label className="flex items-start gap-3 text-sm text-slate-300 cursor-pointer">
                <input
                  type="checkbox"
                  name="maior"
                  checked={formData.maior}
                  onChange={handleInputChange}
                  disabled={loading}
                  className="mt-1 w-4 h-4 accent-blue-600"
                />

                <span>
                  Declaro que sou maior de 18 anos e autorizo o uso dos meus dados para receber conteúdos e acesso à comunidade.
                </span>
              </label>

              {error && (
                <div className="bg-red-500/15 border border-red-500/40 text-red-200 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                  <AlertCircle size={18} />
                  {error}
                </div>
              )}

              {success && (
                <div className="bg-green-500/15 border border-green-500/40 text-green-200 px-4 py-3 rounded-lg text-sm flex items-center gap-2">
                  <CheckCircle size={18} />
                  Inscrição confirmada! Verifique seu email para acessar a comunidade.
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-blue-500/30"
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Receber acesso no email
                  </>
                )}
              </button>

              <p className="text-center text-slate-400 text-xs">
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