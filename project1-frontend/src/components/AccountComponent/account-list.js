import React from 'react';
import { useState, useEffect } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { useAccountContext } from './account-context';
import UpdateAccountModal from './update-account-modal';

const AccountList = ({ accounts }) => {
    const { closeAccount, fetchAccounts, state, setState } = useAccountContext();
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);

    useEffect(() => {
      // Fetch accounts on component mount
      const userString = localStorage.getItem("user");
      if (userString) {
        const user = JSON.parse(userString);
        var userId = user.id;
      }
      fetchAccounts(userId);
      console.log("fetching");
    }, []);

    const handleEditAccount = (account) => {
      console.log(account);
      setSelectedAccount(account);
      setShowUpdateModal(true);
    };

    const handleCloseModal = () => {
      setShowUpdateModal(false);
      setSelectedAccount(null);
    };

    const handleUpdateAccount = (updatedAccount) => {
      // Update the accounts list in state with the updated account
      const updatedAccounts = accounts.map(account =>
        account.accountId === updatedAccount.accountId ? updatedAccount : account
      );
      setState(prevState => ({
        ...prevState,
        accounts: updatedAccounts
      }));
    };
  
    return (
      <>
        {accounts.map(account => (
          <Col key={account.accountId} xs={12} sm={6} md={4} lg={3} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{account.accountName}</Card.Title>
                <Card.Text as="div">
                  <div style={{ fontWeight: 'bold' }}>Balance: ${account.balance}</div>
                  <div>Type: {account.accountType}</div>
                  <div>Credit Limit: ${account.creditLimit}</div>
                  {/* ... other details */}
                </Card.Text>
                <div className="d-flex justify-content-between m-2">
                  <Button variant="danger" onClick={() => closeAccount(account.accountId)}>Close Account</Button>
                  <Button variant="primary" onClick={() => handleEditAccount(account)}>Edit Account</Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}

        {/* Modal for updating account */}
        {selectedAccount && (
          <UpdateAccountModal
            account={selectedAccount}
            show={showUpdateModal}
            onHide={handleCloseModal}
            onUpdate={handleUpdateAccount}
          />
        )}
      </>
    );
  };
  

export default AccountList;
