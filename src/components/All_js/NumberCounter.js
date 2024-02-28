// CounterSection.js
import React from 'react';
import CountUp from 'react-countup';
import '../All_css/NumberCounter.css';
import axios from 'axios';
import { API_BASE_URL } from '../../config';
import { useState } from 'react';
import { useEffect } from 'react';

const CounterSection = () => {
  const [donationCount, setDonationCount] = useState(0);
  const [orphanageCount, setOrphanageCount] = useState(0);
  const [donorCount, setDonorCount] = useState(0);
  useEffect (()=>{
    const fetchData = async ()=>{
      const responseDonation = await axios.get(`${API_BASE_URL}/admin/donationList`);
      const responseOrphanage = await axios.get(`${API_BASE_URL}/admin/orphanageList`);
      const responseDonor = await axios.get(`${API_BASE_URL}/admin/donorList`);
      setDonationCount(responseDonation.data.length);
      setOrphanageCount(responseOrphanage.data.length);
      setDonorCount(responseDonor.data.length);
    }
    fetchData();
  },[])
  const counters = [
    { id: 1, title: 'Array of orphanages', count: orphanageCount },
    { id: 2, title: 'Legion of donors', count: donorCount },
    { id: 3, title: 'Volume of donations', count: donationCount },
  ];

  const sectionStyle = [{
    backgroundImage: `url("https://images.pexels.com/photos/911738/pexels-photo-911738.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")`,
  }];

  return (
    <div className="counter-section">
      {counters.map((counter) => (
        <div key={counter.id} className="counter-item">
          <CountUp end={counter.count} duration={3} className="counter" />
          <p className="counter-title">{counter.title}</p>
        </div>
      ))}
    </div>
  );
};

export default CounterSection;



