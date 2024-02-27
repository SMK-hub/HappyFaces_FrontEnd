// PaymentDashboard.jsx
import React, { useEffect, useState } from 'react';
import './Payment.css'; // Import the corresponding CSS file
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
import { useUser } from '../../../../UserContext';


const PaymentDashboard = () => {

  const { userDetails } = useUser();
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchDonorData = async(donorId) => {
    
    try{
      const response = await axios.get(`${API_BASE_URL}/orphanage/donor/${donorId}`);
      const status = response.status;
      console.log(response.data);
      if(status === 200){
        const data=response.data.name;
        
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
      const status= response.status;
      console.log(response.data);
      if(status !== 200){
        throw new Error('Failed to fetch data');
      }
      const donationData = response.data;
      const donationDataWithDonorName = await Promise.all(
        donationData.map(async(data)=>{
          console.log(data.donorId);
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
      <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: '2em', justifyContent: 'center',marginTop : '0.5rem' }}>Payment Dashboard</h1>
      <div className="dashboard-container">
      
        <div className="main-content">
          
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
          <div className="total-amount">
            <p>Total Amount Collected:</p>
            <span>Rs.{getTotalAmount()}</span>
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default PaymentDashboard;
