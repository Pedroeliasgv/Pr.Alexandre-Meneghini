import { useState } from "react";
import bookImg from "@/assets/book-mockup.png";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import Navbar from "@/components/Navbar";

const Product = () => {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [animate, setAnimate] = useState(false);

  const price = 195;

  const navigate = useNavigate();

  const increase = () => {
    setQty((prev) => prev + 1);
    triggerAnim();
  };

  const decrease = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
      triggerAnim();
    }
  };

  const triggerAnim = () => {
    setAnimate(true);
    setTimeout(() => setAnimate(false), 200);
  };

  const total = price * qty;

  // Funções de compra removidas
  const handleBuyNow = () => {
    // Aqui você pode implementar a lógica de compra direta
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Navbar />

      <div className="pt-28 pb-24 px-6 relative">

        {/* TOAST */}
        {added && (
          <div className="fixed top-6 right-6 z-50 bg-green-500/95 backdrop-blur-sm text-white px-6 py-4 rounded-xl shadow-xl flex items-center gap-3 animate-[fadeIn_0.3s_ease]">
            <CheckCircle size={22} />
            Obrigado pela sua compra!
          </div>
        )}

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* IMAGEM */}
          <div className="flex justify-center relative group">
            <div className="absolute w-[450px] h-[450px] bg-blue-500/10 blur-[120px] rounded-full animate-pulse-slow" />

            <img
              src={bookImg}
              alt="Livro"
              className="relative w-[420px] md:w-[520px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.25)] transition-all duration-500 group-hover:scale-105 animate-float"
            />
          </div>

          {/* INFO */}
          <div className="space-y-7">

            <button
              onClick={() => navigate("/")}
              className="text-sm text-gray-500 hover:text-blue-500 transition"
            >
              ← Voltar para página inicial
            </button>

            <div className="space-y-2">
              <p className="text-blue-500 uppercase text-xs tracking-widest">
                Livro físico
              </p>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Autoridade sobre o Remo
              </h1>

              <p className="text-gray-500 text-sm">
                SKU: 111
              </p>
            </div>

            {/* PREÇO UNITÁRIO */}
            <div className="flex items-end gap-4">
              <p className="text-4xl font-bold text-blue-600">
                R$195,00
              </p>

              <span className="text-sm text-green-600 font-semibold">
                em até 12x sem juros
              </span>
            </div>

            {/* TOTAL DINÂMICO */}
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-sm text-gray-500">Total</p>

              <p
                className={`text-3xl font-bold text-blue-600 transition-transform duration-200 ${
                  animate ? "scale-110" : "scale-100"
                }`}
              >
                R${total.toFixed(2)}
              </p>
            </div>

            {/* DESCRIÇÃO */}
            <p className="text-gray-600 leading-relaxed">
              Um conteúdo profundo e pouco abordado, revelando princípios
              espirituais que alinham o homem ao governo estabelecido por Deus.
            </p>

            {/* QUANTIDADE */}
            <div className="flex items-center gap-6">
              <span className="text-black font-medium">
                Quantidade:
              </span>

              <div className="flex items-center border border-blue-200 rounded-lg overflow-hidden shadow-sm">

                <button
                  onClick={decrease}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 active:scale-90 transition"
                >
                  -
                </button>

                <span
                  className={`px-6 font-semibold text-blue-600 transition-all duration-200 ${
                    animate ? "scale-125 text-blue-700" : ""
                  }`}
                >
                  {qty}
                </span>

                <button
                  onClick={increase}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 active:scale-90 transition"
                >
                  +
                </button>

              </div>
            </div>

            {/* BOTÕES */}
            <div className="space-y-3">

              <button
                onClick={handleAddToCart}
                className="w-full border border-blue-500 text-blue-500 py-4 rounded-xl font-bold hover:bg-blue-50 hover:scale-[1.02] active:scale-95 transition"
              >
                Adicionar ao carrinho
              </button>

              <button
                onClick={handleBuyNow}
                className="w-full bg-blue-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 hover:scale-[1.02] active:scale-95 transition shadow-lg"
              >
                Comprar agora
              </button>

            </div>

            {/* GARANTIA */}
            <div className="text-sm text-gray-500 space-y-1 pt-2">
              <p>✔ Compra 100% segura</p>
              <p>✔ Envio para todo o Brasil</p>
              <p>✔ Frete calculado no checkout</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;