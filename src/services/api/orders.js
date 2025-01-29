import api from './index';

export const ordersAPI = {
  getOrders: (params) => 
    api.get('/orders', { params }),

  getOrderById: (id) => 
    api.get(`/orders/${id}`),

  createOrder: (orderData) => 
    api.post('/orders', orderData),

  cancelOrder: (id) => 
    api.post(`/orders/${id}/cancel`),

  getOrderTracking: (id) => 
    api.get(`/orders/${id}/tracking`),

  getInvoice: (id) => 
    api.get(`/orders/${id}/invoice`),
}; 