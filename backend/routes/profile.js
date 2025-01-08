const express = require('express');
const User = require('../models/User');
const router = express.Router();

// Update user profile
router.put('/update', async (req, res) => {
  const { email, firstName, lastName, mobileNumber, vehicleNumber, bloodGroup, dateOfBirth, gender } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user details
    user.firstName = firstName;
    user.lastName = lastName;
    user.mobileNumber = mobileNumber;
    user.vehicleNumber = vehicleNumber;
    user.bloodGroup = bloodGroup;
    user.dateOfBirth = dateOfBirth;
    user.gender = gender;

    await user.save();
    res.json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating profile' });
  }
});

// Get user profile
router.get('/:email', async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      firstName: user.firstName,
      lastName: user.lastName,
      mobileNumber: user.mobileNumber,
      vehicleNumber: user.vehicleNumber,
      bloodGroup: user.bloodGroup,
      dateOfBirth: user.dateOfBirth,
      gender: user.gender,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching profile' });
  }
});

module.exports = router;