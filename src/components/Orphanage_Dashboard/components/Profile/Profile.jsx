// Profile.jsx
import React, { useState , useEffect} from 'react';
import './Orphanage-Profile.css';
import {useUser} from '../../../../UserContext'
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
import { message, Row, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Avatar } from '@mui/material';
 
const Profile = () => {
   const [isEditMode, setIsEditMode] = useState(false);
   const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);
 
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatchError, setPasswordMismatchError] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [newPasswordVisibility, setNewPasswordVisibility] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
 
  const  {setUserData} = useUser();
  const {userDetails} = useUser();
 
  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    console.log("kldfhka");
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 1;
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
      return false;
    }
    else if (!isLt2M) {
      message.error('Image must smaller than 1MB!');
      return false;
    }
    else{
       return true;
    }
   
  };
 
  const [orphanageDetail,setOrphanageDetail] = useState({
    name:"",
    email:"",
    contact:""
  });
 
 
  const handleEditProfileClick = () => {
    setIsEditMode(true);
    setIsChangePasswordMode(false);
  };
 
  const handleSaveChangesClick = async() => {
    try{
      const response=await axios.put(`${API_BASE_URL}/orphanage/${userDetails?.orpId}/editProfile`,orphanageDetail);
      const status=response.status;
      console.log(status);
      if(status === 200){
        setUserData(response.data);
        setIsEditMode(false);
      }
    }catch(error){
      alert("Try Again Later");
      console.log(error);
    }
   
  };
  const [loading, setLoading] = useState(false);
  const handleChangePasswordClick = () => {
    setIsChangePasswordMode(true);
    setIsEditMode(false);
    setPasswordMismatchError('');
  };
 
  const handleSavePasswordChangesClick = async () => {
    if(oldPassword !== userDetails?.password){
      setPasswordMismatchError('Enter Correct Password');
    }
    else if (newPassword !== confirmPassword ) {
      setPasswordMismatchError('New password and confirm password do not match');
    } else {
      try{
        const response = await axios.post(`${API_BASE_URL}/orphanage/ChangePassword/${userDetails?.email}/${oldPassword}/${newPassword}/${confirmPassword}`);
        const status = response.status;
        console.log(status);
        if(status == 200){
          setUserData(response.data);
          setIsChangePasswordMode(false);
          setPasswordMismatchError('');
        }
      }
      catch(error){
        alert("Try Again Later");
        console.log(error);
      }
    }
  };
 
  const handleTogglePasswordVisibility = (field) => {
    if (field === 'new') {
      setNewPasswordVisibility(!newPasswordVisibility);
    } else if (field === 'confirm') {
      setConfirmPasswordVisibility(!confirmPasswordVisibility);
    }
  };
  const [showInput, setShowInput] = useState(false);
 
  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/orphanage/getPhoto/${userDetails?.orpId}`, {
          responseType: 'arraybuffer',
        });
 
        const arrayBuffer = response.data;
        const base64Image = btoa(
          new Uint8Array(arrayBuffer)
            .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );
 
        setImageUrl(`data:image/jpeg;base64,${base64Image}`);
      } catch (error) {
        console.error('Error fetching profile photo:', error);
      }
    };
 
    fetchPhoto();
  }, [userDetails]);
  const handleImageChange = async (file) => {
    const formData=new FormData();
    formData.append("file",file);
   
    if (file) {
      const reader = new FileReader();
      
      reader.onloadend = () => {
        setSelectedImage(file);
        setImageUrl(reader.result);
      };
      reader.readAsDataURL(file);
      try{
        console.log("fjghfh")
        const response=await axios.post(`${API_BASE_URL}/orphanage/addPhoto/${userDetails?.orpId}`,formData);
        const status=response.status;
        console.log(status);
        if(status ===200){
          setUserData(response.data);
        }
      }catch(error){
        alert("Error in Profile-Photo Update");
        console.log(error);
      }
    }
  };
  const handleChange = (info) => {
    
    if(beforeUpload(info.file)){
      if (info.file.status === 'uploading') {
        console.log("fasdfa")
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (url) => {
          setImageUrl(url);
          console.log(info.file);
          handleImageChange(info.file.originFileObj);
        });
      }
    }
      
  };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
        color: 'grey',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
          marginLeft:18,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <div className='orphanage-heading'>
       <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: '2em', justifyContent: 'center',flexDirection: 'column' }}>Manager Profile</h1>
      <div className="orphanage-profile-container">
     
        <div className="orphanage-profile-details">
          {isEditMode ? (
            <div style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
              <div style={{marginRight:'45px'}}>
             <Upload
             
        name="avatar"
        listType="picture-circle"
        className="orphanage-avatar-uploader"
        showUploadList={false}
        onChange={(e)=>handleChange(e)}
      >
        {imageUrl ? (
          
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              minWidth: '125%',
              height: '125%',
              borderRadius: '50%',
              objectFit:'cover',
              left:'5px'
            }}
          />
          
        ) : (
          uploadButton
        )}
      </Upload>
      </div>
        <div>
            <p>Name:</p>
              <input
                type="text"
                placeholder={userDetails?.name}
                onChange={(e) => setOrphanageDetail({...orphanageDetail,name:e.target.value})}
              />
              <p>Email:
              <input
                type="text"
                placeholder={userDetails?.email}
                onChange={(e) => setOrphanageDetail({...orphanageDetail,email:e.target.value})}
              /></p>
              <p>Contact:
              <input
                type="text"
                placeholder={userDetails?.contact}
                onChange={(e) => setOrphanageDetail({...orphanageDetail,contact:e.target.value})}
              /></p>
              <div className="orphanage-button-group">
              
                <button onClick={handleSaveChangesClick}>Save Changes</button>
                <button onClick={() => setIsEditMode(false)}>Back</button>
              </div>
              </div>
            </div>
          ) : isChangePasswordMode ? (
            <>
            
              <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <div className="password-input">
                <input
                  type={newPasswordVisibility ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <span
                  className={`password-toggle ${newPasswordVisibility ? "visible" : ""}`}
                  onClick={() => handleTogglePasswordVisibility('new')}
                >
                  {/* <i className="fas fa-eye"></i> */}
                </span>
              </div>
              <div className="password-input">
                <input
                  type={confirmPasswordVisibility ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className={`password-toggle ${confirmPasswordVisibility ? "visible" : ""}`}
                  onClick={() => handleTogglePasswordVisibility('confirm')}
                >
                  {/* <i className="fas fa-eye"></i> */}
                </span>
              </div>
              {passwordMismatchError && <p className="orphanage-error-message">{passwordMismatchError}</p>}
              <div className="orphanage-button-group">
                <button onClick={handleSavePasswordChangesClick}>Save Password Changes</button>
                <button onClick={() => setIsChangePasswordMode(false)}>Back</button>
              </div>
            </>
          ) : (
            <div style={{display:'flex',flexDirection:'row'}}>
            <div className="orphanage-profile-picture">
              <Avatar sx={{left:'10px',height:'150px',width:'150px'}} src={imageUrl || "data:image/jpeg;base64,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"} alt="Profile" />
            </div>
            <div>
              <h2>{userDetails?.name}</h2>
              <p>Email: {userDetails?.email}</p>
              <p>Contact no. : {userDetails?.contact}</p>
              <div className="orphanage-profile-buttons">
                <button className="orphanage-edit-profile-button" onClick={handleEditProfileClick}>
                  Edit Profile
                </button>
                <button className="orphanage-change-password-button" onClick={handleChangePasswordClick}>
                  Change Password
                </button>
              </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
 
export default Profile;