// frontend/src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

console.log('🔗 API URL:', API_URL); // This will help debug

export const feedbackAPI = {
  // Get all feedbacks
  getAllFeedbacks: async () => {
    try {
      const response = await axios.get(`${API_URL}/feedback`);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching feedbacks:', error);
      throw error;
    }
  },

  // Create new feedback
  createFeedback: async (feedbackData) => {
    try {
      console.log('📤 Sending feedback to:', `${API_URL}/feedback`);
      console.log('📦 Data:', feedbackData);
      
      const response = await axios.post(`${API_URL}/feedback`, feedbackData);
      return response.data;
    } catch (error) {
      console.error('❌ Error creating feedback:', error.response || error);
      throw error;
    }
  },

  // Get statistics
  getStats: async () => {
    try {
      const response = await axios.get(`${API_URL}/feedback/stats`);
      return response.data;
    } catch (error) {
      console.error('❌ Error fetching stats:', error);
      throw error;
    }
  },
};