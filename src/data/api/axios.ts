import axios from "axios";
import { useAuthStore } from "../store/AuthStore";

const getBackendUrl = () => {
  const runtimeConfig = (window as any).APP_CONFIG;
  return runtimeConfig?.VITE_BACKEND_URL || import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000/api';
};

const axiosInstance = axios.create({
    baseURL: getBackendUrl(),
});

axiosInstance.interceptors.request.use(async (request) => {
    const authStore = useAuthStore();
    const token = authStore.getCurrentUser()?.accessToken;

    if (request.headers && token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

export default axiosInstance;