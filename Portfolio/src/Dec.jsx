import "./de.css";
import pic from "./pic.jpeg";
import resume from "./ResumeM.pdf";
import { FaLinkedin, FaGithub, FaEnvelope } from "react-icons/fa";

export default function Dec() {
  return (
    <section id="about" className="hero">
      <div className="container">
        <div className="hero-text">
          <h1 className="hero-title">Mudit Patel</h1>
          <h2 className="hero-subtitle">
            Computer Science Student | Frontend Developer | Web Developer
          </h2>
          <p className="hero-description">
            I build responsive web applications with clean interfaces, thoughtful
            user experiences, and a growing interest in artificial intelligence.
            My work focuses on practical products that feel fast, useful, and
            easy to understand.
          </p>

          <div className="hero-actions">
            <a
              href={resume}
              download="Mudit_Patel_Resume.pdf"
              className="btn"
            >
              Download Resume
            </a>

            <div className="socials">
              <a
                href="https://github.com/patelmudit30"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/mudit-patel-28383a366"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
              >
                <FaLinkedin />
              </a>
              <a
                href="mailto:patelmudit3066@gmail.com"
                className="social-btn"
              >
                <FaEnvelope />
              </a>
            </div>
          </div>
        </div>

        <div className="hero-image">
          <div className="image-frame"></div>
          <div className="image-box">
            <img src={pic} alt="Mudit Patel" />
          </div>
        </div>
      </div>
    </section>
  );
}