// components/SignUpDonor.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignUpDonor.css'; // Import the CSS file for styles
import Header from "./Header";
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const SignUpDonor = () => {
  const navigate = useNavigate();
  const [donordetails, setDonorDetails] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "" // Added confirmPassword field
  });

  const [loading, setLoading] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false); // State for password match error

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log(donordetails);
      const response = await axios.post(`${API_BASE_URL}/donor/register`, donordetails);
      const status = response.status;
      if (status === 200) {
        navigate("/signin/donor");
      }
    } catch (error) {
      alert("You are an Existing user, please SignIn");
    } finally {
      setLoading(false);
    }
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    if (donordetails.password !== donordetails.confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      fetchData();
    }
  };

  return (
    <div className='sign-up-donor'><Header/>
      {loading ? (
        <div className="sign-up-donor-loading-screen">Loading...</div>
      ) : (
        <div>
          <h2 className="sign-up-donor-heading">DONOR SIGN UP</h2>
          <form onSubmit={handleSignUp} className="sign-up-donor-form">
            <label className="sign-up-donor-form-label">
              Username:
              <input
                type="text"
                value={donordetails.name}
                onChange={(e) => setDonorDetails({ ...donordetails, name: e.target.value })}
                required
                className="sign-up-donor-form-input"
              />
            </label>
            <label className="sign-up-donor-form-label">
              Email:
              <input
                type="email"
                value={donordetails.email}
                onChange={(e) => setDonorDetails({ ...donordetails, email: e.target.value })}
                required
                className="sign-up-donor-form-input"
              />
            </label>
            <label className="sign-up-donor-form-label">
              Password:
              <input
                type="password"
                value={donordetails.password}
                onChange={(e) => setDonorDetails({ ...donordetails, password: e.target.value })}
                required
                className="sign-up-donor-form-input"
              />
            </label>
            <label className="sign-up-donor-form-label">
              Confirm Password:
              <input
                type="password"
                value={donordetails.confirmPassword}
                onChange={(e) => setDonorDetails({ ...donordetails, confirmPassword: e.target.value })}
                required
                className="sign-up-donor-form-input"
              />
            </label>
            {passwordMatchError && <p style={{ color: 'red' }}>Passwords do not match!</p>}
            <div className="sign-up-donor-form-buttons">
              <button type="submit" className="sign-up-donor-form-button">
                Sign Up
              </button>
            </div>
            <Link to="/signin" className="sign-up-donor-back-link">
              Back
            </Link>
          </form>
        </div>
      )}

    </div>
  );
};

export default SignUpDonor;
