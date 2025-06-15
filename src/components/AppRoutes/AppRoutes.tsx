// AppRoutes.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import MealName from "../MealName";
import MealFirstLetter from "../MealFirstLetter";
import MainIngredient from "../MainIngredient";
import Cuisine from "../Cuisine";
import Random from "../Random";
import Categories from "../Categories/Categories";

interface AppRoutesProps {
  likedIds: string[];
  toggleLike: (id: string) => void;
}

const AppRoutes = ({likedIds, toggleLike}: AppRoutesProps) => {
  return (
    <Routes>
        <Route path="/name" element={<MealName likedIds={likedIds} toggleLike={toggleLike}/>} />
        <Route path="/first-letter" element={<MealFirstLetter likedIds={likedIds} toggleLike={toggleLike} />} />
        <Route path="/ingredient" element={<MainIngredient  likedIds={likedIds} toggleLike={toggleLike} />} />
        <Route path="/cuisine" element={<Cuisine likedIds={likedIds} toggleLike ={toggleLike}/>} />
        <Route path="/random" element={<Random likedIds={likedIds} toggleLike={toggleLike} />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<Navigate to='/name' replace/>} />
    </Routes>
  )
}
export  default AppRoutes;