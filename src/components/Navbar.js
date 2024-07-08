import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  let location = useLocation();
  const authToken = localStorage.getItem("auth-token");

  const logOut = () => {
    localStorage.removeItem("auth-token");
    navigate("/signIn");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark sticky-top">
      <div className="container-fluid">
        <Link
          className={`navbar-brand ${
            location.pathname === "/" ? "active" : ""
          }`}
          to="/"
        >
          iNotebook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                aria-current="page"
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {authToken ? (
              <>
                <button
                  type="button"
                  className="btn btn-light mx-1"
                  onClick={logOut}
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link type="button" className="btn btn-light mx-1" to="/signIn">
                  Sign In
                </Link>
                <Link type="button" className="btn btn-light mx-1" to="/signUp">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
