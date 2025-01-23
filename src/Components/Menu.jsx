import React, { useState, useEffect } from "react";
import { fetchRecipes } from "../fetchData";
import "../style/menu.css";

const Menu = ({ navigateTo, setSelectedItem, addToOrder, removeFromOrder, orderItems }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadRecipes = async () => {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
      setLoading(false);
    };
    loadRecipes();
  }, []);

  if (loading) return <p>Loading recipes...</p>;

  return (
    <div className="menuContainer">
      <h2 className="menuTitle">Menu</h2>
      <div className="menuItemsContainer">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="menuItem">
            <div className="imageContainer">
              <img
                src={recipe.image}
                alt={recipe.name}
                className="menuImage"
              />
            </div>
            <h3>{recipe.name}</h3>
            <p>
              Price: ₹{recipe.caloriesPerServing} | Servings: {recipe.servings}
            </p>
            <button
              className="viewDetailsBtn"
              onClick={() => {
                setSelectedItem(recipe);
                navigateTo("details");
              }}
            >
              View Details
            </button>
            <div className="orderControls">
              <button
                className="orderBtn"
                onClick={() => removeFromOrder(recipe.id)}
              >
                -
              </button>
              <span className="counter">
                {orderItems.find((item) => item.id === recipe.id)?.count || 0}
              </span>
              <button
                className="orderBtn"
                onClick={() => addToOrder(recipe)}
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>
      <button className="billBtn" onClick={() => navigateTo("bill")}>
        Go to Bill
      </button>
    </div>
  );
};

export default Menu;
