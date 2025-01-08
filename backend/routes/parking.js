const express = require('express');
const multer = require('multer');
const User = require('../models/User');
const twilio = require('twilio');
const router = express.Router();

// Configure multer for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Twilio credentials
const accountSid = 'AC369903f994e778d2a3e3118904b8a839';
const authToken = '9865a7efa702e87d33c5d536c2cb9fa5';
const client = twilio(accountSid, authToken);

// Simulate license plate recognition (replace with actual logic)
const recognizeLicensePlate = (imageBuffer) => {
  // For now, return a hardcoded license plate
  return 'ABC123';
};

// Handle vehicle entry trigger
router.post('/trigger', async (req, res) => {
  try {
    // Notify the frontend to prompt for image upload
    res.json({ message: 'Please upload license plate image' });
  } catch (error) {
    res.status(500).json({ error: 'Error triggering vehicle entry' });
  }
});

// Handle license plate image upload
router.post('/upload', upload.single('image'), async (req, res) => {
  try {
    const imageBuffer = req.file.buffer;

    // Recognize license plate from the image
    const licensePlate = recognizeLicensePlate(imageBuffer);

    // Check if the license plate exists in the database
    const user = await User.findOne({ vehicleNumber: licensePlate });
    if (user) {
      // Open barrier (simulate by sending response to ESP32)
      res.json({ status: 'valid', licensePlate });

      // Send SMS to the user
      const message = `Your vehicle ${licensePlate} has entered the parking lot.`;
      await client.messages.create({
        body: message,
        from: '+12189754072',
        to: user.mobileNumber,
      });
    } else {
      res.json({ status: 'invalid', message: 'License plate not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error processing license plate image' });
  }
});

module.exports = router;