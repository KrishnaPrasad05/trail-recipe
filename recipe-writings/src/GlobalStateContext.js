import React, { createContext, useState, useContext } from 'react';

// Create a context for global state
const GlobalStateContext = createContext();

// Custom hook to use the GlobalStateContext
export const useGlobalState = () => useContext(GlobalStateContext);

// Provider component to wrap the app and provide the global state
export const GlobalStateProvider = ({ children }) => {
  const [globalState, setGlobalState] = useState({
    isLoggedIn: false,
    // Add any other global state variables here
  });

  return (
    <GlobalStateContext.Provider value={{ globalState, setGlobalState }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
