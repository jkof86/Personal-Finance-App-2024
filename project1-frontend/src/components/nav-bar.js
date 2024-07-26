import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const [isUserLogged, setIsUserLogged] = useState(false);

  // Check local storage for user info
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setIsUserLogged(true);
    }
  }, []);

  const linkStyle = {
    color: "#ffffff",
    textDecoration: "none",
  };

  const linkContainerStyle = {
    marginRight: "50px",
    textDecoration: "none",
  };

  const handleLogout = () => {
    // Remove user from local storage and update state
    localStorage.removeItem("user");
    setIsUserLogged(false);
    // Redirect to login page after logout
    window.location.href = "/login";
  };

  return (
    <div>
      <header
        className="bg-primary text-white d-flex align-items-center"
        style={{
          height: "60px",
          width: "100%",
          position: "fixed",
          top: 0,
          left: 0,
          zIndex: 1030,
        }}
      >
        <div>
          <ul className="d-flex" style={{ listStyle: "none", marginBottom: 0 }}>
            <div style={linkContainerStyle}>
              <li>
                <Link to="/register" style={linkStyle}>
                  Register
                </Link>
              </li>
            </div>
            <div style={linkContainerStyle}>
              {/* if user is logged show logout in the navbar otherwise show login  */}
              {isUserLogged ? (
                <li>
                  <Link to="/logout" style={linkStyle} onClick={handleLogout}>
                    Logout
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/login" style={linkStyle}>
                    Login
                  </Link>
                </li>
              )}
            </div>
            <div style={linkContainerStyle}>
              <li>
                <Link
                  to={isUserLogged ? "/profile" : "/login"}
                  style={linkStyle}
                >
                  Profile
                </Link>
              </li>
            </div>
            <div style={linkContainerStyle}>
              <li>
                <Link
                  to={isUserLogged ? "/accounts" : "/login"}
                  style={linkStyle}
                >
                  Accounts
                </Link>
              </li>
            </div>
            <div style={linkContainerStyle}>
              <li>
                <Link
                  to={isUserLogged ? "/transactions" : "/login"}
                  style={linkStyle}
                >
                  Transactions
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </header>
    </div>
  );
}
