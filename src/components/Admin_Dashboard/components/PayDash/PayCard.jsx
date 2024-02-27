// DonorCard.jsx
import React from 'react';
import './PayCard.css'; // Import the CSS file

const PayCard = ({ donor, onClose }) => {
  return (
    <div className="pay-card">
      <button className="close-button" onClick={onClose}>X</button>
      <p className="field-name">Name:<span> {donor.name}</span></p>
      <p className="field-name">Location:<span> {donor.location}</span></p>
      <p className="field-name">Contact:<span> {donor.contact}</span></p>
      <p className="field-name">Orphanage:<span> {donor.orphanage}</span></p>
      <p className="field-name">Donated:<span> {donor.donated}</span></p>
    </div>
  );
};

export default PayCard;
