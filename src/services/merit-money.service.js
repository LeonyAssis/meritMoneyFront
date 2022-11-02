import axios from "axios";
import authHeader from "./auth-header";
import config from "../config.json"

const API_URL = config.API_URL;

const getBalanceHistories = () => {
  return axios.get(API_URL + "/balance/histories", { headers: authHeader() });
};

const getUserBalance = (userId) => {
  return axios.get(API_URL + `/balance/${userId}`, { headers: authHeader() });
};

const getUsers = (name = null) => {
  let params;
  if (name) {
    params = { name }
  }
  return axios.get(API_URL + '/users', { headers: authHeader(), params });
};

const transferMoney = (body) => {
  return axios.post(API_URL + '/balance/transfer-money', body, { headers: authHeader() });
};

const meritMoneyService = {
  getBalanceHistories,
  getUserBalance,
  getUsers,
  transferMoney
};

export default meritMoneyService;
