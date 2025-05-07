import React, { useState } from 'react';
import './AddCropPrice.css';

function AddCropPrice() {
  const [formData, setFormData] = useState({
    cropName: '',
    marketPrice: '',
    imageFile: null,   // <--- changed
    location: '',
    harvestDays: '',
    harvestDate: '',
    contactName: '',
    contactPhone: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imageFile') {
      setFormData((prevData) => ({
        ...prevData,
        imageFile: files[0],   // <--- handle file correctly
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (Object.values(formData).some((field) => field === '' || field === null)) {
      setMessage('Please fill in all fields.');
      return;
    }

    try {
      const submissionData = new FormData(); // <--- use FormData for file uploads
      submissionData.append('crop_name', formData.cropName);
      submissionData.append('market_price', formData.marketPrice);
      submissionData.append('image_file', formData.imageFile);
      submissionData.append('location', formData.location);
      submissionData.append('harvest_days', formData.harvestDays);
      submissionData.append('harvest_date', formData.harvestDate);
      submissionData.append('contact_name', formData.contactName);
      submissionData.append('contact_phone', formData.contactPhone);

      const response = await fetch('http://127.0.0.1:8000/api/prices/', {
        method: 'POST',
        body: submissionData,
      });

      if (response.ok) {
        setMessage('Crop product added successfully! 🎉');
        setFormData({
          cropName: '',
          marketPrice: '',
          imageFile: null,
          location: '',
          harvestDays: '',
          harvestDate: '',
          contactName: '',
          contactPhone: '',
        });
      } else {
        setMessage('Failed to add crop product. 😔');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Something went wrong.');
    }
  };

  return (
    <div className="add-crop-container">
      <h2>Add New Crop Product 🌾</h2>
      <form onSubmit={handleSubmit} className="add-crop-form" encType="multipart/form-data">
        <input
          type="text"
          name="cropName"
          placeholder="Crop Name (e.g., Wheat)"
          value={formData.cropName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          step="0.01"
          name="marketPrice"
          placeholder="Market Price (per quintal ₹)"
          value={formData.marketPrice}
          onChange={handleChange}
          required
        />
        <input
          type="file"
          name="imageFile"
          accept="image/*"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="location"
          placeholder="Location (District/State)"
          value={formData.location}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="harvestDays"
          placeholder="Harvest in how many days?"
          value={formData.harvestDays}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="harvestDate"
          placeholder="Expected Harvest Date"
          value={formData.harvestDate}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="contactName"
          placeholder="Contact Person Name"
          value={formData.contactName}
          onChange={handleChange}
          required
        />
        <input
          type="tel"
          name="contactPhone"
          placeholder="Contact Phone Number"
          value={formData.contactPhone}
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
        {message && <p className="message">{message}</p>}
      </form>
    </div>
  );
}

export default AddCropPrice;
