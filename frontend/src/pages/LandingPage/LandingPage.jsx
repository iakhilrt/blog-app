import { Link } from "react-router-dom";
import "./LandingPage.css";

function LandingPage() {
  return (
    <div className="landing-page">

      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Share Your Stories<br />With The World</h1>
          <p>
            A simple and modern blog platform built with React & Spring Boot.
            Create, manage, and explore blogs easily.
          </p>
          <div className="hero-buttons">
            <Link to="/signup" className="hero-btn-primary">Get Started</Link>
            <Link to="/viewblog" className="hero-btn-secondary">View Blogs</Link>
          </div>
        </div>

        {/* Floating decorative blobs */}
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </section>

      {/* STATS SECTION */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Blogs Published</p>
            </div>
            <div className="stat-item">
              <h3>200+</h3>
              <p>Active Writers</p>
            </div>
            <div className="stat-item">
              <h3>10K+</h3>
              <p>Monthly Readers</p>
            </div>
            <div className="stat-item">
              <h3>50+</h3>
              <p>Topics Covered</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Our Blog Platform?</h2>
            <p>Everything you need to start blogging in one place</p>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">✍️</div>
              <h3>Easy Blogging</h3>
              <p>Create blogs with title, image, and description in seconds.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Login</h3>
              <p>JWT authentication system with Spring Boot Security.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Modern UI</h3>
              <p>Glassmorphism design with smooth animations and clean layout.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Responsive</h3>
              <p>Fully responsive design for mobile, tablet, and desktop.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast & Reliable</h3>
              <p>Powered by Spring Boot backend with MySQL database.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>Admin Panel</h3>
              <p>Full admin dashboard to manage blogs and users.</p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="steps-section">
        <div className="container">
          <div className="section-header">
            <h2>How It Works</h2>
            <p>Get started in just 3 simple steps</p>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3>Sign Up / Login</h3>
              <p>Create your free account or login to get started instantly.</p>
            </div>
            <div className="step-divider">→</div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h3>Add Your Blog</h3>
              <p>Write your blog with a title, image, and description.</p>
            </div>
            <div className="step-divider">→</div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h3>View & Share</h3>
              <p>Your blog goes live instantly — share it with the world!</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Start Blogging Today</h2>
          <p>Join our platform and express your ideas freely.</p>
          <Link to="/signup" className="hero-btn-primary">Create Free Account</Link>
        </div>
        <div className="blob blob-3"></div>
      </section>

    </div>
  );
}

export default LandingPage;