import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignInOrphanage.css'; // Import the CSS file for styles
import Header from "./Header"
import axios from 'axios';
import { useUser } from '../../UserContext';
import { API_BASE_URL } from '../../config'; 
import { message } from 'antd';

const SignInOrphanage = () => {
  const navigate = useNavigate();
  const [orphanageDetails, setOrphanageDetails] = useState({
    email: "",
    password: ""
  });
  const [enteredOtp,setEnteredOtp] = useState();
  const [showForgotPasswordPopup, setShowForgotPasswordPopup] = useState(false);
  const [showOtpVerificationPopup, setShowOtpVerificationPopup] = useState(false);
  const [showNewPasswordPopup, setShowNewPasswordPopup] = useState(false);
  const [forgotPasswordData, setForgotPasswordData] = useState({
    email: "",
    otp: ""
  });
  const [newPasswordData, setNewPasswordData] = useState({
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [passwordsMatchError, setPasswordsMatchError] = useState(false);
  const [otpMatchError, setOtpMatchError] = useState(false);
  const [showOtpField, setShowOtpField] = useState(false); // State to control the display of OTP field
  const { setUserData } = useUser();
 
  const fetchData = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/orphanage/login`, orphanageDetails);
      const status = response.status;
      console.log(status);
      if (status === 200) {
        const userDetailResponse = await axios.get(`${API_BASE_URL}/orphanage/orphanage/${orphanageDetails.email}`);
        setUserData(userDetailResponse.data)
        navigate("/orphanage-dashboard");
      }
    } catch (error) {
      alert("Invalid Email/Password");
      console.log(error);
    }
  };
 
  const fetchOtp = async()=>{
    try{
      const response = await axios.post(`${API_BASE_URL}/orphanage/sendOtp`,forgotPasswordData);
      const status=response.status;
      if(status === 200){
        const data=response.data;
        console.log(data);
        setForgotPasswordData(prevData => ({
          ...prevData,
          otp: data // Update with the actual response key for OTP
        }));
      }
 
    }catch(error){
      console.log(error);
    }
  }
 
  const changePassword = async()=>{
    try{
        const response = await axios.post(`${API_BASE_URL}/orphanage/ForgetPassword/${forgotPasswordData.email}/${enteredOtp}/${newPasswordData.password}/${newPasswordData.confirmPassword}`);
        const status = response.status;
        if(status === 200){
          message.success(response.data);
          setForgotPasswordData({
            email:"",
            otp:""
          })
          setNewPasswordData({
            password: '',
            confirmPassword: '',
            otp: '',
          })
          setShowOtpVerificationPopup(false);
          setShowForgotPasswordPopup(false);
        }
      }
     
    catch(error){
      console.log(error);
    }
  }
 
  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(orphanageDetails);
    fetchData();
  };
 
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setShowForgotPasswordPopup(true);
  };
 
  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Add logic to send OTP to the user's email
    // For demonstration, we can simply set showOtpField to true
    setShowOtpVerificationPopup(true);
  };
 
  const handleNewPasswordSubmit = (e) => {
    e.preventDefault();
    const otp = parseInt(enteredOtp);
    if (forgotPasswordData.otp !== otp) {
        setOtpMatchError(true);
        setPasswordsMatchError(false);
    } else if (newPasswordData.password !== newPasswordData.confirmPassword) {
        setPasswordsMatchError(true);
        setOtpMatchError(false);
    } else {
        setShowForgotPasswordPopup(false);
        setShowNewPasswordPopup(false);
        setPasswordsMatchError(false);
    } 
  };
 
  const handleBack = () => {
    setForgotPasswordData({
      email:"",
      otp:""
    })
    setNewPasswordData({
      password: '',
      confirmPassword: '',
      otp: '',
    })
    setShowForgotPasswordPopup(false);
    setShowOtpVerificationPopup(false);
    setShowNewPasswordPopup(false);
    setPasswordsMatchError(false);
    setShowOtpField(false); // Hide OTP field when navigating back
  };
 
  const handleSendOtp = (e) => {
    e.preventDefault();
    // Add logic to send OTP to the user's email
    // For demonstration, we can simply set showOtpField to true
    setShowOtpField(true);
  };
 
  return (
    <div className='sign-in-orphanage'>
      <Header/>
      <div style={{display:'flex',flexDirection:'column', justifyContent:'center', margin:'auto 0px'}}>
        <h2 className="sign-in-orphanage-heading">ORPHANAGE SIGN IN</h2>
        <form onSubmit={handleSignIn} className="sign-in-orphanage-form">
          <label className="orphanage-form-label">
            Email:
            <input
              type="email"
              value={orphanageDetails.email}
              onChange={(e) => setOrphanageDetails({...orphanageDetails,email:e.target.value})}
              required
              className="orphanage-form-input"
              placeholder="Enter your email"
            />
          </label>
          <label className="orphanage-form-label">
            Password:
            <input
              type="password"
              value={orphanageDetails.password}
              onChange={(e) => setOrphanageDetails({...orphanageDetails,password:e.target.value})}
              required
              className="orphanage-form-input"
              placeholder="Enter your password"
            />
          </label>
          <div className="orphanage-form-buttons">
            <button type="submit" className="orp-button">
              Sign In
            </button>
            <a href="#" onClick={handleForgotPassword} className="orphanage-forgot-password-link">
              Forgot Password?
            </a>
            <Link to="/signin" className="orphanage-back-link">
          Back
        </Link>
          </div>          
        </form>

      </div>
 
      {/* Forgot Password Popup */}
      {showForgotPasswordPopup && (
        <div className="orphanage-popup">
          <div className="orphanage-popup-inner">
            {/* <button className="orphanage-close-btn" onClick={handleBack}>X</button> */}
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
              <div className="orphanage-form-buttons" style={{ display: 'flex', flexDirection: 'row' }}>
                <button type="submit" onClick={()=>fetchOtp()}>Send OTP</button>
                <button onClick={handleBack}>Back</button>
              </div>
            </form>
          </div>
        </div>
      )}
 
      {/* OTP Verification Popup */}
      {showOtpVerificationPopup && (
        <div className="orphanage-popup">
          <div className="orphanage-popup-inner">
            {/* <button className="orphanage-close-btn" onClick={handleBack}>X</button> */}
            <h2>OTP Verification</h2>
            <form onSubmit={handleNewPasswordSubmit}>
              <label>Enter OTP:</label>
              <input
                type="text"
                value={enteredOtp}
                onChange={(e) => setEnteredOtp( e.target.value )}
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

              <div className="orphanage-form-buttons" style={{ display: 'flex', flexDirection: 'row' }}>
                <button type="submit" onClick={()=>changePassword()}>Submit</button>
                <button onClick={handleBack}>Back</button>
              </div>
            </form>
          </div>
        </div>
      )}
 
      {/* Other popups */}
    </div>
  );
};
 
export default SignInOrphanage;