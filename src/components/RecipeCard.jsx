const RecipeCard = ({ recepie }) => {
  return (
    <>
      <h1>{recepie.strMeals}</h1>
      <img src={recepie.strMealThumb} alt={recepie.strMeals} />
    </>
  );
};

export default RecipeCard;
