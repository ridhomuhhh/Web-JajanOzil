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
      <section className="container my-5" id="beranda">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="fw-bold">UMKM Jajan Ozil: Dukung Produk Lokal, Majukan UMKM!</h2>
            <p>UMKM Jajan Ozil menghadirkan berbagai produk berkualitas dari mitra UMKM terbaik. Jelajahi pilihan makanan, minuman, dan produk lokal yang unik dan penuh inovasi.</p>
          </div>
          <div className="col-md-6">
          <img src="/assets/belanja.jpeg" alt="Hero" className="img-fluid rounded" />
          </div>
        </div>
      </section>

      {/* Profile Section */}
      <section className="container my-5" id="profile">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h3 className="fw-bold">UMKM Jajan Ozil</h3>
            <p>Jajan Ozil menjual beragam jajanan basah dari berbagai cabang di Surabaya. Menu andalan meliputi risoles, pastel, dan kue tradisional lainnya.</p>
            <button className="btn btn-warning">Hubungi Kami</button>
          </div>
          <div className="col-md-6">
          <img src="/assets/jajan-basah.jpg" alt="Profile" className="img-fluid rounded" />
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="container my-5" id="menu">
        <div className="row g-3">
        {foodImages.map((imgSrc, index) => (
          <div className="col-md-4" key={index}>
        <img src={imgSrc} alt={`Food ${index + 1}`} className="img-fluid rounded" />
      </div>
    ))}
  </div>
</section>


      {/* Cabang Section */}
      <section className="container my-5 text-center" id="cabang">
        <h3 className="fw-bold">Cabang</h3>
        <div className="row justify-content-center">
          {["Keputih", "Rungkut", "Gubeng"].map((cabang) => (
            <div className="col-md-3 bg-danger text-white p-3 m-2 rounded" key={cabang}>
              <h5>Cabang {cabang}</h5>
              <p>Malesuada facilisi libero, nam eu. Quis pellentesque tortor a elementum ut blandit sed pellentesque arcu.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="container my-5 text-center" id="contact">
        <h3 className="fw-bold">Contact</h3>
        <p>Silakan hubungi kami melalui email di info@jajanozil.com atau kunjungi media sosial kami.</p>
      </section>

      <Footer />
    </div>
  );
}

export default App;