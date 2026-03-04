import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = () => {
      const loginStatus = localStorage.getItem("isLoggedIn");
      const name = localStorage.getItem("name");
      setIsLoggedIn(loginStatus === "true");
      setUsername(name || "");
    };

    checkLogin();
    window.addEventListener("login-status-changed", checkLogin);

    return () => {
      window.removeEventListener("login-status-changed", checkLogin);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("email");
    window.dispatchEvent(new Event("login-status-changed"));
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark">
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
              <>
                <li className="nav-item d-flex align-items-center me-3">
                  <span className="nav-welcome">👋 {username}</span>
                </li>
                <li className="nav-item">
                  <button className="btn btn-danger ms-2" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;