// components/SignInSelector.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import '../All_css/SignUpSelector.css'; // Import the CSS file for styles

const SignUpSelector = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleSignUp = () => {
    // Navigate to the selected sign-in page based on the user's choice
    if (selectedOption === 'admin') {
      navigate('/signup/admin');
    } else if (selectedOption === 'orphanage') {
      navigate('/signup/orphanage');
    } else if (selectedOption === 'donor') {
      navigate('/signup/donor');
    }
  };

  return (
    <div className='sign-up'>
            <Header/>
    <div className="sign-up-selector-container">
      <div className="box-enclosure">
        <h2 className="sign-up-selector-heading">CHOOSE YOUR ROLE</h2>
        <div className="sign-up-options">
          <label className={`sign-up-option ${selectedOption === 'admin' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="signUpOption"
              value="admin"
              checked={selectedOption === 'admin'}
              onChange={() => handleOptionSelect('admin')}
            />
            <span className="option-label">Admin</span>
          </label>
          <label className={`sign-up-option ${selectedOption === 'orphanage' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="signUpOption"
              value="orphanage"
              checked={selectedOption === 'orphanage'}
              onChange={() => handleOptionSelect('orphanage')}
            />
            <span className="option-label">Orphanage</span>
          </label>
          <label className={`sign-up-option ${selectedOption === 'donor' ? 'selected' : ''}`}>
            <input
              type="radio"
              name="signUpOption"
              value="donor"
              checked={selectedOption === 'donor'}
              onChange={() => handleOptionSelect('donor')}
            />
            <span className="option-label">Donor</span>
          </label>
        </div>
        <button className="sign-up-button" onClick={handleSignUp}>
          Continue
        </button>
      </div>
    </div>
    </div>
  );
};

export default SignUpSelector;
