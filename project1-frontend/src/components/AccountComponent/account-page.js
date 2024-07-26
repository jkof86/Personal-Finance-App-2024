import React, { useContext, useEffect } from 'react';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import { AccountContext } from './account-context';
import AccountList from './account-list';
import AddAccountForm from './add-account-form';
import './account-page.css';

export default function AccountPage() {
  const { state, fetchAccounts, handleInputChange, handleSubmit } = useContext(AccountContext);

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      var userId = user.id;
    }
    fetchAccounts(userId);
  }, [fetchAccounts]);

  return (
    <Container>
      <h1>Account List</h1>
      <Row>
        <AccountList accounts={state.accounts} />
      </Row>
      <h2>Add New Account</h2>
      <AddAccountForm
        newAccount={state.newAccount}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
}
