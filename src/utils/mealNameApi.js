//src/utils/mealNameApi.js
const fetchNames = async () => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=`
      );
      const data = await response.json();
      if (data.meals) {
        console.log('yes');
        console.log(data.meals.map(meal => meal.strMeal))
        return data.meals.map((meal) => meal.strMeal);
      }
      return []; // If no ingredients are found, return an empty array
    } catch (error) {
      console.error('Error fetching names:', error);
      return []; // Return an empty array in case of an error
    }
  };
  export default fetchNames;
  