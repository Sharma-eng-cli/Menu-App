import React from "react";
import "../style/foodDetails.css";

const FoodDetails = ({ selectedItem, navigateTo }) => {
  return (
    <div className="foodDetails_container">
      <h1>{selectedItem.name}</h1>
      
      {/* Image box with border */}
      <img src={selectedItem.image} alt={selectedItem.name} className="foodImage" />
      
      {/* Food Description */}
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

      {/* Ingredients Box */}
      <div className="foodDetails_section">
        <h3>Ingredients</h3>
        <ul>
          {selectedItem.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div>

      {/* Instructions Box */}
      <div className="foodDetails_section">
        <h3>Instructions</h3>
        <ol>
          {selectedItem.instructions.map((instruction, index) => (
            <li key={index}>{instruction}</li>
          ))}
        </ol>
      </div>

      {/* Back Button */}
      <button onClick={() => navigateTo("menu")}>Back to Menu</button>
    </div>
  );
};

export default FoodDetails;
