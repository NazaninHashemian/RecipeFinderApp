// src/components/mealName.jsx
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import './recipeList.css';

const RecipeList = () => {
  const [mealName, setMealName] = useState('soup');
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch recipes by meal name
  useEffect(() => {
    if (!mealName.trim()) return;

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
        setError(error.message);
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
      <h1 id="main-heading">Recipe of {mealName || 'No meal name'}</h1>
      <SearchBar
        label="Main Ingredient:"
        value={mealName}
        onChange={setMealName}
        onClear={handleClearSearch}
        placeholder="Enter Meal Name"
      />
      <div className="load-error">
        <LoadingIndicator isLoading={loading} />
        <ErrorMessage error={error} />
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
