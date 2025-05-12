import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark px-5 sticky-top" style={{ backgroundColor: '#973131' }}>
    <a className="navbar-brand fw-bold fs-4" href="#beranda">JajanOzil.</a>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item"><a className="nav-link" href="#beranda">Beranda</a></li>
        <li className="nav-item"><a className="nav-link" href="#profile">Profile</a></li>
        <li className="nav-item"><a className="nav-link" href="#menu">Menu</a></li>
        <li className="nav-item"><a className="nav-link" href="#cabang">Cabang</a></li>
        <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
      </ul>

      {/* Tombol Login diarahkan ke halaman /login */}
      <Link to="/login" className="btn btn-warning ms-3 fw-semibold">
        LOGIN
      </Link>
    </div>
  </nav>
);

export default Navbar;
