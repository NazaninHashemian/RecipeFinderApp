const LoadingIndicator = ({ isLoading }) => {
  return isLoading ? <p style={{ color: 'blue' }}>Loading...</p> : null;
};
export default LoadingIndicator;
