// components/Aim.js
import React from 'react';
import '../All_css/Aim.css';
// import aimImage from 'https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

const Aim = () => {
  return (
    <div className="aim-container">
      <img src="https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Aim" className="aim-image" />
      <h2>Our Objective</h2>
      <p>
        "Happy Faces" aims to revolutionize the support system for orphanages by offering a secure and user-friendly registration and update platform. Our objective is to enhance user engagement by encouraging on-site activity participation. Focused on data security and scalability, we aspire to build a socially impactful ecosystem, fostering positive change in the lives of orphaned children. Through innovative technology and a commitment to making a difference, "Happy Faces" endeavors to streamline operations, empower caregivers, and provide a platform for individuals and organizations to contribute meaningfully to the well-being and development of the children under our care.
      </p>
    </div>
  );
};

export default Aim;



