import React from "react";
import "./Cards.css";
import { useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";
import { useState } from "react";

const Cards = () => {
  const [adminCount, setAdminCount] = useState(0);
  const [orphanageCount, setOrphanageCount] = useState(0);
  const [donorCount, setDonorCount] = useState(0);
  useEffect (()=>{
    const fetchData = async ()=>{
      const responseAdmin = await axios.get(`${API_BASE_URL}/admin/adminList`);
      const responseOrphanage = await axios.get(`${API_BASE_URL}/admin/orphanageList`);
      const responseDonor = await axios.get(`${API_BASE_URL}/admin/donorList`);
      setAdminCount(responseAdmin.data.length);
      setOrphanageCount(responseOrphanage.data.length);
      setDonorCount(responseDonor.data.length);
    }
    fetchData();
  },[])
  return (
    <div className="cards-container">
      <div className="card">
        <h2>Orphanages</h2>
        <p>{orphanageCount}</p>
      </div>
      <div className="card">
        <h2>Donors</h2>
        <p>{donorCount}</p>
      </div>
      <div className="card">
        <h2>Admins</h2>
        <p>{adminCount}</p>
      </div>
    </div>
  );
};

export default Cards;
