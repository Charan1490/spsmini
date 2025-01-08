const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import the cors package
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const parkingRoutes = require('./routes/parking');
require('dotenv').config();

const app = express();

// Enable CORS
app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from this origin
  credentials: true, // Allow cookies and credentials
}));

app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/parking', parkingRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));