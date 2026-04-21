import { useState, useEffect } from "react";
import { Star } from "lucide-react";

interface Testimony {
  id: string;
  nome: string;
  sobrenome: string;
  email: string;
  mensagem: string;
  data: string;
  aprovado: boolean;
}

const TestimonialsSection = () => {
  const [testimonials, setTestimonials] = useState<Testimony[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:3001/testimonials");
        if (!response.ok) throw new Error("Erro ao buscar testemunhos");

        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        console.error("Erro:", err);
        setError("Não foi possível carregar os testemunhos");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* HEAD */}
        <div className="text-center mb-16">
          <p className="text-primary tracking-[0.3em] text-sm mb-4 uppercase">
            Testemunhos
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Histórias que Transformam
          </h2>

          <p className="text-muted-foreground max-w-lg mx-auto mt-4">
            Conheça histórias de vidas transformadas pela graça de Deus.
          </p>

          <div className="w-20 h-[2px] bg-blue-500 mx-auto mt-6" />
        </div>

        {/* TESTEMUNHOS */}
        {isLoading ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Carregando testemunhos...</p>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <p className="text-red-400">{error}</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Nenhum testemunho aprovado ainda.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimony) => (
              <div
                key={testimony.id}
                className="bg-card border border-primary/10 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                {/* RATING */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>

                {/* MENSAGEM */}
                <p className="text-white/80 text-sm mb-4 line-clamp-4 leading-relaxed">
                  "{testimony.mensagem}"
                </p>

                {/* AUTOR */}
                <div className="pt-4 border-t border-primary/10">
                  <p className="text-white font-semibold text-sm">
                    {testimony.nome} {testimony.sobrenome}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {formatDate(testimony.data)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TestimonialsSection;
