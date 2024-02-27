import React, { useEffect, useState } from "react";
import "./MainDash.css";
import { ConsoleSqlOutlined } from "@ant-design/icons";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";
import { useUser } from '../../../../UserContext';


 
const MainDash = () => {
  // Define initial data for each card with different messages
  const initialData = [
    { title: "Total Contributions", value: 100, message: "Thank you for your generous contributions!" },
    { title: "Events Attended", value: 20, message: "Great job attending our events! Keep it up!" },
    { title: "Total Payment Donated", value: 5000, message: "Your donations are making a big impact. Thank you!" }
    // Add more cards as needed
  ];
 
  const{userDetails} = useUser();
  const [transactions,setTransaction] = useState();
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
 
  useEffect(() => {
    const getTransactionData = async()=>{
      try{
        const response = await axios.get(`${API_BASE_URL}/donor/DonationList/${userDetails.donorId}`);
        console.log(response.data);
        setTransaction(response.data.sort((a, b) => new Date(a.datetime) - new Date(b.datetime)).slice(0,5));
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
  );
};
 
export default MainDash;
 