import axios from "axios";
import { useAuthStore } from "../store/AuthStore";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
});
  
  axiosInstance.interceptors.request.use(async (request) => {
    const authStore = useAuthStore(); // Always retrieve the store dynamically
    const token = authStore.getCurrentUser()?.accessToken;
  
    if (request.headers && token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  });
  
  export default axiosInstance;
  