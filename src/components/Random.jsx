// src/components/Random.jsx
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import './recipeList.css';

const RandomRecipe = () => {
  const [recipe, setRecipe] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Define asynic function to fetch recipe
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Making the API call
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/random.php`
        );

        // If response is successful, parse the data as JSON
        const data = await response.json();
        // console.log(data.meals);

        if (data.meals) {
          setRecipe(data.meals);
        } else {
          setRecipe([]);
          setLoading(false);
        }

        setLoading(false); // Stop loading
      } catch (error) {
        setError(error.message);
        setLoading(false); // Stop loading even if an error occurs
      }
    };

    fetchData();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((r) => !r);
    setRecipe([]);
    setError(null);
  };
  return (
    <div>
      <h1 id="main-heading"> Random Recipe </h1>
      <button onClick={handleRefresh} className="refresh-btn">
        New Recipe
      </button>
      <div className="load-error">
        {loading && (
          <p style={{ color: 'blue' }}>Loading a random recipe....</p>
        )}
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
      {/* Display a random recipe */}
      <div className="recipe-list">
        {recipe.length > 0 ? (
          recipe.map((recipe) => {
            return <RecipeCard key={recipe.idMeal} recepie={recipe} />;
          })
        ) : (
          <p style={{ paddingLeft: '10px' }}>No recipe found</p>
        )}
      </div>
    </div>
  );
};

export default RandomRecipe;
