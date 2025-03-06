// src/components/RecipeList.jsx
import React, { useState, useEffect } from 'react';
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]); //State to store the filtered recipes
  const [ingredient, setIngredient] = useState('chicken_breast');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
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
        console.log(data);

        if (data.meals) {
          setRecipes(data.meals);
        } else setRecipes([]);
        setLoading(false); // Stop loading
      } catch (error) {
        setError('Failed to fetch recipes.');
        setLoading(false); // Stop loading even if an error occurs
      }
    };
  }, [ingredient]);

  return <></>;
};

export default RecipeList;
