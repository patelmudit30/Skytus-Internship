import "./pro.css";
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

export default function Pro() {
  return (
    <section id="projects" className="projects">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Projects</h2>
          <div className="section-divider"></div>
        </div>

        <div className="grid">
          <div className="card">
            <div className="card-info">
              <h3 className="card-title">Startup Management System</h3>
              <p className="card-desc">
                A comprehensive system designed to manage and track startup milestones, tasks, and funding status effectively.
              </p>
              <div className="tags">
                <span className="tag">React</span>
                <span className="tag">Vite</span>
                <span className="tag">Vercel</span>
                <span className="tag">CSS</span>
              </div>
            </div>
            <div className="card-links">
              <a
                href="https://startup-ms-207-cp.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <FaExternalLinkAlt /> Live Demo
              </a>
            </div>
          </div>

          <div className="card">
            <div className="card-info">
              <h3 className="card-title">Mobile Application Prototype</h3>
              <p className="card-desc">
                An interactive prototype showcasing secure authentication flow, responsive inputs, and smooth transitions.
              </p>
              <div className="tags">
                <span className="tag">React Native</span>
                <span className="tag">Mobile</span>
                <span className="tag">JavaScript</span>
                <span className="tag">UX Design</span>
              </div>
            </div>
            <div className="card-links">
              <a
                href="https://github.com/patelmudit30/Login1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <FaGithub /> GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}