import React from "react";
import "./footer.css";
import Logo from "../../../assets/Navbar/Logo.png";
import { Link } from "react-router-dom"

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
            <Link to="/updates">Updates</Link>
            <Link to="/contact">Contact</Link>
          </div>

          <div className="footer-column">
            <h4>Explore</h4>
            <Link to="/features">Features</Link>
            <Link to="/">CodeTech AI</Link>
          </div>

          <div className="footer-column">
            <h4>Company</h4>
            <Link to="/privacy_policy">Privacy Policy</Link>
            <Link to="/terms_conditions">Terms and Conditions</Link>
          </div>

          <div className="footer-column">
            <h4>Others</h4>
            <Link to="/faq">FAQs</Link>
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
