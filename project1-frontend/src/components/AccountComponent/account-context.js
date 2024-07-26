import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchAccountsApi, addAccountApi, deleteAccountApi } from './account-api';

export const AccountContext = createContext();

export const AccountProvider = ({ children }) => {
  const [state, setState] = useState({
    accounts: [],
    newAccount: {
      accountName: '',
      balance: '',
      accountType: 'CREDIT',
      creditLimit: '',
      apr: '',
      principal: '',
      loanDisbursementDate: '',
      loanRepaymentDate: '',
      minMonthlyPayment: ''
    }
  });

  const fetchAccounts = useCallback((userId) => {
    fetchAccountsApi(userId)
      .then(response => {
        setState(prevState => ({
          ...prevState,
          accounts: response.data
        }));
      })
      .catch(error => console.error('There was an error fetching the accounts.', error));
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setState(prevState => ({
      ...prevState,
      newAccount: {
        ...prevState.newAccount,
        [name]: value
      }
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      var userId = user.id;
    }

    addAccountApi(userId, state.newAccount)
      .then(response => {
        setState(prevState => ({
          ...prevState,
          accounts: [...prevState.accounts, response.data],
          newAccount: {
            accountName: '',
            balance: '',
            accountType: 'CREDIT',
            creditLimit: '',
            apr: '',
            principal: '',
            loanDisbursementDate: '',
            loanRepaymentDate: '',
            minMonthlyPayment: ''
          }
        }));
      })
      .catch(error => {
        console.error('There was an error creating the account.', error);
      });
  };

  const closeAccount = (accountId) => {
    deleteAccountApi(accountId)
      .then(response => {
        if (response.data) {
          setState(prevState => ({
            ...prevState,
            accounts: prevState.accounts.filter(account => account.accountId !== accountId)
          }));
          console.log(`Account with ID ${accountId} deleted.`);
        }
      })
      .catch(error => {
        console.error('There was an error deleting the account.', error);
      });
  };

  return (
    <AccountContext.Provider value={{ state, fetchAccounts, handleInputChange, handleSubmit, closeAccount, setState }}>
      {children}
    </AccountContext.Provider>
  );
};

export const useAccountContext = () => {
  return useContext(AccountContext);
};
