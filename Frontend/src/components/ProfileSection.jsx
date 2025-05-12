import React from 'react';

const ProfileSection = () => {
  return (
    <section className="bg-white py-5 w-100" id="profile" style={{scrollMarginTop: "64px"}}>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h6 className="fw-bold text-uppercase">Profile</h6>
              <h3 className="fw-bold mb-3">UMKM Jajan Ozil</h3>
              <p align="justify">
                Jajan Ozil adalah UMKM yang menjual berbagai jajanan atau kue basah di Surabaya 
                dengan beberapa cabang yang tersebar di berbagai lokasi. Jajan Ozil menawarkan 
                berbagai pilihan jajanan tradisional dan modern yang selalu segar dari berbagai 
                mitra yang telah bekerja sama dengan. terutama Menagankan kue lapis, risoles, pastel, 
                klepon, dan banyak lagi. Semua produk dibuat dengan tangan terampil dari para 
                mitra menjamin rasa yang autentik dan kenikmatan setiap gigitan.
              </p>
              <button className="btn btn-warning fw-semibold px-4 mt-3">Hubungi Kami</button>
            </div>
            <div className="col-md-5 offset-md-1">
              <img src="/assets/jajan-basah.jpg" alt="Profile" className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </section>
  );
}

export default ProfileSection;