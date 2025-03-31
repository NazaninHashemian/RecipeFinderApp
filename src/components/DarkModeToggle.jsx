// DarkModeToggle.jsx
import React from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div title='Switch between Dark and Light Mode' className="toggle-container" onClick={toggleDarkMode}>
      <div className={`toggle-slider ${isDarkMode ? 'dark' : ''}`} />
      <span className="mode-label">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
    </div>
  );
};

export default DarkModeToggle;
