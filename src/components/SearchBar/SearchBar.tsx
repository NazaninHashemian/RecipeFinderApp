import React, { useEffect, useState } from 'react';
import './SearchBar.css';

//  interface for props 
interface SearchBarProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
  placeholder?: string;
  fetchDataFunction?: () => Promise<string[]>;
  cacheKey: string;
  maxLength?: number;
}

const SearchBar:React.FC<SearchBarProps> = ({
  label,
  value,
  onChange,
  onClear,
  placeholder,
  fetchDataFunction,
  cacheKey,
  maxLength, 
}) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState<boolean>(false);
  const [filteredItems, setFilteredItems] = useState<string[]>([]);
  const [items, setItems] = useState<string[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const cachedData = localStorage.getItem(cacheKey); // Check localStorage for cached cuisines
      if (cachedData) {
        setItems(JSON.parse(cachedData)); // Load from localStorage
      } else if (fetchDataFunction) {
        try {
          const fetchedData = await fetchDataFunction(); // Fetch dynamically
          setItems(fetchedData);
          localStorage.setItem(cacheKey, JSON.stringify(fetchedData)); // Cache the cuisines in localStorage
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    loadData();
  }, [fetchDataFunction, cacheKey]);
  // Handle input change and filter cuisines based on the input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value); // Update the input value in the parent component
    const searchTerm = e.target.value.toLowerCase();
    setFilteredItems(
      items.filter(
        (item) => item.toLowerCase().includes(searchTerm) // Filter list based on input
      )
    );
    setIsDropdownVisible(searchTerm.length > 0); // Show dropdown when there's input
  };

  // Handle cuisine selection from the dropdown
  const handleSelectItem = (selectedItem: string) => {
    onChange(selectedItem); // Set the selected item to the input field
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
        maxLength={maxLength} // Allow components to control length
      />
      {/* Dropdown for filtered cuisines */}
      {isDropdownVisible && filteredItems.length > 0 && (
        <ul className="dropdown">
          {filteredItems.map((item, index) => (
            <li key={index} onClick={() => handleSelectItem(item)}>
              {item}
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
