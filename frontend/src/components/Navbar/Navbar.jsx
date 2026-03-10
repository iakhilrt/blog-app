import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [scrolled, setScrolled] = useState(false);
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

    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("login-status-changed", checkLogin);
      window.removeEventListener("scroll", handleScroll);
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
    <nav className={`inkwell-nav${scrolled ? " scrolled" : ""}`}>
      <div className="nav-container">

        {/* Brand */}
        <Link className="nav-brand" to="/home">
          <span className="brand-icon">✦</span>
          <span className="brand-text">Inkwell</span>
        </Link>

        {/* Hamburger */}
        <input type="checkbox" id="nav-toggle" className="nav-toggle-input" />
        <label htmlFor="nav-toggle" className="nav-hamburger">
          <span></span>
          <span></span>
          <span></span>
        </label>

        {/* Links */}
        <div className="nav-menu">
          <ul className="nav-links-left">
            <li>
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            {isLoggedIn && (
              <>
                <li>
                  <Link className="nav-link" to="/add-blog">Write</Link>
                </li>
                <li>
                  <Link className="nav-link" to="/viewblog">Explore</Link>
                </li>
              </>
            )}
          </ul>

          <ul className="nav-links-right">
            {!isLoggedIn ? (
              <>
                <li>
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li>
                  <Link className="nav-btn-signup" to="/signup">Get Started</Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-user">
                  <span className="user-avatar">{username.charAt(0).toUpperCase()}</span>
                  <span className="user-name">{username}</span>
                </li>
                <li>
                  <button className="nav-btn-logout" onClick={handleLogout}>
                    Sign Out
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
