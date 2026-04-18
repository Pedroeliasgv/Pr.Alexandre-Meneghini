import { Calendar, MapPin, Users } from "lucide-react";

const events = [
  {
    title: "Conferência Profética 2026",
    date: "15-17 Mai 2026",
    location: "São Paulo, SP",
    spots: "Vagas limitadas",
  },
  {
    title: "Encontro de Líderes",
    date: "22 Jun 2026",
    location: "Rio de Janeiro, RJ",
    spots: "Inscrições abertas",
  },
  {
    title: "Retiro Espiritual",
    date: "10-12 Jul 2026",
    location: "Campos do Jordão, SP",
    spots: "Em breve",
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4">

        {/* HEAD */}
        <div className="text-center mb-16">
          <p className="text-primary tracking-[0.3em] text-sm mb-4 uppercase animate-fade-up">
            Eventos Presenciais
          </p>

          <h2 className="text-3xl md:text-4xl font-bold text-white animate-fade-up delay-100">
            Venha viver essa experiência
          </h2>

          <div className="w-20 h-[2px] bg-blue-500 mx-auto mt-6 animate-fade-up delay-200" />
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

          {events.map((e, i) => (
            <div
              key={i}
              className="
                group relative bg-background border border-primary/10
                rounded-xl p-6 overflow-hidden

                transition-all duration-300
                hover:-translate-y-2
                hover:border-blue-500
                hover:shadow-[0_10px_40px_rgba(59,130,246,0.2)]

                animate-fade-up
              "
              style={{ animationDelay: `${i * 0.15}s` }}
            >

              {/* brilho sutil */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-40">
                <div className="absolute -left-1/2 top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] animate-shine" />
              </div>

              {/* título */}
              <h3 className="text-lg font-semibold text-white mb-4 group-hover:text-blue-400 transition">
                {e.title}
              </h3>

              {/* infos */}
              <div className="space-y-3 text-sm text-muted-foreground">

                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-blue-400" />
                  {e.date}
                </div>

                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-blue-400" />
                  {e.location}
                </div>

                <div className="flex items-center gap-2">
                  <Users size={16} className="text-blue-400" />
                  {e.spots}
                </div>

              </div>

              {/* CTA */}
              <a
                href="#contact"
                className="inline-block mt-5 text-sm text-blue-400 font-semibold opacity-80 hover:opacity-100 transition"
              >
                Quero participar →
              </a>
            </div>
          ))}

        </div>

        {/* BOTÃO FINAL */}
        <div className="text-center mt-14">
          <a
            href="#contact"
            className="
              inline-block bg-blue-500 hover:bg-blue-600
              text-white px-8 py-3 rounded-lg font-bold

              transition-all duration-300
              hover:scale-105

              shadow-lg animate-cta
            "
          >
            FALAR COM A EQUIPE
          </a>
        </div>

      </div>

      {/* glow azul */}
      <div className="absolute bottom-0 left-1/2 w-[500px] h-[250px] bg-blue-500/10 blur-[120px] -translate-x-1/2 pointer-events-none" />
    </section>
  );
};

export default EventsSection;