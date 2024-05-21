import axios from "axios";

const axiosApi = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  timeout: 20000,
  withCredentials: true,
});

const axiosPrivate = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export { axiosApi, axiosPrivate };
