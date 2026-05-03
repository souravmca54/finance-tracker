import axios from "axios";

const client = axios.create({
  // Change this to your Railway URL once deployed!
  baseURL: process.env.REACT_APP_API_URL || "http://127.0.0.1:8000"
});

// attach token automatically
client.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default client;
