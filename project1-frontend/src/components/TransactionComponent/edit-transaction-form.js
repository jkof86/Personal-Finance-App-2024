import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useTransactionContext } from "./transaction-context";

const EditTransactionForm = ({
  show,
  handleClose,
  transaction,
  handleUpdateTransaction,
}) => {
  const { handleInputChange, state, setState } = useTransactionContext();

  useEffect(() => {
    if (transaction) {
      setState((prevState) => ({
        ...prevState,
        updatedTransaction: transaction,
      }));
    }
  }, [transaction, setState]);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (state.updatedTransaction) {
      handleUpdateTransaction(
        state.updatedTransaction.transactionId,
        state.updatedTransaction
      );
      handleClose();
    }
  };

  const isFormValid =
    state.updatedTransaction &&
    state.updatedTransaction.description &&
    state.updatedTransaction.transactionType &&
    state.updatedTransaction.amount &&
    state.updatedTransaction.transactionDate;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {state.updatedTransaction && (
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="transactionDescription">
              <Form.Label>Transaction Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={state.updatedTransaction.description || ""}
                onChange={handleInputChange}
                placeholder="Enter description"
                required
              />
            </Form.Group>
            <Form.Group controlId="transactionType">
              <Form.Label>Transaction Type</Form.Label>
              <Form.Control
                as="select"
                name="transactionType"
                value={state.updatedTransaction.transactionType || ""}
                onChange={handleInputChange}
                required
              >
                <option value="">Select type</option>
                <option value="DEPOSIT">Deposit</option>
                <option value="EXPENSE">Expense</option>
                <option value="TRANSFER">Transfer</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="transactionAmount">
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type="number"
                name="amount"
                value={state.updatedTransaction.amount || ""}
                onChange={handleInputChange}
                placeholder="Enter amount"
                required
              />
            </Form.Group>
            <Form.Group controlId="transactionDate">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="transactionDate"
                value={state.updatedTransaction.transactionDate || ""}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="recurring">
              <Form.Check
                type="checkbox"
                name="recurring"
                checked={state.updatedTransaction.recurring || false}
                onChange={handleInputChange}
                label="Recurring"
              />
            </Form.Group>
            {state.updatedTransaction.recurring && (
              <Form.Group controlId="recurringFrequency">
                <Form.Label>Recurring Frequency</Form.Label>
                <Form.Control
                  type="text"
                  name="recurringFrequency"
                  value={state.updatedTransaction.recurringFrequency || ""}
                  onChange={handleInputChange}
                  placeholder="Enter frequency"
                />
              </Form.Group>
            )}
            <Button variant="primary" type="submit" disabled={!isFormValid}>
              Save Changes
            </Button>
          </Form>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default EditTransactionForm;
