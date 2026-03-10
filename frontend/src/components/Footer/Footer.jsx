import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="inkwell-footer">
      {/* Decorative top border */}
      <div className="footer-glow-bar"></div>

      <div className="footer-inner">
        <div className="footer-grid">

          {/* Column 1 — Brand */}
          <div className="footer-brand-col">
            <Link to="/home" className="footer-brand">
              <span className="footer-brand-icon">✦</span>
              <span className="footer-brand-name">Inkwell</span>
            </Link>
            <p className="footer-tagline">
              A space for thinkers, writers, and curious minds.
              Stories that linger long after you've read them.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram" className="social-link">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" aria-label="YouTube" className="social-link">
                <i className="bi bi-youtube"></i>
              </a>
              <a href="#" aria-label="LinkedIn" className="social-link">
                <i className="bi bi-linkedin"></i>
              </a>
              <a href="#" aria-label="Twitter / X" className="social-link">
                <i className="bi bi-twitter-x"></i>
              </a>
            </div>
          </div>

          {/* Column 2 — Navigate */}
          <div className="footer-links-col">
            <h5 className="footer-col-title">Navigate</h5>
            <ul className="footer-nav">
              <li><Link to="/home">Home</Link></li>
              <li><Link to="/add-blog">Write a Post</Link></li>
              <li><Link to="/viewblog">Explore Blogs</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Column 3 — Topics */}
          <div className="footer-links-col">
            <h5 className="footer-col-title">Topics</h5>
            <ul className="footer-nav">
              <li><a href="#">Technology</a></li>
              <li><a href="#">Design</a></li>
              <li><a href="#">Culture</a></li>
              <li><a href="#">Science</a></li>
              <li><a href="#">Opinion</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="footer-bottom">
          <p className="footer-copy">
            © {new Date().getFullYear()} Inkwell — All rights reserved
          </p>
          <div className="footer-bottom-links">
            <a href="#">Privacy</a>
            <span>·</span>
            <a href="#">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
