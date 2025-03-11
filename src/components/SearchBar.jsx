import React from 'react';

const SearchBar = ({ label, value, onChange, onClear, placeholder }) => {
  return (
    <div className="search-container">
      <label>{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="input"
      />
      <button onClick={onClear} className="clear-btn">
        Clear
      </button>
    </div>
  );
};

export default SearchBar;
