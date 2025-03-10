import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import './recipeList.css';

const RecipeList = () => {
  // Set default meal name to "Battenberg Cake"
  const [mealName, setMealName] = useState('Battenberg Cake');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch recipes by meal name
  useEffect(() => {
    if (!mealName.trim()) return; // Skip if no meal name is provided

    const fetchMealByName = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`
        );

        const data = await response.json();

        if (data.meals) {
          setRecipes(data.meals); // Set the recipes based on meal name
        } else {
          setRecipes([]); // If no meals found, set an empty array
        }

        setLoading(false);
      } catch (error) {
        setError('Failed to fetch meals.');
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
    <div>
      <h1 id="main-heading">Search for Meals</h1>
      <div className="search-container">
        <input
          type="text"
          value={mealName}
          onChange={(e) => setMealName(e.target.value)} // Update meal name on change
          placeholder="Enter Meal Name"
          className="ingredient-input"
        />
        <button onClick={handleClearSearch} className="clear-btn">
          Clear
        </button>
      </div>
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

export default RecipeList;
