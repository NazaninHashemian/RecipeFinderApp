// src/components/Cuisine.jsx
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';

const Cuisine = () => {
  const [recipes, setRecipes] = useState([]);
  const [area, setArea] = useState('Canadian');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!area.trim()) {
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
          `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
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
  }, [area]);

  const handleClearSearch = () => {
    setArea('');
    setRecipes([]);
    setError(null);
  };

  return (
    <div>
      <h1 id="main-heading">{area || 'No Area'} Recipes</h1>
      <div className="search-container">
        Cuisine:
        <input
          type="text"
          value={area}
          onChange={(e) => setArea(e.target.value)}
          placeholder="Enter food cuisine"
          className="ingredient-input"
        />
        <button onClick={handleClearSearch} className="clear-btn">
          Clear
        </button>
      </div>
      <div className="load-error">
        {loading && <p style={{ color: 'blue' }}>Loading based on area ....</p>}
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
