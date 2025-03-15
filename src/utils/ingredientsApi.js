//src/utils/ingredientsApi.js
const fetchIngredients = async () => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
    );
    const data = await response.json();
    if (data.meals) {
      return data.meals.map((meal) => meal.strIngredient);
    }
    return []; // If no ingredients are found, return an empty array
  } catch (error) {
    console.error('Error fetching ingredients :', error);
    return []; // Return an empty array in case of an error
  }
};
export default fetchIngredients;
