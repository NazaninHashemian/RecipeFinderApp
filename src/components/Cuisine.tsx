// src/components/Cuisine.jsx
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard/RecipeCard';
import SearchBar from './SearchBar/SearchBar';
import fetchCuisines from '../utils/cuisinesApi';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import Recipe from '../utils/types';
import { fetchRecipesByCuisine } from '../services/recipeService';

interface Props {
  likedIds: string[];
  toggleLike: (recipe: Recipe) => void;
}

const Cuisine = ({ likedIds, toggleLike }: Props) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [cuisine, setCuisine] = useState('Canadian');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cuisine.trim()) {
      setError('Please enter foods cuisine.');
      setLoading(false);
      setRecipes([]);
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error before fetching

        // const response = await fetch(`${BASE_URL}/filter.php?a=${cuisine}`);
        // const data = await response.json();
        const data = await fetchRecipesByCuisine(cuisine);

        if (data) {
          setRecipes(data);
        } else {
          setRecipes([]);
        }
      } catch (error: unknown) {
        if(error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cuisine]);

  const handleClearSearch = () => {
    setCuisine('');
    setRecipes([]);
    setError(null);
  };

  return (
    <div className='container'>
      <h1 id="main-heading">{cuisine || 'No Cuisine'} Recipes</h1>
      <SearchBar
        label= "Cuisine: "
        value= {cuisine}
        onChange= {setCuisine}
        onClear= {handleClearSearch}
        placeholder= "Enter Cuisine Name"
        fetchDataFunction= {fetchCuisines}
        cacheKey=  "cuisines"
      />
      <div className="load-error">
        <LoadingIndicator isLoading={loading} />
        <ErrorMessage error={error} />
      </div>
      {/* Display recipes */}
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipe) => {
            return <RecipeCard key={recipe.idMeal} recepie={recipe} isLiked={likedIds.includes(recipe.idMeal)}
            onToggleLike={() =>toggleLike(recipe)}/>;
          })
        ) : (
          <p style={{ paddingLeft: '10px' }}>No recipes found</p>
        )}
      </div>
    </div>
  );
};
export default Cuisine;
