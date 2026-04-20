import aboutImg from "@/assets/about-portrait.png";

const AboutSection = () => {
  return (
    <section id="about" className="relative py-24 bg-secondary overflow-hidden">
      <div className="container mx-auto px-4 relative z-20">

        <p className="text-center text-primary tracking-[0.3em] text-sm mb-4 uppercase">
          Sobre o Autor
        </p>

        <h2
          className="
            text-3xl md:text-4xl font-bold text-white-500 mb-16

            max-w-4xl mx-auto
            text-center md:text-left

            md:pl-20 lg:pl-32 xl:pl-40
          "
        >
          Uma vida dedicada ao ensino, à fé e ao chamado apostólico
        </h2>

        <div
          className="
            max-w-4xl mx-auto
            text-center md:text-left
            space-y-5
            text-foreground/80 leading-relaxed text-sm md:text-base

            md:pl-20 lg:pl-32 xl:pl-40
          "
        >
          <p>
            <strong className="text-white">
              Alexandre Meneghini Ramos
            </strong>{" "}
            é bacharel em Direito e especialista em diversas áreas, incluindo
            Direito Penal, Teologia e Antropologia. Pesquisador das estruturas
            do pensamento e da fé, segue aprofundando seus estudos em História
            da Religião e Filosofia.
          </p>

          <p>
            Com 18 anos na advocacia criminal e 357 atuações no Tribunal do Júri,
            une precisão técnica e oratória à sua trajetória ministerial de 16 anos,
            marcada pelo ensino bíblico e formação espiritual com foco nos dons
            do Espírito Santo.
          </p>

          <p>
            Sua atuação conecta Direito e Teologia de forma estratégica,
            trazendo uma abordagem sólida e prática para os desafios da Igreja atual.
          </p>

          <p className="text-white font-medium">
            Em “Autoridade Sobre o Remo”, apresenta uma visão profunda sobre o
            ministério apostólico e o governo descrito em Efésios 4 um chamado
            ao alinhamento e à maturidade da Igreja.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start">
            <a
              href="#books"
              className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
            >
              QUERO COMEÇAR AGORA
            </a>

            <a
              href="#videos"
              className="border border-primary text-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary/10 transition"
            >
              ASSISTIR CONTEÚDOS
            </a>
          </div>
        </div>
      </div>

      <img
        src={aboutImg}
        alt="Autor"
        className="
          absolute left-0 bottom-0
          h-[90%] md:h-[100%]
          w-auto object-contain

          scale-125 md:scale-150 lg:scale-175

          -translate-x-16 md:-translate-x-24 lg:-translate-x-32
          translate-y-10 md:translate-y-16

          opacity-90
          pointer-events-none

          z-10
        "
      />
    </section>
  );
};

export default AboutSection;