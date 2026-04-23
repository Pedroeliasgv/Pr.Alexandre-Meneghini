import { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface NewsletterSubscriber {
  id?: string;
  email: string;
  nome?: string;
  created_at?: string;
  ativo: boolean;
}

const NewsletterSection = () => {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Limpar erro quando usuário começa a digitar
    if (error) setError("");
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação
    if (!formData.email) {
      setError("Email é obrigatório");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Por favor, insira um email válido");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Verificar se Supabase está configurado
      if (!supabase) {
        // Simular sucesso para desenvolvimento
        console.log("Newsletter subscription:", formData);
        setSuccess(true);
        setFormData({ nome: "", email: "" });
        setTimeout(() => setSuccess(false), 5000);
        setLoading(false);
        return;
      }

      // Verificar se email já existe
      const { data: existing } = await supabase
        .from("newsletter_subscribers")
        .select("id")
        .eq("email", formData.email)
        .eq("ativo", true)
        .single();

      if (existing) {
        setError("Este email já está inscrito em nossa newsletter");
        setLoading(false);
        return;
      }

      // Inserir novo subscriber
      const { error: insertError } = await supabase
        .from("newsletter_subscribers")
        .insert([
          {
            nome: formData.nome || null,
            email: formData.email,
            ativo: true,
            created_at: new Date().toISOString(),
          },
        ]);

      if (insertError) {
        console.error("Erro ao salvar inscrição:", insertError);
        setError("Erro ao processar inscrição. Tente novamente.");
      } else {
        setSuccess(true);
        setFormData({ nome: "", email: "" });
        setTimeout(() => setSuccess(false), 5000);
      }
    } catch (error) {
      console.error("Erro:", error);
      setError("Erro ao processar inscrição. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="newsletter" className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-700">
      <div className="max-w-4xl mx-auto text-center">
        {/* HEADER */}
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 rounded-full mb-6">
            <Mail className="text-white" size={32} />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Fique por Dentro
          </h2>

          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Inscreva-se em nossa newsletter e receba as primeiras novidades sobre
            novos livros, eventos especiais, conteúdos exclusivos e muito mais!
          </p>
        </div>

        {/* FORMULÁRIO */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md mx-auto">
          {!success ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome (opcional)
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:border-transparent ${
                    error
                      ? "border-red-300 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  disabled={loading}
                  required
                />
              </div>

              {error && (
                <div className="text-red-600 text-sm text-left">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Inscrevendo...
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    Inscrever-se
                  </>
                )}
              </button>

              <p className="text-xs text-gray-500 text-center">
                Respeitamos sua privacidade. Você pode cancelar a inscrição a qualquer momento.
              </p>
            </form>
          ) : (
            /* MENSAGEM DE SUCESSO */
            <div className="text-center py-8">
              <CheckCircle className="text-green-500 mx-auto mb-4" size={48} />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Inscrição realizada com sucesso!
              </h3>
              <p className="text-gray-600">
                Obrigado por se inscrever. Em breve você receberá nossas novidades.
              </p>
            </div>
          )}
        </div>

        {/* BENEFÍCIOS */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-left">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-2xl mb-3">📚</div>
            <h3 className="text-white font-semibold mb-2">Lançamentos</h3>
            <p className="text-blue-100 text-sm">
              Seja o primeiro a saber sobre novos livros e materiais
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-2xl mb-3">📅</div>
            <h3 className="text-white font-semibold mb-2">Eventos</h3>
            <p className="text-blue-100 text-sm">
              Convites exclusivos para eventos e encontros especiais
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-2xl mb-3">💡</div>
            <h3 className="text-white font-semibold mb-2">Conteúdo Exclusivo</h3>
            <p className="text-blue-100 text-sm">
              Acesso antecipado a vídeos, artigos e materiais especiais
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;