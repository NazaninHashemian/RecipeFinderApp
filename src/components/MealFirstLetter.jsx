// src/components/MealFirstLetter.jsx
import { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';

const MealFirstLetter = () => {
  const [mealStart, setMealStart] = useState('a');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!mealStart.trim()) return;
    const fetchMealByFuirstLetter = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealStart}`
        );
        const data = await response.json();

        if (data.meals) {
          setRecipes(data.meals);
          console.log(data.meals);
        } else {
          setRecipes([]);
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchMealByFuirstLetter();
  }, [mealStart]);

  const handleClearSearch = () => {
    setError(null);
    setRecipes([]);
    setMealStart('');
  };

  return (
    <div>
      <h1 id="main-heading">Recipe of {mealStart || 'No meal name'}</h1>
      <SearchBar
        label="First Letter: "
        value={mealStart}
        onChange={(e) => setMealStart(e.target.value)}
        onClear={handleClearSearch}
        placeholder="Enter Meal Name"
      />
      <div className="load-error">
        {loading && <p style={{ color: 'blue' }}>Loading recipes...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      {/* Display recipes */}
      <div className="recipe-list">
        {recipes.length > 0 ? (
          recipes.map((recipes) => {
            return <RecipeCard key={recipes.idMeal} recepie={recipes} />;
          })
        ) : (
          <p style={{ paddingLeft: '10px' }}>No recipes found</p>
        )}
        {/* {Object.keys(recipe).length > 0 ? (
          <RecipeCard key={recipe.idMeal} recepie={recipe} />
        ) : (
          <p>No recipe found</p>
        )} */}
      </div>
    </div>
  );
};

export default MealFirstLetter;
