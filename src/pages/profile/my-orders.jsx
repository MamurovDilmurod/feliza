import React from "react";
import { OrderCard } from "../../components/cart/order-card";
import { MyOrderCard } from "../../components/profile/my-order-card";

const MyOrders = () => {
  return (
    <div className="p-3">
      <MyOrderCard />
    </div>
  );
};

export default MyOrders;
