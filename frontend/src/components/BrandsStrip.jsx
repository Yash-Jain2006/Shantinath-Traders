import React from 'react';

const brands = [
  {
    name: "De Neers",
    category: "Hand Tools",
    img: "/images/brands/deneers.png",
  },
  {
    name: "Taparia",
    category: "Hand Tools",
    img: "/images/brands/taparia.png",
  },
  {
    name: "Bansal",
    category: "Tools & Hardware",
    img: "/images/brands/bansal.png",
  },
  {
    name: "Bosch",
    category: "Power Tools",
    img: "/images/brands/bosch.png",
  },
  {
    name: "Ingco",
    category: "Power Tools",
    img: "/images/brands/ingco.png",
  },
  {
    name: "IT Drills",
    category: "Drilling Tools",
    img: "/images/brands/it_drills.png",
  },
];

export default function BrandsStrip() {
  return (
    <section id="brands" className="brands-strip">
      <div className="container">
        <div className="brands-strip__title">
          AUTHORIZED STOCKIST &amp; DEALS IN
        </div>
        <div className="brands-single-row">
          {brands.map((b, idx) => (
            <div key={idx} className="brand-logo-card" title={`${b.name} — ${b.category}`}>
              <div className="brand-logo-img-wrap">
                <img
                  src={b.img}
                  alt={b.name}
                  className="brand-logo-img"
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
