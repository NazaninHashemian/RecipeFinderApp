// App.jsx
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Navigate,
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
import Navbar from './components/Navbar/Navbar';

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
        <Navbar isDarkMode={isDarkMode}/>
        <DarkModeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
        <Routes>
          <Route path="/name" element={<MealName />} />
          <Route path="/first-letter" element={<MealFirstLetter />} />
          <Route path="/ingredient" element={<MainIngredient />} />
          <Route path="/cuisine" element={<Cuisine />} />
          <Route path="/random" element={<Random />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="*" element={<Navigate to='/name' replace/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
