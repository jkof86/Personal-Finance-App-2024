import React from 'react';
import { Button, Card, Col } from 'react-bootstrap';

const AccountCard = ({ account, closeAccount, setState }) => (
  <Col xs={12} sm={6} md={4} lg={3} className="mb-4">
    <Card>
      <Card.Body>
        <Card.Title>{account.accountName}</Card.Title>
        <Card.Text>
          <p style={{ fontWeight: 'bold' }}>Balance: ${account.balance}</p>
          <p>Type: {account.accountType}</p>
          <p>Credit Limit: ${account.creditLimit}</p>
          {/* ... other details */}
        </Card.Text>
        <Button variant="danger" onClick={() => closeAccount(account.accountId, setState)}>Close Account</Button>
      </Card.Body>
    </Card>
  </Col>
);

export default AccountCard;
