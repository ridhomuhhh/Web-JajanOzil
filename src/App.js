import React from 'react';
import Navbar from './components/navbar';
import Footer from './components/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import food1 from './assets/food1.jpg';
import food2 from './assets/food2.jpg';
import food3 from './assets/food3.jpg';
import food4 from './assets/food4.jpg';
import food5 from './assets/food5.jpg';
import food6 from './assets/food6.jpeg';

const foodImages = [food1, food2, food3, food4, food5, food6];

function App() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
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

      {/* Profile Section */}
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

      {/* Menu Section */}
      <section className="container my-5" id="menu" style={{scrollMarginTop: "70px"}}>
        <div className="row g-3">
        {foodImages.map((imgSrc, index) => (
          <div className="col-md-4" key={index}>
            <img src={imgSrc} alt={`Food ${index + 1}`} className="img-fluid rounded" />
          </div>
          ))}
        </div>
      </section>

      {/* Cabang Section */}
      <section className="py-5 bg-white" id="cabang" style={{scrollMarginTop: "70px"}}>
        <div className="container text-center mt-5 mb-5">
          <h3 className="fw-bold mb-4" style={{ marginTop: "-25px" }}>Cabang</h3>
          <div className="row justify-content-center g-5 mt-1">
            {["Keputih", "Rungkut", "Gubeng"].map((cabang) => (
              <div className="col-12 col-md-6 col-lg-4 d-flex justify-content-center mx-4" style={{ maxWidth: "300px" }} key={cabang}>
                <div className="text-white p-4 rounded-4 h-100" style={{ backgroundColor: '#9e2a2b', maxWidth: "100%"}}>
                  <h5 className="fw-bold mb-1">Cabang</h5>
                  <p className="mb-2">{cabang}</p>
                  <p className="mb-0 small">
                    Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu.
                  </p>
                </div>
              </div>
            ))}
          </div> 
        </div>
      </section>

      {/* Contact Section */}
      <section className="container my-5" id="contact">
        <div className="row justify-content-center">
          <div className="col-lg-9">
            <div className="bg-white rounded-3 shadow-sm p-4">
              <h3 className="text-center fw-bold mb-4">Contact</h3>
              <form>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Nama"/>
                </div>
                <div className="mb-3"> 
                  <input type="email" className="form-control" placeholder="Email"/>
                </div>
                <div className="mb-3">
                  <input type="text" className="form-control" placeholder="Subjek"/>
                </div>
                <div className="mb-4">
                  <textarea className="form-control" rows="5" placeholder="Pesan"></textarea>
                </div>
                <div className="text-center">
                  <button type="submit" className="btn px-4 py-2 btn-warning">Kirim Pesan</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section
      <section className="container my-5 text-center" id="contact">
        <h3 className="fw-bold">Contact</h3>
        <p>Silakan hubungi kami melalui email di info@jajanozil.com atau kunjungi media sosial kami.</p>
      </section> */}

      <Footer />
    </div>
  );
}

export default App;