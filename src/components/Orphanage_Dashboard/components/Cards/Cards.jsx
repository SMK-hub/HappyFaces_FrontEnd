import React, { useEffect, useState } from "react";
import "./Cards.css";
import {useUser} from '../../../../UserContext'
import axios from "axios";
import { API_BASE_URL } from "../../../../config";
import { useScroll } from "framer-motion";



const Cards = () => {
  const{userDetails} = useUser();
  const[viewCount,setViewCount] = useState();
  const[eventCount,setEventCount] = useState();
  const[donationAmount,setDonationAmount] = useState();

  useEffect(()=>{
    const getCount = async()=>{
      try{
        const viewResponse = await axios.get(`${API_BASE_URL}/orphanage/viewCount/${userDetails.orpId}`);
        setViewCount(viewResponse.data);
        const eventResponse = await axios.get(`${API_BASE_URL}/orphanage/plannedEvents/${userDetails.orpId}`);
        setEventCount(eventResponse.data.length);
        const donationResponse =await axios.get(`${API_BASE_URL}/orphanage/donation/${userDetails.orpId}`);
        let totalAmount = 0;
        donationResponse.data.forEach((payment)=>{
          totalAmount += parseFloat(payment.amount);
        });
        setDonationAmount(totalAmount.toFixed(2));
      }catch(error){
        console.log(error);
      }
    }
    getCount();
  },[])
  return (
    <div className="cards-container">
      <div className="card">
        <h2>Donation Collected</h2>
        <p>{donationAmount}</p>
      </div>
      <div className="card">
        <h2>Planned Event</h2>
        <p>{eventCount}</p>
      </div>
      <div className="card">
        <h2>Donors View Count</h2>
        <p>{viewCount}</p>
      </div>
      
    </div>
  );
};

export default Cards;
