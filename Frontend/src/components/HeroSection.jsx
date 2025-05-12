import React from 'react';

const HeroSection = () => {
  return (
    <section className="container py-5 w-100" id="beranda" style={{scrollMarginTop: "70px"}}>
        <div className="container" style={{paddingLeft: "0", paddingRight: "0"}}>
          <div className="row align-items-center">
            <div className="col-md-6 pe-md-5">
              <h1 className="fw-bold mb-3" style={{color: "#9e2a2b"}}>UMKM Jajan Ozil: Dukung Produk Lokal, Majukan UMKM!</h1>
              <p className="mb-4" align="justify" style={{color: "#9e2a2b"}}>
                UMKM Jajan Ozil menghadirkan berbagai produk berkualitas dari mitra UMKM terbaik. 
                Jelajahi beragam pilihan makanan, minuman, dan produk lokal yang dibuat dengan bahan pilihan dan penuh inovasi. 
                Dukung usaha kecil dan nikmati keunikan setiap produknya!
              </p>
            </div>
            <div className="col-md-6 ps-md-5">
              <img src="/assets/belanja.jpeg" alt="Hero" className="img-fluid rounded"/>
            </div>
          </div>
        </div>
      </section>
  );
}

export default HeroSection;