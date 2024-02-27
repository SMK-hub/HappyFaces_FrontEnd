import React from 'react';
import vid from './video (2160p).mp4';
import { Link } from 'react-router-dom';
import '../All_css/Home.css';

import Aim from './Aim';
import FocusSection from './FocusSection';
import NumberCounter from './NumberCounter';
import CardList from './CardList';
import Testimony from './Testimony';
import Registration from './Registration';
import Contact from './Contact';
import Footer from './Footer';
import Header from './Header';


const Home = () => {
  return (
    <div className="home-background">
      <Header/>
      <div className="home-container">
        <img src="https://godwinfoundation.org/assets/images/logo_desktop_1.png" alt="Logo" className="logoHF" />
        <video src={vid} autoPlay loop muted/>        
        <h1>HAPPY FACES</h1>
        <p>
          <span className="subhead">Creating a digital presence to bring hope to the lives of orphaned children.</span>
          <br />
           HOME FOR EVERY CHILD
        </p>
        <Link to="/signin/donor">
          <button className="donate">DONATE NOW</button>
        </Link>
      </div>
      <Aim />
      <FocusSection />
      <NumberCounter/>
      <CardList/>
      <Testimony/>
      <div><Contact/></div>
      
      <Footer/>
    </div>
  );
};

export default Home;
