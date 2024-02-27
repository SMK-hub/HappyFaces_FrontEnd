import React from 'react';
import '../All_css/FocusSection.css'; 

const ProductSection = () => {
  return (
    <div className='card-section'>
        <div><h1 className="focus-title">Our Focus</h1></div>
      <div className="row">
        <div className="col-md-12">
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="cards">
            <div className="cover item-a">
              <h1>Donating books is not merely gifting knowledge; it's planting the seeds of imagination, curiosity, and a brighter future for those eager to learn.</h1>
              <span className="price">Book Blessing</span>
              <div className="card-back">
           
              <a href="/signup/donor">Donate</a>
              <a href="/signup/donor">View Orphanage</a>
            
            
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="cards">
            <div className="cover item-b">
              <h1>In the act of donating food, we nourish more than just bodies; we feed the spirit of compassion and alleviate hunger, creating a world where no one goes to bed without a meal</h1>
              <span className="price">Feast Forward</span>
              <div className="card-back">
                <a href="/signup/donor">Donate</a>
                <a href="/signup/donor">View Orphanage</a>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-4 col-sm-6 col-xs-12">
          <div className="cards">
            <div className="cover item-c">
              <h1>Donating clothing is not just about giving warmth; it's about wrapping someone in dignity, confidence, and the assurance that they matter</h1>
              <span className="price">Thread Treasures</span>
              <div className="card-back">
              <a href="/signup/donor">Donate</a>
                <a href="/signup/donor">View Orphanage</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
