import React from "react";
import "./navbar.css";
import Logo from "../../../assets/Navbar/Logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">
          <img src={Logo} alt="Logo" />
          <p className="title">CodeTech</p>
        </div>

        <div className="nav-links">
          <button onClick={() => navigate("/")}>Home</button>
          <button onClick={() => scrollToSection("about")}>About</button>
          <button onClick={() => scrollToSection("features")}>Features</button>
        </div>

        <button className="get-started" onClick={() => navigate("/fileupload")}>Get Started</button>
      </nav>
    </div>
  );
};

export default Navbar;
