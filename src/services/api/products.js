import api from './index';

export const productsAPI = {
  getProducts: (params) => 
    api.get('/products', { params }),

  getProductById: (id) => 
    api.get(`/products/${id}`),

  getCategories: () => 
    api.get('/categories'),

  getCategoryProducts: (categoryId, params) => 
    api.get(`/categories/${categoryId}/products`, { params }),

  getNewArrivals: () => 
    api.get('/products/new-arrivals'),

  getBestSellers: () => 
    api.get('/products/best-sellers'),

  searchProducts: (query) => 
    api.get('/products/search', { params: { query } }),

  getRelatedProducts: (productId) => 
    api.get(`/products/${productId}/related`),

  getProductReviews: (productId) => 
    api.get(`/products/${productId}/reviews`),
}; 