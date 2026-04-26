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
    <section className="relative min-h-screen flex items-center overflow-visible pt-20 md:pt-16">
      {/* BACKGROUND */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover" />

        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/65 to-slate-950/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/55 via-transparent to-slate-950/90" />

        <div className="absolute top-1/2 left-1/3 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[120px]" />
        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[120px]" />
      </div>

      {/* IMAGEM DO LÍDER */}
        <img
          src={leaderImg}
          alt="Pr. Alexandre"
          className="
            absolute bottom-0 left-1/2
            -translate-x-1/2

            w-[85%]
            max-w-[320px]

            object-contain

            opacity-60
            brightness-110

            z-[5]   

            md:left-auto md:right-0
            md:w-auto md:h-[88%]
            md:translate-x-14 md:opacity-90

            lg:h-full lg:translate-x-20
          "
        />

      {/* CONTEÚDO */}
      <div
        className="
          container mx-auto relative z-30
          flex items-center justify-center md:justify-start
          min-h-screen
          px-5 sm:px-8 md:px-12 lg:px-20
        "
      >
        <div
          className="
            w-full
            max-w-[100%] md:max-w-[720px]
            text-center md:text-left
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
              w-28 sm:w-32 md:w-28 lg:w-32
              mx-auto md:mx-0
              mb-5
              animate-fade-in-delay-100
              drop-shadow-[0_0_24px_rgba(59,130,246,0.45)]
            "
          />

          {/* TÍTULO */}
          <img
            src={remoImg}
            alt="Autoridade sobre o Remo"
            className="
              w-[95%]
              max-w-[390px]
              sm:max-w-[460px]
              md:max-w-[520px]
              lg:max-w-[620px]
              mx-auto md:mx-0
              mb-6
              animate-fade-in-delay-200
              drop-shadow-2xl
            "
          />

          {/* SUBTITLE */}
          <p
            className="
              mx-auto md:mx-0
              max-w-[360px] md:max-w-2xl
              text-base sm:text-lg md:text-xl lg:text-2xl
              text-slate-200
              tracking-[0.16em] md:tracking-[0.25em]
              mb-8
              font-light
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
              bg-gradient-to-r from-blue-600 to-indigo-600
              hover:from-blue-700 hover:to-indigo-700
              text-white
              px-10 md:px-10 py-4
              rounded-xl
              text-lg font-bold
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