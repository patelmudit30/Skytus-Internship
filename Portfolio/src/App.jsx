import Nav from "./nav";
import Pro from "./pro";
import Dec from "./Dec";
import Contact from "./Contact";

function App() {
  return (
    <>
      <Nav />
      <Dec />
      <Pro />
      <Contact />
      <footer className="footer">
        <div className="container">
          <p className="footer-left">
            &copy; 2026 Mudit Patel. Built with React.js.
          </p>
          <p className="footer-right">
            Computer Science Student | Frontend Developer | Web Developer
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
