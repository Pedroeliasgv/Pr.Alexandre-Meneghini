import { Calendar, MapPin, Users, ArrowRight } from "lucide-react";

const events = [
  {
    title: "Conferência Profética 2026",
    date: "15-17 Mai 2026",
    location: "São Paulo, SP",
    spots: "Vagas limitadas",
    description: "Três dias de ministração intensiva sobre o futuro da Igreja"
  },
  {
    title: "Encontro de Líderes",
    date: "22 Jun 2026",
    location: "Rio de Janeiro, RJ",
    spots: "Inscrições abertas",
    description: "Desenvolva sua liderança apostólica em comunidade"
  },
  {
    title: "Retiro Espiritual",
    date: "10-12 Jul 2026",
    location: "Campos do Jordão, SP",
    spots: "Em breve",
    description: "Experiência transformadora em contato com Deus"
  },
];

const EventsSection = () => {
  return (
    <section id="events" className="relative py-24 md:py-32 bg-gradient-to-b from-white via-slate-50 to-white overflow-hidden">
      
      {/* GLOW */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-200/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-200/20 rounded-full blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-blue-100 border border-blue-300 text-blue-700">
            <Calendar size={16} />
            <span className="text-sm font-semibold">EVENTOS PRESENCIAIS</span>
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
            Viva essa <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">experiência</span> conosco
          </h2>

          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Encontros transformadores que conectam você com Deus e com uma comunidade de propósito
          </p>
        </div>

        {/* CARDS */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {events.map((e, i) => (
            <div
              key={i}
              className="group relative bg-white rounded-2xl border border-slate-200 p-8 overflow-hidden transition-all duration-300 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2"
            >

              {/* GLOW BG */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* CONTENT */}
              <div className="relative space-y-4">
                
                {/* TITLE */}
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {e.title}
                </h3>

                {/* DESCRIPTION */}
                <p className="text-slate-600">
                  {e.description}
                </p>

                {/* DIVIDER */}
                <div className="w-12 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full" />

                {/* INFO GRID */}
                <div className="space-y-3 pt-4">
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Calendar size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Data</div>
                      <div className="font-semibold">{e.date}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <MapPin size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Local</div>
                      <div className="font-semibold">{e.location}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                      <Users size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 uppercase tracking-wider">Vagas</div>
                      <div className="font-semibold">{e.spots}</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <a
                  href="#contact"
                  className="group/btn inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 mt-4 transition-all"
                >
                  Participar
                  <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
