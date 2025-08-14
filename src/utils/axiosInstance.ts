import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL as string, 
  withCredentials: true,            
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
