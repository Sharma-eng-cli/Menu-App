import React, { useState } from "react";
import Menu from "./Components/Menu";
import FoodDetails from "./Components/FoodDetails";
import Bill from "./Components/Bill";
import Contact from "./Components/Contact";
import About from "./Components/About";
import "./style/App.css";

const App = () => {
  const [currentView, setCurrentView] = useState("home");
  const [selectedItem, setSelectedItem] = useState(null);
  const [orderItems, setOrderItems] = useState([]);

  const navigateTo = (view) => {
    setCurrentView(view);
  };

  const addToOrder = (item) => {
    setOrderItems((prevItems) => {
      const existingItem = prevItems.find((order) => order.id === item.id);
      if (existingItem) {
        return prevItems.map((order) =>
          order.id === item.id
            ? { ...order, count: order.count + 1 }
            : order
        );
      } else {
        return [...prevItems, { ...item, count: 1 }];
      }
    });
  };

  const removeFromOrder = (itemId) => {
    setOrderItems((prevItems) =>
      prevItems
        .map((order) =>
          order.id === itemId
            ? { ...order, count: Math.max(order.count - 1, 0) }
            : order
        )
        .filter((order) => order.count > 0)
    );
  };

  return (
    <div className="appContainer">
      <nav className="navbar">
        <ul>
          <li onClick={() => navigateTo("home")}>Home</li>
          <li onClick={() => navigateTo("menu")}>Menu</li>
          <li onClick={() => navigateTo("bill")}>Bill</li>
          <li onClick={() => navigateTo("contact")}>Contact</li>
          <li onClick={() => navigateTo("about")}>About</li>
        </ul>
      </nav>

      <div className="content">
        {currentView === "home" && (
          <div className="homePage">
            <h1>Welcome to Our Recipe App</h1>
            <p>Explore delicious recipes, learn how to make them, and order your favorites!</p>
            <button
              className="quickMenuBtn"
              onClick={() => navigateTo("menu")}
            >
              Quick Menu
            </button>
          </div>
        )}
        {currentView === "menu" && (
          <Menu
            navigateTo={navigateTo}
            setSelectedItem={setSelectedItem}
            addToOrder={addToOrder}
            removeFromOrder={removeFromOrder}
            orderItems={orderItems}
          />
        )}
        {currentView === "details" && (
          <FoodDetails selectedItem={selectedItem} navigateTo={navigateTo} />
        )}
        {currentView === "bill" && (
          <Bill orderItems={orderItems} navigateTo={navigateTo} />
        )}
        {currentView === "contact" && <Contact />}
        {currentView === "about" && <About />}
      </div>
    </div>
  );
};

export default App; // Ensure default export
