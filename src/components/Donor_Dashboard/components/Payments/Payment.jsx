import React, { useState, useEffect } from 'react';
import './Payment.css';
import axios from 'axios';
import { useUser } from '../../../../UserContext';
import { API_BASE_URL } from '../../../../config';

const PaymentDashboard = () => {
  const { userDetails } = useUser();
  const [paymentData, setPaymentData] = useState([]);
  const [requirementData, setRequirementData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/donor/DonationList/${userDetails?.donorId}`);
        const responseReq = await axios.get(`${API_BASE_URL}/donor/${userDetails.donorId}/DonationRequirement`)
        const reqStatus = responseReq.status;
        const status = response.status;
        if (status !== 200 && reqStatus !== 200) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.data;
        const reqData = await Promise.all( 
          responseReq.data.map(async (requirement)=>{
            const orphanageDetails = await fetchOrphanageDetails(requirement.orpId);
            return{
              ...requirement,
              orphanageDetails:orphanageDetails,
            }
          }));
        
        setPaymentData(data);
        setRequirementData(reqData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    const fetchOrphanageDetails = async (orpId) => {
      console.log(orpId);
      try{
          const response = await axios.post(`${API_BASE_URL}/donor/${orpId}/OrphanageDetails`);
          return response.data;
          
      }catch(error){
        console.log(error);
      }
     
    }
    fetchPaymentData();
  }, [userDetails?.donorId]);

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

  return (
    <div className="donor-payment-dashboard">
      <div className="donor-dashboard-container" style={{display:"flex",flexDirection:"column"}}>
        <div className="donor-main-content">
          <h1>Payment History</h1>
          <div className="donor-payment-table-container">
            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
            <table className="donor-payment-table" >
              <thead>
                <tr>
                  <th>Orphanage Name</th>
                  <th>Amount</th>
                  <th>Transaction ID</th>
                  <th>Time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paymentData.length > 0 ? (
                  paymentData.map((data, index) => (
                    <tr key={index}>
                      <td>{data?.orphanageName}</td>
                      <td>Rs.{data?.amount}</td>
                      <td>{data?.transactionId}</td>
                      <td>{data?.dateTime}</td>
                      <td>{data?.status}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" style={{ textAlign: 'center', paddingTop: '20px' }}>
                      <p style={{ margin: 'auto' }}>No Payment Has Done</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            </div>
          </div>
          <div className="donor-total-amount">
            <p>Total Amount Collected:</p>
            <span>Rs.{getTotalAmount()}</span>
          </div>
        </div>
        <div className="donor-main-content">
          <h1>Donation History</h1>
          <div className="donor-donation-table-container">
            <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
            <table className="donor-donation-table">
              <thead>
                <tr>
                  <th>Orphanage Name</th>
                  <th>Requirements</th>
                </tr>
              </thead>
              <tbody>
                {requirementData.length > 0 ? (
                  requirementData.map((data, index) => (
                    <tr key={index}>
                      <td>{data?.orphanageDetails?.orphanageName}</td>
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
