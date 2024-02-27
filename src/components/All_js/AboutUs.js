import React, { useState } from 'react';
import { FaRegHeart, FaHandsHelping, FaUsers, FaMicrophoneAlt, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import '../All_css/AboutUs.css';
import Header from './Header';
import Footer from './Footer';

const AboutUs = () => {
  const emailLink = "mailto:demo@gmail.com"; // Gmail mailto link
  // const [showTeamMembersPopup, setShowTeamMembersPopup] = useState(false);

  // const handleViewTeamMembers = () => {
  //   setShowTeamMembersPopup(true);
  

  return (
    <div className='about-us'>
      <Header/>
      <div className="about-us-container">
        <div className="our-story-section">
          <div className="announcement-mic">
            <FaMicrophoneAlt className="mic-icon" />
          </div>
          <div className="our-story-box">
            <h2 className="about-us-heading">Our Story</h2>
            <p className="about-us-description">
              Step into the heartwarming world of Happy Faces, an online heaven where every smile tells a story of hope and resilience. We are not just an orphanage; we are a vibrant community, weaving a tapestry of love and support. Explore our website to meet the incredible souls behind the smiles, read inspiring tales of triumph, and discover how you can make a difference. Whether through donations, volunteering, or spreading the word, you become a catalyst for positive change. Join us in creating a world where abandoned dreams find new life, and every face radiates the pure joy of belonging. Together, we illuminate the path to a brighter future. 😊🌟 #HappyFaces #SpreadLove #TransformLives
            </p>
          </div>
        </div>

        <div className="AboutUscard-container">
          <div className="AboutUscard" id="mission-AboutUscard">
            <h3>Our Mission</h3>
            <p>
              Happy Faces: Illuminating lives with love, Happy Faces is on a mission to provide hope, shelter, and opportunities to orphaned children, fostering resilience and joyful futures. #HappyFacesMission
            </p>
          </div>
          <div className="AboutUscard" id="values-AboutUscard">
            <h3>Our Values</h3>
            <p>
              Happy Faces values compassion, resilience, and community. We believe in fostering a nurturing environment where every child is empowered to thrive, creating a brighter future filled with love, support, and joy. #HappyFacesValues
            </p>
          </div>
          <div className="AboutUscard" id="team-AboutUscard">
            <h3>Our Team</h3>
            <p>
              Meet the incredible team behind Happy Faces—passionate individuals dedicated to nurturing smiles and building a brighter future for orphaned children. Committed to compassion, innovation, and positive impact. Together, we make dreams blossom! #HappyFacesTeam
            </p>
            {/* <button className="view-details-button" onClick={handleViewTeamMembers}>
              View Team Members
            </button> */}
          </div>
        </div>

        <div className="creative-section">
          <div className="creative-item">
            <FaRegHeart className="creative-icon" />
            <p>Passion</p>
          </div>
          <div className="creative-item">
            <FaHandsHelping className="creative-icon" />
            <p>Community</p>
          </div>
          <div className="creative-item">
            <FaUsers className="creative-icon" />
            <p>Diversity</p>
          </div>
        </div>

        <div className="additional-creative-section">
          <div className="additional-creative-content">
            <h3>Join Us in Making a Difference</h3>
            <p>
              "Embark on a transformative journey with us. Join Happy Faces in making a profound impact. Your involvement, whether through donations, volunteering, or advocacy, plays a pivotal role in creating positive change and nurturing brighter futures for orphaned children. Together, let's make a lasting difference."
            </p>
            <a href="/signup" className="join-us-button">Join Us</a>
          </div>
        </div>

        <div className="visually-striking-section">
          <div className="animated-circles"></div>
          <h3 className="striking-heading">Building bright Futures</h3>
          <p className="striking-description">
            "Nurturing hope and creating smiles for every child at our orphanage."
          </p>
        </div>
      </div>
      <Footer/>

    </div>
  );
};

export default AboutUs;
