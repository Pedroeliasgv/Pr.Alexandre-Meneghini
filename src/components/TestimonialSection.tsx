import { useState, useEffect } from "react";
import { Star, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id?: string;
  nome: string;
  email: string;
  mensagem: string;
  status?: 'pending' | 'approved' | 'rejected';
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
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('approved');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);

  // Mock de testemunhos para quando Supabase não está configurado
  const mockTestimonials: Testimonial[] = [
    {
      id: "1",
      nome: "João Silva",
      email: "joao@example.com",
      mensagem: "Excelente conteúdo e muita inspiração. Recomendo para todos!",
      status: "approved",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      nome: "Maria Santos",
      email: "maria@example.com",
      mensagem: "Transformou minha vida espiritual. Muito obrigada!",
      status: "approved",
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      nome: "Pedro Costa",
      email: "pedro@example.com",
      mensagem: "Os ensinamentos são profundos e muito relevantes para hoje.",
      status: "approved",
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      nome: "Spam User",
      email: "spam@example.com",
      mensagem: "Este é um testemunho suspeito com palavras ruins",
      status: "pending",
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
      if (!supabase) {
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

  // Lista de palavras suspeitas (pode ser expandida)
  const suspiciousWords = [
    'spam', 'fake', 'test', 'teste', 'lixo', 'ruim', 'péssimo',
    'ódio', 'raiva', 'maldito', 'inferno', 'diabo', 'satanás',
    'droga', 'álcool', 'sexo', 'porn', 'nudez', 'violência'
  ];

  // Função para validar conteúdo suspeito
  const validateContent = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return suspiciousWords.some(word => lowerText.includes(word));
  };

  // Função para filtrar testemunhos
  const getFilteredTestimonials = () => {
    if (isAdmin) {
      switch (filter) {
        case 'approved':
          return testimonials.filter(t => t.status === 'approved');
        case 'pending':
          return testimonials.filter(t => t.status === 'pending');
        case 'all':
          return testimonials;
        default:
          return testimonials.filter(t => t.status === 'approved');
      }
    }
    // Para usuários normais, só mostra aprovados
    return testimonials.filter(t => t.status === 'approved');
  };

  // Função de login admin (senha simples para demonstração)
  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      setIsAdmin(true);
      setShowAdmin(false);
      setAdminPassword("");
    } else {
      alert("Senha incorreta");
    }
  };

  // Função para aprovar testemunho
  const approveTestimonial = async (id: string) => {
    if (!supabase) {
      setTestimonials(prev =>
        prev.map(t => t.id === id ? { ...t, status: 'approved' as const } : t)
      );
      return;
    }

    const { error } = await supabase
      .from('testimonials')
      .update({ status: 'approved' })
      .eq('id', id);

    if (error) {
      console.error('Erro ao aprovar:', error);
    } else {
      await loadTestimonials();
    }
  };

  // Função para rejeitar testemunho
  const rejectTestimonial = async (id: string) => {
    if (!supabase) {
      setTestimonials(prev =>
        prev.map(t => t.id === id ? { ...t, status: 'rejected' as const } : t)
      );
      return;
    }

    const { error } = await supabase
      .from('testimonials')
      .update({ status: 'rejected' })
      .eq('id', id);

    if (error) {
      console.error('Erro ao rejeitar:', error);
    } else {
      await loadTestimonials();
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validação
    if (!formData.nome || !formData.email || !formData.mensagem) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    // Verificar conteúdo suspeito
    const hasSuspiciousContent = validateContent(formData.mensagem) ||
                                validateContent(formData.nome);

    if (hasSuspiciousContent) {
      alert("Seu testemunho contém conteúdo que precisa ser revisado. Ele será enviado para moderação.");
    }

    setSubmitting(true);

    try {
      // Determinar status inicial baseado no conteúdo
      const initialStatus = hasSuspiciousContent ? 'pending' : 'approved';

      // Verificar se Supabase está configurado
      if (!supabase) {
        // Adicionar testemunho localmente
        const newTestimonial: Testimonial = {
          id: Date.now().toString(),
          ...formData,
          status: initialStatus,
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
          status: initialStatus,
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
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Compartilhe seu testemunho
              </h3>

              {/* BOTÃO ADMIN */}
              {!isAdmin && (
                <button
                  onClick={() => setShowAdmin(true)}
                  className="text-sm text-gray-500 hover:text-gray-700 underline"
                >
                  Admin
                </button>
              )}
            </div>

            {/* MODAL ADMIN LOGIN */}
            {showAdmin && !isAdmin && (
              <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                <h4 className="font-semibold mb-2">Login Administrativo</h4>
                <div className="flex gap-2">
                  <input
                    type="password"
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Senha admin"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                  />
                  <button
                    onClick={handleAdminLogin}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                  >
                    Entrar
                  </button>
                  <button
                    onClick={() => setShowAdmin(false)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg text-sm hover:bg-gray-400"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}

            {/* CONTROLES ADMIN */}
            {isAdmin && (
              <div className="mb-6 p-4 bg-blue-50 rounded-xl">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="font-semibold text-blue-900">Modo Administrador</h4>
                  <button
                    onClick={() => setIsAdmin(false)}
                    className="text-sm text-blue-600 hover:text-blue-800 underline"
                  >
                    Sair
                  </button>
                </div>

                {/* FILTROS */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-3 py-1 rounded text-sm ${
                      filter === 'all'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Todos ({testimonials.length})
                  </button>
                  <button
                    onClick={() => setFilter('approved')}
                    className={`px-3 py-1 rounded text-sm ${
                      filter === 'approved'
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Aprovados ({testimonials.filter(t => t.status === 'approved').length})
                  </button>
                  <button
                    onClick={() => setFilter('pending')}
                    className={`px-3 py-1 rounded text-sm ${
                      filter === 'pending'
                        ? 'bg-yellow-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    Pendentes ({testimonials.filter(t => t.status === 'pending').length})
                  </button>
                </div>
              </div>
            )}

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
            ) : getFilteredTestimonials().length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {isAdmin && filter === 'pending'
                  ? "Nenhum testemunho pendente"
                  : "Nenhum testemunho ainda. Seja o primeiro!"}
              </div>
            ) : (
              getFilteredTestimonials().map((testimonial) => (
                <div
                  key={testimonial.id}
                  className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition ${
                    testimonial.status === 'pending' ? 'border-yellow-300 bg-yellow-50' : ''
                  }`}
                >
                  {/* STATUS INDICATOR (ADMIN ONLY) */}
                  {isAdmin && (
                    <div className="flex justify-between items-center mb-3">
                      <span className={`text-xs px-2 py-1 rounded ${
                        testimonial.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : testimonial.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {testimonial.status === 'approved' ? '✓ Aprovado' :
                         testimonial.status === 'pending' ? '⏳ Pendente' : '✗ Rejeitado'}
                      </span>

                      {/* CONTROLES DE MODERAÇÃO */}
                      {testimonial.status === 'pending' && (
                        <div className="flex gap-2">
                          <button
                            onClick={() => approveTestimonial(testimonial.id!)}
                            className="px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700"
                          >
                            Aprovar
                          </button>
                          <button
                            onClick={() => rejectTestimonial(testimonial.id!)}
                            className="px-3 py-1 bg-red-600 text-white text-xs rounded hover:bg-red-700"
                          >
                            Rejeitar
                          </button>
                        </div>
                      )}
                    </div>
                  )}

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
