import axios from "axios";
import config from "../config.json"

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
  localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const authService = {
  signup,
  login,
  logout,
  getCurrentUser,
};

export default authService;
