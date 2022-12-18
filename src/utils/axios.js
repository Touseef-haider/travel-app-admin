import axios from "axios";
import { get } from "./storage";

const instance = axios.create({
  baseURL: "http://localhost:8081/api",
  timeout: 1000000,
});

// for request
instance.interceptors.request.use(
  function (config) {
    const token = get("token");
    if (token) {
      config.headers.authorization = `Bearer ${token} `;
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

// for response
instance.interceptors.response.use(
  function (response) {
    return response?.data;
  },
  function (err) {
    const { data } = err?.response;
    return data;
  }
);

export default instance;
