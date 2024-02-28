// components/SignUpAdmin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignUpAdmin.css'; // Import the CSS file for styles
import Header from "./Header";
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const SignUpAdmin = () => {
  const navigate = useNavigate();
  const [admindetails, setAdminDetails] = useState({
    name:"",
    email:"",
    password:"",
    confirmPassword:"", // Added confirmPassword field
    passcode:""
  });
  const [loading, setLoading] = useState(false);
  const [passwordMatchError, setPasswordMatchError] = useState(false); // State for password match error

  const fetchData = async () => {
    try {
      setLoading(true);
      console.log(admindetails);
      const response = await axios.post(`${API_BASE_URL}/admin/register`, admindetails);
      const status = response.status;
      console.log(status);
      if (status === 200) {
        navigate("/signin/admin");
      }
    } catch (error) {
      if (error.response && error.response.status === 409) {
        alert("You are an Existing User / Enter Correct Passcode");
      }
    } finally {
      setLoading(false);
    }
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    if (admindetails.password !== admindetails.confirmPassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
      fetchData();
    }
  };

  return (
    <div className='sign-up-admin'><Header/>
      {loading ? (
        <div className="admin-signUp-loading-screen">Loading...</div>
      ) : (
        <div>
          <h2 className="sign-up-admin-heading">ADMIN SIGN UP</h2>
          <form onSubmit={handleSignUp} className="sign-up-admin-form">
            <label className="admin-signUp-form-label">
              Username:
              <input
                type="text"
                value={admindetails.name}
                onChange={(e) => setAdminDetails({...admindetails, name: e.target.value})}
                required
                className="admin-signUp-form-input"
              />
            </label>
            <label className="admin-signUp-form-label">
              Email:
              <input
                type="email"
                value={admindetails.email}
                onChange={(e) => setAdminDetails({...admindetails, email: e.target.value})}
                required
                className="admin-signUp-form-input"
              />
            </label>
            <label className="admin-signUp-form-label">
              New Password:
              <input
                type="password"
                value={admindetails.password}
                onChange={(e) => setAdminDetails({...admindetails, password: e.target.value})}
                required
                className="admin-signUp-form-input"
              />
            </label>
            <label className="admin-signUp-form-label">
              Confirm Password:
              <input
                type="password"
                value={admindetails.confirmPassword}
                onChange={(e) => setAdminDetails({...admindetails, confirmPassword: e.target.value})}
                required
                className="admin-signUp-form-input"
              />
            </label>
            {passwordMatchError && <p style={{ color: 'red' }}>Passwords do not match!</p>}
            <label className="admin-signUp-form-label">
              Passcode:
              <input
                type="password"
                value={admindetails.passcode}
                onChange={(e) => setAdminDetails({...admindetails, passcode: e.target.value})}
                required
                className="admin-signUp-form-input"
              />
            </label>
            <div className="admin-signUp-form-buttons">
              <button type="submit" className="admin-signUp-form-button">
                Sign Up
              </button>
            </div>
            <Link to="/signin" className="admin-signUp-back-link">
              Back
            </Link>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignUpAdmin;
