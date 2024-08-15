import React from "react";
import "./Navbar.css";

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <h3>Discussion Forum</h3>
      <button className="primary-button">Log-In</button>
    </nav>
  );
};

export default Navbar;
