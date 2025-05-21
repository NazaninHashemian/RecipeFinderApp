// App.jsx
import {
  BrowserRouter as Router,
} from 'react-router-dom';
import { useState } from 'react';
import DarkModeToggle from './components/DarkModeToggle/DarkModeToggle'; 
import './App.css';
import Navbar from './components/Navbar/Navbar';
import AppRoutes from './components/AppRoutes/AppRoutes';

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
        <AppRoutes/>
      </div>
    </Router>
  );
}

export default App;
