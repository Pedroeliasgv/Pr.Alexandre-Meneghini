import { useCart } from "@/context/CartContext";
import { useNavigate } from "react-router-dom";
import {
  X,
  ShoppingCart,
  Package,
  Trash2,
  Minus,
  Plus,
} from "lucide-react";

const CartDrawer = ({ open, onClose }) => {
  const { cart, total, increaseItem, decreaseItem, removeItem } = useCart();
  const navigate = useNavigate();

  // Cálculo do total de itens (quantidade somada)
  const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 transition-opacity"
        />
      )}

      {/* DRAWER */}
      <div
        className={`
          fixed top-0 right-0 h-full w-full sm:w-[420px] bg-white z-50 shadow-2xl
          transform transition-transform duration-300 ease-in-out flex flex-col
          ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b bg-white">
          <div className="flex items-center gap-3">
            <div className="relative">
              <ShoppingCart className="text-blue-600" />
              {itemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {itemsCount}
                </span>
              )}
            </div>
            <h2 className="font-semibold text-gray-900 text-lg">Meu Carrinho</h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition"
          >
            <X size={20} />
          </button>
        </div>

        {/* LISTA DE PRODUTOS */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3">
              <Package className="text-gray-300" size={60} />
              <p className="text-gray-500 font-medium">Seu carrinho está vazio</p>
              <button
                onClick={onClose}
                className="text-blue-600 text-sm font-semibold hover:underline"
              >
                Continuar comprando
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl p-4 shadow-sm flex gap-4 items-center group transition-all"
              >
                {/* IMAGEM */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-contain bg-gray-100 rounded-lg p-2"
                />

                {/* INFO */}
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900 line-clamp-1">
                    {item.name}
                  </p>
                  <p className="text-blue-600 font-bold text-sm mt-1">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>

                  {/* CONTROLES DE QUANTIDADE */}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                      <button
                        onClick={() => decreaseItem(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-red-50 hover:text-red-500 transition"
                      >
                        <Minus size={12} />
                      </button>
                      
                      <span className="px-2 text-xs font-bold text-gray-800 min-w-[24px] text-center">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => increaseItem(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-green-50 hover:text-green-600 transition"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* BOTÃO REMOVER */}
                <button
                  onClick={() => removeItem(item.id)}
                  className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                  aria-label="Remover item"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            ))
          )}
        </div>

        {/* RODAPÉ (FOOTER) */}
        {cart.length > 0 && (
          <div className="bg-white border-t p-5 space-y-4 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]">
            <div className="flex justify-between items-center text-lg font-bold">
              <span className="text-gray-600 font-medium">Total</span>
              <span className="text-blue-600 text-xl">
                R$ {total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => {
                onClose();
                navigate("/cart");
              }}
              className="
                w-full bg-blue-600 hover:bg-blue-700
                text-white py-4 rounded-xl font-bold
                transition-all transform active:scale-95 shadow-md
              "
            >
              Finalizar pedido
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;