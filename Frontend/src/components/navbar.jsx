import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => {
  // State to manage navbar collapse
  const [isCollapsed, setIsCollapsed] = useState(true);

  // Toggle navbar collapse
  const toggleNavbar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-5 sticky-top" style={{ backgroundColor: '#973131' }}>
      <a className="navbar-brand fw-bold fs-4" href="#beranda">JajanOzil.</a>
      
      {/* Hamburger button for mobile */}
      <button 
        className="navbar-toggler" 
        type="button" 
        onClick={toggleNavbar}
        aria-controls="navbarNav" 
        aria-expanded={!isCollapsed} 
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      
      {/* Collapsible content - keeping original structure for desktop */}
      <div className={`collapse navbar-collapse ${isCollapsed ? '' : 'show'}`} id="navbarNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><a className="nav-link" href="#beranda">Beranda</a></li>
          <li className="nav-item"><a className="nav-link" href="#profile">Profile</a></li>
          <li className="nav-item"><a className="nav-link" href="#menu">Menu</a></li>
          <li className="nav-item"><a className="nav-link" href="#cabang">Cabang</a></li>
          <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
        </ul>

        {/* Tombol Login diarahkan ke halaman /login - keeping original styling */}
        <Link to="/login" className="btn btn-warning ms-3 fw-semibold">
          LOGIN
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;