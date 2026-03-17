import axios from "axios";

const API = axios.create({
  baseURL: "https://expense-tracker-3-3p28.onrender.com"
});

API.interceptors.request.use((req) => {

  const token = localStorage.getItem("token");

  if (token && token !== "null") {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;