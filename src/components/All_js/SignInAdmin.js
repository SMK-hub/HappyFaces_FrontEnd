import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignInAdmin.css'; // Import the CSS file for styles
import Header from './Header';
import axios from 'axios';
import { useUser } from '../../UserContext';
import { API_BASE_URL } from '../../config';

const SignInAdmin = () => {
  const navigate = useNavigate();
  const [adminDetails, setAdminDetails] = useState({
    email: '',
    password: '',
  });
  const [enteredOtp, setEnteredOtp] = useState();
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [showOtpVerificationPopup, setShowOtpVerificationPopup] = useState(false);
  const [showNewPasswordPopup, setShowNewPasswordPopup] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: '',
    otp: '',
  });
  const [newPasswordData, setNewPasswordData] = useState({
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const [otpMatchError, setOtpMatchError] = useState(false);
  const { setUserData } = useUser();

  const fetchData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/login`, adminDetails);
      const status = response.status;
      console.log(status);
      if (status === 200) {
        const userDetailResponse = await axios.get(`${API_BASE_URL}/admin/admin/${adminDetails.email}`);
        setUserData(userDetailResponse.data);
        navigate('/admin-dashboard');
      }
    } catch (error) {
      alert('Invalid Email/Password');
      console.log(error);
    }
  };

  const fetchOtp = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/sendOtp`, forgotPasswordData);
      const status = response.status;
      if (status === 200) {
        const data = response.data;
        console.log(data);
        setForgotPasswordData(prevData => ({
          ...prevData,
          otp: data // Update with the actual response key for OTP
        }));
      }

    } catch (error) {
      console.log(error);
    }
  }

  const changePassword = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/admin/ForgetPassword/${forgotPasswordData.email}/${enteredOtp}/${newPasswordData.password}/${newPasswordData.confirmPassword}`);
      const status = response.status;
      if (status === 200) {
        alert(response.data);
        setShowOtpVerificationPopup(false);
        setShowForgotPasswordPopup(false);
      }
    }

    catch (error) {
      console.log(error);
    }
  }

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(adminDetails);
    fetchData();
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPasswordPopup(true);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Add logic to submit email and OTP
    setShowOtpVerificationPopup(true);
  };

  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    if(enteredOtp === forgotPasswordData.otp){
      if (newPasswordData.password === newPasswordData.confirmPassword) {
      // Add logic to submit new password
      setShowForgotPasswordPopup(false);
      setShowNewPasswordPopup(false);
      setPasswordsMatchError(false);
      } else {
        setPasswordsMatchError(true);
      }
      }
      else{
        setOtpMatchError(true);
      }
  };

  const handleBack = () => {
    setShowForgotPasswordPopup(false);
    setShowNewPasswordPopup(false);
    setPasswordsMatchError(false);
    setShowOtpVerificationPopup(false);
  };

  return (
    
    <div className='sign-in-admin'>
      <Header/>
      <div style={{display:'flex',flexDirection:'column', justifyContent:'center', margin:'auto 0px'}}>
        <h2 className="admin-heading">ADMIN SIGN IN</h2>
        <form onSubmit={handleSignIn} className="admin-form">
          <label className="admin-form-label">
            Email:
            <input
              type="email"
              value={adminDetails.email}
              onChange={(e) => setAdminDetails({ ...adminDetails, email: e.target.value })}
              required
              className="admin-form-input"
              placeholder="Enter your email"
            />
          </label>
          <label className="admin-form-label">
            Password:
            <input
              type="password"
              value={adminDetails.password}
              onChange={(e) => setAdminDetails({ ...adminDetails, password: e.target.value })}
              required
              className="admin-form-input"
              placeholder="Enter your password"
            />
          </label>

          <div className="admin-form-buttons">
            <button type="submit" className="admin-form-button">
              Sign In
            </button>
            {/* Changed "Forgot Password" button to text */}
            <a href="#" onClick={handleForgotPassword} className="admin-forgot-link">
              Forgot Password?
            </a>
            <Link to="/signin" className="admin-back-link">
          Back
        </Link>
          </div>
          
        </form>
        
      </div>

      {/* Forgot Password Popup */}
      {showForgotPasswordPopup && (
        <div className="admin-forgot-password-popup">
          {/* <button className="close-btn" onClick={handleBack}>X</button> */}
          <h2>Forgot Password</h2>
          <form onSubmit={handleOtpSubmit}>
            <label>Email:</label>
            <input
              type="email"
              value={forgotPasswordData.email}
              onChange={(e) => setForgotPasswordData({ ...forgotPasswordData, email: e.target.value })}
              required
              placeholder="Enter your email"
            />
            <div className="admin-form-buttons" style={{ display: 'flex', flexDirection: 'row' }}>
              <button type="submit" onClick={() => fetchOtp()}>Send OTP</button>
              <button onClick={handleBack}>Back</button>
            </div>
          </form>
        </div>
      )}

      {/* OTP Verification Popup */}
      {showOtpVerificationPopup && (
        <div className="admin-popup" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div className="admin-popup-inner">
            {/* <button className="close-btn" onClick={handleBack}>X</button> */}
            <h2>OTP Verification</h2>
            <form onSubmit={handleNewPasswordSubmit}>
              <label>Enter OTP:</label>
              <input
                type="text"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp(e.target.value)}
                required
                placeholder="Enter OTP"
              />
              <label>New Password:</label>
              <input
                type="password"
                value={newPasswordData.password}
                onChange={(e) => setNewPasswordData({ ...newPasswordData, password: e.target.value })}
                required
                placeholder="Enter new password"
              />
              <label>Confirm Password:</label>
              <input
                type="password"
                value={newPasswordData.confirmPassword}
                onChange={(e) => setNewPasswordData({ ...newPasswordData, confirmPassword: e.target.value })}
                required
                placeholder="Confirm new password"
              />
              {passwordsMatchError && <p>Passwords do not match</p>}
              {otpMatchError && <p>OTP do not match</p>}

              <div className="admin-form-buttons" style={{ display: 'flex', flexDirection: 'row' }}>
                <button type="submit" onClick={() => changePassword()}>Submit</button>
                <button onClick={handleBack}>Back</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignInAdmin;
