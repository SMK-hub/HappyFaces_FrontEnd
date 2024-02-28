import React, { useEffect, useState } from 'react';
import './Events.css';
import axios from 'axios';
import { useUser } from '../../../../UserContext';
import { LoadingButton } from '@mui/lab';
import { API_BASE_URL } from '../../../../config';

const EventTable = () => {
  const [interestedPerson, setInterestedPerson] = useState();
  const [cancelEventId, setCancelEventId] = useState();
  const [render, setRender] = useState(false);
  const { userDetails } = useUser();
  const [cancelling, setCancelling] = useState(false);
  const [cancelRegistrationVisible, setCancelRegistrationVisible] = useState(false);
  const [cancellationSuccessVisible, setCancellationSuccessVisible] = useState(false);
  const [cancelIndex, setCancelIndex] = useState(null);

  useEffect(() => {
    const participatedEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/donor/RegisteredEvents/${userDetails.donorId}`);
        const status = response.status;
        const responseWithEventData = await Promise.all(
          response.data.map(async (interestedPerson) => {
            const eventData = await fetchEventData(interestedPerson.eventId);
            return {
              ...interestedPerson,
              eventData: eventData,
            };
          })
        );
        setInterestedPerson(responseWithEventData);
      } catch (error) {
        console.log(error);
      }
    };
    participatedEvents();
  }, [render]);

  const fetchEventData = async (eventId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/donor/Event/${eventId}`);
      const status = response.status;

      if (status === 200) {
        const data = response.data;
        const orphanageDetails = await fetchOrphanageDetails(data.orpId);

        return {
          ...response.data,
          OrphanageData: orphanageDetails,
        };
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const fetchOrphanageDetails = async (orpId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/donor/${orpId}/OrphanageDetails`);
      const status = response.status;
      if (status === 200) {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const handleCancelEvent = (eventId) => {
    setCancelEventId(eventId);
    setCancelRegistrationVisible(true);
  };

  const handleConfirmCancel = async () => {
    try {
      setCancelling(true);
      console.log(interestedPerson);
      const response = await axios.post(`${API_BASE_URL}/donor/${userDetails.donorId}/cancelEventRegister/${cancelEventId}`);
      const status = response.status;
      console.log(status);
      if (status === 200) {
        setCancelRegistrationVisible(false);
        setCancellationSuccessVisible(true);
      }
    } catch (error) {
      console.log(error);
      alert(error);
    } finally {
      setRender(!render);
      setCancelling(false);
    }
  };

  const handleCancelCancel = () => {
    setCancelRegistrationVisible(false);
  };

  return (
    <div className='main-event'>
      <h1 className="event-heading">Events</h1>
      <div className="event-container">
        <div style={{ maxHeight: '250px', overflowY: 'auto' }}>
        <table className="event-table">
          <thead>
            <tr>
              <th>Orphanage_Name</th>
              <th>Event_Name</th>
              <th>Description</th>
              <th>Date/Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {interestedPerson?.length > 0 ? (
              interestedPerson.map((event, index) => (
                <tr key={index}>
                  <td>{event.eventData.OrphanageData?.orphanageName}</td>
                  <td>{event.eventData.title}</td>
                  <td>{event.eventData.description}</td>
                  <td>{event.eventData.date} {event.eventData.time}</td>
                  <td>
                    <button className="cancel-event-button" onClick={() => handleCancelEvent(event.eventId)}>
                      Cancel Registration
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center' }}>No Events Registered</td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
      {cancelRegistrationVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>Cancel Registration</h3>
            <p>Are you sure you want to cancel the registration?</p>
            <div className="button-container">
              <LoadingButton onClick={() => handleConfirmCancel()} loading={cancelling} loadingIndicator={<div>Cancelling...</div>}>Yes</LoadingButton>
              <LoadingButton onClick={() => handleCancelCancel()}>No</LoadingButton>
            </div>
          </div>
        </div>
      )}
      {cancellationSuccessVisible && (
        <div className="modal">
          <div className="modal-content">
            <h3>Registration Cancelled Successfully!</h3>
            <button onClick={() => setCancellationSuccessVisible(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventTable;
