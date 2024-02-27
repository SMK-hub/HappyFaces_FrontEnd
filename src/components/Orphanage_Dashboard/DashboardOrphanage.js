/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import './Dash.css';
import Home from './components/OrphanageHome';
import { Container } from '@mui/material';
import MyContainer from './components/Container/Container';
import Profile from './components/Profile/Profile';
import EventTable from './components/Event/Events';
import Sidebar from './components/Sidebar';
import PaymentDashboard from './components/Payments/Payment';
import MainDash from './components/MainDash/MainDash';
import { Route, Router, Routes } from 'react-router-dom';
import UpdateDetails from './components/UpdateDetails/UpdateDetails'

import { Button, Result } from 'antd';
import { useUser } from '../../UserContext';
function DashboardOrphanage() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    console.log(option)
    setSelectedOption(option);
  };

  const  {userDetails,setUserData} = useUser();


  const renderContent = () => {
    switch (selectedOption) {
      case 'home':
        return <Home />;
      case 'container':
        return <MyContainer />;
      case 'profile':
        return <Profile />;
      case 'events':
        return <EventTable />;
      case 'payments':
        return <PaymentDashboard />;
      case 'mainDash':
        return <MainDash />;
      default:
        return <MainDash/>;
    }
  };

  return (
      <div className='Dashb'>
      
      <div className='DashbGlass'>
      <Sidebar onOptionSelect={handleOptionSelect} />
        {renderContent()}
      </div>
      
    </div>
    
  )
}

export default DashboardOrphanage;
