//src/utils/cuisinesApi.ts
const fetchCuisines = async (): Promise<string[]>  => {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
    );
    const data = await response.json();
    if (data.meals) {
      return data.meals.map((meal: {strArea: string}) => meal.strArea);
    }
    return []; // If no ingredients are found, return an empty array
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    return []; // Return an empty array in case of an error
  }
};
export default fetchCuisines;
