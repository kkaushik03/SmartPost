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
            <h4>Resources</h4>
            <a href="#">Updates</a>
            <a href="#">Contact</a>
          </div>

          <div className="footer-column">
            <h4>Explore</h4>
            <a href="#features">Features</a>
            <a href="#">CodeTech AI</a>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms and Conditions</a>
          </div>

          <div className="footer-column">
            <h4>Others</h4>
            <a href="#faq">FAQs</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright © {currentYear}. All rights reserved</p>
        <div className="footer-socials">
          <button>CodeTech Community</button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
