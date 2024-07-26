import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { loginUser } from "../api/api";
import { Link } from "react-router-dom";

export default function LoginForm() {
  // sets users data to to empty values
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;

    // updates user data when user enters it
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const result = await loginUser(userData);
      saveUsersData(result);
      setTimeout(() => (window.location.href = "/accounts"), 500); // redirect to accounts
    } catch (error) {
      setErrorMessage("Login failed: " + error.message);
    }
  };

  function saveUsersData(result) {
    // Remove accounts from the result
    const { accounts, ...userDataToSave } = result;

    // Save the user data to local storage
    localStorage.setItem("user", JSON.stringify(userDataToSave));
  }

  return (
    <div className="vh-100 d-flex align-items-center justify-content-center">
      <div
        className="container d-flex flex-column align-items-center justify-content-center shadow bg-white rounded"
        style={{ width: 450, height: 500 }}
      >
        <form onSubmit={handleLogin}>
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: 30, marginBottom: 50 }}
          >
            <h1>Login</h1>
          </div>
          <div className="form-group">
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
            className="d-flex justify-content-center align-items-center"
            style={{
              height: 20,
              marginTop: 20,
              width: 350,
            }}
          >
            <p
              style={{
                color: "red",
                margin: 0,
              }}
            >
              {errorMessage}
            </p>
          </div>
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: 30 }}
          >
            <button
              type="submit"
              className="btn
        btn-primary btn-lg"
              style={{ width: 150 }}
            >
              Login
            </button>
          </div>
        </form>
        <div style={{ marginTop: 30 }}>
          <p>
            Don't have an account? <Link to="/register">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}