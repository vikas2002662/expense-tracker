import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:9091"
});

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token && token !== "null") {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;