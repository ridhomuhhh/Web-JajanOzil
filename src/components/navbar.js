import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Navbar = () => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-danger px-5 sticky-top">
    <a className="navbar-brand fw-bold" href="#beranda">JajanOzil.</a>
    <div className="collapse navbar-collapse">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item"><a className="nav-link" href="#beranda">Beranda</a></li>
        <li className="nav-item"><a className="nav-link" href="#profile">Profile</a></li>
        <li className="nav-item"><a className="nav-link" href="#menu">Menu</a></li>
        <li className="nav-item"><a className="nav-link" href="#cabang">Cabang</a></li>
        <li className="nav-item"><a className="nav-link" href="#contact">Contact</a></li>
      </ul>
      <button className="btn btn-warning ms-3">LOGIN</button>
    </div>
  </nav>
);

export default Navbar;