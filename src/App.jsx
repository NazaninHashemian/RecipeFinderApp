// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom';
import { useState } from 'react';
import MainIngredient from './components/MainIngredient';
import MealName from './components/MealName';
import MealFirstLetter from './components/MealFirstLetter';
import Categories from './components/Categories/Categories';
import Cuisine from './components/Cuisine';
import Random from './components/Random';
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle'; 
import './App.css';

const activeHandling = ({ isActive }) => (isActive ? 'active' : ''); // Updated handling for active class

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark/light mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    if(isDarkMode) document.body.classList.remove('dark-mode');
    else  document.body.classList.add('dark-mode');
  };

  return (
    <Router>
      <div className={isDarkMode ? 'dark-mode' : ''}>
        <div className="nav">
          <NavLink to="/name" className={activeHandling}>
            <button>Name</button>
          </NavLink>

          <NavLink to="/first-letter" className={activeHandling}>
            <button>First Letter</button>
          </NavLink>

          <NavLink to="/ingredient" className={activeHandling}>
            <button>Ingredient</button>
          </NavLink>

          <NavLink to="/cuisine" className={activeHandling}>
            <button>Cuisine</button>
          </NavLink>

          <NavLink to="/random" className={activeHandling}>
            <button>Random</button>
          </NavLink>

          <NavLink to="/categories" className={activeHandling}>
            <button>Categories</button>
          </NavLink>
        </div>

        <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>

        <Routes>
          <Route path="/name" element={<MealName />} />
          <Route path="/first-letter" element={<MealFirstLetter />} />
          <Route path="/ingredient" element={<MainIngredient />} />
          <Route path="/cuisine" element={<Cuisine />} />
          <Route path="/random" element={<Random />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="*" element={<MealName />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
