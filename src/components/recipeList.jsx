// src/components/RecipeList.jsx
import React, { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard';
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]); //State to store the filtered recipes
  const [ingredient, setIngredient] = useState('chicken_breast');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    //Define asynic funtion to fetch recipes
    const fetchData = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error before fetching

        // Making the API call
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        );

        // If response is successful, parse the data as JSON
        const data = await response.json();
        console.log(data.meals);

        if (data.meals) {
          setRecipes(data.meals);
        } else setRecipes([]);

        setLoading(false); // Stop loading
      } catch (error) {
        setError('Failed to fetch recipes.');
        setLoading(false); // Stop loading even if an error occurs
      }
    };

    fetchData();
  }, [ingredient]);

  return (
    <div>
      <h1>Recipe with {ingredient}</h1>
      <input
        type="text"
        value={ingredient}
        onChange={(e) => setIngredient(e.target.value)}
        placeholder="Enter Ingredient"
      />
      {recipes.map((recipe) => {
        return (
          <RecipeCard key={recipe.idMeal} width="100px" recepie={recipe} />
        );
      })}
    </div>
  );
};

export default RecipeList;
