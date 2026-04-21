import { Youtube, Instagram, Facebook } from "lucide-react";

const FooterCTA = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden text-center">

      {/* CTA */}
      <a
        href="https://wa.me/5511919311999?text=Paz do senhor Pr. Alexandre, Vim através do site"
        target="_blank"
        className="
          inline-block bg-blue-500 hover:bg-blue-600
          text-white px-12 py-5 rounded-xl text-lg font-bold tracking-widest

          transition-all duration-300
          hover:scale-105

          shadow-[0_10px_40px_rgba(59,130,246,0.3)]
          animate-cta
        "
      >
        ENTRE EM CONTATO
      </a>

      {/* REDES */}
      <div className="flex justify-center gap-6 mt-10">

        {[{
          icon: <Youtube size={22} />,
          link: "https://www.youtube.com/@pr.alexandremeneghiniramos"
        },
        {
          icon: <Instagram size={22} />,
          link: "https://www.instagram.com/pr.alexandremeneghiniramos/"
        },
        {
          icon: <Facebook size={22} />,
          link: "https://www.facebook.com/alexandreendgreice.7"
        }].map((item, i) => (
          <a
            key={i}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="
              w-14 h-14 rounded-full
              bg-card border border-border

              flex items-center justify-center

              transition-all duration-300
              hover:-translate-y-2
              hover:border-blue-500
              hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]
            "
          >
            <div className="text-white/70 hover:text-blue-400 transition">
              {item.icon}
            </div>
          </a>
        ))}

      </div>

      {/* COPYRIGHT */}
      <p className="mt-12 text-xs text-white/50 tracking-wide">
        © {new Date().getFullYear()} ALEXANDRE MENEGHINI — TODOS OS DIREITOS RESERVADOS.
      </p>

      {/* GLOW */}
      <div className="
        absolute bottom-0 left-1/2
        w-[400px] h-[200px]
        bg-blue-500/10
        blur-[120px]
        -translate-x-1/2
        pointer-events-none
        animate-breathing-blue
      " />

    </section>
  );
};

export default FooterCTA;