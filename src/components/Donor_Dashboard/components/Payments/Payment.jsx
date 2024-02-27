import React, { useState, useEffect } from 'react';
import './Payment.css';
import axios from 'axios';
import { useUser } from '../../../../UserContext';
import { API_BASE_URL } from '../../../../config';

 
function createData(name, amount, transactionId, time, status) {
  return { name, amount, transactionId, time, status };
}
 
const rows = [
  createData('Srikanth', 100, 'TX123', '2024-01-20 08:30', 'SUCCESS'),
  createData('Muthu', 50, 'TX124', '2024-01-21 12:45', 'PENDING'),
  // Add more rows as needed
];
 
const PaymentDashboard = () => {
  const { userDetails } = useUser();
 
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchPaymentData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/donor/DonationList/${userDetails?.donorId}`);
        const status = response.status;
        console.log(response);
        if (status !== 200) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.data;
        console.log(data);
        setPaymentData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
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
 
  if (error) {
    return <div>Error: {error}</div>;
  }
 
  return (
    <div className="payment-dashboard">
      <div className="dashboard-container">
        <div className="main-content">
          <h1>Payment History</h1>
          <div className="payment-table-container">
            <table className="payment-table">
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
                {paymentData.map((data, index) => (
                  <tr key={index}>
                    <td>{data?.orphanageName}</td>
                    <td>Rs.{data?.amount}</td>
                    <td>{data?.transactionId}</td>
                    <td>{data?.dateTime}</td>
                    <td>{data?.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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