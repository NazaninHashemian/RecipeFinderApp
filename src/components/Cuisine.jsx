// src/components/Cuisine.jsx
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';

const Cuisine = () => {
  const [recipes, setRecipes] = useState([]);
  const [cuisine, setcuisine] = useState('Canadian');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
        // console.log(data.meals);

        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [cuisine]);

  const handleClearSearch = () => {
    setcuisine('');
    setRecipes([]);
    setError(null);
  };

  return (
    <div>
      <h1 id="main-heading">{cuisine || 'No Cuisine'} Recipes</h1>
      <SearchBar
        label="Cuisine: "
        value={cuisine}
        onChange={(e) => setIngredient(e.target.value)}
        onClear={handleClearSearch}
        placeholder="Enter Meal Name"
      />
      <div className="load-error">
        {loading && (
          <p style={{ color: 'blue' }}>Loading based on cuisine ....</p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
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
