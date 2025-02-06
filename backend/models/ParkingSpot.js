const mongoose = require('mongoose');

const parkingSpotSchema = new mongoose.Schema({
  spotNumber: { type: Number, required: true, unique: true },
  status: { type: String, enum: ['vacant', 'occupied'], default: 'vacant' },
  vehicleNumber: { type: String, default: null },
});

module.exports = mongoose.model('ParkingSpot', parkingSpotSchema);