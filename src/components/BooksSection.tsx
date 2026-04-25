import bookImg from "@/assets/book-mockup.png";
import {
  BookOpen,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  ShoppingBag,
  Star,
} from "lucide-react";

const AMAZON_LINK = "COLE_AQUI_O_LINK_DA_AMAZON";

const features = [
  {
    title: "Autoridade espiritual",
    desc: "Entenda o princípio de governo e direção por trás do chamado apostólico.",
  },
  {
    title: "Maturidade ministerial",
    desc: "Uma leitura para líderes, ministros e cristãos que desejam crescer com fundamento.",
  },
  {
    title: "Aplicação para hoje",
    desc: "Reflexões práticas sobre o verdadeiro espírito apostólico nos dias atuais.",
  },
];

const BooksSection = () => {
  return (
    <section
      id="books"
      className="relative overflow-hidden bg-gradient-to-br from-white via-slate-50 to-blue-50 py-24 md:py-32"
    >
      {/* BACKGROUND EFFECT */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-blue-200/40 blur-[120px]" />
        <div className="absolute bottom-0 left-1/4 h-96 w-96 rounded-full bg-cyan-200/30 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
          
          {/* LEFT */}
          <div className="space-y-8 animate-fade-in">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-300 bg-blue-100 px-4 py-2 text-blue-700 animate-fade-in-delay-100">
                <BookOpen size={16} />
                <span className="text-sm font-bold">AUTORIDADE SOBRE O REMO</span>
              </div>

              <h2 className="mb-5 text-4xl font-black leading-tight text-slate-950 md:text-5xl lg:text-6xl animate-fade-in-delay-200">
                Um livro para quem deseja assumir o chamado com
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  {" "}maturidade
                </span>
              </h2>

              <p className="text-lg leading-relaxed text-slate-600 md:text-xl animate-fade-in-delay-300">
                Descubra o que está por trás da verdadeira autoridade espiritual e como o espírito apostólico se manifesta na Igreja de hoje.
              </p>
            </div>

            {/* FEATURES */}
            <div className="grid gap-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="group flex gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 text-sm font-black text-white transition-all group-hover:scale-110">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="mb-1 font-bold text-slate-950">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-600">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* REVIEW BOX */}
            <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-5 animate-fade-in-delay-400">
              <div className="mb-3 flex items-center gap-2 text-slate-900">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-yellow-400 text-yellow-400 animate-pulse"
                  />
                ))}
                <span className="ml-2 text-sm font-bold">Leitura recomendada</span>
              </div>

              <p className="text-sm leading-relaxed text-slate-600">
                Ideal para líderes, obreiros, pastores, ministros e cristãos que buscam uma compreensão mais profunda sobre governo espiritual.
              </p>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              
              <a
                href={AMAZON_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group relative inline-flex items-center justify-center gap-3
                  rounded-xl
                  bg-gradient-to-r from-blue-600 to-indigo-600
                  px-10 py-4 text-lg font-black text-white
                  transition-all duration-300
                  hover:scale-105 active:scale-95
                  hover:from-blue-700 hover:to-indigo-700
                  shadow-xl shadow-blue-500/20
                  hover:shadow-2xl hover:shadow-blue-500/40
                  overflow-hidden
                "
              >
                {/* brilho animado */}
                <span className="
                  absolute inset-0
                  -translate-x-full
                  bg-gradient-to-r from-transparent via-white/25 to-transparent
                  transition-transform duration-700
                  group-hover:translate-x-full
                " />

                <ShoppingBag size={22} className="relative z-10" />

                <span className="relative z-10">
                  Comprar agora na Amazon
                </span>

                <ChevronRight
                  size={22}
                  className="relative z-10 transition-transform group-hover:translate-x-1"
                />
              </a>

              <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                <ShieldCheck size={18} className="text-green-600" />
                Compra segura pela Amazon
              </div>
            </div>
          </div>

          {/* RIGHT (IMAGEM) */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="absolute -inset-8 rounded-[2rem] bg-gradient-to-r from-blue-200/40 to-cyan-200/40 blur-3xl animate-pulse" />

            <img
              src={bookImg}
              alt="Livro Autoridade Sobre o Remo"
              className="
                relative w-full max-w-md lg:max-w-none
                drop-shadow-2xl
                transition-transform duration-500
                hover:scale-105
              "
            />

            {/* CARD */}
            <div className="absolute -bottom-6 left-1/2 w-[90%] max-w-sm -translate-x-1/2 rounded-2xl border border-white/60 bg-white/80 p-4 text-center shadow-xl backdrop-blur-md lg:left-auto lg:right-6 lg:translate-x-0 animate-fade-in-delay-500">
              <div className="mb-1 flex items-center justify-center gap-2 text-slate-950">
                <CheckCircle2 size={18} className="text-blue-600" />
                <span className="font-bold">Disponível na Amazon</span>
              </div>
              <p className="text-xs text-slate-600">
                Clique no botão e finalize sua compra direto na plataforma.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default BooksSection;