import React from 'react';

const ContactSection = () => {
  return (
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
  );
}

export default ContactSection;