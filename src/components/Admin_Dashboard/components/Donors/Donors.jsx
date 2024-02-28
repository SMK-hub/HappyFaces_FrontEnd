/* eslint-disable no-unused-vars */
// OrphDash.js
import React, { useState, useEffect } from "react";
import "./Donors.css";
// index.js or App.js
import '@fortawesome/fontawesome-free/css/all.css';
// import ImagePopup from "./ImagePopup";
import axios from "axios";
import { API_BASE_URL } from "../../../../config";

const Donors = () => {
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [selectedName, setSelectedName] = useState("All");
  const [selectedPayment, setSelectedPayment] = useState(null);
  // const [selectedStatus, setSelectedStatus] = useState("All");
  const [paymentsData, setPaymentsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // const uniqueLocations = ["All", ...new Set(paymentsData.map((event) => event.location))];
  // const uniqueStatus = ["All", ...new Set(paymentsData.map((event) => event.stats))];

  const uniqueName = ["All", ...new Set(paymentsData.map((donor) => donor.name))];

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/donorList`);
      const data = response.data.map(donor => ({
        name: donor.name,
        contact: donor.contact,
        email: donor.email,

      }));
      setPaymentsData(data);
    } catch (error) {
      console.error("Error fetching donations", error);
    }
  };


  const handleNameChange = (e) => {
    setSelectedName(e.target.value);
    setCurrentPage(1);
  };

  const openModal = (payment) => {
    setSelectedPayment(payment);
  };

  const closeModal = () => {
    setSelectedPayment(null);
  };

  const openImagePopup = () => {
    setImagePopupVisible(true);
  };

  const closeImagePopup = () => {
    setImagePopupVisible(false);
  };

  const filteredEvents = paymentsData.filter((payment) => {
    return (
      (selectedName === "All" || payment.name === selectedName)
    );
  });

  const totalEntries = filteredEvents.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredEvents.slice(indexOfFirstEntry, indexOfLastEntry);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="OrphDash">
        <h2>Donors</h2>
        <label htmlFor="locationFilter">Search by Name</label>
        <select id="locationFilter" value={selectedName} onChange={handleNameChange}>
          {uniqueName.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
        </select>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>Location</th> */}
              <th>Contact</th>
              <th>Email</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((donor, index) => (
              <tr key={index}>
                <td>{donor.name}</td>
                {/* <td>{event.location}</td> */}
                <td>{donor.contact}</td>
                <td>{donor.email}</td>
                <td>
                  <button onClick={() => openModal(donor)} className="smallButton">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button key={page} onClick={() => handlePageChange(page)} className={`pagination-button ${currentPage === page ? 'active' : ''}`}>
              {page}
            </button>
          ))}
          <p>Page {currentPage} of {totalPages}</p>
        </div>

        {/* Modal */}
        {selectedPayment && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h3>{selectedPayment.name}</h3>
              <p className="field-name">Name<span> {selectedPayment.name}</span></p>
              <p className="field-name">Contact<span> {selectedPayment.contact}</span></p>
              {/* <p className="field-name">Location<span> {selectedEvent.location}</span></p> */}
              <p className="field-name">Email<span> {selectedPayment.email}</span></p>
              {/* <p className="field-name">Time<span> {selectedPayment.time}</span></p> */}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Donors;