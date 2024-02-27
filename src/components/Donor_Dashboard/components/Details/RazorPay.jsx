import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios library
import useRazorpay from "react-razorpay";
import "./OrphDash";
import {useUser} from '../../../../UserContext';
import dayjs from "dayjs";
import { API_BASE_URL } from "../../../../config";



const RazorPay = ({ onClose, selectedOrphanage }) => {
  const [donationAmount, setDonationAmount] = useState("");
  const [Razorpay] = useRazorpay(); // Using useRazorpay hook at the top-level of the component
  const  {setUserData} = useUser();
  const {userDetails} = useUser();
  const handleDonationInputChange = (e) => {
    setDonationAmount(e.target.value);
  };

  const [currentDateTime, setCurrentDateTime] = useState('');
  useEffect(() => {
    const interval = setInterval(() => {
      const now = dayjs().format('YYYY-MM-DD HH:mm:ss');
      setCurrentDateTime(now);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleDonate = async () => {
    console.log(donationAmount);
    const wholeAmount=(parseFloat(donationAmount)*100).toString()
    console.log(wholeAmount);
    try {
      // Send donation amount to backend API
      const response = await axios.post(`${API_BASE_URL}/donor/generateOrder`, { amount: wholeAmount });
      // Initialize Razorpay options
      const options = {
        key: "rzp_test_MO6ugcoVHpPBDT", // Enter the Key ID generated from the Dashboard
        amount: wholeAmount, // Convert amount to currency subunits (paise)
        currency: "INR",
        name: "Happy Faces",
        description: "Test Transaction",
        order_id: response.data.id, // Pass the order ID obtained from the response of createOrder()
        handler: async function (response) {
          const donationData={
            donorId: userDetails.donorId,
            orpId: selectedOrphanage.orpId,
            orphanageName: selectedOrphanage.orphanageName,
            amount: donationAmount,
            status: "SUCCESS",
            dateTime: currentDateTime,
            transactionId: response.razorpay_payment_id
          }
          try{
              const response=await axios.post(`${API_BASE_URL}/donor/donationData`,donationData);
              const status = response.status;
              console.log(status);
          }catch(error){
            console.log(error);
          }
          console.log(donationData);
          // alert(response.razorpay_payment_id);
          // alert(response.razorpay_order_id);
          // alert(response.razorpay_signature);
        },
        theme:{
          color: '#ff5722',
        }
      };

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed",async function (response) {
        
        const donationData={
          donorId: userDetails.donorId,
          orpId: selectedOrphanage.orpId,
          orphanageName: selectedOrphanage.orphanageName,
          amount: donationAmount,
          status: "FAIL",
          dateTime: currentDateTime,
          transactionId: "-",
        }
        try{
            const response=await axios.post(`${API_BASE_URL}/donor/donationData`,donationData);
            const status = response.status;
            console.log(status);
        }catch(error){
          console.log(error);
        }
        // alert(response.error.code);
        // alert(response.error.description);
        // alert(response.error.source);
        // alert(response.error.step);
        // alert(response.error.reason);
        // alert(response.error.metadata.order_id);
        // alert(response.error.metadata.payment_id);
      });

      razorpay.open();

      // Close the donation pop-up
      onClose();

      // Reset donation amount
      setDonationAmount("");
    } catch (error) {
      // Handle errors
      console.error("Error creating order:", error);
      alert("Error creating order. Please try again.");
    }
  };

  return (
    <div className="razorpay-popup">
      <h3>Donate Money</h3>
      <div className="input-container">
        <label htmlFor="donationAmount">Amount you would like to Donate:</label>
        <input
          type="number"
          id="donationAmount"
          value={donationAmount}
          onChange={handleDonationInputChange}
          placeholder="Enter amount"
        />
      </div>
      <button onClick={handleDonate}>Donate</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default RazorPay;
