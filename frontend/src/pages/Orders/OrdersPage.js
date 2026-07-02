import React, { useEffect, useState } from "react";
import classes from "./OrderPage.module.css";
import Title from "../../components/Title/Title";
import OrderItemsList from "../../components/OrderItemsList/OrderItemsList";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from local storage
    let storedOrders = JSON.parse(localStorage.getItem("orders")) || [];

    // Check sessionStorage for the latest order and add it if not already stored
    const latestOrder = JSON.parse(sessionStorage.getItem("latestOrder"));
    if (latestOrder) {
      storedOrders.push(latestOrder);
      localStorage.setItem("orders", JSON.stringify(storedOrders));
      sessionStorage.removeItem("latestOrder");
    }

    setOrders(storedOrders);
  }, []);

  const clearHistory = () => {
    // Clear localStorage and sessionStorage
    localStorage.removeItem("orders");
    sessionStorage.removeItem("latestOrder");

    // Reset the orders state
    setOrders([]);
  };

  return (
    <div className={classes.container}>
      <Title title="Your Order History" fontSize="1.8rem" />
      {orders.length > 0 ? (
        <div className={classes.orders_list}>
          {orders.map((order, index) => (
            <div key={index} className={classes.order_card}>
              <h3>Order #{index + 1}</h3>
              <p>
                <strong>Name:</strong> {order.name || "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {order.address || "N/A"}
              </p>
              <p>
                <strong>Total Items:</strong> {order.items.length}
              </p>
              <p>
                <strong>Total Amount:</strong> $
                {order.items
                  .reduce(
                    (total, item) =>
                      total +
                      (item.food?.price || item.price || 0) * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </p>
              <OrderItemsList order={order} />
            </div>
          ))}
        </div>
      ) : (
        <p>You have no order history.</p>
      )}

      {/* Clear History Button */}
      <button className={classes.clear_button} onClick={clearHistory}>
        Clear History
      </button>
    </div>
  );
}
