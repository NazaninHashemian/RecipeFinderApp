import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import Recipe from '../../utils/types';

interface RecipeListDisplayProps {
  recipes: Recipe[];
}

const RecipeListDisplay: React.FC<RecipeListDisplayProps> = ({ recipes }) => {
  return (
    <div className="recipe-list">
        {recipes.length > 0 ? (
        recipes.map((recipes) => {
            return <RecipeCard key={recipes.idMeal} recepie={recipes} />;
        })
        ) : (
        <p style={{ paddingLeft: '10px' }}>No recipes found</p>
        )}
     </div>
  )
}

export default RecipeListDisplay;
