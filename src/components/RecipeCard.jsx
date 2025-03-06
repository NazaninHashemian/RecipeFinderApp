import { useEffect, useState } from 'react';
import './recipeCard.css';
const RecipeCard = ({ recepie }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recepie.idMeal}`
        );
        const data = await response.json();

        if (data.meals) {
          setDetail(data.meals[0]);
        } else setDetail(null);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [recepie.idMeal]);
  return (
    <>
      <h2>{recepie.strMeal}</h2>
      <img
        className="recipe-image"
        src={recepie.strMealThumb}
        alt={recepie.strMeal}
      />
      {/* Show loading and error messages here */}
      {loading && <p>Loading recipe details...</p>}
      {error && <p>{error}</p>}

      {/* Display recipe instructions */}
      {detail ? (
        <p>{detail.strInstructions}</p>
      ) : (
        <p>Instructions not available.</p>
      )}
    </>
  );
};

export default RecipeCard;
