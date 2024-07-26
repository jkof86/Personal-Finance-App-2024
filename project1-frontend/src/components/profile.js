import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { deleteUser, updateUser } from "../api/api";

export default function Profile() {
  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  const [modalShow, setModalShow] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [updatedUser, setUpdatedUser] = useState(user);
  const [formErrors, setFormErrors] = useState({});

  const labelContainerStyle = {
    display: "flex",
    alignItems: "center",
    width: "100%",
    marginTop: 40,
  };

  const buttonStyle = {
    width: 100,
    padding: "10px 20px",
  };

  const handleDelete = async () => {
    try {
      const response = await deleteUser(user);
      setModalMessage("User deleted successfully!");
      setIsSuccess(true);
      setModalContent("message");
      setModalShow(true);
      localStorage.clear(); // removes user from local storage
      setTimeout(() => (window.location.href = "/register"), 2000);
    } catch (error) {
      setModalMessage("Delete failed: " + error.message);
      setIsSuccess(false);
      setModalContent("message");
      setModalShow(true);
    }
  };

  const handleUpdate = async () => {
    if (!validateForm()) return;

    try {
      const response = await updateUser(updatedUser);
      setModalMessage("User updated successfully!");
      setIsSuccess(true);
      setModalContent("message");
      setModalShow(true);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (error) {
      setModalMessage("Update failed: " + error.message);
      setIsSuccess(false);
      setModalContent("message");
      setModalShow(true);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!updatedUser.firstName) errors.firstName = "First Name is required";
    if (!updatedUser.lastName) errors.lastName = "Last Name is required";
    if (!updatedUser.email) errors.email = "Email is required";
    if (!updatedUser.password) errors.password = "Password is required";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  return (
    <>
      <div className="vh-100 d-flex align-items-center justify-content-center">
        <div
          className="container d-flex flex-column align-items-center justify-content-start shadow bg-white rounded"
          style={{ width: 500, height: 600 }}
        >
          <h1 className="mt-4">Profile</h1>
          <div className="d-flex flex-column align-items-start w-100 p-4">
            <div style={labelContainerStyle}>
              <label className="me-2" style={{ fontWeight: "bold" }}>
                Name:
              </label>
              <p className="mb-0">{user?.firstName}</p>
            </div>
            <div style={labelContainerStyle}>
              <label className="me-2" style={{ fontWeight: "bold" }}>
                Last Name:
              </label>
              <p className="mb-0">{user?.lastName}</p>
            </div>
            <div style={labelContainerStyle}>
              <label className="me-2" style={{ fontWeight: "bold" }}>
                Email:
              </label>
              <p className="mb-0">{user?.email}</p>
            </div>
            <div style={labelContainerStyle}>
              <label className="me-2" style={{ fontWeight: "bold" }}>
                Password:
              </label>
              <p type="password" className="mb-0">
                {user?.password}
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between w-50 mt-5">
            <button
              className="btn btn-primary"
              style={buttonStyle}
              onClick={() => {
                setModalContent("update");
                setModalShow(true);
              }}
            >
              EDIT
            </button>
            <button
              onClick={handleDelete}
              className="btn btn-danger"
              style={buttonStyle}
            >
              DELETE
            </button>
          </div>
        </div>
        <Modal show={modalShow} onHide={() => setModalShow(false)}>
          <Modal.Header closeButton>
            <Modal.Title>
              {modalContent === "message"
                ? isSuccess
                  ? "Success"
                  : "Error"
                : "Update Profile"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalContent === "message" ? (
              modalMessage
            ) : (
              <Form>
                <Form.Group controlId="formFirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={updatedUser.firstName}
                    onChange={handleChange}
                    required
                    isInvalid={!!formErrors.firstName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.firstName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formLastName" className="mt-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={updatedUser.lastName}
                    onChange={handleChange}
                    required
                    isInvalid={!!formErrors.lastName}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.lastName}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formEmail" className="mt-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={updatedUser.email}
                    onChange={handleChange}
                    required
                    isInvalid={!!formErrors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="formPassword" className="mt-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    value={updatedUser.password}
                    onChange={handleChange}
                    required
                    isInvalid={!!formErrors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formErrors.password}
                  </Form.Control.Feedback>
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              {modalContent === "message" ? "Close" : "Cancel"}
            </Button>
            {modalContent === "update" && (
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}
