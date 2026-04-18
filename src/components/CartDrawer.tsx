import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import { X, ShoppingCart, Package } from "lucide-react";

const CartDrawer = ({ open, onClose }) => {
  const { cart, total } = useCart();
  const navigate = useNavigate();

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        />
      )}

      {/* DRAWER */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[400px] bg-white z-50 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center gap-3">
            <ShoppingCart size={26} className="text-blue-500" />
            <h2 className="text-lg font-semibold text-gray-900">
              Carrinho ({cart.length})
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 transition"
          >
            <X size={26} className="text-gray-600" />
          </button>
        </div>

        {/* LISTA */}
        <div className="p-6 space-y-5 overflow-y-auto h-[calc(100%-210px)]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center mt-20 space-y-4">
              <Package size={60} className="text-gray-300" />

              <p className="text-gray-500">
                Seu carrinho está vazio
              </p>

              <button
                onClick={onClose}
                className="text-blue-500 hover:underline text-sm"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 rounded-xl hover:bg-gray-50 transition"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-contain bg-gray-100 rounded-lg p-2"
                />

                <div className="flex-1 flex flex-col justify-between">
                  <p className="text-sm font-semibold text-gray-900 leading-tight">
                    {item.name}
                  </p>

                  <p className="text-sm text-gray-500">
                    R$ {Number(item.price).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 left-0 w-full border-t bg-white p-6 space-y-4">

          <div className="flex justify-between text-gray-900 font-semibold text-lg">
            <span>Total</span>
            <span className="text-blue-600">
              R$ {total.toFixed(2)}
            </span>
          </div>

          {/* BOTÃO */}
          <button
            onClick={() => {
              onClose();
              navigate("/carrinho");
            }}
            className="
              w-full
              bg-blue-500
              hover:bg-blue-600
              text-white
              py-4
              rounded-xl
              font-bold
              text-lg
              transition-all
              duration-300
              shadow-lg
              hover:scale-[1.02]
            "
          >
            Ir para o carrinho
          </button>
        </div>
      </div>
    </>
  );
};

export default CartDrawer;