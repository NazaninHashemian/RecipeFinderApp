//src/components/RecipeCard.jsx
import { useEffect, useState } from 'react';
import LoadingIndicator from './LoadingIndicator';
import Error from './ErrorMessage';
import './RecipeCard.css';
import Modal from './Modal';


// // Define types for props and state variables
// interface Recipe {
//   idMeal: string;
//   strMealThumb: string;
//   strMeal: string;
// }
const RecipeCard = ({ recepie }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // State to manage modal visibility

  const { idMeal, strMealThumb, strMeal } = recepie || {}; // Prevents errors if recipe is undefined;
  useEffect(() => {
    if (!idMeal) return;  // Prevent fetching if idMeal is not available
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
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetail();
  }, [idMeal]);

   // Function to get the area of origin
   const getArea = () => detail?.strArea || 'Area not available';

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
      {/* <div className="recipe-error-loading">
        <LoadingIndicator loading={loading} />
        <Error error={error} />
      </div> */}

      <div className="recipe-card">
        <h2 
        className="recipe-title" 
        onClick={handleImageClick} 
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
