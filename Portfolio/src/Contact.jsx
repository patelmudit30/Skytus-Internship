import "./contact.css";
import { FaLinkedin, FaGithub, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Contact</h2>
          <div className="section-divider"></div>
        </div>

        <div className="grid">
          <a href="mailto:patelmudit3066@gmail.com" className="card">
            <div className="icon">
              <FaEnvelope />
            </div>
            <div className="info">
              <span className="label">Email</span>
              <span className="value">patelmudit3066@gmail.com</span>
            </div>
          </a>

          <a
            href="https://www.linkedin.com/in/mudit-patel-28383a366"
            target="_blank"
            rel="noopener noreferrer"
            className="card"
          >
            <div className="icon">
              <FaLinkedin />
            </div>
            <div className="info">
              <span className="label">LinkedIn</span>
              <span className="value">Mudit Patel</span>
            </div>
          </a>

          <a
            href="https://github.com/patelmudit30"
            target="_blank"
            rel="noopener noreferrer"
            className="card"
          >
            <div className="icon">
              <FaGithub />
            </div>
            <div className="info">
              <span className="label">GitHub</span>
              <span className="value">patelmudit30</span>
            </div>
          </a>

          <div className="card">
            <div className="icon">
              <FaMapMarkerAlt />
            </div>
            <div className="info">
              <span className="label">Location</span>
              <span className="value">Anand, Gujarat, India</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
