import './DashboardAdmin.css'
import React, { useState } from 'react';
import MainDash from './components/MainDash/MainDash';
import Sidebar from './components/Sidebar';
import OrphDash from './components/OrphDash/OrphDash.jsx';
import Home from './components/AdminHome';
import Settings from './components/Settings/Settings.jsx';
import Donors from './components/Donors/Donors.jsx';
import PayDash from './components/PayDash/PayDash.jsx';
import EvenDash from './components/Events/EvenDash.jsx';

function DashboardAdmin() {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    console.log(option)
    setSelectedOption(option);
  };

  const renderContent = () => {
    switch (selectedOption) {
      case 'Dashboard':
        return <Home/>;
      case 'Orphanages':
        return <OrphDash />;
      // case 'profile':
      //   return <Profile />;
      // case 'events':
      //   return <EventTable />;
      // case 'payments':
      //   return <PaymentDashboard />;
      case 'mainDash':
        return <MainDash />;
      case 'Events':
        return <EvenDash />;  
      case 'Donors':
        return <Donors />;   
      case 'Settings':
        return <Settings />;  
      case 'Payments':
        return <PayDash />;  
      default:
        return <MainDash />;     
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


export default DashboardAdmin;
