/* eslint-disable no-unused-vars */
// OrphDash.js
import React, { useState, useEffect } from "react";
import "./EvenDash.css";
import '@fortawesome/fontawesome-free/css/all.css';
// import ImagePopup from "./ImagePopup";
import { jsPDF } from "jspdf";
import axios from "axios";
import { Button, message } from "antd";
import { API_BASE_URL } from "../../../../config";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";

const EvenDash = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [eventsData, setEventsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [interestedDonors, setInterestedDonors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showInterestedDonorsModal, setShowInterestedDonorsModal] = useState(false);

  const entriesPerPage = 5;
  const uniqueStatus = ["All", ...new Set(eventsData.map((event) => event.status))];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/eventList`);
      const data = await Promise.all(response.data.map(async(event) => {
        const interestedDonors = await fetchInterestedDonors(event.id);
        return {
          ...event,
          name: event.title,
          desc: event.description,
          state: event.eventStatus,
          date: event.date,
          time: event.time,
          status: event.verificationStatus,
          interestedDonors: interestedDonors,
        };
      }));

      // Sort events by date in descending order
      data.sort((a, b) => new Date(b.date) - new Date(a.date));

      setEventsData(data);
    } catch (error) {
      console.error("Error fetching events", error);
    }
  };

  const fetchInterestedDonors = async (eventId) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/admin/event/interestedPerson/${eventId}`);
      return response.data;
    } catch (error) {
      setError(error.message || 'An error occurred while fetching data.');
    } finally {
      setIsLoading(false);
    }
  };

  const updateEventStatus = async (eventId, status) => {
    try {
      await axios.post(`http://localhost:8079/admin/verifyEventDetails/${eventId}/${status}`);
      fetchEvents();
      console.log("Event status updated ");
    } catch(error) {
      console.error("Error updating the event status",error);
      throw error;
    }
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const openModal = (event) => {
    setSelectedEvent(event);
  };

  const closeModal = () => {
    setSelectedEvent(null);
  };

  const downloadCertificates = (orphanage) => {
    const pdf = new jsPDF();
    pdf.text(`Certificates for ${orphanage.name}`, 20, 20);
    pdf.save(`${orphanage.name}_certificates.pdf`);
  };

  const showConfirmation = async (action, eventId) => {
    const confirmationMessage = `Are you sure to ${action === 'Decline' ? 'Decline' : 'Accept'} this?`;
    if (window.confirm(confirmationMessage)) {
      try {
        if (action === 'Decline') {
          await updateEventStatus(eventId, 'NOT_VERIFIED');
        } else {
          await updateEventStatus(eventId, 'VERIFIED');
        }
        fetchEvents();
      } catch(error) {
        console.error("Error in updating the status",error);
      }
    } else {
      if(action === 'Decline') {
        message.info('Decline action is not working');
      } else {
        message.info('Accept action is not working');
      }
    }
  }; 
  
  const InterestedDonorsPopup = ({ donors, onClose }) => {
    return (
      <div className="popup">
        <div className="popup-content">
          <span className="close" onClick={onClose}>&times;</span>
          <h2>Interested Donors</h2>
          <ul>
            {donors.map((donor, index) => (
              <li key={index}>
                <strong>Name:</strong> {donor.name} <br />
                <strong>Email:</strong> {donor.email} <br />
                <strong>Contact:</strong> {donor.contactNumber}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

  const filteredEvents = eventsData.filter((event) => {
    return (
      (selectedStatus === "All" || event.status === selectedStatus)
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
        <h2>Orphanages</h2>
        
        <div className="selection">
          <label htmlFor="statusFilter">Search by Status</label>
          <select id="statusFilter" value={selectedStatus} onChange={handleStatusChange}>
            {uniqueStatus.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>Event</th>
              <th>Description</th>
              <th>Date</th>
              <th>Time</th>
              <th>Details</th>
              <th>Status</th>
              <th>Requests</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((event, index) => (
              <tr key={index}>
                <td>{event.name}</td>
                <td>{event.desc}</td>
                <td>{event.date}</td>
                <td>{event.time}</td>
                <td>
                  <button onClick={() => openModal(event)} className="smallButton">Details</button>
                </td>
                <td>{event.status}</td>
                <td className="requests">
                  {event.status === "VERIFIED" && (
                    <button onClick={() => showConfirmation("Decline", event.id)} style={{ fontSize: "10px", padding: "5px" }}>Decline</button>
                  )}
                  {event.status === "NOT_VERIFIED" && (
                    <button onClick={() => showConfirmation("Accept", event.id)} style={{ fontSize: "10px",padding:"5px"}}>Accept</button>
                  )}
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

        {selectedEvent && (
          <div className="modal" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', backdropFilter: 'blur(5px)' }}>
            <div className="modal-content" style={{ background: '#fff', border: '1px solid #ddd', padding: '20px' }}>
              <span className="close" onClick={closeModal} style={{ position: 'absolute', top: '10px', right: '10px', cursor: 'pointer' }}>
                &times;
              </span>
              <h3>{selectedEvent.name}</h3>
              <p className="field-name" style={{ margin: '10px 0' }}>Description:<span> {selectedEvent.desc}</span></p>
              <p className="field-name" style={{ margin: '10px 0' }}>Date:<span> {selectedEvent.date}</span></p>
              <p className="field-name" style={{ margin: '10px 0' }}>Time:<span> {selectedEvent.time}</span></p>
              <p className="field-name" style={{ margin: '10px 0' }}>Current Status:<span> {selectedEvent.state}</span></p>
              <p className="field-name" style={{ margin: '10px 0' }}>Interested People:
                <Button 
                  type="primary" 
                  onClick={() => setShowInterestedDonorsModal(true)} 
                  disabled={isLoading || selectedEvent?.interestedDonors?.length === 0}
                  style={{ backgroundColor: '#f0f0f0', color: '#333', border: 'none' }}
                >
                  {isLoading ? 'Loading...' : 'View Interested Donors' }
                </Button>
                {error && <p className="error-message">{error}</p>}
              </p>
              {selectedEvent?.interestedDonors?.length === 0 && (
                <p className="no-data-message">No one has registered for this event yet.</p>
              )}
            </div>
          </div>
        )}

        {showInterestedDonorsModal && (
          <Dialog
            open={showInterestedDonorsModal}
            onClose={() => setShowInterestedDonorsModal(false)}
            style={{
              overflowY: 'auto',
              maxHeight: '50vh',
              borderRadius: '5px', // Added inline style for rounded corners
              boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', // Added inline style for subtle shadow
            }}        
          >
            <DialogTitle>Interested Donors</DialogTitle>
            <DialogContent>
              <ul style={{ listStyle: 'none', padding: '0' }}>
                {selectedEvent?.interestedDonors?.map((donor) => (
                  <li key={donor.id} style={{ margin: '10px 0', padding: '10px', borderBottom: '1px solid #ddd' }}>
                    {donor.name} ({donor.email}) - {donor.contactNumber}
                  </li>
                ))}
              </ul>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  );
};

export default EvenDash;
