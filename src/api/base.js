import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://grupp3-rbnuy.reky.se',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;