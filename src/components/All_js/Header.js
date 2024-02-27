// components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../All_css/Header.css';


const Header = () => {
  return (
    <div>
       <nav> 
        <ul className="header-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/aboutus">About Us</Link></li>
        <li><Link to="/gallery">Gallery</Link></li>
        <li><Link to="/signin">Sign In</Link></li>
        <li><Link to="/signup">Sign Up</Link></li>
        <li><Link to="/signin/donor">Donate</Link></li>
      </ul>
    </nav>
    </div>
  );
};

export default Header;
