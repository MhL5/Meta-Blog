import axios from "axios";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 20000,
  withCredentials: true,
});

export { axiosApi };
