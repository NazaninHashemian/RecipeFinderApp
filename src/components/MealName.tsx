// src/components/mealName.jsx
import { useState, useEffect } from 'react';
import SearchBar from './SearchBar/SearchBar';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import Recipe from '../utils/types';
import './RecipeList.css';
import { fetchRecipesByName } from '../services/recipeService';
import RecipeListDisplay from './RecipeListDisplay/RecipeListDisplay';

interface RecipeListProps {
  likedIds: string[];
  toggleLike: (recipe: Recipe) => void;
}

const RecipeList = ({ likedIds, toggleLike }: RecipeListProps) => {
  const [mealName, setMealName] = useState('soup');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch recipes by meal name
  useEffect(() => {
    if (!mealName.trim()) return;

    const fetchMealByName = async () => {
      try {
        setLoading(true);
        setError(null);

        // const response = await fetch(`${BASE_URL}/search.php?s=${mealName}`);

        // const data = await response.json();
        const data = await fetchRecipesByName(mealName);
        if (data) {
          setRecipes(data); // Set the recipes based on meal name
        } else {
          setRecipes([]); // If no meals found, set an empty array
        }

        setLoading(false);
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
        setLoading(false);
      }
    };

    fetchMealByName();
  }, [mealName]);

  const handleClearSearch = () => {
    setMealName(''); // Clear the meal name input
    setRecipes([]);
    setError(null);
  };

  return (
    <div className='container'>
      <h1 id="main-heading">Recipe of {mealName || 'No meal name'}</h1>
      <SearchBar
        label="Main Ingredient:"
        value={mealName}
        onChange={setMealName}
        onClear={handleClearSearch}
        placeholder="Enter Meal Name"
         cacheKey="mealNameCache" // Example of a cache key
      />
      <div className="load-error">
        <LoadingIndicator isLoading={loading} />
        <ErrorMessage error={error} />
      </div>
      {/* Display recipes */}
      {/* <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipes) => {
            return <RecipeCard key={recipes.idMeal} recepie={recipes} />;
          })
        ) : (
          <p style={{ paddingLeft: '10px' }}>No recipes found</p>
        )}
      </div> */}
      <RecipeListDisplay recipes={recipes} likedIds={likedIds} toggleLike={toggleLike}/>
    </div>
  );
};

export default RecipeList;
