import React, { useEffect, useState } from 'react';
import './Payment.css'; // Import the corresponding CSS file
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
import { useUser } from '../../../../UserContext';
import { width } from '@mui/system';
 
 
const PaymentDashboard = () => {
 
  const { userDetails } = useUser();
  const [paymentData, setPaymentData] = useState([]);
  const [requirementData,setRequirementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchDonorData = async(donorId) => {
   
    try{
      const response = await axios.get(`${API_BASE_URL}/orphanage/donor/${donorId}`);
      const status = response.status;
      if(status === 200){
        const data=response.data.name;
        console.log(data);
        return data;
      }
     
    }catch(error){
      console.log(error);
    }
  }
useEffect(() => {
  const createData = async() => {
    try{
      const response = await axios.get(`${API_BASE_URL}/orphanage/donation/${userDetails?.orpId}`);
      const responseReq = await axios.get(`${API_BASE_URL}/admin/requirementList`);
      const filteredResponse = responseReq.data.filter(item => item.orpId === userDetails?.orpId);
      const status= response.status;
      console.log(response.data);
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
      const requirementDataWithDonorName = await Promise.all(
        filteredResponse.map(async(data)=>{
          console.log(data.donorId);
          const donorName = await fetchDonorData(data.donorId);
          return{
            ...data,
            donorName:donorName,
          }
        })
      )
      console.log(donationDataWithDonorName);
      console.log(requirementDataWithDonorName);
      setRequirementData(requirementDataWithDonorName);
      setPaymentData(donationDataWithDonorName);
     
    }catch(error){
      console.log(error);
      setError(error.message);
    }finally{
      setLoading(false);
    }
  };
 
createData();
}, [userDetails?.orpId]);
 
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
    <div className="payment-dashboards">
      <div className="dashboard-container">
      <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: '2em', justifyContent: 'center',marginTop : '0.5rem' }}>Payment Dashboard</h1>
 
        <div className="main-content">
         
        <div className="payment-table-container" style={{ maxHeight: '200px',width: '580px', overflowY: 'auto' }}>
    <table className="payment-table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Amount</th>
                <th>Transaction ID</th>
                <th>Time</th>
                <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {paymentData?.length > 0 && paymentData.map((data, index) => (
                <tr key={index}>
                    <td>{data?.donorName}</td>
                    <td>Rs.{data?.amount}</td>
                    <td>{data?.transactionId}</td>
                    <td>{data?.dateTime}</td>
                    <td>{data?.status}</td>
                </tr>
            ))}
            {!paymentData?.length && (
                <tr>
                    <td colSpan="5"><center>No payment data</center></td>
                </tr>
            )}
        </tbody>
    </table>
</div>
 
          <div className="total-amount">
            <p>Total Amount Collected:</p>
            <span>Rs.{getTotalAmount()}</span>
          </div>
        </div>
        <div className="orphanage-main-content">
          <h1>Donation History</h1>
          <div className="orphanage-donation-table-container">
            <div style={{ maxHeight: '150px', overflowY: 'auto' }}>
            <table className="orphanage-donation-table">
              <thead>
                <tr>
                  <th>Donor Name</th>
                  <th>Requirements</th>
                </tr>
              </thead>
              <tbody>
                {requirementData.length > 0 ? (
                  requirementData.map((data, index) => (
                    <tr key={index}>
                      <td>{data?.donorName}</td>
                      <td>{data?.description}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" style={{ textAlign: 'center', paddingTop: '20px' }}>
                      <p style={{ margin: 'auto' }}>No Donation Has Done</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          </div>
        </div>
       
      </div>
    </div>
  );
};
 
export default PaymentDashboard;
 
