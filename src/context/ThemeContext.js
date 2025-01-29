import React, { createContext, useContext, useReducer, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ThemeContext = createContext();

const lightTheme = {
  primary: '#000000',
  secondary: '#FFFFFF',
  background: '#FFFFFF',
  text: '#000000',
  border: '#E5E5E5',
  // Add more colors
};

const darkTheme = {
  primary: '#FFFFFF',
  secondary: '#000000',
  background: '#121212',
  text: '#FFFFFF',
  border: '#2A2A2A',
  // Add more colors
};

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        isDark: !state.isDark,
        colors: !state.isDark ? darkTheme : lightTheme,
      };
    case 'SET_THEME':
      return {
        ...state,
        isDark: action.payload,
        colors: action.payload ? darkTheme : lightTheme,
      };
    default:
      return state;
  }
};

export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(themeReducer, {
    isDark: false,
    colors: lightTheme,
  });

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme !== null) {
        dispatch({ type: 'SET_THEME', payload: JSON.parse(savedTheme) });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleTheme = async () => {
    try {
      await AsyncStorage.setItem('theme', JSON.stringify(!state.isDark));
      dispatch({ type: 'TOGGLE_THEME' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ThemeContext.Provider value={{
      ...state,
      toggleTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 