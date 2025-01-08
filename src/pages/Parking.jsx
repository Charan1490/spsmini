import React, { useState } from 'react';
import axios from 'axios';

const Parking = () => {
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://localhost:5000/api/parking/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status === 'valid') {
        setMessage(`License plate ${response.data.licensePlate} is valid. Barrier opened.`);
      } else {
        setMessage('License plate not found. Access denied.');
      }
    } catch (error) {
      setMessage('Error processing license plate image.');
    }
  };

  // Simulate entry sensor trigger
  const simulateEntrySensor = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/parking/trigger');
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error triggering vehicle entry.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Parking Management</h2>

      {/* Simulate Entry Sensor */}
      <button onClick={simulateEntrySensor} style={styles.button}>
        Simulate Entry Sensor
      </button>

      {/* Image Upload Prompt */}
      {message === 'Please upload license plate image' && (
        <div style={styles.uploadSection}>
          <h3>Upload License Plate Image</h3>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.input} />
        </div>
      )}

      {/* Display Message */}
      {message && <p style={styles.message}>{message}</p>}
    </div>
  );
};

// Styles
const styles = {
  container: {
    padding: '20px',
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#004080',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  uploadSection: {
    marginTop: '20px',
  },
  input: {
    marginTop: '10px',
  },
  message: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#fff',
  },
};

export default Parking;