import './recipeCard.css';
const RecipeCard = ({ recepie }) => {
  return (
    <>
      <h1>{recepie.strMeal}</h1>
      <img
        className="recipe-image"
        src={recepie.strMealThumb}
        alt={recepie.strMeals}
      />
    </>
  );
};

export default RecipeCard;
