// src/components/MealFirstLetter.jsx
import React, { useEffect, useState } from 'react';
import RecipeCard from './RecipeCard';
import SearchBar from './SearchBar';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strInstructions: string;
  strCategory?: string;
  strArea?: string;
  [key: string]: string | undefined;
}

const MealFirstLetter:React.FC = () => {
  const [mealStart, setMealStart] = useState<string>('a');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!mealStart.trim() || !/^[a-zA-Z]$/.test(mealStart)) return; 
    const fetchMealByFirstLetter = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?f=${mealStart}`
        );
        const data = await response.json();

        if (data.meals) {
          setRecipes(data.meals);
          // console.log(data.meals);
        } else {
          setRecipes([]);
        }
        setLoading(false);
      } catch (error: unknown) {
        if(error instanceof Error) setError(error.message);
        setLoading(false);
      }
    };
    fetchMealByFirstLetter();
  }, [mealStart]);

  const handleClearSearch = () => {
    setError(null);
    setRecipes([]);
    setMealStart('');
  };

  return (
    <div className='container'>
      <h1 id="main-heading">Recipe of {mealStart || 'No meal name'}</h1>
      <SearchBar
        label="First Letter: "
        value={mealStart}
        onChange={setMealStart}
        onClear={handleClearSearch}
        placeholder="Enter First Letter of Meal Name"
        maxLength={1} // Only restricts input in this component
        cacheKey="mealFirstLetterCache"
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

export default MealFirstLetter;
