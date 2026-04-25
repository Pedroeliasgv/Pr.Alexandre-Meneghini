import { useEffect, useState } from "react";
import { Menu, X, Sparkles, ShoppingBag } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AMAZON_LINK = "COLE_AQUI_O_LINK_DA_AMAZON";

const navLinks = [
  { label: "O Livro", href: "#books" },
  { label: "Autor", href: "#about" },
  { label: "Comprar", href: "#books" },
] as const;

const buyButtonClass =
  "group relative overflow-hidden items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 text-sm font-bold text-white transition-all duration-300 hover:scale-105 hover:from-blue-700 hover:to-indigo-700 hover:shadow-xl hover:shadow-blue-500/40 active:scale-95";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }

    setOpen(false);
  };

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-slate-800/70 bg-slate-950/95 shadow-lg backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 md:px-6">
        <Link to="/" className="group flex items-center gap-2">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-400 opacity-70 blur transition group-hover:opacity-100" />
            <div className="relative flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-1">
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-sm font-bold tracking-widest text-white">
                PR. ALEXANDRE
              </span>
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="rounded-lg px-4 py-2 text-sm font-medium text-slate-400 transition-all duration-300 hover:bg-slate-800/50 hover:text-white"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={AMAZON_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buyButtonClass} hidden sm:flex`}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <ShoppingBag size={16} className="relative z-10" />
            <span className="relative z-10">Comprar agora</span>
          </a>

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-2.5 text-slate-300 transition-colors hover:bg-slate-800/50 md:hidden"
            aria-label="Abrir menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="space-y-2 border-t border-slate-800/50 bg-slate-950/95 px-4 py-4 backdrop-blur-xl md:hidden">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNavClick(link.href)}
              className="block w-full rounded-lg px-4 py-2.5 text-left text-sm text-slate-300 transition-all duration-300 hover:bg-slate-800/50 hover:text-white"
            >
              {link.label}
            </button>
          ))}

          <a
            href={AMAZON_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buyButtonClass} mt-2 flex w-full py-3`}
          >
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            <ShoppingBag size={16} className="relative z-10" />
            <span className="relative z-10">Comprar na Amazon</span>
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;