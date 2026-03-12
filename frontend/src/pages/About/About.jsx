import "./About.css";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="about-page">

      {/* HERO */}
      <section className="about-hero">
        <div className="about-hero-orb"></div>
        <div className="about-hero-inner">
          <span className="about-eyebrow">✦ Our Story</span>
          <h1>Built for the<br /><em>love of writing</em></h1>
          <p>
            A platform for thinkers, storytellers, and curious minds who
            believe every idea deserves a space to breathe.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="about-section">
        <div className="about-inner">
          <div className="about-grid">

            <div className="about-img-wrapper">
              <img
                src="https://images.unsplash.com/photo-1532619187608-e5375cab36aa?w=800"
                alt="About Inkwell"
                className="about-img"
              />
            </div>

            <div className="about-content">
              <span className="about-content-tag">✦ Who We Are</span>
              <h2 className="about-title">A Platform Built For Storytellers</h2>
              <p className="about-text">
                Welcome to <strong style={{ color: "#e8c97e" }}>Inkwell</strong> — a creative space where
                ideas come alive. We are passionate about storytelling, knowledge
                sharing, and building a community where everyone feels inspired
                to express themselves.
              </p>
              <p className="about-text">
                From tech tutorials to travel diaries, personal experiences to
                inspiring stories — we publish content that matters. Join us on
                this journey of learning, creativity, and expression.
              </p>
              <Link to="/signup" className="about-btn">
                Join the Community →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="values-section">
        <div className="values-inner">
          <div className="values-header">
            <span className="about-eyebrow">✦ What We Believe</span>
            <h2 className="values-title">Our Values</h2>
          </div>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-icon">💡</span>
              <h3>Creativity</h3>
              <p>We believe every person has a unique story worth telling — and a platform that helps them tell it.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🤝</span>
              <h3>Community</h3>
              <p>Building a supportive, inclusive space where writers grow together and readers discover new ideas.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🔒</span>
              <h3>Trust</h3>
              <p>Your data and privacy are always safe with us. We handle your content with care and respect.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default About;