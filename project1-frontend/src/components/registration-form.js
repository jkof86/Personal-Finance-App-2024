import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { registerUser } from "../api/api";
import { Modal, Button } from "react-bootstrap";

export default function RegistrationForm() {
  // sets users data to to empty values
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // sets the state of the modal
  const [modalShow, setModalShow] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    // updates user data when user enters it
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setModalShow(false);
    setModalMessage("");

    try {
      const result = await registerUser(userData);
      setModalMessage("Registration was successful!");
      setIsSuccess(true);
      setModalShow(true);
      setTimeout(() => (window.location.href = "/login"), 2000); // redirect to login after 2 seconds
    } catch (error) {
      setModalMessage("Registration failed: " + error.message);
      setIsSuccess(false);
      setModalShow(true);
    }
  };

//
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div
        className="container d-flex align-items-center justify-content-center shadow bg-white rounded"
        style={{ width: 500, height: 600 }}
      >
        <form onSubmit={handleSubmit}>
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: 30, marginBottom: 50 }}
          >
            <h1>Register Account</h1>
          </div>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              style={{ width: 300 }}
              required
            ></input>
          </div>
          <div>
            <label className="form-group">Last Name</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              style={{ width: 300 }}
              required
            ></input>
          </div>
          <div>
            <label className="form-group">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={userData.email}
              onChange={handleChange}
              style={{ width: 300 }}
              required
            ></input>
          </div>
          <div>
            <label className="form-group">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={userData.password}
              onChange={handleChange}
              style={{ width: 300 }}
              required
            ></input>
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: 20 }}
          >
            <button
              type="submit"
              className="btn
        btn-primary btn-lg"
              style={{ width: 150 }}
            >
              Register
            </button>
          </div>
        </form>
      </div>

      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isSuccess ? "Success" : "Error"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}