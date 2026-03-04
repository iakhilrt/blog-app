import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const loginStatus = localStorage.getItem("isLoggedIn");
      setIsLoggedIn(loginStatus === "true");
    };

    checkLogin();
    window.addEventListener("login-status-changed", checkLogin);

    return () => {
      window.removeEventListener("login-status-changed", checkLogin);
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        <Link className="navbar-brand" to="/home">YourBlog.com</Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">

          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>

            {/* SHOW ONLY AFTER LOGIN */}
            {isLoggedIn && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/add-blog">Add Blog</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/viewblog">View Blog</Link>
                </li>
              </>
            )}

          </ul>

          <ul className="navbar-nav">
            {!isLoggedIn ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-primary ms-2" to="/signup">Sign Up</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  className="btn btn-danger ms-2"
                  onClick={() => {
                    localStorage.removeItem("isLoggedIn");
                    window.dispatchEvent(new Event("login-status-changed"));
                  }}
                >
                  Logout
                </button>
              </li>
            )}
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;
