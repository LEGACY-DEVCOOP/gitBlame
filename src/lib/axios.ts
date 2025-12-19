import axios, { AxiosInstance } from 'axios';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://127.0.0.1:8000';

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // If cookies are involved, though the spec mentions Bearer token
});

// Request interceptor to add the auth token header
apiClient.interceptors.request.use(
  (config) => {
    // You might want to get this from a store or context
    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('accessToken')
        : null;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors (e.g., 401)
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401: Unauthorized - clear token and redirect to login
    if (error.response && error.response.status === 401) {
      // Clear the access token
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        // Redirect to home page (marketing/login page)
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
