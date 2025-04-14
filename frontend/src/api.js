import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5001/api",
  withCredentials: true,
});

// API interceptor for catching expired tokens
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      // Optional: auto-logout or redirect
      localStorage.removeItem("token");
      // You can even force refresh:
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;
