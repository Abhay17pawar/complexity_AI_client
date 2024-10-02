import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-title">Complexity</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/login" className="navbar-link">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
