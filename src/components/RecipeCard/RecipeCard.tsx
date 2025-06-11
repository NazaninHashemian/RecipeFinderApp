//src/components/RecipeCard.jsx
import React, { useEffect, useState } from 'react';
// import LoadingIndicator from './LoadingIndicator';
// import Error from './ErrorMessage';
import Modal from '../Modal/Modal';
import Recipe from '../../utils/types';
import { BASE_URL } from '../../utils/apiConfig';
import './RecipeCard.css';
import Like from '../Like/Like';

type RecipeCardProps = {
  recepie: Recipe | null; 
  isLiked: boolean;
  onToggleLike: (id: string) => void;
};

const RecipeCard: React.FC<RecipeCardProps> = ({ recepie, isLiked, onToggleLike}) => {
  // const [loading, setLoading] = useState<boolean >(false);
  // const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const { idMeal, strMealThumb, strMeal } = recepie || {}; // Prevents errors if recipe is undefined;
  useEffect(() => {
    if (!idMeal) return;  // Prevent fetching if idMeal is not available
    const fetchRecipeDetail = async () => {
      try {
        // setLoading(true);
        // setError(null);

        const response = await fetch(`${BASE_URL}/lookup.php?i=${idMeal}`);
        const data = await response.json();

        if (data.meals) {
          setDetail(data.meals[0]);
        } else setDetail(null);
        // setLoading(false);
      } catch 
      // (error: any) 
      {
        // setError(error.message);
        // setLoading(false);
      } finally {
        // setLoading(false);
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
             
            <Like 
              onClick={() => {
                if(idMeal) onToggleLike(idMeal);
                }}
              liked={isLiked}
            />
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
