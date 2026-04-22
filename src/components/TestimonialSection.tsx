import { useState, useEffect } from "react";
import { Star, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id?: string;
  nome: string;
  email: string;
  mensagem: string;
  created_at?: string;
}

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  // Mock de testemunhos para quando Supabase não está configurado
  const mockTestimonials: Testimonial[] = [
    {
      id: "1",
      nome: "João Silva",
      email: "joao@example.com",
      mensagem: "Excelente conteúdo e muita inspiração. Recomendo para todos!",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      nome: "Maria Santos",
      email: "maria@example.com",
      mensagem: "Transformou minha vida espiritual. Muito obrigada!",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      nome: "Pedro Costa",
      email: "pedro@example.com",
      mensagem: "Os ensinamentos são profundos e muito relevantes para hoje.",
      created_at: new Date().toISOString(),
    },
  ];

  // Carregar testemunhos do Supabase
  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);

      // Verificar se Supabase está configurado
      if (supabase.supabaseUrl.includes("SUA_URL")) {
        setTestimonials(mockTestimonials);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Erro ao carregar testemunhos:", error);
        setTestimonials(mockTestimonials);
      } else {
        setTestimonials(data || mockTestimonials);
      }
    } catch (error) {
      console.error("Erro ao conectar com Supabase:", error);
      setTestimonials(mockTestimonials);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação
    if (!formData.nome || !formData.email || !formData.mensagem) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    setSubmitting(true);

    try {
      // Verificar se Supabase está configurado
      if (supabase.supabaseUrl.includes("SUA_URL")) {
        // Adicionar testemunho localmente
        const newTestimonial: Testimonial = {
          id: Date.now().toString(),
          ...formData,
          created_at: new Date().toISOString(),
        };

        setTestimonials((prev) => [newTestimonial, ...prev]);
        setFormData({ nome: "", email: "", mensagem: "" });
        setSubmitted(true);

        setTimeout(() => setSubmitted(false), 5000);
        setSubmitting(false);
        return;
      }

      // Enviar para Supabase
      const { error } = await supabase.from("testimonials").insert([
        {
          nome: formData.nome,
          email: formData.email,
          mensagem: formData.mensagem,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Erro ao enviar testemunho:", error);
        alert("Erro ao enviar testemunho. Tente novamente.");
      } else {
        setFormData({ nome: "", email: "", mensagem: "" });
        setSubmitted(true);

        // Recarregar testemunhos
        await loadTestimonials();

        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao enviar testemunho");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonios" className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Testemunhos
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Histórias de transformação e inspiração de pessoas que foram impactadas
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* FORMULÁRIO */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Compartilhe seu testemunho
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Seu nome"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={submitting}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Seu testemunho
                </label>
                <textarea
                  name="mensagem"
                  value={formData.mensagem}
                  onChange={handleInputChange}
                  placeholder="Conte sua história..."
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  disabled={submitting}
                />
              </div>

              {submitted && (
                <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm">
                  ✓ Testemunho enviado com sucesso! Obrigado por compartilhar.
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Send size={18} />
                {submitting ? "Enviando..." : "Enviar testemunho"}
              </button>
            </form>
          </div>

          {/* LISTA DE TESTEMUNHOS */}
          <div className="space-y-6 max-h-[600px] overflow-y-auto">
            {loading ? (
              <div className="text-center py-8 text-gray-500">
                Carregando testemunhos...
              </div>
            ) : testimonials.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                Nenhum testemunho ainda. Seja o primeiro!
              </div>
            ) : (
              testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition"
                >
                  {/* ESTRELAS */}
                  <div className="flex gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* MENSAGEM */}
                  <p className="text-gray-700 mb-4 line-clamp-3">
                    "{testimonial.mensagem}"
                  </p>

                  {/* AUTOR */}
                  <div className="border-t pt-4">
                    <p className="font-semibold text-gray-900">
                      {testimonial.nome}
                    </p>
                    <p className="text-sm text-gray-500">
                      {testimonial.email}
                    </p>
                    {testimonial.created_at && (
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(testimonial.created_at).toLocaleDateString(
                          "pt-BR"
                        )}
                      </p>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
