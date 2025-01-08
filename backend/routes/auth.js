const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Hardcoded admin credentials
const ADMIN_EMAIL = 'charannaik149@gmail.com';
const ADMIN_PASSWORD = 'Charan123';

// Signup
router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error creating user' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  try {
    // Check if the user is the hardcoded admin
    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ userId: 'admin', isAdmin: true }, 'your-secret-key', { expiresIn: '1h' });
      return res.json({ token, isAdmin: true });
    }

    // Regular user login
    const user = await User.findOne({ email });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id, isAdmin: user.isAdmin }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token, isAdmin: user.isAdmin });
  } catch (error) {
    res.status(500).json({ error: 'Error logging in' });
  }
});

module.exports = router;