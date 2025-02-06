import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Parking = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState('');
  const [spots, setSpots] = useState([]);

  // Fetch parking spots from the backend
  useEffect(() => {
    const fetchSpots = async () => {
      try {
        const response = await axios.get('http://192.168.118.151:5000/api/parking/spots');
        setSpots(response.data);
      } catch (error) {
        console.error('Error fetching parking spots:', error);
      }
    };

    fetchSpots();
  }, []);

  // Simulate entry sensor trigger
  useEffect(() => {
    const simulateEntrySensor = async () => {
      try {
        const response = await axios.post('http://192.168.118.151:5000/api/parking/trigger');
        if (response.data.message === 'Please upload license plate image') {
          setMessage(response.data.message);
          setShowPopup(true); // Show popup to upload image
        }
      } catch (error) {
        console.error('Error triggering vehicle entry:', error);
        setMessage('Error triggering vehicle entry.');
      }
    };

    // Simulate entry sensor trigger (replace with actual hardware integration)
    const interval = setInterval(() => {
      simulateEntrySensor();
    }, 10000); // Trigger every 10 seconds for testing

    return () => clearInterval(interval);
  }, []);

  // Handle image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('http://192.168.96.150:5000/api/parking/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.status === 'valid') {
        setMessage(`License plate ${response.data.licensePlate} is valid. Vehicle parked at spot ${response.data.spotNumber}.`);
      } else {
        setMessage('License plate not found. Access denied.');
      }
    } catch (error) {
      console.error('Error processing license plate image:', error);
      setMessage('Error processing license plate image.');
    } finally {
      setShowPopup(false); // Close popup after upload
    }
  };

  return (
    <div style={styles.container}>
      <h2>Parking Management</h2>

      {/* Popup for Image Upload */}
      {showPopup && (
        <div style={styles.popup}>
          <h3>Upload License Plate Image</h3>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={styles.input} />
        </div>
      )}

      {/* Display Message */}
      {message && <p style={styles.message}>{message}</p>}

      {/* Display Parking Spots */}
      <div style={styles.spotsContainer}>
        {spots.map((spot) => (
          <div key={spot.spotNumber} style={styles.spotCard}>
            <h3>Spot {spot.spotNumber}</h3>
            <p>Status: {spot.status}</p>
            <p>Vehicle: {spot.vehicleNumber || 'None'}</p>
          </div>
        ))}
      </div>
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
  popup: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
  input: {
    marginTop: '10px',
  },
  message: {
    marginTop: '20px',
    fontSize: '18px',
    color: '#fff',
  },
  spotsContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
    marginTop: '30px',
  },
  spotCard: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    width: '200px',
  },
};

export default Parking;