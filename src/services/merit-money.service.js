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

const meritMoneyService = { 
  getBalanceHistories,
  getUserBalance
};

export default meritMoneyService;
