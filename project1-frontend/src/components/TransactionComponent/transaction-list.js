import React from "react";
import { Row } from "react-bootstrap";
import TransactionCard from "./transaction-card";

const TransactionList = ({
  transactions,
  deleteTransaction,
  editTransaction,
}) => (
  <Row>
    {transactions.map((transaction) => (
      <TransactionCard
        key={transaction.transactionId}
        transaction={transaction}
        deleteTransaction={deleteTransaction}
        editTransaction={editTransaction}
      />
    ))}
  </Row>
);

export default TransactionList;
