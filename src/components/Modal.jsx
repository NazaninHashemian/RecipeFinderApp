// src/components/Modal.jsx
import React from 'react';
import './Modal.css';

const Modal = ({ recipe, onClose }) => {
  const { strMeal, strMealThumb, strInstructions, strCategory, strArea } = recipe;

  // Function to get ingredients
  const getIngredients = () => {
    let ingredients = [];
    const maxIngredientsCount = 20;
    for (let i = 1; i <= maxIngredientsCount; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{strMeal}</h2>
        <img src={strMealThumb} alt={strMeal} />
        <div className="modal-detail">
          <div>
            <p>{strArea ? `Origin: ${strArea}` : 'Area not available'}</p>
            <p>{strCategory ? `Category: ${strCategory}` : 'Category not available'}</p>
          </div>
          <h3>Ingredients:</h3>
          <ul>
            {getIngredients().map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h3>Instructions:</h3>
          <p>{strInstructions}</p>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
