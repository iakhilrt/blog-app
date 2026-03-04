import { Link } from "react-router-dom"
import "../Footer/Footer.css"
function Footer() {
    return (
        <footer className="footer-section">
            <div className="container">

                <div className="row">

                    {/* Column 1 */}
                    <div className="col-md-4 mb-4">
                        <h4 className="footer-title">YourBlog<span>.com</span></h4>
                        <p className="footer-text">
                            A modern blog platform where ideas come alive.
                            Read, share, and explore stories that inspire creativity.
                        </p>
                    </div>

                    {/* Column 2 */}
                    <div className="col-md-4 mb-4">
                        <h5 className="footer-subtitle">Quick Links</h5>
                        <ul className="footer-links">
                            <li><Link to="/home">Home</Link></li>
                            <li><Link to="/add-blog">Add Blog</Link></li>
                            <li><Link to="/about">About Us</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 3 */}
                    <div className="col-md-4 mb-4">
                        <h5 className="footer-subtitle">Follow Us</h5>
                        <div className="social-icons">
                            <a href="#"><i className="bi bi-instagram"></i></a>
                            <a href="#"><i className="bi bi-youtube"></i></a>
                            <a href="#"><i className="bi bi-linkedin"></i></a>
                            <a href="#"><i className="bi bi-twitter"></i></a>
                        </div>
                    </div>

                </div>

                <hr />

                <p className="footer-bottom">
                    © {new Date().getFullYear()} YourBlog.com — All Rights Reserved
                </p>

            </div>
        </footer>
    )
}

export default Footer
