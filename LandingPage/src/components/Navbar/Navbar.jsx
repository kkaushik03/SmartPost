import React from 'react';
import "./navbar.css";
import Logo from "../../assets/Navbar/Logo.png";

const Navbar = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="logo">

          <img src={Logo} alt="Logo" />
          <p className="title">CodeTech</p>
        
        </div>

        <div className="nav-links">
          <button>FAQ</button>
          <button>Features</button>
          <button>Login</button>
        </div>

        <button className="get-started">Get Started</button>
        
      </nav>
      
    </div>
  );
};

export default Navbar;