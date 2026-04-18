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
    <section className="relative min-h-screen flex items-center overflow-hidden">

      <img
        src={heroBg}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <img
        src={leaderImg}
        alt="Líder"
        className="
          absolute right-0 bottom-0
          h-[85%] md:h-[90%] lg:h-[95%]
          w-auto object-contain

          scale-110 md:scale-125 lg:scale-150

          translate-x-20 md:translate-x-32 lg:translate-x-40
          translate-y-6 md:translate-y-10

          drop-shadow-2xl

          z-10
        "
      />

      <div className="container mx-auto relative z-20 flex flex-col px-4 pt-20">

        <div className="max-w-2xl text-center lg:text-left animate-fade-up">

          <img
            src={logoLion}
            alt="Logo"
            className="w-40 md:w-52 mx-auto lg:mx-0 mb-6"
          />

          <img
            src={remoImg}
            alt="Autoridade sobre o Remo"
            className="w-[300px] md:w-[500px] lg:w-[600px] mx-auto lg:mx-0 mb-6"
          />

          <p className="text-xl md:text-xl text-white/90 tracking-wider mb-8">
            O VERDADEIRO ESPÍRITO APOSTÓLICO NOS DIAS DE HOJE
          </p>

          <button
              onClick={() => goToSection("books")}
              className="
                inline-block bg-blue-500 hover:bg-blue-600
                text-white px-10 py-4 rounded-lg text-lg font-bold

                transition-all duration-300
                hover:scale-105

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