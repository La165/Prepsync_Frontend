import API from "../api/axios";


export const register = (userData) => {
  return API.post("/auth/register", userData);
};