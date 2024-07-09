import axios from "axios";

export const apiBaseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_LINK,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('token')}`,
  },
});

export const authAxios = axios.create({
  baseURL: process.env.REACT_APP_API_LINK,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
