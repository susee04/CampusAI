import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic error handler
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can handle global errors here
    console.error('API Error:', error.response?.data?.message || error.message);
    return Promise.reject(error);
  }
);

export const checkHealth = async () => {
  try {
    const response = await apiClient.get('/health');
    return response.data;
  } catch (error) {
    console.error('Health check failed:', error);
    throw error;
  }
};

export const sendChatMessage = async (message: string, conversationId?: string | null) => {
  try {
    const response = await apiClient.post('/chat', { message, conversationId });
    return response.data;
  } catch (error) {
    console.error('Chat message failed:', error);
    throw error;
  }
};

export const uploadDocument = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  
  try {
    const response = await apiClient.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Document upload failed:', error);
    throw error;
  }
};

export default apiClient;
