// src/components/TransactionComponent/add-transaction-form.js
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AddTransactionForm = ({
  show,
  handleClose,
  handleSubmit,
  handleInputChange,
  newTransaction,
}) => {
  const isFormValid =
    newTransaction.description &&
    newTransaction.transactionType &&
    newTransaction.amount &&
    newTransaction.transactionDate;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Transaction</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="transactionDescription">
            <Form.Label>Transaction Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={newTransaction.description}
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
              value={newTransaction.transactionType}
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
              value={newTransaction.amount}
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
              value={newTransaction.transactionDate}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="recurring">
            <Form.Check
              type="checkbox"
              name="recurring"
              checked={newTransaction.recurring}
              onChange={handleInputChange}
              label="Recurring"
            />
          </Form.Group>
          {newTransaction.recurring && (
            <Form.Group controlId="recurringFrequency">
              <Form.Label>Recurring Frequency</Form.Label>
              <Form.Control
                type="text"
                name="recurringFrequency"
                value={newTransaction.recurringFrequency}
                onChange={handleInputChange}
                placeholder="Enter frequency"
              />
            </Form.Group>
          )}
          <Button variant="primary" type="submit" disabled={!isFormValid}>
            Add Transaction
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddTransactionForm;
