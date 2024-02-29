/* eslint-disable no-unused-vars */
// OrphDash.js
import React, { useState, useEffect } from "react";
import "./PayDash.css";
// index.js or App.js
import '@fortawesome/fontawesome-free/css/all.css';
// import ImagePopup from "./ImagePopup";
import axios from "axios";
import { useUser } from '../../../../UserContext';

const PayDash = () => {

  const { userDetails } = useUser();
  const [paymentData, setPaymentData] = useState([]);
  const [requireData, setRequireData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchDonorData = async(donorId) => {
    try{
      const response = await axios.get(`http://localhost:8079/admin/donor/${donorId}`);
      const status = response.status;
      if(status === 200){
        const data=response.data.name;
        return data;
      } 
      
    }catch(error){
      console.log(error);
    }
  }
  
  const fetchOrphangeData = async(orpId) => {
    try{
      const resp = await axios.get(`http://localhost:8079/admin/orphanageDetails/${orpId}`);
      const stat = resp.status;
      console.log(resp.data);
      if(stat === 200){
        const data=resp.data.orphanageName;
        return data;
      }
    }catch(error){
      console.log(error);
    }
  }

useEffect(() => {
  const createData = async() => {
    try{
      const response = await axios.get(`http://localhost:8079/admin/donationList`);
      const status= response.status;
      if(status !== 200){
        throw new Error('Failed to fetch data');
      }
      const donationData = response.data;
      const donationDataWithDonorName = await Promise.all(
        donationData.map(async(data)=>{
          const donorName = await fetchDonorData(data.donorId);
          return{
            ...data,
            donorName:donorName,
          }
        })
      )
      console.log(donationDataWithDonorName);
      setPaymentData(donationDataWithDonorName);
      
    }catch(error){
      console.log(error);
      setError(error.message);
    }finally{
      setLoading(false);
    }
  };
  
createData();
}, []);

useEffect(() => {
  const createReq = async() => {
    try{
      const res = await axios.get(`http://localhost:8079/admin/requirementList`);
      const status= res.status;
      if(status !== 200){
        throw new Error('Failed to fetch data');
      }
      const reqData = res.data;
      const reqDataWithDonorName = await Promise.all(
        reqData.map(async(data)=>{
          const donorName = await fetchDonorData(data.donorId);
          console.log(data.orpId);
          const orphanageName = await fetchOrphangeData(data.orpId);
          return{
            ...data,
            donorName:donorName,
            orphanageName:orphanageName,
          }
        })
      )  
      console.log(reqDataWithDonorName);
      setRequireData(reqDataWithDonorName);
      
    }catch(error){
      console.log(error);
      setError(error.message);
    }finally{
      setLoading(false);
    }
  };
  
createReq();
}, []);

const getTotalAmount = () => {
  let totalAmount = 0;
  paymentData.forEach((payment) => {
    if (payment.status === "SUCCESS") {
      totalAmount += parseFloat(payment.amount);
    }
  });
  return totalAmount.toFixed(2);
};

if (loading) {
  return <div>Loading...</div>;
}

if (error) {
  return <div>Error: {error}</div>;
}

  return (
    <div>
      <div className="OrphDash">
  <h2>Payments</h2>
  {/* Payment Table */}
  <div className="payments-table-container">
  <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
    <table>
      {/* Table headers */}
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Transaction Id</th>
          <th>Date</th>
          <th>Orphanage</th>
          <th>Status</th>
        </tr>
      </thead>
      {/* Table body */}
      <tbody>
  {paymentData?.length > 0 ? (
    paymentData.map((data, index) => (
      <tr key={index}>
        {/* Table cells */}
        <td>{data?.donorName}</td>
        <td>Rs.{data?.amount}</td>
        <td>{data?.transactionId}</td>
        <td>{data?.dateTime}</td>
        <td>{data?.orphanageName}</td>
        <td>{data?.status}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="6" style={{ textAlign: "center" }}>
        No donation has been made
      </td>
    </tr>
  )}
</tbody>

    </table>
  </div>
  </div>

{/* Donations Table */}
<div className="donations-table-container" style={{ width: '850px',}}>
          <h2 style={{ textAlign: 'center' }}>Donations</h2>
          <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
            <table>
              <thead>
                <tr>
                  <th>Donor Name</th>
                  <th>Orphanage Name</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
  {requireData.length > 0 ? (
    requireData.map((data, index) => (
      <tr key={index}>
        <td>{data.donorName}</td>
        <td>{data.orphanageName}</td>
        <td>{data.description}</td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="3" style={{ textAlign: "center" }}>
        No requirement has been donated
      </td>
    </tr>
  )}
</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayDash;