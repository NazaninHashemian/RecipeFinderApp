import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import Recipe from '../../utils/types';
import './RecipeListDisplay.css';

interface RecipeListDisplayProps {
  recipes: Recipe[];
  likedIds: string[];
  toggleLike: (recipe: Recipe) => void;
}

const RecipeListDisplay: React.FC<RecipeListDisplayProps> = ({ recipes, likedIds, toggleLike }) => {


  return (
    <div className="recipe-list">
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <RecipeCard
            key={recipe.idMeal}
            recepie={recipe}
            isLiked={likedIds.includes(recipe.idMeal)}
            onToggleLike={() =>toggleLike(recipe)}
          />
        ))
      ) : (
        <p style={{ paddingLeft: '10px' }}>No recipes found</p>
      )}
    </div>
  );
};

export default RecipeListDisplay;
