import { useCallback } from 'react';
import { productsAPI } from '../services/api/products';
import { useAPI } from './useAPI';

export const useProducts = () => {
  const { loading, error, handleRequest } = useAPI();

  const getProducts = useCallback((params) => 
    handleRequest(() => productsAPI.getProducts(params)), []);

  const getProductById = useCallback((id) => 
    handleRequest(() => productsAPI.getProductById(id)), []);

  const getCategories = useCallback(() => 
    handleRequest(() => productsAPI.getCategories()), []);

  const searchProducts = useCallback((query) => 
    handleRequest(() => productsAPI.searchProducts(query)), []);

  return {
    loading,
    error,
    getProducts,
    getProductById,
    getCategories,
    searchProducts,
  };
}; 