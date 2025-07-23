import axios, { AxiosResponse } from 'axios';
import { Score } from './types';

const API_BASE_URL = process.env.REACT_APP_API_URL || '';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth tokens if needed
api.interceptors.request.use(
  (config) => {
    // Add auth header if token exists
    const token = localStorage.getItem('auth-token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const getScores = async (): Promise<Score[]> => {
  try {
    const response: AxiosResponse<Score[]> = await api.get('/get-scores');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch scores:', error);
    return [];
  }
};

export const postScore = async (name: string, score: number): Promise<boolean> => {
  try {
    await api.post('/post-score', { name, score });
    return true;
  } catch (error) {
    console.error('Failed to post score:', error);
    return false;
  }
};
