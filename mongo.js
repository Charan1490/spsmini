import mongoose from 'mongoose';
import ParkingSpot from './models/ParkingSpot.js';

mongoose.connect('mongodb+srv://USERCharan:Charan1490@myatlasclusteredu.pczh6t0.mongodb.net/smart-parkingfinal', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    initializeSpots();
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));

async function initializeSpots() {
  try {
    // Clear existing spots (optional)
    await ParkingSpot.deleteMany({});

    // Create 4 spots with initial status as vacant
    const spots = [
      { spotNumber: 1, status: 'vacant', vehicleNumber: null },
      { spotNumber: 2, status: 'vacant', vehicleNumber: null },
      { spotNumber: 3, status: 'vacant', vehicleNumber: null },
      { spotNumber: 4, status: 'vacant', vehicleNumber: null },
    ];

    await ParkingSpot.insertMany(spots);
    console.log('Database initialized with 4 spots');
  } catch (error) {
    console.error('Error initializing spots:', error);
  } finally {
    mongoose.connection.close();
  }
}