// src/components/Favorites.tsx
import React from 'react';
import RecipeCard from './RecipeCard/RecipeCard';
import Recipe from '../utils/types';
  interface FavoritesProps {
    likedRecipes: Recipe[];
    toggleLike: (recipe: Recipe) => void; 
  }
  
const Favorites: React.FC<FavoritesProps> = ({  likedRecipes, toggleLike }) => {

  return (
    <div className='container'>
      <h1>Favorite Recipes</h1>
      {likedRecipes.length > 0 ? (
        <div className="recipe-list">
          {likedRecipes.map(recipe => (
            <RecipeCard
                key={recipe.idMeal}
                recepie={recipe}
                isLiked={true}
                onToggleLike={() => toggleLike(recipe)}
            />

          ))}
        </div>
      ) : (
        <p>You haven't liked any recipes yet.</p>
      )}
    </div>
  );
};

export default Favorites;
