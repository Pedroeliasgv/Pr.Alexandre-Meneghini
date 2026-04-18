import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

const navLinks = [
  { label: "Visão", href: "#about" },
  { label: "Livros", href: "#books" },
  { label: "YouTube", href: "#videos" },
  { label: "Eventos", href: "#events" },
  { label: "Contato", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [animate, setAnimate] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { cart } = useCart();

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (cartCount > 0) {
      setAnimate(true);
      setTimeout(() => setAnimate(false), 300);
    }
  }, [cartCount]);

  const handleNavClick = (href) => {
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-gray-800 text-white">
        
        <div className="max-w-6xl mx-auto flex items-center justify-between h-16 px-4">

          {/* LOGO */}
          <Link
            to="/"
            className="font-semibold text-sm md:text-base tracking-widest uppercase text-white"
          >
            Pr. Alexandre <br /> Meneghini
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-8">

            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNavClick(l.href)}
                className="text-sm font-medium text-gray-300 hover:text-white transition uppercase"
              >
                {l.label}
              </button>
            ))}

            {/* CTA */}
            <button
              onClick={() => handleNavClick("#cta")}
              className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded text-sm font-semibold transition"
            >
              Já sou membro
            </button>

            {/* 🛒 CARRINHO */}
            <button
              onClick={() => setOpenCart(true)}
              className="relative p-2 rounded-full hover:bg-white/10 transition"
            >
              <ShoppingCart size={22} />

              {cartCount > 0 && (
                <span
                  className={`
                    absolute -top-1 -right-1
                    bg-blue-500 text-white text-xs
                    w-5 h-5 flex items-center justify-center
                    rounded-full
                    transition-transform duration-200
                    ${animate ? "scale-125" : "scale-100"}
                  `}
                >
                  {cartCount}
                </span>
              )}
            </button>

          </div>

          {/* MOBILE BTN */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-white"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE MENU */}
        {open && (
          <div className="md:hidden bg-black border-t border-gray-800 px-4 pb-4 space-y-3">

            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNavClick(l.href)}
                className="block w-full text-left text-sm text-gray-300 hover:text-white py-1 uppercase"
              >
                {l.label}
              </button>
            ))}

            <button
              onClick={() => handleNavClick("#cta")}
              className="block w-full bg-blue-500 text-white py-2 rounded text-sm font-semibold"
            >
              Já sou membro
            </button>

            {/* 🛒 MOBILE */}
            <button
              onClick={() => {
                setOpen(false);
                setOpenCart(true);
              }}
              className="flex items-center justify-center gap-2 w-full border border-gray-700 py-2 rounded text-sm text-white"
            >
              <ShoppingCart size={18} />
              Ver carrinho ({cartCount})
            </button>

          </div>
        )}
      </nav>

      {/* DRAWER DO CARRINHO */}
      <CartDrawer
        open={openCart}
        onClose={() => setOpenCart(false)}
      />
    </>
  );
};

export default Navbar;