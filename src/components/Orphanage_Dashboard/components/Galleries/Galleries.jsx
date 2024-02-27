import React, { useEffect, useState } from 'react';
import './Galleries.css';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
import { useUser } from '../../../../UserContext';
import { CircularProgress } from '@mui/material';

const Gallery = () => {
  
  const {userDetails} = useUser();

  const handleDeleteButton = async(imageId) => {
   if(window.confirm("Do you want to delete this image???????????")){
     try{
      const response = await axios.post(`${API_BASE_URL}/orphanage/${userDetails.orpId}/orphanageDetails/removeImage/${imageId}`);
      const status = response.status;
      setOnChangeVariable(!onChangeVariable);
       alert("Image Deleted Successfully");
      }catch(error){
        console.log(error)
     }
   }
   
  };  

  const [selectedImage, setSelectedImage] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const[onChangeVariable,setOnChangeVariable] = useState(true);
  const [orphanageDetailWithImage,setOrphanageDetailWithImage] = useState({
    loading: true, 
    data: null,
    error: null,
  });
  useEffect(()=>{
    const fetchOrphanageDetails = async() =>{
      try {
        const response = await axios.get(`${API_BASE_URL}/orphanage/${userDetails.orpId}/details`);
        const imageData= await fetchImageData();
        setOrphanageDetailWithImage({ loading: false, data:{
          ...response.data,
          orphanageImages:imageData,
        }})
      }catch(error){
        setOrphanageDetailWithImage({ loading: false, error: error });
        console.log(error)
      }
    }

  fetchOrphanageDetails();
  },[onChangeVariable]);
      const fetchImageData =async() =>{
    try{
        const response = await axios.get(`${API_BASE_URL}/orphanage/${userDetails.orpId}/orphanageDetails/viewImages`);
        return response.data;
    }catch(error){
      console.log(error);
      return []; // Return empty array to avoid rendering errors
    }
  }

  const handlePreviewClick = (image) => {
    setSelectedImage(image);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setOpenModal(false);
  };

  return (
    <div>
      <center>
        <div className="image-gallery">
        {orphanageDetailWithImage.loading ? (
            <CircularProgress sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} />
          ) : orphanageDetailWithImage.error ? (
            <div>Error loading images: {orphanageDetailWithImage.error.message}</div>
          ) : (
          <ImageList sx={{ width: 550, height: 590 }}>
            <ImageListItem key="Subheader" cols={2}>
              <ListSubheader component="div">{orphanageDetailWithImage.data?.orphanageName}</ListSubheader>
            </ImageListItem>
            {orphanageDetailWithImage?.data?.orphanageImages?.map((item, index) => (
              <ImageListItem key={index}>
                <img src={`data:image/jpeg;base64,${item?.image}`} 
                     alt={item.title} 
                     loading="lazy" 
                     style={{ display: 'block', margin: '0 auto' }}
                     />
                     <CircularProgress
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      display: 'none', // Initially hidden
                    }}/>
                <ImageListItemBar
                  title={item?.title}
                  subtitle={item?.author}
                  actionIcon={
                    <>
                     <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' , marginLeft: 1}}
                        aria-label="preview image"
                        onClick={() => handlePreviewClick(item)}
                      >
                        <ZoomInIcon />
                      </IconButton>
                      
                      <IconButton
                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                        aria-label="delete image"
                        onClick={() => handleDeleteButton(item.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </>
                  }
                  
                />
              </ImageListItem>
            ))}
          </ImageList>
          )}
        </div>
        <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="preview-modal-title"
        aria-describedby="preview-modal-description"
      >
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
          <img
            src={`data:image/jpeg;base64,${selectedImage?.image}`}
            alt={selectedImage?.title}
            style={{ width: '100vh', height: 'auto' }}
          />
          <IconButton
            sx={{ position: 'absolute', top: '15px', right: '15px' }}
            onClick={handleCloseModal}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Modal>
      </center>
    </div>
  );
};

export default Gallery;
