import React, { useState, useEffect } from "react";
import "./OrphDash.css";
import '@fortawesome/fontawesome-free/css/all.css';
import ImagePopup from "./ImagePopup";
import { jsPDF } from "jspdf";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import RazorPay from '../Details/RazorPay';
import { useUser } from '../../../../UserContext';
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import { API_BASE_URL } from "../../../../config";
import { Button, message } from "antd";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";

const OrphDash = () => {
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [donationRazorPayVisible, SetdonationRazorPayVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedOrphanage, setSelectedOrphanage] = useState();
  const [selectedImage, setSelectedImage] = useState(null); // Define selectedImage state
  const [selectedRequirement, setSelectedRequirement] = useState("All");
  const [eventDetailsVisible, setEventDetailsVisible] = useState(false);
  const [registrationSuccessVisible, setRegistrationSuccessVisible] = useState(false);
  const [donationPopupVisible, setDonationPopupVisible] = useState(false);
  const [donationDescriptionVisible, setDonationDescriptionVisible] = useState(false);
  const [viewImagesPopupVisible, setViewImagesPopupVisible] = useState(false);
  const [donationDescription, setDonationDescription] = useState('');
  const [RegisteringProcess, setRegisteringProcess] = useState(false);

  const { userDetails } = useUser();

  const [orphanagesData, setOrphanagesData] = useState([]);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/donor/OrphanageDetails`);
        const res = response.data;
        console.log(res);
        setOrphanagesData(res);
      } catch (error) {
        console.log(error);
      }
    }
    fetch();
  }, []);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleRequirementChange = (e) => {
    setSelectedRequirement(e.target.value);
  };

  const openModal = async (orphanage) => {
    const [orphanageWithImageData, orphanagaeWithEventData, orphanageWithAllEventData] = await Promise.all([
      fetchImageData(orphanage.orpId),
      fetchEventData(orphanage.orpId),
      fetchAllEventData(orphanage.orpId),
    ]);
    // const addviewCount = await axios.put(`${API_BASE_URL}/donor/addViewCount/${orphanage.orpId}`);
    const eventParticipant = await Promise.all(
      orphanagaeWithEventData.map(async (event) => {
        const participant = await fetchParticipatedDonorsId(event.id);
        return {
          ...event,
          participantData: participant,
        }
      })
    );
    setSelectedOrphanage({
      ...orphanage,
      imageData: orphanageWithImageData,
      eventData: eventParticipant,
      allEventData: orphanageWithAllEventData
    });
  };

  const fetchAllEventData = async (orpId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/donor/VerifiedEvents/${orpId}`);
      const filteredData = response.data.filter(
        (event) => event.eventStatus === 'PLANNED' || event.eventStatus === 'ONGOING'
      );
      console.log(filteredData);
      return filteredData;

    } catch (error) {
      console.log(error);
    }
  };

  const fetchParticipatedDonorsId = async (eventId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/donor/participatedDonorsId/${eventId}`);
      return response.data;
    } catch (error) {
      alert(error);
    }
  };

  const fetchImageData = async (orpId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orphanage/${orpId}/orphanageDetails/viewImages`);
      return response.data;

    } catch (error) {
      console.log(error);
    }
  };

  const fetchEventData = async (orpId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/donor/VerifiedEvents/${orpId}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const closeModal = () => {
    setSelectedOrphanage();
    setEventDetailsVisible(false);
  };

  const openImagePopup = (image) => {
    setSelectedImage(image);
    setImagePopupVisible(true);
  };

  const closeImagePopup = () => {
    setImagePopupVisible(false);
  };
  
  const openViewImagesPopup = () => {
    setViewImagesPopupVisible(true);
  };

  const closeViewImagesPopup = () => {
    setViewImagesPopupVisible(false);
  };

  const downloadCertificates = async (orpId, orpName) => {
    if(window.confirm(`Do you want to download ${orpName}'s Certificate ?`))
    {
      try {
      const response = await axios.get(`${API_BASE_URL}/orphanage/getCertificate/${orpId}`, { responseType: 'blob' });
      if (response.status !== 200) {
        alert(`Error downloading certificates: ${response.status}`);
        return;
      }
      const blob = new Blob([response.data], { type: 'application/pdf' });
      if (blob.size === 0) {
        alert('The file is empty.');
        return;
      }
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${orpName}_certificates.pdf`);
      link.click();
      [link, url].forEach(window.URL.revokeObjectURL);
    } catch (error) {
      console.error("Error downloading certificates:", error);
    }
    }
  };

  const fetchOrphanageCertificate = async (orpId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orphanage/getCertificate/${orpId}`, {
        responseType: 'arraybuffer'
      });
  
      const status = response.status;
  
      if (status === 200) {
        const blob = new Blob([response.data]);
        const file = new File([blob], 'certificate.pdf', { type: 'application/pdf' });
  
        // Convert File object into a URL
        const fileUrl = URL.createObjectURL(file);
  
        return fileUrl;
      }
    } catch (error) {
      console.log("Error in Fetching Certificate:", error);
    }
  }
  const [openPdfDialog, setOpenPdfDialog] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Initial state is false
  const viewCertificates = async(orpId) => {
    const certificateUrl = await fetchOrphanageCertificate(orpId);
    setCertificateUrl(certificateUrl);
    setOpenPdfDialog(true);
  };
  const handleClosePdfDialog = () => {
    setOpenPdfDialog(false);
    setCertificateUrl(''); // Clear the certificate URL
  };

  const handleEventsButtonClick = () => {
    setEventDetailsVisible(true);
  };

  const handleEventDetailsClose = () => {
    setEventDetailsVisible(false);
  };

  const handleRegisterEvent = async (eventId) => {
    if(window.confirm(`Do you want to Register in this Event?`)){
      try {
      setRegisteringProcess(true);
      const response = await axios.post(`${API_BASE_URL}/donor/${userDetails?.donorId}/eventRegister/${eventId}`);
      console.log("Event registered");

      setRegistrationSuccessVisible(true);
    } catch (error) {
      console.log(error);
      alert(error);
    }
    finally {
      setRegisteringProcess(false);
    }
  };
    }
    

  const handleDonateButtonClick = () => {
    setDonationPopupVisible(true);
  };

  const handleDonationOption = (option) => {
    console.log(`Donation option selected: ${option}`);
    if (option === 'Requirements') {
      setDonationDescriptionVisible(true);
    } else if (option === 'Others') {
      // Handle the case for donating money
    }
  };

  const handleRegistrationSuccessClose = () => {
    setRegistrationSuccessVisible(false);
  };

  const handledonationRazorPayVisible = () => {
    SetdonationRazorPayVisible(!donationRazorPayVisible);
  }

  const handleBackButtonClick = () => {
    setSelectedOrphanage({
      orphanage: null,
      events: [],
    });
  };

  const handleDonationDescriptionClose = () => {
    setDonationDescriptionVisible(false);
  };

  const handleDonationDescriptionSave = () => {
    const data = {
      orpId: selectedOrphanage.orpId,
      donorId: userDetails.donorId,
      description: donationDescription
    };
    saveDonationData(data);
    console.log("Donation description saved");
    setDonationDescription('');
    setDonationDescriptionVisible(false);
  };

  const handleThumbnailClick = (index) => {
    // Handle thumbnail click, update main image with selected index
  };

  const filteredOrphanages = orphanagesData.filter((orphanage) => {
    return (
      (selectedLocation === "All" || orphanage.location === selectedLocation) &&
      (selectedRequirement === "All" || orphanage.requirements === selectedRequirement)
    );
  });

  const pictureUrl = (image) => {
    return `data:image/jpeg;base64,${image}`;
  };

  const saveDonationData = async (data) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/donor/save/DonationRequirement`, data);
      message.success(`Great news! Your interest in donating to ${selectedOrphanage.orphanageName} has been successfully sent.`);
    } catch (error) {
      console.error('Error saving donation data:', error);
    }
  };

  return (
    <div>
      <div className="OrphDash" >
        <h2>Orphanages</h2>
        <div className="OrphDash-inside">
          {/* Filter options */}
        </div>

        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Orphanage Name</th>
              <th>Address</th>
              <th>Contact</th>
              <th>Details</th>
              <th>Requirement(Priority)</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrphanages?.map((orphanage, index) => (
              <tr key={index}>
                <td>{orphanage?.orphanageName}</td>
                <td>{orphanage?.address.house_no}, {orphanage.address.street}, {orphanage.address.city} - {orphanage.address.postalCode}, {orphanage.address.state}, {orphanage.address.country}</td>
                <td>{orphanage?.contact}</td>
                <td>
                  <button onClick={() => openModal(orphanage)}>Details</button>
                </td>
                <td>{orphanage.requirements?.need}({orphanage.requirements?.priority})</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Modal */}
        {selectedOrphanage && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={()=>closeModal()}>&times;</span>
              <h3>{selectedOrphanage.orphanageName}</h3>
              <table>
                <tbody>
                  <tr>
                    <td className="field-name">Orphanage Name:</td>
                    <td>{selectedOrphanage.orphanageName}</td>
                  </tr>
                  <tr>
                    <td className="field-name">Director:</td>
                    <td>{selectedOrphanage.directorName}</td>
                  </tr>
                  <tr>
                    <td className="field-name">Location:</td>
                    <td>
                      {selectedOrphanage.address.house_no}, {selectedOrphanage.address.street}, {selectedOrphanage.address.city} - {selectedOrphanage.address.postalCode}, {selectedOrphanage.address.state}, {selectedOrphanage.address.country}
                    </td>
                  </tr>
                  <tr>
                    <td className="field-name">Email:</td>
                    <td>{selectedOrphanage.orphanageEmail}</td>
                  </tr>
                  <tr>
                    <td className="field-name">Description:</td>
                    <td>{selectedOrphanage.description}</td>
                  </tr>
                  <tr>
                    <td className="field-name">Website:</td>
                    <td>{selectedOrphanage.website}</td>
                  </tr>
                  <tr>
                    <td className="field-name">Certificates:</td>
                    <td>
                      <button onClick={() => downloadCertificates(selectedOrphanage.orpId, selectedOrphanage.orphanageName)}>Download</button>
                      <button onClick={()=>viewCertificates(selectedOrphanage.orpId)}>View Certificates</button>
                    </td>
                  </tr>
                  <tr>
                    <td className="field-name">View Images:</td>
                    <td>
                      <button onClick={()=>openViewImagesPopup()}>View Images</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              {/* Add "Events" and "Donate" buttons */}
              <div className="button-container">
                <button onClick={()=>handleEventsButtonClick()}>Events</button>
                <button onClick={()=>handleDonateButtonClick()}>Donate</button>
              </div>
            </div>
          </div>
        )}
 
        {imagePopupVisible && (
          <ImagePopup
            images={selectedOrphanage.orphanage ? selectedOrphanage.orphanage.images : []}
            onClose={()=>closeImagePopup()}
            onBack={()=>handleBackButtonClick()}
          />
        )}


        {/*View Certificate*/}
      <Dialog
        open={openPdfDialog}
        onClose={()=>handleClosePdfDialog()}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>View Certificate</DialogTitle>
        <DialogContent>
          {certificateUrl ? (<>
        {isLoading ? (
          <CircularProgress sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
        ) : (
          <iframe
            title="certificate"
            src={certificateUrl}
            width="100%"
            height="600"
          />
        )}
      </>
    ): (<div>No Certificate to view</div>)}
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleClosePdfDialog()}>Close</Button>
        </DialogActions>
      </Dialog>

        {/* Event Details Card Box */}
        {eventDetailsVisible && selectedOrphanage && (
          <div className="modal">
            <div className="event-details-content">
              <span className="close" onClick={()=>handleEventDetailsClose()}>&times;</span>
              <h3>{selectedOrphanage.orphanageName} - Event Details</h3>
 
              {/* Display Events in a Table */}
              <table>
                <thead>
                  <tr>
                    <th>Orphanage Name</th>
                    <th>Event Name</th>
                    <th>Event Description</th>
                    <th>Date/Time</th>
                    <th>Register Event</th>
                  </tr>
                </thead>
                <tbody>
                {console.log(selectedOrphanage.allEventData)}
                  {selectedOrphanage.allEventData?.map((event, index) => (
                   
                    <tr key={index}>
                      <td>{selectedOrphanage.orphanageName}</td>
                      <td>{event.title}</td>
                      <td>{event.description}</td>
                      <td>{event.date} {event.time}</td>
                      <td>
                        {console.log(selectedOrphanage.eventData[index].participantData)}
                        {console.log(selectedOrphanage.eventData[index])}
                      <LoadingButton
                          disabled={selectedOrphanage.eventData[index].participantData?.includes(userDetails.donorId)}  
                          loading={RegisteringProcess}
                         
                          loadingIndicator={<div>Registering...</div>}
                          onClick={() => handleRegisterEvent(event.id)}
                          style={{
                            cursor: selectedOrphanage.eventData[index].participantData ? (selectedOrphanage.eventData[index].participantData.includes(userDetails.donorId) ? 'not-allowed' : 'pointer') : 'pointer',
                            backgroundColor: selectedOrphanage.eventData[index].participantData ? (selectedOrphanage.eventData[index].participantData.includes(userDetails.donorId) ? 'grey' : 'initial') : 'initial',
                          }}
                          > Register Event</LoadingButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
 
              <p>"Unlock a world of inspiration at our upcoming event. Join us for an enriching experience. Register now to secure your spot, connect with like-minded individuals, and contribute to a meaningful cause. Don't miss out on this transformative event!"</p>
              <button className="back-button" onClick={()=>handleEventDetailsClose()}>Back</button>
            </div>
          </div>
        )}
 
        {/* Registration Success Pop-up */}
        {registrationSuccessVisible && (
          <div className="modal">
            <div className="event-details-content registration-success-popup">
              <span className="close" onClick={()=>handleRegistrationSuccessClose()}>&times;</span>
              <h3>Thank you for successful registration!</h3>
              {/* <button className="close-button" onClick={()=>handleRegistrationSuccessClose()}>X</button> */}
            </div>
          </div>
        )}
 
        {/* Donation Pop-up */}
        {donationPopupVisible && selectedOrphanage&& (
          <div className="modal">
            <div className="donation-popup-content">
              <span className="close" onClick={() => setDonationPopupVisible(false)}>&times;</span>
              <h3>Donate to {selectedOrphanage.orphanageName}</h3>
              <p>Choose a donation option:</p>
              <div className="button-container">
                <button onClick={() => handleDonationOption('Requirements')}>Donate Requirements</button>
                <button onClick={() => handledonationRazorPayVisible()}>Donate Money</button>
              </div>
              {/* Additional close button inside the pop-up content */}
              <button className="close-button-inside" onClick={() => setDonationPopupVisible(false)}>Close</button>
            </div>
          </div>
        )}
 
        {/* Donation Description Pop-up */}
        {donationDescriptionVisible && (
      <div className="modal donation-description-modal">
        <div className="donation-description-popup-content">
          <span className="close" onClick={()=>handleDonationDescriptionClose()}>&times;</span>
          <h3>Donate Requirements - {selectedOrphanage.orphanageName}</h3>
          <p>Enter a description of the requirements you wish to donate:</p>
          <textarea
            placeholder="Description"
            rows="4"
            cols="50"
            value={donationDescription}
            onChange={(e) => setDonationDescription(e.target.value)}
          ></textarea>
          <div className="button-container">
            <button onClick={()=>handleDonationDescriptionSave()}>Notify Orphanage</button>
            <button onClick={() => { handleDonationDescriptionClose(); setDonationDescription(''); }}>Close</button>
          </div>
        </div>
      </div>
    )}
 
{donationRazorPayVisible && (
          <div className="modal donation-description-modal">
            <div className="donation-description-popup-content">
              <RazorPay onClose={()=>handledonationRazorPayVisible()} selectedOrphanage={selectedOrphanage}/>
            </div>
          </div>
        )}
 
 {/* Other JSX content */}
        {/* View Images Pop-up */}
        {viewImagesPopupVisible && selectedOrphanage && (
          <div className="modal" onClick={()=>closeViewImagesPopup()}>
            <div className="view-images-content" style={{ maxHeight: '80vh', overflowY: 'auto' }}> {/* Added style */}
              <span className="close">&times;</span>
              <h3>{selectedOrphanage.orphanageName} Images</h3>
              <div className="image-container" style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)', padding: '10px', borderRadius: '5px' }}>
                {selectedOrphanage.imageData && selectedOrphanage.imageData.length > 0 ? (
                  <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
                    {selectedOrphanage.imageData.map((item, index) => (
                      <ImageListItem key={index}>
                        <img
                          style={{ minHeight: '200px', maxHeight: '200px', width: '150px', objectFit: 'cover', cursor: 'pointer' }}
                          src={`data:image/jpeg;base64,${item.image}`}
                          onClick={() => openImagePopup(item.image)}
                          alt={`Image ${index}`}
                        />
                      </ImageListItem>
                    ))}
                  </ImageList>
                ) : (
                  <p style={{ textAlign: 'center', color: '#333', marginTop: '20px', alignItems: 'center' }}>No Images to Display</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Image Popup */}
        {imagePopupVisible && selectedImage && (
          <div className="modal" onClick={()=>closeImagePopup()}>
            <div className="image-popup-content">
              <span className="close">&times;</span>
              <img src={`data:image/jpeg;base64,${selectedImage}`} alt="Zoomed Image" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
 
export default OrphDash;
