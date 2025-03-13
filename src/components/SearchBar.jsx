import React, { useState } from 'react';

import './searchBar.css';

const SearchBar = ({ label, value, onChange, onClear, placeholder }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filteredCuisines, setFilteredCuisines] = useState([]);

  // Updated list of cuisines
  const cuisines = [
    'American',
    'British',
    'Canadian',
    'Chinese',
    'Croatian',
    'Dutch',
    'Egyptian',
    'Filipino',
    'French',
    'Greek',
    'Indian',
    'Irish',
    'Italian',
    'Jamaican',
    'Japanese',
    'Kenyan',
    'Malaysian',
    'Mexican',
    'Moroccan',
    'Polish',
    'Portuguese',
    'Russian',
    'Spanish',
    'Thai',
    'Tunisian',
    'Turkish',
    'Ukrainian',
    'Uruguayan',
    'Vietnamese',
  ];

  // Handle input change and filter cuisines based on the input
  const handleInputChange = (e) => {
    onChange(e.target.value); // Update the input value in the parent component
    const searchTerm = e.target.value.toLowerCase();
    setFilteredCuisines(
      cuisines.filter(
        (cuisine) => cuisine.toLowerCase().includes(searchTerm) // Filter list based on input
      )
    );
    setIsDropdownVisible(searchTerm.length > 0); // Show dropdown when there's input
  };

  // Handle cuisine selection from the dropdown
  const handleSelectCuisine = (selectedCuisine) => {
    onChange(selectedCuisine); // Set the selected cuisine to the input field
    setIsDropdownVisible(false); // Hide dropdown after selection
  };

  return (
    <div className="search-container">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={handleInputChange} // Update to the new input handler
        placeholder={placeholder}
        className="input"
        onFocus={() => setIsDropdownVisible(true)} // Show dropdown when the input is focused
      />
      {/* Dropdown for filtered cuisines */}
      {isDropdownVisible && filteredCuisines.length > 0 && (
        <ul className="dropdown">
          {filteredCuisines.map((cuisine, index) => (
            <li key={index} onClick={() => handleSelectCuisine(cuisine)}>
              {cuisine}
            </li>
          ))}
        </ul>
      )}
      <button onClick={onClear} className="clear-btn">
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
