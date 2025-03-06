import './recipeCard.css';
const RecipeCard = ({ recepie }) => {
  const fetchRecipeDetail = async () => {
    try {
      setLoading(true);
      setError(null);



      
    } catch (error) {}
  };
  return (
    <>
      <h2>{recepie.strMeal}</h2>
      <img
        className="recipe-image"
        src={recepie.strMealThumb}
        alt={recepie.strMeals}
      />
    </>
  );
};

export default RecipeCard;
