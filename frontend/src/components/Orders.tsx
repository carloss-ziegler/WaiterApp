import { Order } from "../types/Order";
import OrderList from "./OrderList";

const orders: Order[] = [
  {
    _id: "6372e48cbcd195b0d3d0f7f3",
    table: "4",
    status: "WAITING",
    products: [
      {
        product: {
          name: "Pizza quatro queijos",
          imagePath: "1668667292900-quatro-queijos.png",
          price: 40,
        },
        quantity: 3,
        _id: "6372e48cbcd195b0d3d0f7f4",
      },
      {
        product: {
          name: "Coca cola",
          imagePath: "1668699563647-coca-cola.png",
          price: 7,
        },
        quantity: 2,
        _id: "6372e48cbcd195b0d3d0f7f5",
      },
    ],
  },
];

export function Orders() {
  return (
    <div className="w-full space-x-4 max-w-6xl my-10 mx-auto flex">
      <OrderList title="Fila de espera" icon="🕗" orders={orders} />
      <OrderList title="Em preparação" icon="👨‍🍳" orders={[]} />
      <OrderList title="Pronto!" icon="✅" orders={[]} />
    </div>
  );
}
