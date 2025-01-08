import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    vehicleNumber: '',
    bloodGroup: '',
    dateOfBirth: '',
    gender: '',
  });
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user email from local storage
    const userEmail = localStorage.getItem('email');
    if (!userEmail) {
      navigate('/login');
    } else {
      setEmail(userEmail);
      fetchProfile(userEmail);
    }
  }, [navigate]);

  const fetchProfile = async (email) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/profile/${email}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:5000/api/profile/update', { email, ...formData });
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Profile</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobileNumber"
          placeholder="Mobile Number"
          value={formData.mobileNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="vehicleNumber"
          placeholder="Vehicle Number"
          value={formData.vehicleNumber}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="bloodGroup"
          placeholder="Blood Group"
          value={formData.bloodGroup}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          placeholder="Date of Birth"
          value={formData.dateOfBirth}
          onChange={handleChange}
          required
        />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
};

export default Profile;