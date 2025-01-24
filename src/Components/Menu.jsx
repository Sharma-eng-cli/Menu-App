import React, { useState, useEffect } from "react";
import { fetchRecipes, fetchRecipeDetails } from "../fetchData"; // Add fetchRecipeDetails to fetch detailed recipe data
import "../style/menu.css";

const Menu = ({ navigateTo, setSelectedItem, addToOrder, removeFromOrder, orderItems }) => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecipe, setSelectedRecipe] = useState(null); 

  useEffect(() => {
    const loadRecipes = async () => {
      const fetchedRecipes = await fetchRecipes();
      setRecipes(fetchedRecipes);
      setLoading(false);
    };
    loadRecipes();
  }, []);

  const handleViewDetails = async (recipe) => {
    try {
      // Fetch detailed data for the selected recipe
      const recipeDetails = await fetchRecipeDetails(recipe.id); 
      const detailedRecipe = {
        ...recipe,
        ingredients: recipeDetails.ingredients,
        instructions: recipeDetails.instructions,
      };
      setSelectedItem(detailedRecipe); // Set detailed recipe as the selected item
      navigateTo("details"); // Navigate to the "details" view
    } catch (error) {
      console.error("Error fetching recipe details:", error);
      alert("Failed to load recipe details. Please try again.");
    }
  };

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
              onClick={() => handleViewDetails(recipe)}
            >
              View Details
            </button>

            <div
             className={`recipeDetailsContainer ${
             selectedRecipe?.id === recipe.id ? "visible" : "hidden"
              }`}>
             <h2 className="recipeDetailsTitle">Ingredients</h2>
               <ul className="ingredientsList">
               {recipe.ingredients?.map((ingredient, index) => (
               <li key={index}>{ingredient}</li> ))}
               </ul>
             <h2 className="recipeDetailsTitle">Instructions</h2>
              <p className="instructions">{recipe.instructions}</p>
            </div>


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
