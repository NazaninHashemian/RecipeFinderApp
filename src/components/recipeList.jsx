// src/components/RecipeList.jsx
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import './recipeList.css';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [ingredient, setIngredient] = useState('chicken_breast');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!ingredient.trim()) {
      setError('Please enter an ingredient.');
      setLoading(false);
      setRecipes([]);
      return;
    }

    //Define asynic funtion to fetch recipes
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Making the API call
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        );

        // If response is successful, parse the data as JSON
        const data = await response.json();
        // console.log(data.meals);

        if (data.meals) {
          setRecipes(data.meals);
        } else {
          setRecipes([]);
          setLoading(false);
        }

        setLoading(false); // Stop loading
      } catch (error) {
        setError(error.message);
        setLoading(false); // Stop loading even if an error occurs
      }
    };

    fetchData();
  }, [ingredient]);

  const handleClearSearch = () => {
    setIngredient('');
    setRecipes([]);
    setError(null);
  };
  return (
    <div>
      <h1 id="main-heading">Recipe with {ingredient || 'No ingredient'}</h1>
      <div className="search-container">
        Main Ingredient:
        <input
          type="text"
          value={ingredient}
          onChange={(e) => setIngredient(e.target.value)}
          placeholder="Enter Main Ingredient"
          className="ingredient-input"
        />
        <button onClick={handleClearSearch} className="clear-btn">
          Clear
        </button>
      </div>
      <div className="load-error">
        {loading && (
          <p style={{ color: 'blue' }}>Loading based on main ingredient ....</p>
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

export default RecipeList;
