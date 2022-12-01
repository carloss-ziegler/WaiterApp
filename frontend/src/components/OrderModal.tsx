import { KeyboardEvent, useEffect } from "react";
import CloseIcon from "../assets/images/close-icon.svg";
import { Order } from "../types/Order";
import { formatCurrency } from "../utils/formatCurrency";

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
}

const OrderModal = ({ visible, order, onClose }: OrderModalProps) => {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  if (!visible || !order) {
    return null;
  }

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + product.price * quantity;
  }, 0);

  return (
    <div className="w-full flex items-center justify-center h-full backdrop-blur-[4.5px] left-0 top-0 bg-[#000000cc] fixed">
      <div className="bg-white w-[480px] rounded-lg p-8">
        <header className="flex items-center justify-between">
          <h1 className="font-semibold text-[24px]">Mesa {order.table}</h1>

          <button onClick={onClose} className="border-0 bg-transparent flex">
            <img src={CloseIcon} alt="fechamento" />
          </button>
        </header>

        {/* Status Container */}
        <div className="mt-6 space-y-1">
          <small className="text-sm opacity-80">Status do pedido</small>
          <div className="flex items-center space-x-1">
            <span className="text-sm">
              {order.status === "WAITING" && "🕗"}
              {order.status === "IN_PRODUCTION" && "👨‍🍳"}
              {order.status === "DONE" && "✅"}
            </span>

            <strong className="font-semibold">
              {order.status === "WAITING" && "Fila de Espera"}
              {order.status === "IN_PRODUCTION" && "Em Preparação"}
              {order.status === "DONE" && "Pronto!"}
            </strong>
          </div>
        </div>

        {/* Order Details */}
        <div className="mt-6">
          <strong className="text-sm font-medium opacity-80">Itens</strong>

          <div className="mt-2 space-y-2">
            {order.products.map(({ _id, product, quantity }) => (
              <div key={_id} className="flex shadow p-2 rounded space-x-2">
                <img
                  className="w-16 rounded h-12 object-cover"
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                />
                <span className="self-start text-sm block min-w-[16px] text-[#666]">
                  {quantity}x
                </span>
                <div>
                  <h1 className="font-semibold block self-start text-base">
                    {product.name}
                  </h1>
                  <span className="font-medium self-end text-sm opacity-80">
                    {formatCurrency(product.price)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-4">
            <span className="text-sm font-medium opacity-80">Total:</span>
            <strong>{formatCurrency(total)}</strong>
          </div>
        </div>

        <footer className="flex flex-col mt-4 space-y-2">
          <button className="bg-[#333] rounded-full text-white flex items-center justify-center space-x-2 py-3 px-6">
            <span>👨‍🍳</span>
            <strong>Iniciar Produção</strong>
          </button>

          <button className="rounded-full text-[#D73035] flex items-center justify-center bg-transparent border-0 py-3 px-6">
            <span className="font-bold">Cancelar Pedido</span>
          </button>
        </footer>
      </div>
    </div>
  );
};

export default OrderModal;
