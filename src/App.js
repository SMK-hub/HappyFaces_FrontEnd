import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/All_js/Home';
import AboutUs from './components/All_js/AboutUs';
import Gallery from './components/All_js/Gallery';
import Galleries from "../src/components/Orphanage_Dashboard/components/Galleries/Galleries"
import SignInSelector from './components/All_js/SignInSelector';
import SignUpSelector from './components/All_js/SignUpSelector';
import SignInAdmin from './components/All_js/SignInAdmin';
import SignInOrphanage from './components/All_js/SignInOrphanage';
import SignInDonor from './components/All_js/SignInDonor';
import SignUpAdmin from './components/All_js/SignUpAdmin';
import SignUpOrphanage from './components/All_js/SignUpOrphanage';
import SignUpDonor from './components/All_js/SignUpDonor';

import DashboardAdmin from './components/Admin_Dashboard/DashboardAdmin';
import DashboardOrphanage from './components/Orphanage_Dashboard/DashboardOrphanage';
import DashboardDonor from './components/Donor_Dashboard/DashboardDonor';

import OrphanageHome from './components/Orphanage_Dashboard/components/OrphanageHome';
import MyContainer from './components/Orphanage_Dashboard/components/Container/Container';
import Profile from './components/Orphanage_Dashboard/components/Profile/Profile';
import EventTable from './components/Orphanage_Dashboard/components/Event/Events';
import PaymentDashboard from './components/Orphanage_Dashboard/components/Payments/Payment';
import OrphDash from './components/Admin_Dashboard/components/OrphDash/OrphDash';
import Settings from './components/Admin_Dashboard/components/Settings/Settings';
import Donors from './components/Admin_Dashboard/components/Donors/Donors'
import UpdateDetails from './components/Orphanage_Dashboard/components/UpdateDetails/UpdateDetails'
import Certificates from './components/Orphanage_Dashboard/components/Certificates/Certificates'
import Photos from './components/Orphanage_Dashboard/components/Photos/Photos'
import PayDash from './components/Admin_Dashboard/components/PayDash/PayDash';
import { UserProvider } from './UserContext';
import EvenDash from './components/Admin_Dashboard/components/Events/EvenDash'


const App = () => {
  return (
    <UserProvider><Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/Galleries" element={<Galleries/>} />
        <Route path="/signin" element={<SignInSelector />} />
        <Route path="/signup" element={<SignUpSelector />} />
        <Route path="/signin/admin" element={<SignInAdmin />} />
        <Route path="/signin/orphanage" element={<SignInOrphanage />} />
        <Route path="/signin/donor" element={<SignInDonor />} />
        <Route path="/signup/admin" element={<SignUpAdmin />} />
        <Route path="/signup/orphanage" element={<SignUpOrphanage />} />
        <Route path="/signup/donor" element={<SignUpDonor />} />
        
        <Route path="/admin-dashboard" element={<DashboardAdmin/>}/>
        <Route path='/orphanage-dashboard' element={<DashboardOrphanage/>}/>
        <Route path="/donor-dashboard" element={<DashboardDonor/>}/>
        
        <Route path="/OrphanageHome" element={<OrphanageHome />} />
        <Route path="/OrphanageHome/details" element={<MyContainer/>}/>
        <Route path="/OrphanageHome/profile" element={<Profile/>}/>
        <Route path="/OrphanageHome/events" element={<EventTable/>}/> 
        <Route path="/OrphanageHome/payments" element={<PaymentDashboard/>}/>
        <Route path="/update-details" element={<UpdateDetails/>}/>
        <Route path="/certificates" element={<Certificates/>}/>
        <Route path="/photos" element={<Photos/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/orphanages" element={<OrphDash/>}/> 
        <Route path="/settings" element={<Settings/>}/>
        <Route path="/donors" element={<Donors/>}/>

        <Route path="/payments" element={<PayDash/>}/>
        <Route path="/events" element={<EvenDash/>}/>
      </Routes>
    </Router></UserProvider>
    
  );
};

export default App;
