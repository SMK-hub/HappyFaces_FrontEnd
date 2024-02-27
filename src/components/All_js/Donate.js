// components/Donate.js
import React, { useState } from 'react';

const Donate = () => {
  // State to manage donation amount
  const [donationAmount, setDonationAmount] = useState('');

  // Function to handle donation submission
  const handleDonate = (e) => {
    e.preventDefault();
    // Add logic for processing the donation, such as calling a payment API
    console.log('Donating:', donationAmount);
    // Reset the form after submission
    setDonationAmount('');
  };

  return (
    <div>
      <h2>Donate</h2>
      <p>Your support makes a difference. Please consider making a donation to help our cause.</p>
      <form onSubmit={handleDonate}>
        <label>
          Donation Amount ($):
          <input
            type="number"
            min="1"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            required
          />
        </label>
        <button type="submit">Donate Now</button>
      </form>
    </div>
  );
};

export default Donate;
