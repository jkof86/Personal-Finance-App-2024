import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";

const TransactionCard = ({
  transaction,
  deleteTransaction,
  editTransaction,
}) => {
  return (
    <Card style={{ margin: "10px", width: "18rem" }}>
      <Card.Body>
        <Card.Title>{transaction.description}</Card.Title>
        <Card.Text>
          Amount: {transaction.amount} <br />
          Date: {transaction.transactionDate} <br />
          Type: {transaction.transactionType}
        </Card.Text>
        <Row>
          <Col className="d-flex justify-content-center">
            <Button
              variant="primary"
              onClick={() => editTransaction(transaction)}
              style={{ width: "100px" }}
            >
              Edit
            </Button>
          </Col>
          <Col className="d-flex justify-content-center">
            <Button
              variant="danger"
              onClick={() => deleteTransaction(transaction.transactionId)}
              style={{ width: "100px" }}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default TransactionCard;
