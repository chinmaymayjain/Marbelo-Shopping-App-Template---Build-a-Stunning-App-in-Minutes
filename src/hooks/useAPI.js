import { useState, useCallback } from 'react';
import { useToast } from './useToast';

export const useAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const showToast = useToast();

  const handleRequest = useCallback(async (apiCall, successMessage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await apiCall();
      if (successMessage) {
        showToast(successMessage);
      }
      return response.data;
    } catch (err) {
      const message = err.response?.data?.message || 'Something went wrong';
      setError(message);
      showToast(message, 'error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { loading, error, handleRequest };
}; 