import axios from "axios";

export const apiBaseAxios = axios.create({
  baseURL: process.env.REACT_APP_API_LINK,
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
  },
});

export const apiMultipartAxios = axios.create({
  baseURL: process.env.REACT_APP_API_LINK,
  headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
  },
});

export const authAxios = axios.create({
  baseURL: process.env.REACT_APP_API_LINK,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});
