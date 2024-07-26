import React, { useContext, useState, useEffect } from "react";
import { Container, Button, Form, Card } from "react-bootstrap";
import { TransactionContext } from "./transaction-context";
import TransactionList from "./transaction-list";
import AddTransactionForm from "./add-transaction-form";
import EditTransactionForm from "./edit-transaction-form"; // Import the EditTransactionForm component
import { fetchAccountDetailsApi } from "./transaction-api";

const TransactionPage = () => {
  const {
    state,
    fetchTransactions,
    handleInputChange,
    handleSubmit,
    updateTransaction, // Renamed for clarity
    fetchUserAccounts,
    setState,
    deleteTransaction,
  } = useContext(TransactionContext);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false); // State for showing edit modal
  const [selectedAccount, setSelectedAccountLocal] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [transactionToEdit, setTransactionToEdit] = useState(null); // State for transaction to edit

  useEffect(() => {
    const userString = localStorage.getItem("user");
    if (userString) {
      const user = JSON.parse(userString);
      console.log("Fetching user accounts for user ID:", user.id); // Debug log
      fetchUserAccounts(user.id);
    }
  }, [fetchUserAccounts]);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleShowEditModal = (transaction) => {
    setTransactionToEdit(transaction);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setTransactionToEdit(null);
    setShowEditModal(false);
  };

  const handleAccountChange = async (event) => {
    const accountId = event.target.value;
    console.log("Selected account ID:", accountId); // Debug log
    if (accountId) {
      const account = state.accounts.find(
        (acc) => acc.accountId === parseInt(accountId)
      );
      if (account) {
        setSelectedAccountLocal(account);
        await fetchTransactions(accountId);
        setState((prevState) => ({
          ...prevState,
          selectedAccount: account,
        }));
      }
    }
  };

  const handleSubmitTransaction = async (event) => {
    event.preventDefault();
    if (!selectedAccount) {
      console.error("No account selected.");
      return;
    }
    const accountId = selectedAccount.accountId;
    console.log("Submitting transaction for account ID:", accountId); // Debug log

    try {
      await handleSubmit(event);
      await fetchTransactions(accountId); // Fetch the updated transactions
      setState((prevState) => ({
        ...prevState,
        selectedAccount: fetchAccountDetailsApi(accountId).then(
          (res) => res.data
        ),
      }));
      setShowModal(false);
    } catch (error) {
      console.error("There was an error creating the transaction.", error);
    }
  };

  const handleUpdateTransactionWrapper = async (
    transactionId,
    updatedTransaction
  ) => {
    if (!selectedAccount) {
      console.error("No account selected.");
      return;
    }
    const accountId = selectedAccount.accountId;
    console.log("Updating transaction for account ID:", accountId); // Debug log

    try {
      await updateTransaction(transactionId, updatedTransaction);
      await fetchTransactions(accountId); // Fetch the updated transactions
      setState((prevState) => ({
        ...prevState,
        selectedAccount: fetchAccountDetailsApi(accountId).then(
          (res) => res.data
        ),
      }));
      setShowEditModal(false);
    } catch (error) {
      console.error("There was an error updating the transaction.", error);
    }
  };

  useEffect(() => {
    console.log("State updated:", state); // Debug log
    if (selectedAccount) {
      setTransactions(state.transactions);
    }
  }, [state.transactions, selectedAccount]);

  useEffect(() => {
    console.log("Selected account updated:", selectedAccount); // Debug log
  }, [selectedAccount]);

  const renderAccountDetails = (account) => {
    if (!account) return null;

    const accountType = account.accountType;
    const details = [];

    if (account.balance)
      details.push(<div key="balance">Balance: {account.balance}</div>);
    if (accountType === "CREDIT") {
      if (account.creditLimit)
        details.push(
          <div key="creditLimit">Credit Limit: {account.creditLimit}</div>
        );
      if (account.apr) details.push(<div key="apr">APR: {account.apr}</div>);
      if (account.minMonthlyPayment)
        details.push(
          <div key="minMonthlyPayment">
            Min Monthly Payment: {account.minMonthlyPayment}
          </div>
        );
    } else if (accountType === "LOAN") {
      if (account.principal)
        details.push(<div key="principal">Principal: {account.principal}</div>);
      if (account.loanDisbursementDate)
        details.push(
          <div key="loanDisbursementDate">
            Loan Disbursement Date: {account.loanDisbursementDate}
          </div>
        );
      if (account.loanRepaymentDate)
        details.push(
          <div key="loanRepaymentDate">
            Loan Repayment Date: {account.loanRepaymentDate}
          </div>
        );
      if (account.apr) details.push(<div key="apr">APR: {account.apr}</div>);
      if (account.minMonthlyPayment)
        details.push(
          <div key="minMonthlyPayment">
            Min Monthly Payment: {account.minMonthlyPayment}
          </div>
        );
    } else if (accountType === "DEBIT" || accountType === "BANK_DEPOSIT") {
      if (account.apr) details.push(<div key="apr">APR: {account.apr}</div>);
    }

    return details;
  };

  return (
    <Container style={{ marginTop: "80px" }}>
      <h1>Transaction Management</h1>
      <Form.Group controlId="accountSelect">
        <Form.Label>Select Account</Form.Label>
        <Form.Control as="select" onChange={handleAccountChange}>
          <option value="">Select an account</option>
          {Array.isArray(state.accounts) &&
            state.accounts.map((account) => (
              <option key={account.accountId} value={account.accountId}>
                {account.accountName}
              </option>
            ))}
        </Form.Control>
      </Form.Group>
      {selectedAccount && (
        <>
          <h2>Account Details</h2>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>{selectedAccount.accountName}</Card.Title>
              <Card.Text as="div">
                {renderAccountDetails(selectedAccount)}
              </Card.Text>
            </Card.Body>
          </Card>
          <Button variant="primary" onClick={handleShow}>
            Add New Transaction
          </Button>
          <h3>Transactions</h3>
          <TransactionList
            transactions={transactions}
            deleteTransaction={deleteTransaction}
            editTransaction={handleShowEditModal}
          />
        </>
      )}
      <AddTransactionForm
        show={showModal}
        handleClose={handleClose}
        handleSubmit={handleSubmitTransaction}
        handleInputChange={handleInputChange}
        newTransaction={state.newTransaction}
      />
      <EditTransactionForm
        show={showEditModal}
        handleClose={handleCloseEditModal}
        transaction={transactionToEdit}
        handleUpdateTransaction={handleUpdateTransactionWrapper}
        handleInputChange={handleInputChange}
        updatedTransaction={state.updatedTransaction}
        setUpdatedTransaction={(transaction) =>
          setState((prevState) => ({
            ...prevState,
            updatedTransaction: transaction,
          }))
        }
      />
    </Container>
  );
};

export default TransactionPage;
