const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isAdmin: { type: Boolean, default: false },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  mobileNumber: { type: String, default: '' },
  vehicleNumber: { type: String, default: '' },
  bloodGroup: { type: String, default: '' },
  dateOfBirth: { type: String, default: '' },
  gender: { type: String, default: '' },
});

module.exports = mongoose.model('User', userSchema);