import { useState, useEffect, useCallback, useMemo } from "react";
import { Star, Send, Check, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Testimonial {
  id?: string;
  nome: string;
  email: string;
  mensagem: string;
  status?: 'pending' | 'approved' | 'rejected';
  created_at?: string;
  rating?: number;
  company?: string;
  position?: string;
  image?: string;
}

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<'all' | 'approved' | 'pending'>('approved');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [showAdmin, setShowAdmin] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    mensagem: "",
    company: "",
    position: "",
    rating: 5,
  });

  // Mock de testemunhos premium
  const mockTestimonials: Testimonial[] = useMemo(() => [
    {
      id: "1",
      nome: "João Silva",
      email: "joao@example.com",
      company: "Tech Solutions",
      position: "CEO",
      mensagem: "Excelente conteúdo e muita inspiração. Recomendo para todos! Este programa transformou completamente minha perspectiva sobre negócios.",
      status: "approved" as const,
      rating: 5,
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      nome: "Maria Santos",
      email: "maria@example.com",
      company: "Innovation Labs",
      position: "Product Manager",
      mensagem: "Conteúdo incrível e muito bem explicado. Mudou minha perspectiva! A qualidade dos ensinamentos é extraordinária.",
      status: "approved" as const,
      rating: 5,
      created_at: new Date().toISOString(),
    },
    {
      id: "3",
      nome: "Pedro Costa",
      email: "pedro@example.com",
      company: "Digital Agency",
      position: "Diretor",
      mensagem: "Os ensinamentos são profundos e muito relevantes para hoje. Implementei as estratégias e vi resultados imediatos.",
      status: "approved" as const,
      rating: 5,
      created_at: new Date().toISOString(),
    },
    {
      id: "4",
      nome: "Ana Oliveira",
      email: "ana@example.com",
      company: "Creative Studio",
      position: "Lead Designer",
      mensagem: "Simplesmente maravilhoso! O conteúdo aborda questões que eu não imaginava que eram importantes. Recomendo fortemente.",
      status: "approved" as const,
      rating: 5,
      created_at: new Date().toISOString(),
    },
    {
      id: "5",
      nome: "Carlos Mendes",
      email: "carlos@example.com",
      company: "Consulting Group",
      position: "Consultor Senior",
      mensagem: "Programa excepcional! Os insights fornecidos são únicos e muito valiosos para aplicação prática.",
      status: "approved" as const,
      rating: 5,
      created_at: new Date().toISOString(),
    },
  ], []);

  const loadTestimonials = useCallback(async () => {
    try {
      setLoading(true);

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
  }, [mockTestimonials]);

  useEffect(() => {
    loadTestimonials();
  }, [loadTestimonials]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const suspiciousWords = [
    'spam', 'fake', 'test', 'teste', 'lixo', 'ruim', 'péssimo',
    'ódio', 'raiva', 'maldito', 'inferno', 'diabo', 'satanás',
  ];

  const validateContent = (text: string): boolean => {
    const lowerText = text.toLowerCase();
    return suspiciousWords.some(word => lowerText.includes(word));
  };

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
    return testimonials.filter(t => t.status === 'approved');
  };

  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      setIsAdmin(true);
      setShowAdmin(false);
      setAdminPassword("");
    } else {
      alert("Senha incorreta");
    }
  };

  const approveTestimonial = async (id?: string) => {
    if (!id) return;
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

  const rejectTestimonial = async (id?: string) => {
    if (!id) return;
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

    if (!formData.nome || !formData.email || !formData.mensagem) {
      alert("Por favor, preencha todos os campos obrigatórios");
      return;
    }

    const hasSuspiciousContent = validateContent(formData.mensagem) || validateContent(formData.nome);

    if (hasSuspiciousContent) {
      alert("Seu testemunho contém conteúdo que precisa ser revisado.");
    }

    setSubmitting(true);

    try {
      const initialStatus = hasSuspiciousContent ? 'pending' : 'approved';

      if (!supabase) {
        const newTestimonial: Testimonial = {
          id: Date.now().toString(),
          ...formData,
          status: initialStatus,
          created_at: new Date().toISOString(),
        };

        setTestimonials((prev) => [newTestimonial, ...prev]);
        setFormData({ nome: "", email: "", mensagem: "", company: "", position: "", rating: 5 });
        setSubmitted(true);

        setTimeout(() => setSubmitted(false), 5000);
        setSubmitting(false);
        return;
      }

      const { error } = await supabase.from("testimonials").insert([
        {
          nome: formData.nome,
          email: formData.email,
          mensagem: formData.mensagem,
          company: formData.company,
          position: formData.position,
          rating: formData.rating,
          status: initialStatus,
          created_at: new Date().toISOString(),
        },
      ]);

      if (error) {
        console.error("Erro ao enviar testemunho:", error);
        alert("Erro ao enviar testemunho. Tente novamente.");
      } else {
        setFormData({ nome: "", email: "", mensagem: "", company: "", position: "", rating: 5 });
        setSubmitted(true);
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

  const filteredTestimonials = getFilteredTestimonials();
  const approvedTestimonials = testimonials.filter(t => t.status === 'approved');

  // Carrossel
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % approvedTestimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + approvedTestimonials.length) % approvedTestimonials.length);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section id="testimonios" className="py-24 px-6 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="max-w-7xl mx-auto">
        {/* HEADER PREMIUM */}
        <div className="text-center mb-20">
          <div className="inline-block mb-4">
            <span className="px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 text-sm font-semibold border border-blue-200">
              ⭐ Social Proof
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 mb-6">
            Histórias de Sucesso
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Veja como nossos clientes transformaram seus negócios e alcançaram resultados extraordinários
          </p>
        </div>

        {/* CARROSSEL PREMIUM */}
        {!isAdmin && (
          <div className="mb-20">
            <div className="relative">
              <div className="overflow-hidden rounded-2xl">
                {approvedTestimonials.length > 0 && (
                  <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-12 md:p-16 text-white shadow-2xl">
                    <div className="max-w-3xl">
                      {/* STARS */}
                      <div className="flex gap-1 mb-8">
                        {[...Array(approvedTestimonials[currentIndex]?.rating || 5)].map((_, i) => (
                          <Star key={i} size={24} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* QUOTE */}
                      <p className="text-2xl md:text-3xl leading-relaxed mb-10 italic font-light">
                        "{approvedTestimonials[currentIndex]?.mensagem}"
                      </p>

                      {/* AUTHOR */}
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg">
                          {getInitials(approvedTestimonials[currentIndex]?.nome || '')}
                        </div>
                        <div>
                          <p className="font-semibold text-lg">
                            {approvedTestimonials[currentIndex]?.nome}
                          </p>
                          {approvedTestimonials[currentIndex]?.position && (
                            <p className="text-slate-300 text-sm">
                              {approvedTestimonials[currentIndex]?.position}
                              {approvedTestimonials[currentIndex]?.company && ` @ ${approvedTestimonials[currentIndex]?.company}`}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* NAVIGATION */}
                    <div className="flex items-center gap-4 mt-12">
                      <button
                        onClick={prevSlide}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <div className="flex gap-2">
                        {approvedTestimonials.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`h-2 rounded-full transition-all ${
                              i === currentIndex ? 'bg-white w-8' : 'bg-white/40 w-2'
                            }`}
                          />
                        ))}
                      </div>
                      <button
                        onClick={nextSlide}
                        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* GRID DE FORMULÁRIO E TESTEMUNHOS */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* FORMULÁRIO PREMIUM */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl blur-xl opacity-20" />
            <div className="relative bg-white rounded-2xl shadow-xl p-10 border border-slate-200">
              <h3 className="text-3xl font-bold text-slate-900 mb-2">
                Compartilhe sua História
              </h3>
              <p className="text-slate-600 mb-8">
                Sua experiência pode inspirar outras pessoas. Deixe seu testemunho agora.
              </p>

              {/* ADMIN BUTTON */}
              {!isAdmin && (
                <button
                  onClick={() => setShowAdmin(true)}
                  className="text-xs text-slate-500 hover:text-slate-700 underline mb-6 float-right"
                >
                  Admin
                </button>
              )}

              {/* ADMIN LOGIN MODAL */}
              {showAdmin && !isAdmin && (
                <div className="mb-6 p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <h4 className="font-semibold text-amber-900 mb-3">Acesso Administrativo</h4>
                  <div className="flex gap-2">
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Digite a senha"
                      className="flex-1 px-3 py-2 border border-amber-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                    <button
                      onClick={handleAdminLogin}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg text-sm hover:bg-amber-700 transition"
                    >
                      Entrar
                    </button>
                    <button
                      onClick={() => setShowAdmin(false)}
                      className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg text-sm hover:bg-slate-300 transition"
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              )}

              {/* ADMIN CONTROLS */}
              {isAdmin && (
                <div className="mb-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-semibold text-blue-900 flex items-center gap-2">
                      <Filter size={18} />
                      Modo Administrador
                    </h4>
                    <button
                      onClick={() => setIsAdmin(false)}
                      className="text-xs text-blue-600 hover:text-blue-800 underline"
                    >
                      Sair
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFilter('all')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                        filter === 'all'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-300 hover:border-blue-400'
                      }`}
                    >
                      Todos ({testimonials.length})
                    </button>
                    <button
                      onClick={() => setFilter('approved')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                        filter === 'approved'
                          ? 'bg-green-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-300 hover:border-green-400'
                      }`}
                    >
                      Aprovados ({testimonials.filter(t => t.status === 'approved').length})
                    </button>
                    <button
                      onClick={() => setFilter('pending')}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition ${
                        filter === 'pending'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-white text-slate-700 border border-slate-300 hover:border-yellow-400'
                      }`}
                    >
                      Pendentes ({testimonials.filter(t => t.status === 'pending').length})
                    </button>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      placeholder="João Silva"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 hover:bg-white transition"
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="joao@example.com"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 hover:bg-white transition"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Empresa
                    </label>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Sua empresa"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 hover:bg-white transition"
                      disabled={submitting}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Cargo
                    </label>
                    <input
                      type="text"
                      name="position"
                      value={formData.position}
                      onChange={handleInputChange}
                      placeholder="Seu cargo"
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 hover:bg-white transition"
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-3">
                    Avaliação
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          className={star <= formData.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Seu testemunho
                  </label>
                  <textarea
                    name="mensagem"
                    value={formData.mensagem}
                    onChange={handleInputChange}
                    placeholder="Conte sua experiência e como você foi impactado..."
                    rows={5}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50 hover:bg-white transition resize-none"
                    disabled={submitting}
                  />
                </div>

                {submitted && (
                  <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-4 rounded-xl text-sm flex items-center gap-3">
                    <Check size={20} className="flex-shrink-0" />
                    <span>Testemunho enviado com sucesso! Obrigado por compartilhar.</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  <Send size={20} />
                  {submitting ? "Enviando..." : "Enviar Testemunho"}
                </button>
              </form>
            </div>
          </div>

          {/* LISTA DE TESTEMUNHOS */}
          <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8">
              {isAdmin ? 'Moderação de Testemunhos' : 'Testemunhos Recentes'}
            </h3>
            <div className="space-y-6 max-h-[800px] overflow-y-auto pr-4">
              {loading ? (
                <div className="text-center py-12 text-slate-500">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
                  Carregando testemunhos...
                </div>
              ) : filteredTestimonials.length === 0 ? (
                <div className="text-center py-12 text-slate-500">
                  <div className="text-5xl mb-4">📭</div>
                  {isAdmin && filter === 'pending'
                    ? "Nenhum testemunho pendente de moderação"
                    : "Nenhum testemunho ainda. Seja o primeiro!"}
                </div>
              ) : (
                filteredTestimonials.map((testimonial) => (
                  <div
                    key={testimonial.id}
                    className={`group rounded-xl overflow-hidden border transition-all duration-300 hover:shadow-lg ${
                      testimonial.status === 'pending'
                        ? 'bg-amber-50 border-amber-200'
                        : testimonial.status === 'rejected'
                        ? 'bg-red-50 border-red-200'
                        : 'bg-white border-slate-200 hover:border-blue-400'
                    }`}
                  >
                    <div className="p-6">
                      {/* STATUS & ACTIONS */}
                      {isAdmin && (
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200">
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                            testimonial.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : testimonial.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {testimonial.status === 'approved' ? '✓ Aprovado' :
                             testimonial.status === 'pending' ? '⏳ Pendente' : '✗ Rejeitado'}
                          </span>

                          {testimonial.status === 'pending' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => approveTestimonial(testimonial.id)}
                                className="px-3 py-1 bg-green-600 text-white text-xs rounded-lg hover:bg-green-700 transition font-medium"
                              >
                                Aprovar
                              </button>
                              <button
                                onClick={() => rejectTestimonial(testimonial.id)}
                                className="px-3 py-1 bg-red-600 text-white text-xs rounded-lg hover:bg-red-700 transition font-medium"
                              >
                                Rejeitar
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* RATING */}
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating || 5)].map((_, i) => (
                          <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>

                      {/* MESSAGE */}
                      <p className="text-slate-700 mb-4 leading-relaxed line-clamp-4">
                        "{testimonial.mensagem}"
                      </p>

                      {/* AUTHOR */}
                      <div className="flex items-center gap-4 pt-4 border-t border-slate-200">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center text-sm font-bold text-white">
                          {getInitials(testimonial.nome)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 truncate">
                            {testimonial.nome}
                          </p>
                          {testimonial.position && (
                            <p className="text-xs text-slate-600 truncate">
                              {testimonial.position}
                              {testimonial.company && ` • ${testimonial.company}`}
                            </p>
                          )}
                          {testimonial.created_at && (
                            <p className="text-xs text-slate-500 mt-1">
                              {new Date(testimonial.created_at).toLocaleDateString("pt-BR", {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* STATS PREMIUM */}
        <div className="mt-24 grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              {approvedTestimonials.length}+
            </div>
            <p className="text-slate-600 font-medium">Clientes Satisfeitos</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              4.9/5
            </div>
            <p className="text-slate-600 font-medium">Avaliação Média</p>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              98%
            </div>
            <p className="text-slate-600 font-medium">Taxa de Satisfação</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
