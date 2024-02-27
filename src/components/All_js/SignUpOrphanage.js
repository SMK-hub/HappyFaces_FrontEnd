// components/SignInAdmin.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../All_css/SignUpOrphanage.css'; // Import the CSS file for styles
import Header from "./Header";
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const SignUpOrphanage = () => {
  const navigate = useNavigate();
  const [orphanageDetails,setOrphanageDetails] = useState ({
    name:"",
    email:"",
    password:""
  })

  const[loading,setLoading]=useState(false);

  const fetchData=async()=>{
    try{
      setLoading(true);
      const response=await axios.post(`${API_BASE_URL}/orphanage/register`,orphanageDetails);
      const status=response.status;
      if(status==200)
      {
        navigate("/signin/orphanage");
      }
    }catch(error){
      alert("You are an Existing User, Please SignIn");
    }finally{
      setLoading(false);
    }
  }

  const handleSignUp = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className='sign-up-orphanage'><Header/>
    {loading ? (
      <div className="loading-screen">Loading...</div>
    ) : (
    <div>
      <h2 className="sign-up-orphanage-heading">ORPHANAGE SIGN UP</h2>
      <form onSubmit={handleSignUp} className="sign-up-orphanage-form">
        <label className="form-label">
          Username:
          <input
            type="text"
            value={orphanageDetails.name}
            onChange={(e) => setOrphanageDetails({...orphanageDetails,name:e.target.value})}
            required
            className="form-input"
          />
        </label>
        
        <label className="form-label">
          Email:
          <input
            type="email"
            value={orphanageDetails.email}
            onChange={(e) => setOrphanageDetails({...orphanageDetails,email:e.target.value})}
            required
            className="form-input"
          />
        </label>
        <label className="form-label">
          Password:
          <input
            type="password"
            value={orphanageDetails.password}
            onChange={(e) => setOrphanageDetails({...orphanageDetails,password:e.target.value})}
            required
            className="form-input"
          />
        </label>
        <div className="form-buttons">
          <button type="submit" className="form-button">
            Sign Up
          </button>
        </div>
        <Link to="/signup" className="back-link">
        Back
      </Link>
      </form>      
    </div>
    )}
    </div>
  );
};

export default SignUpOrphanage;
