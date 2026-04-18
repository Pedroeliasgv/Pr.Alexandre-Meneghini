import { useCart } from "@/context/CartContext";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Cart = () => {
  const { cart, removeFromCart, increase, decrease, total } = useCart();

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3001/create-preference", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: cart,
        }),
      });

      const data = await response.json();

      if (!data.id) throw new Error("Erro ao gerar pagamento");

      window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${data.id}`;
    } catch (error) {
      console.error(error);
      alert("Erro ao iniciar pagamento.");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-black-100 pt-28 px-6">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center justify-between mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white-900">
              Seu carrinho
            </h1>

            <Link
              to="/"
              className="text-blue-600 hover:text-blue-700 transition text-sm font-medium"
            >
              ← Continuar comprando
            </Link>
          </div>

          {cart.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">🛒</div>

              <p className="text-gray-600 mb-6 text-lg">
                Seu carrinho está vazio.
              </p>

              <Link
                to="/"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition shadow-lg inline-block"
              >
                Ver produtos
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-10">

              {/* LISTA */}
              <div className="md:col-span-2 space-y-6">

                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-5 rounded-2xl bg-white border border-gray-200 shadow-md"
                  >

                    {/* INFO */}
                    <div className="flex items-center gap-5">
                      <div className="bg-gray-100 p-3 rounded-xl">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-contain"
                        />
                      </div>

                      <div>
                        <h2 className="font-semibold text-gray-900 text-lg">
                          {item.name}
                        </h2>

                        <p className="text-gray-600 text-sm">
                          R$ {Number(item.price).toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* CONTROLES */}
                    <div className="flex items-center gap-4">

                      {/* QUANTIDADE */}
                      <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden bg-white shadow">

                        <button
                          onClick={() => decrease(item.id)}
                          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-black font-bold transition"
                        >
                          −
                        </button>

                        <span className="px-5 font-semibold text-black bg-white">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => increase(item.id)}
                          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold transition"
                        >
                          +
                        </button>

                      </div>

                      {/* REMOVER */}
                      <button
                        onClick={() => {
                          for (let i = 0; i < item.quantity; i++) {
                            removeFromCart(item.id);
                          }
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition"
                      >
                        Remover
                      </button>

                      {/* SUBTOTAL */}
                      <p className="font-bold text-gray-900 min-w-[100px] text-right">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </p>

                    </div>
                  </div>
                ))}
              </div>

              {/* RESUMO */}
              <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-28 border border-gray-200">

                <h2 className="text-xl font-semibold mb-6 text-gray-900">
                  Resumo do pedido
                </h2>

                <div className="space-y-4 text-sm text-gray-700">

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className="text-green-600 font-medium">
                      Calculado no checkout
                    </span>
                  </div>

                  <div className="border-t pt-4 flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>R$ {total.toFixed(2)}</span>
                  </div>

                </div>

                {/* BOTÃO */}
                <button
                  onClick={handleCheckout}
                  className="
                    mt-6 w-full
                    bg-blue-600 hover:bg-blue-700
                    text-white
                    py-4 rounded-xl font-bold text-lg
                    shadow-lg
                    transition-all duration-300
                    active:scale-95
                  "
                >
                  Finalizar compra
                </button>

                {/* SEGURANÇA */}
                <div className="mt-4 text-xs text-gray-500 text-center space-y-1">
                  <p>🔒 Pagamento seguro via Mercado Pago</p>
                  <p>📦 Envio para todo o Brasil</p>
                </div>

              </div>

            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;