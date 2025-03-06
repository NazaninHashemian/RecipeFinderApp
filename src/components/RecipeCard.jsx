import { useEffect, useState } from 'react';
import './recipeCard.css';
const RecipeCard = ({ recepie }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState([]);

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
        } else setDetail([]);
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
        alt={recepie.strMeals}
      />
      <p>{detail.strInstructions}</p>
    </>
  );
};

export default RecipeCard;
