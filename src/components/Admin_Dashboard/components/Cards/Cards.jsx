import React from "react";
import "./Cards.css";

const Cards = () => {
  return (
    <div className="cards-container">
      <div className="card">
        <h2>Orphanages</h2>
        <p>50</p>
      </div>
      <div className="card">
        <h2>Donors</h2>
        <p>45</p>
      </div>
      <div className="card">
        <h2>Admins</h2>
        <p>3</p>
      </div>
    </div>
  );
};

export default Cards;
