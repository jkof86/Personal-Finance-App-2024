import React, { useState } from "react";
import { Button, Modal, Form } from 'react-bootstrap';
import axios from "axios";

const UpdateAccountModal = ({ account, show, onHide, onUpdate }) => {

    const [updatedAccount, setUpdatedAccount] = useState({ ...account });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUpdatedAccount({ ...updatedAccount, [name]: value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8080/accounts/update`, updatedAccount)
            .then(response => {
                onUpdate(response.data); // Update the state in parent component
                onHide(); // Close the modal
            })
            .catch(error => {
                console.error('Error updating account: ', error);
            });
    };

    return (<>

        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>

                    <Form.Group>
                        <Form.Label>Account Name</Form.Label>
                        <Form.Control type="text" name="accountName" value={updatedAccount.accountName} onChange={handleInputChange} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Balance</Form.Label>
                        <Form.Control type='number' name='balance' value={updatedAccount.balance} onChange={handleInputChange} required />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Account Type</Form.Label>
                        <Form.Control as='select' name='accountType' value={updatedAccount.accountType} onChange={handleInputChange} required >
                            <option value="CREDIT">CREDIT</option>
                            <option value="DEBIT">DEBIT</option>
                            <option value="LOAN">LOAN</option>
                        </Form.Control>
                    </Form.Group>

                    {updatedAccount.accountType === 'CREDIT' && (
                        <>
                            <Form.Group>
                                <Form.Label>Credit Limit</Form.Label>
                                <Form.Control type="number" name="creditLimit" value={updatedAccount.creditLimit} onChange={handleInputChange} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>APR</Form.Label>
                                <Form.Control type="number" name="apr" value={updatedAccount.apr} onChange={handleInputChange} required/>
                            </Form.Group>
                        </>
                    )}

                    {updatedAccount.accountType === 'LOAN' && (
                        <>
                            <Form.Group>
                                <Form.Label>Principal</Form.Label>
                                <Form.Control type="number" name="principal" value={updatedAccount.principal} onChange={handleInputChange} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Loan Disbursement Date</Form.Label>
                                <Form.Control type="date" name="loanDisbursementDate" value={updatedAccount.loanDisbursementDate} onChange={handleInputChange} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Loan Repayment Date</Form.Label>
                                <Form.Control type="date" name="loanRepaymentDate" value={updatedAccount.loanRepaymentDate} onChange={handleInputChange} required/>
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Minimum Monthly Payment</Form.Label>
                                <Form.Control type="number" name="minMonthlyPayment" value={updatedAccount.minMonthlyPayment} onChange={handleInputChange} required/>
                            </Form.Group>
                        </>
                    )}

                    <Button variant="primary" type="submit">Update Account</Button>                    
                </Form>
            </Modal.Body>
        </Modal>
    </>);
};

export default UpdateAccountModal;