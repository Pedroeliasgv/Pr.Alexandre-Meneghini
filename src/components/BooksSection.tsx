import bookImg from "@/assets/book-mockup.png";
import { Link } from "react-router-dom";

const BooksSection = () => {
  return (
    <section
      id="books"
      className="py-28 bg-white relative overflow-hidden"
    >
      <div className="container mx-auto px-4">

        <div className="flex flex-col-reverse md:flex-row items-center gap-20 max-w-6xl mx-auto">

          {/* TEXTO */}
          <div className="flex-1 space-y-7 text-center md:text-left reveal-left">

            <p className="text-blue-500 tracking-[0.35em] text-xs uppercase">
              Autoridade sobre o Remo
            </p>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Um conteúdo que poucos têm coragem de ensinar
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
              Um apostolado que quase ninguém fala, mas que revela quem realmente
              está alinhado com o governo espiritual estabelecido por Deus.
            </p>

            <div className="pt-2">
              <Link
                to="/produto"
                className="
                  relative inline-block overflow-hidden
                  bg-blue-500 text-white px-10 py-4 rounded-lg font-bold

                  before:absolute before:inset-0 before:bg-white/10
                  before:opacity-0 hover:before:opacity-100 before:transition

                  transition-all duration-300
                  hover:scale-105

                  shadow-[0_10px_30px_rgba(59,130,246,0.3)]
                  animate-cta
                "
              >
                QUERO ACESSAR AGORA
              </Link>
            </div>

          </div>

          {/* IMAGEM */}
          <div className="flex-1 flex justify-center relative reveal-right">

            <div className="absolute w-[450px] h-[450px] bg-blue-500/10 blur-[140px] rounded-full" />

            <img
              src={bookImg}
              alt="Livro Autoridade sobre o Remo"
              className="
                relative
                w-[420px] md:w-[540px] lg:w-[680px]

                drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)]

                hover:scale-110
                transition-transform duration-500

                animate-float
              "
            />

          </div>

        </div>

      </div>

      <div className="absolute bottom-0 left-1/2 w-[500px] h-[200px] bg-blue-500/10 blur-[120px] -translate-x-1/2 pointer-events-none" />
    </section>
  );
};

export default BooksSection;