// src/components/RecipeList.jsx
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import fetchIngredients from '../utils/ingredientsApi';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import './RecipeList.css';

const MainIngredient = () => {
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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
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
    <div className='container'>
      <h1 id="main-heading">Recipe with {ingredient || 'No ingredient'}</h1>
      <SearchBar
        label="Main Ingredient:"
        value={ingredient}
        onChange={setIngredient}
        onClear={handleClearSearch}
        placeholder="Enter Main Ingredient"
        fetchDataFunction={fetchIngredients}
        cacheKey="ingredients"
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

export default MainIngredient;
