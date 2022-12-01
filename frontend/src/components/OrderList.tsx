import { useState } from "react";
import { Order } from "../types/Order";
import OrderModal from "./OrderModal";

interface OrderProps {
  icon: string;
  title: string;
  orders: Order[];
}

const OrderList = ({ title, icon, orders }: OrderProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

  function handleOpenOrderModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  return (
    <>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onClose={handleCloseModal}
      />
      <div className="p-4 border border-[rgba(204, 204, 204, 0.4)] rounded-2xl flex-1 flex flex-col items-center">
        <header className="p-2 text-sm flex items-center space-x-2">
          <span>{icon}</span>
          <span className="font-semibold">{title}</span>
          <span>({orders.length})</span>
        </header>

        {orders.length > 0 && (
          <div className="flex flex-col w-full mt-6">
            {orders.map((order) => (
              <button
                onClick={() => handleOpenOrderModal(order)}
                key={order._id}
                className="bg-white mb-6 border border-[rgba(204, 204, 204, 0.4)] h-32 rounded-lg flex flex-col items-center justify-center space-y-1 outline-none"
              >
                <strong className="font-medium">Mesa {order.table}</strong>
                <span className="text-sm text-[#666]">
                  {order.products.length} itens
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default OrderList;
