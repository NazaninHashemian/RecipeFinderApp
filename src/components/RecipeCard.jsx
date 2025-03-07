import { useEffect, useState } from 'react';
import './recipeCard.css';

const RecipeCard = ({ recepie }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);
  const [showFullInstructions, setShowFullInstructions] = useState(false);

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

  const handleToggleInstructions = () => {
    setShowFullInstructions((prevState) => !prevState);
  };

  return (
    <div className="recipe-card">
      <h2 className="recipe-title">{recepie.strMeal}</h2>
      <div className="recipe-content">
        <img
          className="recipe-image"
          src={recepie.strMealThumb}
          alt={recepie.strMeal}
        />
        <div className="recipe-instructions">
          {/* Show loading and error messages */}
          {loading && <p>Loading recipe details...</p>}
          {error && <p>{error}</p>}

          {/* Display recipe instructions */}
          {detail ? (
            <p
              className={
                showFullInstructions
                  ? 'full-instructions'
                  : 'truncated-instructions'
              }
            >
              {detail.strInstructions}
            </p>
          ) : (
            <p>Instructions not available.</p>
          )}

          {/* Show More / Show Less button */}
          {detail && !showFullInstructions && (
            <button
              onClick={handleToggleInstructions}
              className="show-more-btn"
            >
              Show More
            </button>
          )}
          {showFullInstructions && (
            <button
              onClick={handleToggleInstructions}
              className="show-more-btn"
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
