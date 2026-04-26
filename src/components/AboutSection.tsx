import aboutImg from "@/assets/about-portrait.png";
import { Award, Book, Quote, Scale, Sparkles, Users } from "lucide-react";

const stats = [
  { icon: Scale, label: "Anos de advocacia", value: "18+" },
  { icon: Award, label: "Atuações no Júri", value: "357" },
  { icon: Users, label: "Anos de ministério", value: "16+" },
  { icon: Book, label: "Áreas de estudo", value: "Múltiplas" },
];

const AboutSection = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-24 md:py-32"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-0 top-1/4 h-96 w-96 rounded-full bg-blue-500/15 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_left,rgba(59,130,246,0.12),transparent_35%)]" />
      </div>

      <img
        src={aboutImg}
        alt="Alexandre Meneghini Ramos"
        className="
          pointer-events-none absolute bottom-0 left-1/2
          h-[78%] w-auto
          -translate-x-1/2
          object-contain
          opacity-15
          brightness-125 contrast-110 saturate-110
          select-none
          sm:opacity-20
          lg:left-0 lg:h-[98%] lg:-translate-x-16 lg:opacity-60
          xl:opacity-75
        "
      />

      <div className="absolute left-0 bottom-0 hidden h-full w-[48%] bg-gradient-to-r from-transparent via-slate-950/20 to-slate-950 lg:block" />

      <div className="container relative z-10 mx-auto px-4">
        <div className="ml-auto max-w-4xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-blue-200">
            <Sparkles size={16} />
            <span className="text-xs font-bold uppercase tracking-[0.25em]">
              Sobre o autor
            </span>
          </div>

          <h2 className="mb-8 text-3xl font-black leading-tight text-white md:text-5xl">
            Uma trajetória construída entre{" "}
            <span className="bg-gradient-to-r from-blue-300 to-cyan-300 bg-clip-text text-transparent">
              fé, ensino e autoridade espiritual
            </span>
          </h2>

          <div className="relative mb-8 rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl backdrop-blur-md">
            <Quote className="mb-4 text-blue-300" size={28} />

            <div className="space-y-5 text-base leading-relaxed text-slate-300 md:text-lg">
              <p>
                <strong className="text-white">
                  Alexandre Meneghini Ramos
                </strong>{" "}
                é bacharel em Direito e estudioso de áreas como Direito Penal,
                Teologia, Antropologia, História da Religião e Filosofia.
              </p>

              <p>
                Com experiência na advocacia criminal e uma caminhada ministerial
                marcada pelo ensino bíblico, une profundidade técnica, clareza de
                comunicação e compromisso com a formação espiritual.
              </p>

              <p className="font-medium text-white">
                Em{" "}
                <span className="text-blue-300">
                  “Autoridade Sobre o Remo”
                </span>
                , apresenta uma reflexão profunda sobre autoridade, governo
                espiritual e o verdadeiro espírito apostólico nos dias atuais.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
              const Icon = stat.icon;

              return (
                <div
                  key={stat.label}
                  className="group rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/40 hover:bg-white/10 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <Icon
                    className="mb-4 text-blue-300 transition-transform duration-300 group-hover:scale-110"
                    size={24}
                  />
                  <p className="text-2xl font-black text-white">
                    {stat.value}
                  </p>
                  <p className="text-sm text-slate-400">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;