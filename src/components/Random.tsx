// src/components/Random.jsx
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard/RecipeCard';
import Recipe from '../utils/types';
import './RecipeList.css';
import { fetchRecipesRandomly } from '../services/recipeService';

interface Props {
  likedIds: string[];
  toggleLike: (id: string) => void;
}

const RandomRecipe = ({ likedIds, toggleLike }: Props) => {
  const [recipe, setRecipe] = useState<Recipe[]>([]);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string| null>(null);

  useEffect(() => {
    //Define asynic function to fetch recipe
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchRecipesRandomly(); // already meals[]

        if (data) {
          setRecipe(data);
        } else {
          setRecipe([]);
          setLoading(false);
        }

        setLoading(false); // Stop loading
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
        setLoading(false); // Stop loading even if an error occurs
      }
    };

    fetchData();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((r) => !r);
    setRecipe([]);
    setError(null);
  };
  return (
    <div>
      <h1 id="main-heading"> Random Recipe </h1>
      <button onClick={handleRefresh} className="refresh-btn" aria-label="Fetch new random recipe">
        New Recipe
      </button>
      <div className="load-error">
        {loading && (
          <p style={{ color: 'blue' }}>Loading....</p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      {/* Display a random recipe */}
      <div className="recipe-list">
        {recipe.length > 0 ? (
          recipe.map((recipe) => {
            return <RecipeCard key={recipe.idMeal} recepie={recipe} isLiked={likedIds.includes(recipe.idMeal)} onToggleLike={toggleLike}/>;
          })
        ) : (
          <p style={{ paddingLeft: '10px' }}>No recipe found</p>
        )}
      </div>
    </div>
  );
};

export default RandomRecipe;
