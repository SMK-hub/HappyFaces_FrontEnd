import React, { useState } from 'react';
import './UpdateDetails.css';
import axios from 'axios';
import { API_BASE_URL } from '../../../../config';
import { useUser } from '../../../../UserContext';
import { message } from 'antd';

const FormComponent = () => {

  const [formData, setFormData] = useState({
    orphanageName: '',
    directorName: '',
    contact: '',
    orphanageEmail: '',
    description: '',
    address: {
      house_no: '',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: '',
    },
    website: '',
    requirements: {
      need: '',
      priority: '',
      description: '',
    },
  });

  const { userDetails } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleRequirementChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      requirements: {
        ...prevState.requirements,
        [name]: value,
      },
    }));
  };

  const updateOrphanageDetails = async () => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/orphanage/${userDetails.orpId}/editDetails`,
        formData
      );
      const status = response.status;
      if (status === 200) {
        console.log(response.data);
        message.success(response.data);
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData);
    await updateOrphanageDetails();
  };
  return (
    <div>
      <form>
  <h1>Orphanage Details</h1>
  <label>
    Orphanage Name<span className="required-star">*</span>:
    <input type="text" name="orphanageName" value={formData.orphanageName} onChange={handleChange} required/>
  </label>
  <label>
    Director Name:
    <input type="text" name="directorName" value={formData.directorName} onChange={handleChange} required/>
  </label>
  <label>
    Contact:
    <input type="tel" name="contact" value={formData.contact} onChange={handleChange} required/>
  </label>
  <label>
    Orphanage Email:
    <input type="email" name="orphanageEmail" value={formData.orphanageEmail} onChange={handleChange} required/>
  </label>
  <label>
    Description:
    <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
  </label>
    <h3>Address</h3>
    <label>
      House Number:
      <input type="text" name="house_no" value={formData.address.house_no} onChange={handleAddressChange} required/>
    </label>
    <label>
      Street Address:
      <input type="text" name="street" value={formData.address.street} onChange={handleAddressChange} required/>
    </label>
    <label>
      City:
      <input type="text" name="city" value={formData.address.city} onChange={handleAddressChange} required/>
    </label>
    <label>
      State:
      <input type="text" name="state" value={formData.address.state} onChange={handleAddressChange} required/>
    </label>
    <label>
      Zip Code:
      <input type="number" name="postalCode" value={formData.address.postalCode} onChange={handleAddressChange} required/>
    </label>
    <label>
      Country:
      <input type="text" name="country" value={formData.address.country} onChange={handleAddressChange} required/>
    </label>
  <label>
    Website:
    <input type="text" name="website" value={formData.website} onChange={handleChange} />
  </label>
  <label>
    Requirements:
    <select name="need" value={formData.requirements.need} onChange={handleRequirementChange} required>
      <option value="">Select Requirement</option>
      <option value="FOOD">FOOD</option>
      <option value="CLOTHES">CLOTHES</option>
      <option value="BOOKS">BOOKS</option>
      <option value="OTHERS">OTHERS</option>
    </select>
  </label>
  <label>
    Priority Status:
    <select name="priority" value={formData.requirements.priority} onChange={handleRequirementChange} required>
      <option value="">Select Priority Status</option>
      <option value="high">High</option>
      <option value="medium">Medium</option>
    </select>
  </label>
  <label>
    Requirement Description:
    <textarea name="description" value={formData.requirements.description} onChange={handleRequirementChange} required></textarea>
  </label>

  <div className="button-container">
    <button onClick={(e)=>handleSubmit(e)}>Update</button>
  </div>
</form>

    </div>
  );
};

export default FormComponent;