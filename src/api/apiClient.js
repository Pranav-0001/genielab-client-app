import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;
// const BASE_URL = 'http://10.4.3.148:5000';

export const api = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);
