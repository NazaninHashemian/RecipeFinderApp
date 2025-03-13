import React, { useEffect, useState } from 'react';
import fetchCuisines from '../utils/cuisinesApi';
import './searchBar.css';

const SearchBar = ({ label, value, onChange, onClear, placeholder }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [filteredCuisines, setFilteredCuisines] = useState([]);
  const [cuisines, setCuisines] = useState([]);

  useEffect(() => {
    const loadCuisines = async () => {
      const cachedCuisines = localStorage.getItem('cuisines'); // Check localStorage for cached cuisines
      if (cachedCuisines) {
        setCuisines(JSON.parse(cachedCuisines)); // Load from localStorage
      } else {
        try {
          const fetchedCuisines = await fetchCuisines();
          setCuisines(fetchedCuisines);
          localStorage.setItem('cuisines', JSON.stringify(fetchedCuisines)); // Cache the cuisines in localStorage
        } catch (error) {
          console.error('Error fetching cuisines:', error);
        }
      }
    };
    loadCuisines(); //  Call the function inside useEffect to run when the component mounts
  }, []);
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
