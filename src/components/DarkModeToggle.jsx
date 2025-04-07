// DarkModeToggle.jsx
import React from 'react';
import './DarkModeToggle.css';

const DarkModeToggle = ({ isDarkMode, toggleDarkMode }) => {
  return (
    <div className='main-container'>
      <span className="mode-label">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span>
      <div className="toggle-container" onClick={toggleDarkMode}>
        <div className={`toggle-slider ${isDarkMode ? 'dark' : ''}`} />
        {/* <span className="mode-label1">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span> */}
      </div>
    </div>
  );
};

export default DarkModeToggle;