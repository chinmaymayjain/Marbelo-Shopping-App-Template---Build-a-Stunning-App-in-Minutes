import React, { createContext, useContext, useReducer } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

const authReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case 'SIGN_OUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        user: { ...state.user, ...action.payload },
      };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    isAuthenticated: false,
    user: null,
    isLoading: true,
  });

  const signIn = async (email, password) => {
    try {
      // Add your authentication logic here
      const user = { email, name: 'Chinmay', id: '1' };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'SIGN_IN', payload: user });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const signUp = async (email, password, name) => {
    try {
      // Add your registration logic here
      const user = { email, name, id: Date.now().toString() };
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'SIGN_IN', payload: user });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const signOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      dispatch({ type: 'SIGN_OUT' });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const updateUser = async (userData) => {
    try {
      const updatedUser = { ...state.user, ...userData };
      await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
      dispatch({ type: 'UPDATE_USER', payload: userData });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  return (
    <AuthContext.Provider value={{
      ...state,
      signIn,
      signUp,
      signOut,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 