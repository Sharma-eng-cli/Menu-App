import React from "react";
import "../style/Bill.css";

const Bill = ({ orderItems, navigateTo }) => {
  const totalAmount = orderItems.reduce(
    (total, item) => total + item.caloriesPerServing * item.count,
    0
  );

  return (
    <div className="billContainer">
      <h2>Bill Summary</h2>
      <div className="orderSummary">
        {orderItems.length === 0 ? (
          <p>No items in the order.</p>
        ) : (
          orderItems.map((item) => (
            <div key={item.id} className="orderItem">
              <h3>{item.name}</h3>
              <p>₹{item.caloriesPerServing} x {item.count}</p>
            </div>
          ))
        )}
      </div>
      <h3>Total: ₹{totalAmount}</h3>
      <button onClick={() => navigateTo("menu")}>Back to Menu</button>
    </div>
  );
};

export default Bill;
