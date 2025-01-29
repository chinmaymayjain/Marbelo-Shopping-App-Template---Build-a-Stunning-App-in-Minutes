import api from './index';

export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),

  register: (userData) => 
    api.post('/auth/register', userData),

  verifyOTP: (email, otp) => 
    api.post('/auth/verify-otp', { email, otp }),

  resendOTP: (email) => 
    api.post('/auth/resend-otp', { email }),

  forgotPassword: (email) => 
    api.post('/auth/forgot-password', { email }),

  resetPassword: (token, newPassword) => 
    api.post('/auth/reset-password', { token, newPassword }),

  refreshToken: () => 
    api.post('/auth/refresh-token'),

  socialAuth: (provider, token) => 
    api.post('/auth/social', { provider, token }),
}; 