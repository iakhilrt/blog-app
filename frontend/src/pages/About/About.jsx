import "./About.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <h1>About Us</h1>
        <p>Learn more about our platform and mission</p>
      </section>

      {/* MAIN CONTENT */}
      <section className="about-section">
        <div className="container">
          <div className="about-grid">

            {/* Image */}
            <div className="about-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1532619187608-e5375cab36aa?w=800"
                alt="About"
                className="about-img"
              />
            </div>

            {/* Content */}
            <div className="about-content">
              <span className="about-tag">Who We Are</span>
              <h2 className="about-title">A Platform Built For Storytellers</h2>
              <p className="about-text">
                Welcome to <strong>YourBlog.com</strong>, a creative space where
                ideas come alive. We are passionate about storytelling, knowledge
                sharing, and building a friendly community where everyone feels
                inspired to express themselves.
              </p>
              <p className="about-text">
                From tech tutorials to travel diaries, personal experiences to
                inspiring stories — we publish content that matters. Join us on
                this journey of learning, creativity, and expression.
              </p>
              <Link to="/signup" className="about-btn">
                Join Our Community →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values-section">
        <div className="container">
          <h2 className="values-title">Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Creativity</h3>
              <p>We believe every person has a unique story worth telling.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Community</h3>
              <p>Building a supportive space where writers grow together.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🔒</div>
              <h3>Trust</h3>
              <p>Your data and privacy are always safe with us.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;