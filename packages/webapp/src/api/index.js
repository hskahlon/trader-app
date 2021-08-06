import axios from "axios";

const API = axios.create({ baseURL: "http://34.127.9.86:5000" });

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchStocks = () => API.get("/getInventory");
export const createStock = (newStock) => API.post("/addInventory", newStock);
export const sellStock = (sellStock) => API.post(`/sellInventory`, sellStock);

export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
