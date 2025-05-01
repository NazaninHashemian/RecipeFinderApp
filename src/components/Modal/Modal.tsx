// src/components/Modal.jsx
import React from 'react';
import Recipe from '../../utils/types';
import './Modal.css';

type ModalProps = {
  recipe: Recipe;
  onClose: () => void;
};


const Modal: React.FC<ModalProps> = ({ recipe, onClose }) => {
  const { strMeal, strMealThumb, strInstructions, strCategory, strArea } = recipe;

  // Function to get ingredients
  const getIngredients = (): string[] => {
    const ingredients: string[] = [];
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
        <div className='modal-header'>
          <h2>{strMeal}</h2>
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        {/* <img src={strMealThumb} alt={strMeal} /> */}
        {strMealThumb ? (
          <img src={strMealThumb} alt={strMeal} />
        ) : (
          <p>No image available</p>
        )}

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
        
      </div>
    </div>
  );
};

export default Modal;
