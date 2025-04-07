// ErrorMessage.jsx
import React from 'react';

// Define the prop types
interface ErrorMessageProps {
  error: string | null; // Error can be a string or null
}
const ErrorMessage: React.FC<ErrorMessageProps> = ({ error }) => {
  return error ? <p style={{ color: 'red' }}>{error}</p> : null;
};
export default ErrorMessage;
