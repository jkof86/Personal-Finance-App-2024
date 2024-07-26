import React, { createContext, useContext, useState, useCallback } from "react";
import {
  fetchTransactionsApi,
  addTransactionApi,
  deleteTransactionApi,
  updateTransactionApi,
  fetchUserAccountsApi,
  fetchAccountDetailsApi,
} from "./transaction-api";

// Create a context to hold transaction-related data and functions
export const TransactionContext = createContext();

// TransactionProvider component manages the global state for transactions
export const TransactionProvider = ({ children }) => {
  const [state, setState] = useState({
    transactions: [],
    accounts: [],
    selectedAccount: null,
    newTransaction: {
      transactionDate: "",
      amount: "",
      description: "",
      recurring: "",
      recurringFrequency: "",
      transactionType: "",
      relatedTransactionId: "",
    },
    updatedTransaction: null, // Change this to null initially
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const inputValue = type === "checkbox" ? checked : value;
    setState((prevState) => ({
      ...prevState,
      newTransaction: {
        ...prevState.newTransaction,
        [name]: inputValue,
      },
      updatedTransaction: prevState.updatedTransaction
        ? {
            ...prevState.updatedTransaction,
            [name]: inputValue,
          }
        : null,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!state.selectedAccount) {
      console.error("No account selected.");
      return;
    }
    const accountId = state.selectedAccount.accountId;
    console.log(
      "Transaction to add:",
      JSON.stringify(state.newTransaction, null, 2)
    ); // Log the new transaction in a readable format

    addTransactionApi(accountId, state.newTransaction)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          transactions: [...prevState.transactions, response.data],
          newTransaction: {
            transactionDate: "",
            amount: "",
            description: "",
            recurring: "",
            recurringFrequency: "",
            transactionType: "",
            relatedTransactionId: "",
          },
        }));
        return fetchAccountDetailsApi(accountId); // Fetch updated account details
      })
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          selectedAccount: response.data,
        }));
      })
      .catch((error) => {
        console.error("There was an error creating the transaction.", error);
      });
  };

  const updateTransaction = (transactionId, updatedTransaction) => {
    console.log("Updating transaction:", transactionId, updatedTransaction);
    if (!transactionId) {
      console.error("Transaction ID is undefined");
      return;
    }
    return updateTransactionApi(transactionId, updatedTransaction)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          transactions: prevState.transactions.map((transaction) =>
            transaction.transactionId === transactionId
              ? response.data
              : transaction
          ),
          updatedTransaction: null, // Clear the updatedTransaction after updating
        }));
        return fetchAccountDetailsApi(state.selectedAccount.accountId); // Fetch updated account details
      })
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          selectedAccount: response.data,
        }));
      })
      .catch((error) => {
        console.error("There was an error updating the transaction.", error);
      });
  };

  const fetchTransactions = useCallback((accountId) => {
    console.log("fetching transactions...");
    return fetchTransactionsApi(accountId)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          transactions: response.data,
        }));
      })
      .catch((error) =>
        console.error("There was an error fetching the transactions.", error)
      );
  }, []);

  const fetchUserAccounts = useCallback((userId) => {
    fetchUserAccountsApi(userId)
      .then((response) => {
        setState((prevState) => ({
          ...prevState,
          accounts: response.data,
        }));
      })
      .catch((error) =>
        console.error("There was an error fetching the accounts.", error)
      );
  }, []);

  const deleteTransaction = (transactionId) => {
    if (!state.selectedAccount) {
      console.error("No account selected.");
      return;
    }
    const accountId = state.selectedAccount.accountId;
    deleteTransactionApi(transactionId)
      .then(() => {
        fetchTransactions(accountId)
          .then(() => {
            return fetchAccountDetailsApi(accountId); // Fetch updated account details
          })
          .then((response) => {
            setState((prevState) => ({
              ...prevState,
              selectedAccount: response.data,
            }));
          })
          .catch((error) => {
            console.error(
              "There was an error fetching the account details.",
              error
            );
          });
        console.log(`Transaction with ID ${transactionId} deleted.`);
      })
      .catch((error) => {
        console.error("There was an error deleting the transaction.", error);
      });
  };

  return (
    <TransactionContext.Provider
      value={{
        state,
        fetchTransactions,
        deleteTransaction,
        handleSubmit, // Still provide handleSubmit for adding transactions
        updateTransaction, // Provide the update function
        handleInputChange,
        fetchUserAccounts,
        setState, // Pass setState to allow setting selectedAccount
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
