import "./nav.css";

export default function Nav() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="brand">
          <div className="logo">MP</div>
          <span className="name">Mudit Patel</span>
        </div>

        <div className="links">
          <a href="#" className="link active">Home</a>
          <a href="#experience" className="link">Experience</a>
          <a href="#projects" className="link">Projects</a>
          <a href="#contact" className="link">Contact</a>
        </div>
      </div>
    </nav>
  );
}