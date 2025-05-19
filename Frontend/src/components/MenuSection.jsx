import React from 'react';
import food1 from '../assets/food1.jpg';
import food2 from '../assets/food2.jpg';
import food3 from '../assets/food3.jpg';
import food4 from '../assets/food4.jpg';
import food5 from '../assets/food5.jpg';
import food6 from '../assets/food6.jpeg';

const foodImages = [food1, food2, food3, food4, food5, food6];

function MenuSection() {
  return (
    <section className="container my-5" id="menu" style={{ scrollMarginTop: "70px" }}>
      <div className="row g-3">
        {foodImages.map((imgSrc, index) => (
          <div className="col-12 col-sm-6 col-md-4" key={index}>
            <div className="menu-item h-100">
              <img 
                src={imgSrc} 
                alt={`Food ${index + 1}`} 
                className="img-fluid rounded w-100 h-100 object-fit-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MenuSection;