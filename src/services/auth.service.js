import axios from "axios";
import config from "../config.json"
import { Buffer } from 'buffer';
import { Navigate } from 'react-router-dom'

const API_URL = config.API_URL;

const signup = (email, password) => {
  return axios
    .post(API_URL + "", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const login = (email, password) => {
  const token = Buffer.from(`${email}:${password}`, 'utf8').toString('base64')
  return axios
    .get(API_URL + "/auth", {
      headers: {
        'Authorization': `Basic ${token}`
      }
    })
    .then((response) => {
      if (response.data.token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  <Navigate to='/login' />
  localStorage.removeItem("user");
  window.location.reload();
};

const invalidToken = (...args) => {
  if (args[0].response && args[0].response.status === 401) {
    <Navigate to='/login' />
    localStorage.removeItem("user");
    window.location.reload();
  }
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  invalidToken,
  getCurrentUser,
};

export default authService;
