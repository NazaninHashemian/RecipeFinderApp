import React, { useState } from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import Recipe from '../../utils/types';
import './RecipeListDisplay.css';

interface RecipeListDisplayProps {
  recipes: Recipe[];
}

const RecipeListDisplay: React.FC<RecipeListDisplayProps> = ({ recipes }) => {
  const [likedIds, setLikedIds] = useState<string[]>([]);

  const toggleLike = (id: string) => {
    setLikedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="recipe-list">
      {recipes.length > 0 ? (
        recipes.map(recipe => (
          <RecipeCard
            key={recipe.idMeal}
            recepie={recipe}
            isLiked={likedIds.includes(recipe.idMeal)}
            onToggleLike={toggleLike}
          />
        ))
      ) : (
        <p style={{ paddingLeft: '10px' }}>No recipes found</p>
      )}
    </div>
  );
};

export default RecipeListDisplay;
