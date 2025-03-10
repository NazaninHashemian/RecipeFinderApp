//src/components/RecipeCard.jsx
import { useEffect, useState } from 'react';
import './recipeCard.css';

const RecipeCard = ({ recepie }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);
  const [showFullInstructions, setShowFullInstructions] = useState(false);
  const [showFullIngredients, setShowFullIngredients] = useState(false);

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
  const handleToggleIngredients = () => {
    setShowFullIngredients((prevState) => !prevState);
  };

  //  Function to get ingredients
  const getIngredients = () => {
    let ingredients = [];
    const maxIngredientsCount = 20;
    for (let i = 1; i <= maxIngredientsCount; i++) {
      const ingredient = detail[`strIngredient${i}`];
      if (ingredient && ingredient.trim()) {
        ingredients.push(`${ingredient}`);
      }
    }
    return ingredients;
  };

  // Show only the first 3 ingredients initially
  const getIngredientsToShow = () => {
    const ingredients = getIngredients();
    return showFullIngredients ? ingredients : ingredients.slice(0, 3); // Toggle between full or first 3 ingredients
  };

  //  Function to get ingredients
  const getArea = () => {
    const area = detail[`strArea`];
    return area;
  };
  return (
    <>
      <div className="recipe-error-loading">
        {/* Show loading and error messages */}
        {loading && <p style={{ color: 'blue' }}>Loading recipe details...</p>}
        {error && <p style={{ color: 'orange' }}>{error}</p>}
      </div>
      <div className="recipe-card">
        <h2 className="recipe-title">{recepie.strMeal}</h2>
        <div className="recipe-content">
          <img
            className="recipe-image"
            src={recepie.strMealThumb}
            alt={recepie.strMeal}
          />

          <div className="recipe-instructions">
            {/* Display Area section */}
            <div className="area">
              <p className="">
                {detail && getArea() ? getArea() : 'Area not available.'}
              </p>
            </div>

            <div className="ingredients">
              {/* <h3>Ingredients:</h3> */}
              <p className="ingredients-list">
                {detail && getIngredients().length > 0
                  ? getIngredientsToShow().join(', ')
                  : 'No ingredients available.'}
              </p>
              {/* Show More / Show Less button */}
              {detail && (
                <button
                  onClick={handleToggleIngredients}
                  className="show-more-btn"
                >
                  {showFullIngredients ? 'less' : 'Show More'}
                </button>
              )}
            </div>

            {/* Display recipe instructions */}
            {detail ? (
              <p
                className={
                  showFullInstructions
                    ? 'full-instructions'
                    : 'truncated-instructions'
                }
              >
                {`${detail.strInstructions}`}
              </p>
            ) : (
              <p>Instructions not available.</p>
            )}

            {/* Show More / Show Less button */}
            {detail && (
              <button
                onClick={handleToggleInstructions}
                className="show-more-btn"
              >
                {showFullInstructions ? 'less' : 'Show More'}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
