import { Facebook, Heart, Instagram, ShoppingBag, Youtube } from "lucide-react";

const AMAZON_LINK = "COLE_AQUI_O_LINK_DA_AMAZON";

const socialLinks = [
  { label: "YouTube", href: "https://www.youtube.com/@pr.alexandremeneghiniramos", icon: Youtube },
  { label: "Instagram", href: "https://www.instagram.com/pr.alexandremeneghini/", icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/alexandreendgreice.7", icon: Facebook },
];

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-slate-950 to-slate-900 pt-20 pb-8 text-slate-300">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-blue-500/5 blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mb-12 grid gap-10 border-b border-slate-800/60 pb-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <h3 className="mb-4 text-xl font-black text-white">Autoridade Sobre o Remo</h3>
            <p className="mb-6 max-w-md text-sm leading-relaxed text-slate-400">
              Um livro de Alexandre Meneghini Ramos sobre autoridade espiritual, maturidade ministerial e o verdadeiro espírito apostólico nos dias de hoje.
            </p>
            <a
              href={AMAZON_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-black text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/40"
            >
              <ShoppingBag size={16} />
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              Comprar na Amazon
            </a>
          </div>

          <div>
            <h4 className="mb-5 font-bold text-white">Navegação</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#books" className="text-slate-400 transition-colors hover:text-blue-300">O Livro</a></li>
              <li><a href="#about" className="text-slate-400 transition-colors hover:text-blue-300">Sobre o Autor</a></li>
              <li><a href={AMAZON_LINK} target="_blank" rel="noopener noreferrer" className="text-slate-400 transition-colors hover:text-blue-300">Comprar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 font-bold text-white">Redes sociais</h4>
            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-700 bg-slate-800 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:bg-blue-600 hover:text-white"
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-center text-sm text-slate-500 md:text-left">
            © {currentYear} <span className="font-semibold text-blue-400">Pr. Alexandre Meneghini</span> — Todos os direitos reservados.
          </p>

          <div className="flex flex-col items-center gap-1 text-sm text-slate-500 md:items-end">
            <div className="flex items-center gap-2">
              Feito com <Heart size={16} className="text-red-500" /> para servir vidas.
            </div>

            <a
              href="https://pubird.com"
              target="_blank"
              className="text-xs text-slate-500 opacity-70 hover:opacity-100 transition"
            >
            <p className="text-sm text-slate-400 font-medium opacity-90 hover:text-white transition">
              Desenvolvido por{" "}
              <span className="text-blue-400 hover:text-blue-300 transition">
                Pubird
              </span>
            </p>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
