import "./Contact.css";
import Swal from "sweetalert2";

function Contact() {

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLScxlXFIT31eqc6oSoTSnVbOZTkkIe9iVfwS157mJUSRP5pcWw/formResponse",
      {
        method: "POST",
        mode: "no-cors",
        body: data,
      }
    );

    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "We'll get back to you within 24 hours 📬",
      timer: 2500,
      showConfirmButton: false,
    });

    form.reset();
  }

  return (
    <div className="contact-page">
      <div className="contact-orb"></div>
      <div className="contact-card">

        <div className="contact-header">
          <span className="contact-eyebrow">✦ Get in Touch</span>
          <h2 className="contact-title">We'd love to<br />hear from you</h2>
          <p className="contact-subtitle">
            Send us a message and we'll get back to you within 24 hours.
          </p>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>

          <div className="input-group">
            <input name="entry.279262906" type="text" required placeholder=" " />
            <label>Your Name</label>
          </div>

          <div className="input-group">
            <input name="entry.2065337350" type="email" required placeholder=" " />
            <label>Email Address</label>
          </div>

          <div className="input-group">
            <textarea name="entry.1308446748" required placeholder=" "></textarea>
            <label>Your Message</label>
          </div>

          <button className="contact-btn" type="submit">
            Send Message →
          </button>

        </form>

        <p className="contact-bottom">
          We usually reply within 24 hours.
        </p>

      </div>
    </div>
  );
}

export default Contact;