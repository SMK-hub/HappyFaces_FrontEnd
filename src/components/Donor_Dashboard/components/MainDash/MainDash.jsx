import React, { useEffect, useState } from "react";
import "./MainDash.css";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";
import { useUser } from '../../../../UserContext';


 
const MainDash = () => {
  
  const{userDetails} = useUser();
  const [transactions,setTransaction] = useState();
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [totalTransactionAmount,setTotalTransactionAmount] = useState(0);
  const [noOfRequirement,setNoOfRequirement] = useState(0);
  const [noOfEvents, setNoOfEvents] = useState(0);
  // Define initial data for each card with different messages
  const initialData = [
    { title: "Total Contributions", value: noOfRequirement, message: "Thank you for your generous contributions!" },
    { title: "Events Registered", value: noOfEvents, message: "Great job attending our events! Keep it up!" },
    { title: "Total Payment Donated", value: "Rs."+totalTransactionAmount, message: "Your donations are making a big impact. Thank you!" }
    // Add more cards as needed
  ];
 
  
 
  useEffect(() => {
    const getTransactionData = async()=>{
      try{
        const response = await axios.get(`${API_BASE_URL}/donor/DonationList/${userDetails.donorId}`);
        setTransaction(response.data.sort((a, b) => new Date(a.datetime) - new Date(b.datetime)).slice(0,5));
        const totalAmount = response.data.reduce((total, transaction) => total + parseFloat(transaction.amount),0);
        setTotalTransactionAmount(totalAmount.toString());
        const responseReq = await axios.get(`${API_BASE_URL}/donor/${userDetails.donorId}/DonationRequirement`);
        let requirementCount = responseReq.data.length;
        setNoOfRequirement(requirementCount);
        const responseEve = await axios.get(`${API_BASE_URL}/donor/RegisteredEvents/${userDetails.donorId}`);
        let eventCount = responseEve.data.length;
        setNoOfEvents(eventCount);
        
      }catch(error){
        console.log(error);
      }
    }
    getTransactionData();
  }, []);
 
  const handleCardClick = (index) => {
    const { message } = initialData[index];
    setModalMessage(message);
    setShowModal(true);
    setSelectedCard(index);
  };
 
  const closeModal = () => {
    setShowModal(false);
    setSelectedCard(null);
  };
 
  return (
    <div className="MainDash">
      <h1 className="dashboard-heading">Donor's Dashboard</h1>
      <div className="MainDashcard-container">
        {initialData.map((data, index) => (
          <div key={index} className="MainDashcard" onClick={() => handleCardClick(index)}>
            <h2>{data.title}</h2>
            <p>{data.value}</p>
          </div>
        ))}
      </div>
      {showModal && (
        <div className={`modal ${selectedCard != null ? "modal-active" : ""}`}>
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
      <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>Orphanage Name</th>
            <th>Transaction ID</th>
            <th>Date</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.orphanageName}</td>
              <td>{transaction.transactionId}</td>
              <td>{transaction.dateTime}</td>
              <td>{transaction.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
};
 
export default MainDash;
 