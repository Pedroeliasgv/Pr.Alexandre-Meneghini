import heroBg from "@/assets/hero-bg.jpg";
import logoLion from "@/assets/logo-lion.png";
import leaderImg from "@/assets/leader-portrait.png";
import remoImg from "@/assets/remo.png";

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
    <section className="relative min-h-[90vh] md:min-h-screen flex items-center overflow-hidden">

      {/* BG */}
      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      {/* 👇 IMAGEM DO LÍDER (CONTROLADA NO MOBILE) */}
      <img
        src={leaderImg}
        alt="Líder"
        className="
          absolute right-0 bottom-0

          h-[65%] sm:h-[70%] md:h-[85%] lg:h-[95%]

          w-auto object-contain

          scale-100 md:scale-125 lg:scale-150

          translate-x-10 sm:translate-x-16 md:translate-x-32 lg:translate-x-40
          translate-y-4 md:translate-y-10

          opacity-60 sm:opacity-80 md:opacity-100

          pointer-events-none
          select-none

          drop-shadow-2xl
          z-10
        "
      />

      {/* CONTEÚDO */}
      <div className="container mx-auto relative z-20 flex flex-col px-4 pt-24 md:pt-20">

        <div className="max-w-xl md:max-w-2xl text-center lg:text-left animate-fade-up">

          {/* LOGO */}
          <img
            src={logoLion}
            alt="Logo"
            className="w-28 sm:w-32 md:w-44 lg:w-52 mx-auto lg:mx-0 mb-5 md:mb-6"
          />

          {/* TÍTULO IMAGEM */}
          <img
            src={remoImg}
            alt="Autoridade sobre o Remo"
            className="
              w-[220px] sm:w-[280px] md:w-[450px] lg:w-[600px]
              mx-auto lg:mx-0
              mb-5 md:mb-6
            "
          />

          {/* TEXTO */}
          <p className="text-sm sm:text-base md:text-xl text-white/90 tracking-wide md:tracking-wider mb-6 md:mb-8 px-2 sm:px-0">
            O VERDADEIRO ESPÍRITO APOSTÓLICO NOS DIAS DE HOJE
          </p>

          {/* BOTÃO */}
          <button
            onClick={() => goToSection("books")}
            className="
              w-full sm:w-auto

              bg-blue-500 hover:bg-blue-600
              text-white

              px-6 sm:px-10
              py-3 sm:py-4

              rounded-lg
              text-sm sm:text-base md:text-lg font-bold

              transition-all duration-300
              hover:scale-105 active:scale-95

              animate-cta
              shadow-lg
            "
          >
            SAIBA MAIS
          </button>

        </div>

      </div>
    </section>
  );
};

export default HeroSection;