/* eslint-disable no-unused-vars */
// OrphDash.js
import React, { useState, useEffect } from "react";
import "./OrphDash.css";
import '@fortawesome/fontawesome-free/css/all.css';
import ImagePopup from "./ImagePopup";
import ImageList from '@mui/material/ImageList';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import ImageListItem from '@mui/material/ImageListItem';
import { LoadingButton } from "@mui/lab";
import { jsPDF } from "jspdf";
import axios from "axios";
import {useUser} from '../../../../UserContext'



function srcset(image, size, rows = 1, cols = 1) {
  return {
    src: `${image}?w=${15 * cols}&h=${15 * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${15 * cols}&h=${15 * rows}&fit=crop&auto=format&dpr=2 2x`,
  };
}

const OrphDash = () => {
  const [imagePopupVisible, setImagePopupVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedOrphanage, setSelectedOrphanage] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [viewImagesPopupVisible, setViewImagesPopupVisible] = useState(false);
  const [orphanagesData, setOrphanagesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  const uniqueLocations = ["All", ...new Set(orphanagesData.map((orphanage) => orphanage.location))];
  const uniqueStatus = ["All", ...new Set(orphanagesData.map((orphanage) => orphanage.status))];
  useEffect(() => {
    fetchOrphanages();
    // updateOrphanageStatus();
  }, []);

const{userDetails}= useUser();

  const fetchOrphanages = async () => {
    try {
      const response = await axios.get("http://localhost:8079/admin/orphanageDetailsList");
      const data = response.data.map(orphanage => ({
        ...orphanage,
        name: orphanage.orphanageName,
        location: orphanage.address.city,
        contact: orphanage.contact,
        status: orphanage.verificationStatus,
        director: orphanage.directorName,
        web: orphanage.website,
        email: orphanage.orphanageEmail,  
        desc: orphanage.description,
      }));
      console.log(data);
      setOrphanagesData(data);
    } catch (error) {
      console.error("Error fetching orphanages", error);
    }
  };

  const fetchImageData = async (orpId)=> {
    try{
      const response=await axios.get(`http://localhost:8079/orphanage/${orpId}/orphanageDetails/viewImages`);
      console.log(response.data)
      return response.data;
 
    }catch(error)
    {
      console.log(error);
    }
  }

  const [openPdfDialog, setOpenPdfDialog] = useState(false);
  const [certificateUrl, setCertificateUrl] = useState(null);

  const handleViewCertificate = async (orpId) => {
    const certificateUrl = await fetchOrphanageCertificate(orpId);
    setCertificateUrl(certificateUrl);
    setOpenPdfDialog(true);
  };

  const fetchOrphanageCertificate = async (orpId) => {
    try {
      const response = await axios.get(`http://localhost:8079/admin/getCertificate/${orpId}`, {
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
// Function to handle closing the PDF dialog
const handleClosePdfDialog = () => {
  setOpenPdfDialog(false);
  setCertificateUrl(''); // Clear the certificate URL
};

  const updateOrphanageStatus = async (OrpId,status) => {
    try {
      await axios.post(`http://localhost:8079/admin/verifyOrphanageDetails/${OrpId}/${status}`);
      fetchOrphanages();
      console.log("Orphanage status updated ");
    } catch(error) {
      console.error("Error updating the orphanage status",error);
      throw error;
    }
  };

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const[imageData,setImageData] = useState();
  const openModal = async (orphanage) => {
    const orphanageWithImageData=await fetchImageData(orphanage.orpId);
    setImageData(orphanageWithImageData);
    setSelectedOrphanage(orphanage);
  };

  const closeModal = () => {
    setSelectedOrphanage(null);
  };

  const openImagePopup = () => {
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


  const showConfirmation = async (action, OrpId) => {
    const confirmationMessage = `Are you sure to ${action === 'Decline' ? 'Decline' : 'Accept'} this?`;
    if (window.confirm(confirmationMessage)) {
      try {
        if (action === 'Decline') {
          await updateOrphanageStatus(OrpId, 'NOT_VERIFIED');
        } else {
          await updateOrphanageStatus(OrpId, 'VERIFIED');
        }
        fetchOrphanages();
      } catch(error) {
        console.error("Error in updating the status",error);
      }
    } else {
      if(action === 'Decline') {
        console.log('Decline action is not working');
      } else {
        console.log('Accept action is not working');
      }
    }
  };  

  const filteredOrphanages = orphanagesData.filter((orphanage) => {
    return (
      (selectedLocation === "All" || orphanage.location === selectedLocation) &&
      (selectedStatus === "All" || orphanage.status === selectedStatus)
    );
  });

  const pictureUrl = (image) => {
    return `data:image/jpeg;base64,${image}`;
  };

  const totalEntries = filteredOrphanages.length;
  const totalPages = Math.ceil(totalEntries / entriesPerPage);

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredOrphanages.slice(indexOfFirstEntry, indexOfLastEntry);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (

    
    <div>
      <div className="OrphDash">
        <h2>Orphanages</h2>
        
        <div className="selection">
          <label htmlFor="locationFilter">Search by Location</label>
        
        <select id="locationFilter" value={selectedLocation} onChange={handleLocationChange}>
          {uniqueLocations.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
        <label htmlFor="statusFilter">Search by Status</label>
        <select id="statusFilter" value={selectedStatus} onChange={handleStatusChange}>
          {uniqueStatus.map((status, index) => (
            <option key={index} value={status}>
              {status}
            </option>
          ))}
        </select>
        </div>
        {/* Table */}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Location</th>
              <th>Contact</th>
              <th>Details</th>
              <th>Status</th>
              <th>Requests</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((orphanage, index) => (
              <tr key={index}>
                <td>{orphanage.name}</td>
                <td>{orphanage.location}</td>
                <td>{orphanage.contact}</td>
                <td>
                  <button onClick={() => openModal(orphanage)} className="smallButton">Details</button>
                </td>
                <td>{orphanage.status}</td>
                <td className="requests">
                  
                  {orphanage.status === "VERIFIED" && (
                    <button onClick={() => showConfirmation("Decline", orphanage.orpId)} style={{ fontSize: "10px", padding: "5px" }}>Decline</button>
                  )}
                  {orphanage.status === "NOT_VERIFIED" && (
                    <button onClick={() => showConfirmation("Accept", orphanage.orpId)} style={{ fontSize: "10px",padding:"5px"}}>Accept</button>
                  )}
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      <Dialog
        open={openPdfDialog}
        onClose={handleClosePdfDialog}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>View Certificate</DialogTitle>
        <DialogContent>
          {certificateUrl ? (<iframe
            title="certificate"
            src={certificateUrl}
            width="100%"
            height="600"
          />): (<div>No Certificate to view</div>)}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePdfDialog}>Close</Button>
        </DialogActions>
      </Dialog>

        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
            <button key={page} onClick={() => handlePageChange(page)} className={`pagination-button ${currentPage === page ? 'active' : ''}`}>
              {page}
            </button>
          ))}
          <p>Page {currentPage} of {totalPages}</p>
        </div>

        {/* Modal */}
        {selectedOrphanage && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeModal}>
                &times;
              </span>
              <h3>{selectedOrphanage.name}</h3>
              <p className="field-name">Director<span> {selectedOrphanage.director}</span></p>
              <p className="field-name">Contact<span> {selectedOrphanage.contact}</span></p>
              <p className="field-name">Email<span> {selectedOrphanage.email}</span></p>
              <p className="field-name">Website<span> {selectedOrphanage.web}</span></p>
              <p className="field-name">Description<span> {selectedOrphanage.desc}</span></p>
              <p className="field-name">Images:{" "} <button onClick={openViewImagesPopup}>View Images</button><span></span></p>
              <p className="field-name">Certificates{" "} <button onClick={()=>handleViewCertificate(selectedOrphanage.orpId)} className="smallButton">View Certificates</button></p>
            </div>
          </div>
        )}

        {imagePopupVisible && (
          <ImagePopup
            images={selectedOrphanage ? selectedOrphanage.images : []}
            onClose={closeImagePopup}
          />
        )}

        {viewImagesPopupVisible && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeViewImagesPopup}>&times;</span>
              <h3>View Images</h3>
              <ImageList variant="masonry" cols={3} gap={8}>
                {imageData.map((item) => (
                  <ImageListItem key={item.id}>
                    <img
                      src={pictureUrl(item.image)}
                      alt={item?.alt}
                      onClick={openImagePopup}
                      style={{ cursor: "pointer" }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrphDash;