import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">

        <div className="row g-4">

          {/* Column 1 — Brand */}
          <div className="col-lg-4 col-md-6 col-12">
            <h4 className="footer-title">YourBlog<span>.com</span></h4>
            <p className="footer-text">
              A modern blog platform where ideas come alive.
              Read, share, and explore stories that inspire creativity.
            </p>
          </div>

          {/* Column 2 — Quick Links */}
          <div className="col-lg-4 col-md-6 col-12">
            <h5 className="footer-subtitle">Quick Links</h5>
            <ul className="footer-links">
              <li><Link to="/home">🏠 Home</Link></li>
              <li><Link to="/add-blog">✍️ Add Blog</Link></li>
              <li><Link to="/viewblog">📖 View Blogs</Link></li>
              <li><Link to="/about">ℹ️ About Us</Link></li>
              <li><Link to="/contact">📬 Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 — Social */}
          <div className="col-lg-4 col-md-6 col-12">
            <h5 className="footer-subtitle">Follow Us</h5>
            <div className="social-icons">
              <a href="#" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" aria-label="YouTube">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="#" aria-label="LinkedIn">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" aria-label="Twitter">
                <i className="bi bi-twitter"></i>
              </a>
            </div>
          </div>

        </div>

        <hr className="footer-divider" />

        <p className="footer-bottom">
          © {new Date().getFullYear()} YourBlog.com — All Rights Reserved
        </p>

      </div>
    </footer>
  );
}

export default Footer;