// LoadingIndicator.jsx
import React from 'react';

// Define the prop types
interface LoadingIndicatorProps {
  isLoading: boolean | null; 
}
const LoadingIndicator: React.FC<LoadingIndicatorProps>  = ({ isLoading }) => {
  return isLoading ? <p style={{ color: 'blue' }}>Loading...</p> : null;
};
export default LoadingIndicator;
