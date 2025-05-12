import React from 'react';

const CabangSection = () => {
  return (
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
                    Nanti Diisi alamat masing-masing cabang.
                  </p>
                </div>
              </div>
            ))}
          </div> 
        </div>
      </section>
  );
}

export default CabangSection;