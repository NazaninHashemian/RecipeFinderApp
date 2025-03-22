//src/components/RecipeCard.jsx
import { useEffect, useState } from 'react';
import LoadingIndicator from './LoadingIndicator';
import Error from './ErrorMessage';
import './RecipeCard.css';
import Modal from './Modal';

const RecipeCard = ({ recepie }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [detail, setDetail] = useState(null);
  const [showFullInstructions, setShowFullInstructions] = useState(false);
  const [showFullIngredients, setShowFullIngredients] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const { idMeal, strMealThumb, strMeal } = recepie;
  useEffect(() => {
    const fetchRecipeDetail = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`
        );
        const data = await response.json();

        if (data.meals) {
          setDetail(data.meals[0]);
        } else setDetail(null);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [idMeal]);

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

  // Function to open modal when image is clicked
  const handleImageClick = () => {
    setIsModalOpen(true); // Open the modal
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  return (
    <>
      <div className="recipe-error-loading">
        <LoadingIndicator loading={loading} />
        <Error error={error} />
      </div>
      <div className="recipe-card">
      <h2 
        className="recipe-title" 
        onClick={handleImageClick} 
        style={{ cursor: 'pointer' }} 
        style={{ cursor: 'pointer' }} 
        title="Click to view recipe details"  // Tooltip text
      >
        {strMeal}
      </h2>

        <div className="recipe-content">
          <img 
            className="recipe-image" 
            src={strMealThumb} 
            alt={strMeal} 
            onClick={handleImageClick}// Open the modal when the image is clicked
            title="Click to view recipe details"  // Tooltip text
          />

          <div className="recipe-detail">
            {/* Display Area section */}
            <div className="area">
              <p className="">
                {detail && getArea()
                  ? `Origin: ${getArea()}`
                  : 'Area not available.'}
              </p>
            </div>

            <div className="category">
              <p className="">
                {detail && detail.strCategory
                  ? `Category: ${detail.strCategory}`
                  : 'category not available'}
              </p>
            </div>           
            
          </div>
        </div>
      </div>
       {/* Conditional Rendering of the Modal */}
       {isModalOpen && detail && (
        <Modal recipe={detail} onClose={closeModal} />
      )}
    </>
  );
};

export default RecipeCard;
