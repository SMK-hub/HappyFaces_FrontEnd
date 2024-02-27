/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Dash.css';
import Home from './components/DonorHome';
import { Container } from '@mui/material';
import MyContainer from './components/Container/Container';
import Profile from './components/Profile/Profile';
import EventTable from './components/Event/Events';
import Sidebar from './components/Sidebar';
import PaymentDashboard from './components/Payments/Payment';
import MainDash from './components/MainDash/MainDash';
import OrphDash from './components/Details/OrphDash';


function DashboardDonor() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    console.log(option)
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'home':
        return <Home />;
      case 'orph':
        return <OrphDash />;
      case 'profile':
        return <Profile />;
      case 'events':
        return <EventTable />;
      case 'payments':
        return <PaymentDashboard />;
      case 'mainDash':
        return <MainDash />;
      case 'Donor':
        return <OrphDash/>;
      default:
        return <MainDash/>;
    }
  };

  return (
    <div className='Apps'>
      <div className='AppGlass'>
        <Sidebar onOptionSelect={handleOptionSelect} />
        {renderContent()}
      </div>
    </div>
  );
}

export default DashboardDonor;
