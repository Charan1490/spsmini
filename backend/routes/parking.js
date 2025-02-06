const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const twilio = require('twilio');
const router = express.Router();

// MongoDB models
const User = require('../models/User');
const ParkingSpot = require('../models/ParkingSpot');

// Multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Twilio credentials
const accountSid = 'AC369903f994e778d2a3e3118904b8a839'; // Replace with your Twilio Account SID
const authToken = '5b64d8e11353a42e42824bb8839d9c62';   // Replace with your Twilio Auth Token
const client = twilio(accountSid, authToken);

// Simulate license plate recognition
const recognizeLicensePlate = (imageBuffer) => {
  return 'ABC123'; // Replace with actual recognition logic
};

// Handle vehicle entry trigger
router.post('/trigger', async (req, res) => {
  try {
    // Find all vacant spots
    const vacantSpots = await ParkingSpot.find({ status: 'vacant' });

    // If no vacant spots are found, return "Parking is full"
    if (vacantSpots.length === 0) {
      return res.json({ message: 'Parking is full' });
    }

    // Notify the frontend to prompt for image upload
    res.json({ message: 'Please upload license plate image' });
  } catch (error) {
    console.error('Error triggering vehicle entry:', error);
    res.status(500).json({ error: 'Error triggering vehicle entry' });
  }
});

router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      console.error('No image file uploaded');
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    const imageBuffer = req.file.buffer;
    console.log('Image received:', imageBuffer);

    // Simulate license plate recognition
    const licensePlate = recognizeLicensePlate(imageBuffer);
    console.log('Recognized license plate:', licensePlate);

    // Check if the license plate exists in the database
    const user = await User.findOne({ vehicleNumber: licensePlate });
    if (!user) {
      console.error('License plate not found:', licensePlate);
      return res.json({ status: 'invalid', message: 'License plate not found' });
    }

    // Find all vacant spots and sort by spot number (nearest first)
    const vacantSpots = await ParkingSpot.find({ status: 'vacant' }).sort({ spotNumber: 1 });
    if (vacantSpots.length === 0) {
      console.error('No vacant spots available');
      return res.json({ status: 'invalid', message: 'No vacant spots available' });
    }

    // Assign the vehicle to the nearest vacant spot (first in the sorted list)
    const nearestVacantSpot = vacantSpots[0];
    nearestVacantSpot.status = 'occupied';
    nearestVacantSpot.vehicleNumber = licensePlate;
    await nearestVacantSpot.save();

    // Send SMS to the user
    const message = `Your vehicle ${licensePlate} is parked at spot ${nearestVacantSpot.spotNumber} at ${new Date().toLocaleTimeString()}.`;
    await client.messages.create({
      body: message,
      from: '+12189754072', // Replace with your Twilio phone number
      to: user.mobileNumber,
    });

    console.log('SMS sent successfully');
    res.json({ status: 'valid', licensePlate, spotNumber: nearestVacantSpot.spotNumber });
  } catch (error) {
    console.error('Error processing license plate image:', error);
    res.status(500).json({ error: 'Error processing license plate image' });
  }
});
// Handle parking spot status updates
router.post('/update-spot', async (req, res) => {
  try {
    const { spotNumber, status, vehicleNumber } = req.body;

    // Update the spot status in the database
    const spot = await ParkingSpot.findOne({ spotNumber });
    if (!spot) {
      return res.status(404).json({ error: 'Spot not found' });
    }

    spot.status = status;
    spot.vehicleNumber = vehicleNumber || null;
    await spot.save();

    res.json({ message: 'Spot status updated successfully' });
  } catch (error) {
    console.error('Error updating spot status:', error);
    res.status(500).json({ error: 'Error updating spot status' });
  }
});

module.exports = router;