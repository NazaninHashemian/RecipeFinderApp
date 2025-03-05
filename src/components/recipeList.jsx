import React, {useState,useEffect} from react;
const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);//State to store the filtered recipes
  const [ingregient, setIngregient]= useState('chicken_breast');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
};
useEffect(async () => {
  try{
    setLoading(true); // Start loading
    setError(null); // Reset error before fetching

    // Making the API call
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);

    // If response is successful, parse the data as JSON
    const data = await response.json();
    console.log(data);



    setLoading(false); // Stop loading
  }
  catch(error){
    setError("Failed to fetch recipes.");
    setLoading(false); // Stop loading even if an error occurs
  }
});
export default RecipeList;