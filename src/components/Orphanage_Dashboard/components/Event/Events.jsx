import React, { useEffect, useState } from 'react';
import './Events.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { message } from 'antd';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
import { useUser } from '../../../../UserContext';
import EditIcon from '@mui/icons-material/ModeEdit'; // Import Edit icon
import ClearIcon from '@mui/icons-material/Clear'; // Import Clear icon
import VisibilityIcon from '@mui/icons-material/Visibility'; // Import Visibility icon
import Tooltip from '@mui/material/Tooltip'; // Import Tooltip component
 
const EventTable = () => {
  const [events, setEvents] = useState();
  const { userDetails } = useUser();
  const [refresh, setRefresh] = useState(false);
  const [view, setView] = useState(false); // Define view state
  useEffect(() => {
    const fetchPlannedEvents = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/orphanage/plannedEvents/${userDetails.orpId}`);
        const status = response.status;
        if (status === 200) {
          setEvents(response.data);
        }
      } catch (error) {
        message.error(error);
        setEvents([]);
      }
    };
    fetchPlannedEvents();
  }, [refresh]);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState();
  const [interestedPersons, setInterestedPersons] = useState([]);
  const [formData, setFormData] = useState({ title: '', date: '', time: '', description: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;
  const [loading, setLoading] = useState(false);
 
  const handleCancelEvent = async (eventId) => {
    if (window.confirm("Do you want to cancel this event?")) {
      setLoading(true);
      try {
        const response = await axios.post(`${API_BASE_URL}/orphanage/cancelEvent/${eventId}`);
        if (response.status === 200) {
          message.info("Event Cancelled Successfully");
          setRefresh(!refresh);
        }
      } catch (error) {
        message.error(error);
      }
      finally {
        setLoading(false);
      }
    }
  };
 
  const handleEditEvent = (event) => {
    setEdit(true);
    setSelectedEvent(event);
  };
 
  const handleViewEvent = async (event) => {
    setSelectedEvent(event);
    try {
      const response = await axios.get(`${API_BASE_URL}/orphanage/getInterestedPerson/${event.id}`);
      console.log(response.data);
      if (response.status === 200) {
        console.log(response.data);
        setInterestedPersons(response.data);
        setOpen(true);
      }
    } catch (error) {
      console.log(error);
      setInterestedPersons([]);
    }
    setView(true);
  };
 
  const handleCreateNewEvent = () => {
    setOpen(true);
  };
 
  const handleClose = () => {
    setOpen(false);
    setView(false); // Reset view state
    setEdit(false);
    setFormData({
      title: '',
      date: '',
      time: '',
      description: ''
    });
    setInterestedPersons([]);
  };
 
  const handleSubmitEditEvent = async (eventId) => {
    const editEvent = {
      title: formData.title,
      date: formData.date,
      time: formData.time,
      description: formData.description,
      orpId: userDetails.orpId,
    };
    try {
      const response = await axios.put(`${API_BASE_URL}/orphanage/editEvents/${eventId}`, editEvent);
      const status = response.status;
      if (status === 200) {
        message.info(response.data);
      } else {
        message.error(response.data);
      }
    } catch (error) {
      message.error(error);
    } finally {
      setEdit(false);
      setFormData({
        title: '',
        date: '',
        time: '',
        description: ''
      });
    }
  };
 
  const handleSubmit = async () => {
    const newEvent = {
      title: formData.title,
      date: formData.date,
      time: formData.time,
      description: formData.description,
      orpId: userDetails.orpId,
    };
    try {
      const response = await axios.post(`${API_BASE_URL}/orphanage/createEvent`, newEvent);
      const status = response.status;
      if (status === 200) {
        message.info(response.data);
        setRefresh(!refresh);
      } else {
        message.info(response.data);
      }
    } catch (error) {
      message.error(error);
    }
    setOpen(false);
    setFormData({
      title: '',
      date: '',
      time: '',
      description: ''
    });
  };
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
 
  // Logic for pagination
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events?.slice(indexOfFirstEvent, indexOfLastEvent);
 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
 
  return (
    <div className='main-events'>
      <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: '2em', justifyContent: 'center', justifyItems: 'center' }}>EVENTS</h1>
      <div className="eventContainer">
        {events && events.length > 0 ? (
          <table className="event-table">
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Description</th>
                <th>Verification Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents?.map((event, index) => (
                <tr key={index}>
                  <td>{event?.title}</td>
                  <td>{event?.date}</td>
                  <td>{event?.time}</td>
                  <td>{event?.description}</td>
                  <td>{event?.verificationStatus}</td>
                  <td>
                    <Tooltip title="Edit Event">
                      <EditIcon className="edit-icon" onClick={() => handleEditEvent(event)} />
                    </Tooltip>
                    <Tooltip title="View Event">
                      <VisibilityIcon className="view-icon" onClick={() => handleViewEvent(event)} />
                    </Tooltip>
                    <Tooltip title="Cancel Event">
                      <ClearIcon className="cancel-icon" onClick={() => handleCancelEvent(event.id)} />
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
        <p><center>No Events Created</center></p>
        )}
 
        <div className="button-container">
          <button className="new-event-button" onClick={handleCreateNewEvent}>
            Create New Event
          </button>
        </div>
 
        {/*New Event*/}
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogContent>
            <form className="event-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Event Name:</label>
              <input type="text" id="name" name="title" value={formData.title} onChange={handleChange} required />
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" name="date" value={formData.date} onChange={handleChange} required />
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" name="time" value={formData.time} onChange={handleChange} required />
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" value={formData.description} onChange={handleChange} required />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleSubmit}>Create</Button>
          </DialogActions>
        </Dialog>
 
        {/*View Event*/}
        <Dialog open={view} onClose={handleClose}>
          <DialogTitle>{selectedEvent?.title}</DialogTitle>
          <DialogContent>
            <p>Date: {selectedEvent?.date}</p>
            <p>Time: {selectedEvent?.time}</p>
            <p>Description: {selectedEvent?.description}</p>
            <h4>Interested Persons:</h4>
            <ul style={{
              overflowY: 'scroll',
              maxHeight: '200px',
              listStyleType: 'none',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '5px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
            }}>
              {interestedPersons?.length > 0 ? (
                interestedPersons?.map((person, index) => (
                  <li
                    key={index}
                    style={{
                      marginBottom: '10px',
                      padding: '5px',
                      background: '#f9f9f9',
                      borderRadius: '3px',
                    }}
                  >
                    <strong>Name:</strong> {person?.name}, <strong>Email:</strong> {person?.email}, <strong>Contact Number:</strong> {person?.contact}
                  </li>
                ))
              ) : (
                <li style={{ textAlign: 'center' }}>No people have registered their interest yet!</li>
              )}
            </ul>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
 
        {/*Edit Event*/}
        <Dialog open={edit} onClose={handleClose}>
          <DialogTitle>Edit Event</DialogTitle>
          <DialogContent>
            <form className="event-form" onSubmit={handleSubmit}>
              <label htmlFor="name">Event Name:</label>
              <input type="text" id="name" name="title" value={formData?.title} onChange={handleChange} required />
              <label htmlFor="date">Date:</label>
              <input type="date" id="date" name="date" value={formData?.date} onChange={handleChange} required />
              <label htmlFor="time">Time:</label>
              <input type="time" id="time" name="time" value={formData?.time} onChange={handleChange} required />
              <label htmlFor="description">Description:</label>
              <textarea id="description" name="description" value={formData?.description} onChange={handleChange} required />
            </form>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={() => handleSubmitEditEvent(selectedEvent.id)}>Edit</Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* Pagination */}
      <ul className="pagination">
        {Array.from({ length: Math.ceil(events?.length / eventsPerPage) }).map((_, index) => (
          <li key={index} className="page-item" style={{ listStyleType: 'none' }}>
            <button onClick={() => paginate(index + 1)}
              className={`page-link ${index + 1 === currentPage ? 'active' : ''}`}>
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
      {loading && (
        <div className="loading-screen">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};
 
export default EventTable;
