import axios from "axios";

const API_BASE_URL = "http://localhost:8080";

export const fetchTransactionsApi = (accountId) => {
  return axios.get(`${API_BASE_URL}/transactions/account/${accountId}`);
};

export const addTransactionApi = (accountId, newTransaction) => {
  return axios.post(
    `${API_BASE_URL}/transactions/${accountId}`,
    newTransaction
  );
};

export const deleteTransactionApi = (transactionId) => {
  return axios.delete(`${API_BASE_URL}/transactions/${transactionId}`);
};

export const fetchUserAccountsApi = (userId) => {
  return axios.get(`${API_BASE_URL}/users/${userId}/accounts`);
};

export const updateTransactionApi = (transactionId, updatedTransaction) => {
  return axios.put(
    `${API_BASE_URL}/transactions/${transactionId}`,
    updatedTransaction
  );
};

export const fetchAccountDetailsApi = (accountId) => {
  return axios.get(`${API_BASE_URL}/${accountId}`);
};
