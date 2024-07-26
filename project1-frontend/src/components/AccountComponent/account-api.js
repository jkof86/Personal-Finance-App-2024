import axios from 'axios';

const API_BASE_URL = "http://localhost:8080";

export const fetchAccountsApi = (userId) => {
  return axios.get(`${API_BASE_URL}/users/${userId}/accounts`);
};

export const addAccountApi = (userId, newAccount) => {
  return axios.post(`${API_BASE_URL}/accounts/add/${userId}`, newAccount);
};

export const deleteAccountApi = (accountId) => {
  return axios.delete(`${API_BASE_URL}/accounts/delete/${accountId}`);
};