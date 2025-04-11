// src/components/Cuisine.jsx
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import fetchCuisines from '../utils/cuisinesApi';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import Recipe from '../utils/types';

const Cuisine:React.FC = () => {
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

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${cuisine}`
        );
        const data = await response.json();

        if (data.meals) {
          setRecipes(data.meals);
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
            return <RecipeCard key={recipe.idMeal} recepie={recipe} />;
          })
        ) : (
          <p style={{ paddingLeft: '10px' }}>No recipes found</p>
        )}
      </div>
    </div>
  );
};
export default Cuisine;
