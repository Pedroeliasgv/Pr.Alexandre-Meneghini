import heroBg from "@/assets/hero-bg.jpg";
import logoLion from "@/assets/logo-lion.png";
import leaderImg from "@/assets/leader-portrait.png";
import remoImg from "@/assets/remo.png";
import { ArrowDown } from "lucide-react";

const HeroSection = () => {
  const goToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const offset = 80;

    window.scrollTo({
      top: element.offsetTop - offset,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/55 to-slate-950/25" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/85" />

        <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
      </div>

      {/* IMAGEM DO LÍDER */}
      <img
        src={leaderImg}
        alt="Pr. Alexandre"
        className="
          absolute right-0 bottom-0
          h-[68%] md:h-[88%] lg:h-[100%]
          w-auto object-contain
          scale-105 md:scale-110 lg:scale-115
          translate-x-10 md:translate-x-14 lg:translate-x-20
          translate-y-0 md:translate-y-6
          opacity-75 md:opacity-90
          pointer-events-none select-none
          z-10
        "
      />

      {/* CONTEÚDO */}
      <div
        className="
          container mx-auto relative z-20
          flex items-center justify-start
          min-h-screen
          px-5 sm:px-8 md:px-12 lg:px-20
        "
      >
        <div
          className="
            max-w-[720px]
            text-left
            animate-fade-in
            mt-4 md:mt-0
          "
        >
          {/* BADGE */}
          <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300">
            <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
            <span className="text-xs md:text-sm font-medium">
              MINISTÉRIO APOSTÓLICO
            </span>
          </div>

          {/* LOGO */}
          <img
            src={logoLion}
            alt="Logo"
            className="
              w-20 sm:w-24 md:w-28 lg:w-32
              mb-4
              animate-fade-in-delay-100
              drop-shadow-[0_0_24px_rgba(59,130,246,0.45)]
            "
          />

          {/* TÍTULO */}
          <img
            src={remoImg}
            alt="Autoridade sobre o Remo"
            className="
              w-[260px] sm:w-[380px] md:w-[520px] lg:w-[620px]
              mb-6
              animate-fade-in-delay-200
              drop-shadow-2xl
            "
          />

          {/* SUBTITLE */}
          <p
            className="
              text-sm sm:text-base md:text-xl lg:text-2xl
              text-slate-200
              tracking-[0.18em] md:tracking-[0.25em]
              mb-8
              font-light
              animate-fade-in-delay-300
              max-w-2xl
            "
          >
            O ESPÍRITO APOSTÓLICO NOS DIAS DE HOJE
          </p>

          {/* CTA */}
          <button
            onClick={() => goToSection("books")}
            className="
              group relative inline-flex items-center gap-3
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              text-white
              px-8 md:px-10 py-4
              rounded-xl
              text-base md:text-lg font-bold
              transition-all duration-300
              hover:scale-105 active:scale-95
              shadow-xl shadow-blue-500/30
              hover:shadow-2xl hover:shadow-blue-500/50
              animate-fade-in-delay-400
            "
          >
            SAIBA MAIS
            <ArrowDown
              size={20}
              className="group-hover:translate-y-1 transition-transform"
            />
          </button>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-blue-400/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1.5 h-2 bg-blue-400 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;