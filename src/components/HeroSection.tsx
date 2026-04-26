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
    <section className="relative overflow-hidden pt-20 md:min-h-screen md:flex md:items-center md:pt-16">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/70 to-slate-950/95 md:bg-gradient-to-r md:from-slate-950/95 md:via-slate-950/65 md:to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/90" />

        <div className="absolute left-1/3 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      {/* IMAGEM DO LÍDER — DESKTOP */}
        <img
          src={leaderImg}
          alt="Pr. Alexandre"
          className="
            hidden md:block
            absolute right-0 bottom-0
            h-[85%] lg:h-full
            w-auto object-contain
            scale-110 lg:scale-115
            translate-x-14 lg:translate-x-20
            translate-y-6
            opacity-90
            pointer-events-none select-none
            z-10
          "
        />

      {/* CONTEÚDO */}
      <div className="
          container ...
          flex items-start justify-center
          py-12
          md:min-h-screen md:items-center
        ">
          <div
            className="
              w-full
              max-w-[100%] md:max-w-[720px]
              text-center md:text-left
              animate-fade-in
            "
          >

          {/* LOGO */}
          <img
            src={logoLion}
            alt="Logo"
            className="
              mx-auto md:mx-0
              mb-4
              w-24 sm:w-28 md:w-28 lg:w-32
              animate-fade-in-delay-100
              drop-shadow-[0_0_24px_rgba(59,130,246,0.45)]
            "
          />

          {/* TÍTULO */}
          <img
            src={remoImg}
            alt="Autoridade sobre o Remo"
            className="
              mx-auto md:mx-0
              mb-6
              w-[95%]
              max-w-[360px]
              sm:max-w-[460px]
              md:max-w-[520px]
              lg:max-w-[620px]
              animate-fade-in-delay-200
              drop-shadow-2xl
            "
          />

          {/* SUBTITLE */}
          <p
            className="
              mx-auto md:mx-0
              mb-8
              max-w-[360px] md:max-w-2xl
              text-base sm:text-lg md:text-xl lg:text-2xl
              font-light
              tracking-[0.16em] md:tracking-[0.25em]
              text-slate-200
              animate-fade-in-delay-300
            "
          >
            O VERDADEIRO ESPÍRITO APOSTÓLICO NOS DIAS DE HOJE
          </p>

          {/* CTA */}
          <button
            onClick={() => goToSection("books")}
            className="
              group relative inline-flex items-center gap-3
              rounded-xl
              bg-gradient-to-r from-blue-600 to-indigo-600
              px-10 py-4
              text-lg font-bold text-white
              shadow-xl shadow-blue-500/30
              transition-all duration-300
              hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-2xl hover:shadow-blue-500/50
              active:scale-95
              animate-fade-in-delay-400
            "
          >
            SAIBA MAIS
            <ArrowDown
              size={20}
              className="transition-transform group-hover:translate-y-1"
            />
          </button>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <div className="absolute bottom-8 left-1/2 z-20 hidden -translate-x-1/2 animate-bounce md:flex">
        <div className="flex h-10 w-6 items-start justify-center rounded-full border-2 border-blue-400/50 p-2">
          <div className="h-2 w-1.5 animate-pulse rounded-full bg-blue-400" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;