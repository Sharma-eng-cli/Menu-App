import React from "react";
import "../style/foodDetails.css";

const FoodDetails = ({ selectedItem, navigateTo }) => {
  return (
    <div className="foodDetailsContainer">
      <h2>{selectedItem.name}</h2>
      <img src={selectedItem.image} alt={selectedItem.name} />
      <p>
        <strong>Cuisine:</strong> {selectedItem.cuisine}
      </p>
      <p>
        <strong>Difficulty:</strong> {selectedItem.difficulty}
      </p>
      <p>
        <strong>Preparation Time:</strong> {selectedItem.prepTimeMinutes} mins
      </p>
      <p>
        <strong>Cooking Time:</strong> {selectedItem.cookTimeMinutes} mins
      </p>
      <p>
        <strong>Ingredients:</strong>
      </p>
      <ul>
        {selectedItem.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>
        <strong>Instructions:</strong>
      </p>
      <ol>
        {selectedItem.instructions.map((instruction, index) => (
          <li key={index}>{instruction}</li>
        ))}
      </ol>
      <button onClick={() => navigateTo("menu")}>Back to Menu</button>
    </div>
  );
};

export default FoodDetails;
