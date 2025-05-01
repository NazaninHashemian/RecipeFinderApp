// src/components/RecipeList.jsx
import { useState, useEffect } from 'react';
import RecipeCard from './RecipeCard/RecipeCard';
import SearchBar from './SearchBar/SearchBar';
import fetchIngredients from '../utils/ingredientsApi';
import LoadingIndicator from './LoadingIndicator';
import ErrorMessage from './ErrorMessage';
import Recipe from '../utils/types';
import './RecipeList.css';
import { fetchRecipesByIngredient } from '../services/recipeService';


const MainIngredient = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [ingredient, setIngredient] = useState('chicken_breast');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

        const data = await fetchRecipesByIngredient(ingredient);
        if (data) {
          setRecipes(data);
        } else {
          setRecipes([]);
          setLoading(false);
        }
      } catch (error: unknown) {
        if(error instanceof Error) setError(error.message);
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
