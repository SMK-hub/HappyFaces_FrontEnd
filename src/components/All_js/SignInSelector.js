// components/SignInSelector.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../All_css/SignInSelector.css'; // Import the CSS file for styles

const SignInSelector = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSignIn = () => {
    // Navigate to the selected sign-in page based on the user's choice
    if (selectedOption === 'admin') {
      navigate('/signin/admin');
    } else if (selectedOption === 'orphanage') {
      navigate('/signin/orphanage');
    } else if (selectedOption === 'donor') {
      navigate('/signin/donor');
    }
  };

  return (
    <div className='sign-in'>
            <Header/>
    <div className="sign-in-selector-container">
      <div className="box-enclosure">
        <h2 className="sign-in-selector-heading">FIND YOUR ROLE</h2>
        <div className="sign-in-options">
          <label className={`sign-in-option ${selectedOption === 'admin' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="signInOption"
              value="admin"
              checked={selectedOption === 'admin'}
              onChange={() => handleOptionSelect('admin')}
            />
            <p className="option-label">Admin</p>
          </label>
          <label className={`sign-in-option ${selectedOption === 'orphanage' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="signInOption"
              value="orphanage"
              checked={selectedOption === 'orphanage'}
              onChange={() => handleOptionSelect('orphanage')}
            />
            <span className="option-label">Orphanage</span>
          </label>
          <label className={`sign-in-option ${selectedOption === 'donor' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="signInOption"
              value="donor"
              checked={selectedOption === 'donor'}
              onChange={() => handleOptionSelect('donor')}
            />
            <span className="option-label">Donor</span>
          </label>
        </div>
        <button className="sign-in-button" onClick={handleSignIn}>
          Continue
        </button>
      </div>
    </div>
    </div>
  );
};

export default SignInSelector;
