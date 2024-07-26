import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import RegistrationForm from "./components/registration-form";
import LoginForm from "./components/login-form";
import NavigationBar from "./components/nav-bar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./components/profile";
import AccountPage from "./components/AccountComponent/account-page";
import { AccountProvider } from "./components/AccountComponent/account-context";
import { TransactionProvider } from "./components/TransactionComponent/transaction-context";
import TransactionPage from "./components/TransactionComponent/transaction-page";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route
          path="/accounts"
          element={
            <AccountProvider>
              <AccountPage />
            </AccountProvider>
          }
        />
        <Route
          path="/transactions"
          element={
            <TransactionProvider>
              <TransactionPage />
            </TransactionProvider>
          }
        />
      </Routes>
    </Router>
  </React.StrictMode>
);
