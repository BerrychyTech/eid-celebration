// Add this helper function
const getAuthToken = (): string | null => {
  try {
    const reduxStateStr = localStorage.getItem("berrygo-auth");
    if (reduxStateStr) {
      const reduxState = JSON.parse(reduxStateStr);
      return reduxState.state?.token || null;
    }
  } catch (error) {
    console.error("Error getting auth token:", error);
  }
  return null;
};

// Then use it in your functions:
const handleConfirmSubmit = async () => {
  const token = getAuthToken();
  // ... rest of your code
};
export default getAuthToken;