// DonorCard.jsx

import React from 'react';
import './DonorCard.css'; // Import the CSS file

const DonorCard = ({ donor, onClose }) => {
  return (
    <div className="donor-card">
      <button className="close-button" onClick={onClose}>X</button>
      <p className="field-name">Director:<span> {donor.name}</span></p>
      <p className="field-name">Email:<span> {donor.email}</span></p>
      <p className="field-name">Contact:<span> {donor.contact}</span></p>
      <p className="field-name">Location:<span> {donor.location}</span></p>
      <p className="field-name">Amount Donated:<span> {donor.amount}</span></p>
    </div>
  );
};

export default DonorCard;
