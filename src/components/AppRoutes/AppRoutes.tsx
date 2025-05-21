import { Navigate, Route, Routes } from "react-router-dom";
import MealName from "../MealName";
import MealFirstLetter from "../MealFirstLetter";
import MainIngredient from "../MainIngredient";
import Cuisine from "../Cuisine";
import Random from "../Random";
import Categories from "../Categories/Categories";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/name" element={<MealName />} />
        <Route path="/first-letter" element={<MealFirstLetter />} />
        <Route path="/ingredient" element={<MainIngredient />} />
        <Route path="/cuisine" element={<Cuisine />} />
        <Route path="/random" element={<Random />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<Navigate to='/name' replace/>} />
    </Routes>
  )
}
export  default AppRoutes;