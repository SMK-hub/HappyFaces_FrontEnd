import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import NobitaImage from '../../Images/Nobita.jpg';
import JiyanImage from '../../Images/Jiyan.png';
import SuzukaImage from '../../Images/Suzuka.png';
import '../All_css/TeamMembersPopup.css'; // Import CSS for styling

const teamMembersData = [
  { 
    name: 'Muthu', 
    image: NobitaImage,
    joinedDate: 'January 2023',
    role: 'Lead Developer',
    email: 'muthu@example.com',
    responsibilities: 'Frontend and Backend Development',
  },
  { 
    name: 'Srikanth', 
    image: JiyanImage,
    joinedDate: 'March 2023',
    role: 'UI/UX Designer',
    email: 'srikanth@example.com',
    responsibilities: 'Designing user interfaces and user experience',
  },
  { 
    name: 'Amisha', 
    image: SuzukaImage,
    joinedDate: 'April 2023',
    role: 'Project Manager',
    email: 'amisha@example.com',
    responsibilities: 'Overseeing project execution and team coordination',
  },
  // Add more team members as needed
];

const TeamMembersPopup = ({ onClose }) => {
  const [currentPage, setCurrentPage] = useState(0);

  return (
    <div className="team-members-popup">
      <div className="popup-overlay" onClick={onClose}></div>
      <div className="popup-content">
        <span className="close-icon"  onClick={onClose}>&times;</span>
        <h2>Our Team Members</h2>
        <SwipeableViews
          index={currentPage}
          onChangeIndex={(index) => setCurrentPage(index)}
          enableMouseEvents
        >
          {teamMembersData.map((member, index) => (
            <div key={index} className="team-membercard">
              <img src={member.image} alt={member.name} />
              <h3>{member.name}</h3>
              <p><strong>Joined:</strong> {member.joinedDate}</p>
              <p><strong>Role:</strong> {member.role}</p>
              <p><strong>Email:</strong> {member.email}</p>
              <p><strong>Responsibilities:</strong> {member.responsibilities}</p>
            </div>
          ))}
        </SwipeableViews>
        <div className="navigation-buttons">
          <button onClick={() => setCurrentPage((prevPage) => (prevPage - 1 + teamMembersData.length) % teamMembersData.length)}>&lt; Prev</button>
          <button onClick={() => setCurrentPage((prevPage) => (prevPage + 1) % teamMembersData.length)}>Next &gt;</button>
        </div>
        <button className="close-icon" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

TeamMembersPopup.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default TeamMembersPopup;
