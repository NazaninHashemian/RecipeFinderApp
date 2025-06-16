// App.jsx
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { useState } from 'react';
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle'; 
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './components/AppRoutes/AppRoutes';
import Recipe from './utils/types';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // const [likedIds, setLikedIds] = useState<string[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<Recipe[]>([]);

  const toggleLike = (recipe: Recipe) => {
    setLikedRecipes((prev) =>
      prev.find((r) => r.idMeal === recipe.idMeal)
        ? prev.filter((r) => r.idMeal !== recipe.idMeal)
        : [...prev, recipe]
    );
  };
  
  const likedIds = likedRecipes.map((r) => r.idMeal);

  // Function to toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    if(isDarkMode) document.body.classList.remove('dark-mode');
    else  document.body.classList.add('dark-mode');
  };

  return (
    <Router>
      <div className={isDarkMode ? 'dark-mode' : ''}>
        <Navbar isDarkMode={isDarkMode}/>
        <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
        <AppRoutes 
          likedIds={likedIds} 
          toggleLike={toggleLike} 
          likedRecipes={likedRecipes}
        />

      </div>
    </Router>
  );
}

export default App;
