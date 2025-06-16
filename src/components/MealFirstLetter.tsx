// src/components/MealFirstLetter.jsx
import { useEffect, useState } from 'react';
import SearchBar from './SearchBar/SearchBar';
import LoadingIndicator from './LoadingIndicator';
import Recipe from '../utils/types';
import ErrorMessage from './ErrorMessage';
import { fetchRecipesByFirstLetter } from '../services/recipeService';
import RecipeListDisplay from './RecipeListDisplay/RecipeListDisplay';

interface RecipeListProps {
  likedIds: string[];
  toggleLike: (recipe: Recipe) => void;
}

const MealFirstLetter = ({ likedIds, toggleLike }: RecipeListProps) => {
  const [mealStart, setMealStart] = useState<string>('a');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!mealStart.trim() || !/^[a-zA-Z]$/.test(mealStart)) return; 
    const fetchMealByFirstLetter = async () => {
      try {
        setLoading(true);
        setError(null);

        const data = await fetchRecipesByFirstLetter(mealStart);
        if (data) {
          setRecipes(data);
          // console.log(data.meals);
        } else {
          setRecipes([]);
        }
        setLoading(false);
      } catch (error: unknown) {
        if(error instanceof Error) setError(error.message);
        setLoading(false);
      }
    };
    fetchMealByFirstLetter();
  }, [mealStart]);

  const handleClearSearch = () => {
    setError(null);
    setRecipes([]);
    setMealStart('');
  };

  return (
    <div className='container'>
      <h1 id="main-heading">Recipe of {mealStart || 'No meal name'}</h1>
      <SearchBar
        label="First Letter: "
        value={mealStart}
        onChange={setMealStart}
        onClear={handleClearSearch}
        placeholder="Enter First Letter of Meal Name"
        maxLength={1} // Only restricts input in this component
        cacheKey="mealFirstLetterCache"
      />
      <div className="load-error">
        <LoadingIndicator isLoading={loading} />
        <ErrorMessage error={error} />
      </div>
      {/* Display recipes */}
      <RecipeListDisplay recipes={recipes} likedIds={likedIds} toggleLike={toggleLike}/>
    </div>
  );
};

export default MealFirstLetter;
