import api from './index';

export const userAPI = {
  getProfile: () => 
    api.get('/user/profile'),

  updateProfile: (data) => 
    api.put('/user/profile', data),

  changePassword: (oldPassword, newPassword) => 
    api.put('/user/password', { oldPassword, newPassword }),

  getAddresses: () => 
    api.get('/user/addresses'),

  addAddress: (address) => 
    api.post('/user/addresses', address),

  updateAddress: (id, address) => 
    api.put(`/user/addresses/${id}`, address),

  deleteAddress: (id) => 
    api.delete(`/user/addresses/${id}`),

  getWishlist: () => 
    api.get('/user/wishlist'),

  addToWishlist: (productId) => 
    api.post('/user/wishlist', { productId }),

  removeFromWishlist: (productId) => 
    api.delete(`/user/wishlist/${productId}`),
}; 