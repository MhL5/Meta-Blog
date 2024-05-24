import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 20000,
  withCredentials: true,
});

export { axiosApi };
