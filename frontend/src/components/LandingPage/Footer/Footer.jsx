import React from "react";
import "./footer.css";
import Logo from "../../../assets/Navbar/Logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-logo">
          <img src={Logo} alt="Logo" />
          <p>CodeTech</p>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h4>Explore</h4>
            <a href="/#features">Features</a>
            <a href="/">CodeTech AI</a>
          </div>

          <div className="footer-column">
            <h4>Special Thanks to</h4>
            <a
              href="https://www.fullerton.edu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit California State University, Fullerton website"
              title="California State University, Fullerton"
            >
              CSUF
            </a>
            <a
              href="https://www.fullerton.edu/ecs"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visit College of Engineering and Computer Science website"
              title="College of Engineering and Computer Science"
            >
              ECS
            </a>
          </div>

          <div className="footer-column">
            <h4>Others</h4>
            <a href="/#faq">FAQs</a>
            <a
              href="https://forms.gle/uXx2ZKfZ4ZgXDDiQ8"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Submit feedback through Google Form"
              title="Feedback Form"
            >
              Feedback
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © {currentYear}. All rights reserved</p>
        {/* <div className="footer-socials">
          <button>CodeTech Community</button>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
