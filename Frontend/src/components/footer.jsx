import React from 'react';

const Footer = () => (
  <footer className="text-white py-3" style={{ backgroundColor: '#973131' }}>
    <div className="container d-flex justify-content-between align-items-center flex-wrap">
      <div>
        <h5 className="mb-1 fw-bold">JajanOzil.</h5>
        <small>&copy; Copyright UMKM JajanOzil</small>
      </div>
      <div className="d-flex gap-3 mt-3 mt-md-0">
        <i className="bi bi-youtube"></i>
        <i className="bi bi-facebook"></i>
        <i className="bi bi-twitter"></i>
        <i className="bi bi-instagram"></i>
      </div>
    </div>
  </footer>
);

export default Footer;
