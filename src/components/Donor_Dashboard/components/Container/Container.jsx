/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import './Container.css';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
 
const MyContainer = () => {
  // Dummy data for orphanage information
  const orphanageInfo = {
    Orphanage_Name: 'ABC Orphanage',
    DirectorName: 'Muthu',
    Contact: '123-456-7890',
    Description: 'A place for children in need.',
    Address: '123 Main Street, City, Country',
    VerificationStatus: 'Verified',
    Website: 'https://www.abc-orphanage.org',
    Requirements: 'Food, clothing, education materials',
    PriorityStatus: 'High',
  };
  const [orphanageData, setOrphanageData] = useState([]);
 
  useEffect(() => {
    const fetchOrphanageData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/orphanageDetails`);
        setOrphanageData(response.data);
      } catch (error) {
        console.error('Error fetching orphanage data:', error);
      }
    };

    fetchOrphanageData();
  }, []);

  const tableData = Object.entries(orphanageInfo);
 
  return (
    <div className="details-container">
      <h1 className="head">ORPHANAGE DETAILS</h1>
      <table className="info-table">
        <tbody>
          {tableData.map(([title, detail]) => (
            <tr key={title}>
              <td className="info-title">{title}:</td>
              <td className="info-detail">{detail}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
 
const handleButtonClick = (action) => {
  // Handle button click logic here
  console.log(`Button clicked: ${action}`);
};
 
export default MyContainer;
 